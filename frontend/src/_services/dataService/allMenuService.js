import urls from './../../conf';
var base_url = urls.dev_url;


const fetchAllMenu = async () => fetch(`${base_url}content/dailymenu`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    
}).then(response => response.json())

const getAllMenu = async () => {
    const data = await fetchAllMenu();
    console.log(data)
    if(data.status === 'success'){
        //  console.log("EVRY ", data)
        const veg = data.veg_food;
        const non_veg = data.non_veg_food;
        // console.log(month_meals);
        // console.log(total_meals);
        return {
            status:true,
            veg,
            non_veg
        }
    }
    else{
        return {
            status:false,
            msg:data.message
        }
    }
}

export default getAllMenu;