import urls from './../../conf';
var base_url = urls.dev_url;


const fetchTomorrowsMenu = async (token) => fetch(`${base_url}content/?auth=${token}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    
}).then(response => response.json())

const getTomorrowsMenu = async (token) => {
    const data = await fetchTomorrowsMenu(token);
    
    if(data.status === 'success'){
        const veg_meals = data.veg_food;
        const non_veg_meals = data.non_veg_food;
        const general_veg_menu = data.general_veg_foods;
        const general_non_veg_menu = data.general_non_veg_foods
        const status = true
        const res = {
            status,
            veg_meals,
            non_veg_meals,
            general_veg_menu,
            general_non_veg_menu
        }
        //console.log(data);
        return res;
    }
    else{
        return {
            status:false,
            msg:data.message
        }
    }

}

export default getTomorrowsMenu;