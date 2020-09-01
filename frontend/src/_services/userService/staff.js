import urls from './../../conf';
var base_url = urls.dev_url;


const fetchLoginStaff = async (id, pass) => fetch(`${base_url}staff/?auth=${token}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    
}).then(response => response.json())

const staffLogin = async (id, pass) => {
    const data = await fetchLoginStaff(id, pass);
    
}