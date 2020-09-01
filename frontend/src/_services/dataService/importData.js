import urls from './../../conf';
var base_url = urls.dev_url;


const getLatestData = async (id, token) => fetch(`${base_url}device/getlatestdata`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
        "id": id,
        "token": token
    })
}).then(response => response.json())

const getMedata = async (id, token) => {
    const data = await getLatestData(id, token);
    let d = data.data[0];
    console.log(d);
    let l = d.time
    let dd = d.last
    return {
        label: l,
        data: dd,
    }
}


const getData = async (id, duration, token) => fetch(`${base_url}device/getrangedata`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
        "id": id,
        "duration": duration,
        "token": token
    })
}).then(response => response.json())

const getRangeData = async (id, duration, token) => {
    console.log(duration);
    const data = await getData(id, duration, token);
    let d = data.data;
    console.log(data);
    let l = []
    let dd = []
    for(let i=0; i<d.length; i++){
        let item = d[i];
        l.push(new Date(item.time));
        dd.push(item.value);
    }
    console.log(l);
    console.log(dd);
    return {
        label: l,
        data: dd,
    }
}


export {getRangeData, getMedata}