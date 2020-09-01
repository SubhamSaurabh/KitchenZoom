
export default function getDataOf(name, devices){
    console.log(name)
    console.log(devices)
    for(let i=0; i<devices.length; i++){
        let item = devices[i]
        if(item.name===name)
            return item
    }
    return null
    // devices.map((item, index) => {
    //     if (item.name === name){
    //         return item;
    //     }
    // })
    // let res = {
    //     name: name,
    //     graphName: "Temperature v/s time",
    //     min: 0,
    //     max: Math.floor(Math.random() * 100),
    //     curr_value: Math.floor(Math.random() * 10),
    //     Graphlabel: "temp in degree c",
    //     about: [
    //         'Thid device is connected in room 1 and perform the operation',
    //         'It helps in monitoring and controlling the device'
    //     ],
    //     location: "abcd"
    // }
    // return res;
}
