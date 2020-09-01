import urls from './../../conf';
var base_url = urls.dev_url;

const availService = async (token, meals) => fetch(`${base_url}user/avail`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
        "meal_id": meals,
        "token": token
    })
}).then(response => response.json())

const avail = async (token, meals) => {
    const data = await availService(token, meals);
    return data;
}

export default avail;