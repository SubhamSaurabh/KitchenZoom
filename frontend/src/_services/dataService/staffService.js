import urls from './../../conf';
var base_url = urls.dev_url;


const fetchTomorrowsCount = async (token) => fetch(`${base_url}staff/?auth=${token}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    
}).then(response => response.json())

const getTomorrowsCount = async (token) => {
    const data = await fetchTomorrowsCount(token);
    
    if(data.status === 'success'){
        const payload = data.payload
        var veg_meals = [];
        var non_veg_meals = [];
        var general_veg_menu = [];
        var general_non_veg_menu = [];
        for(let i=0; i<payload.length; i++){
            var m = payload[i];
            if(m.isVeg){
                veg_meals.push(m)
            }
            else{
                non_veg_meals.push(m)
            }
        }
        const res = {
            status:true,
            veg_meals,
            non_veg_meals,
            general_veg_menu,
            general_non_veg_menu
        }
        //console.log(res);
        return res;
    }
    else{
        return {
            status:false,
            msg:data.message
        }
    }
}

export default getTomorrowsCount