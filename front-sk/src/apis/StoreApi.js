import Axios from "axios"

 const URL = "http://54.180.160.87:8080" //aws
    //new DB ip
const auth = {
    headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem("userToken")
    }
}
const requestAddPlace = (data, callback, efrrorCallback) => {

    // var params = {
    //     'sname': data.sname,
    //     'address': data.address,
    //     'img': data.img,
    //     'lat': data.lat,
    //     'lng': data.lng
    // }

    let options = {
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + sessionStorage.getItem("userToken") },
        url: URL + '/store/review',
        method: 'post',
        data: JSON.stringify(data)
    }



    Axios(options)
        // Axios.post('http://70.12.246.51:8080/store/review', params, auth)

    .then(response => {
   
        callback(response); //return type true/false 
    
    }).catch(exp => {
     
    })

}

const requestRandom = (data, callback, errorCallback) => {
   
 
    Axios.get(URL + '/store/random/' + data, auth)
        .then(response => {
   
            callback(response.data.object)
        }).catch(exp => {
            errorCallback(exp);
        })
}

function requestStoreList() {
    return Axios.get(URL + `/search/tagSearch`, auth);
}


const StoreApi = {
    requestAddPlace: (data, callback, errorCallback) => requestAddPlace(data, callback, errorCallback),
    requestRandom: (data, callback, errorCallback) => requestRandom(data, callback, errorCallback),
    requestStoreList,
}

export default StoreApi
