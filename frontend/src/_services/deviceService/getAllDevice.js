import urls from './../../conf';

var base_url = urls.dev_url;
export default function getMyDevices(token){

    return fetch(`${base_url}device?auth=${token}`)
    .then(response=>{return response.json()})
    .then(response=>{
        return response.payload
    })
    
}

