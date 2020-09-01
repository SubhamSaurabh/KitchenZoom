import urls from './../../conf';
var base_url = urls.dev_url;


const fetchBill = async (token) => fetch(`${base_url}user/bill?auth=${token}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    
}).then(response => response.json())

const getBill = async (token) => {
    const data = await fetchBill(token);
    // console.log(data)
    if(data.status === 'success'){
        // console.log(data)
        const month_meals = data.month_meals;
        const total_meals = data.total_meals;
        // console.log(month_meals);
        // console.log(total_meals);
        return {
            status:true,
            month_meals,
            total_meals,
        }
    }
    else{
        return {
            status:false,
            msg:data.message
        }
    }
}

export default getBill;