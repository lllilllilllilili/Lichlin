import Axios from "axios"
import store from "../vuex/store"
 const URL = "http://54.180.160.87:8080" //aws
const auth = {
    headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem("userToken")
    }
}

const requestFanList = (data, callback, errorCallback) => {
    //const requestFanList = ({commit}, data){

    //}
    //export requestFanList
    const params = new URLSearchParams();
    params.append('id', data);

    Axios.post(URL + '/follow/fanList', params, auth)
        .then(response => {
            if (response.data.status == true)
                callback(response.data.object)
        })
        .catch(exp => {
            errorCallback(exp);
        })
}

const requestStarList = (data, callback, errorCallback) => {
    const params = new URLSearchParams();
    params.append('id', data);

    Axios.post(URL + '/follow/starList', params, auth)
        .then(response => {
            if (response.data.status == true)
                callback(response.data.object)
        })
        .catch(exp => {
            errorCallback(exp);
        })
}

const requestFollow = (fan, star, callback, errorCallback) => {
    // long fan long star
    const params = new URLSearchParams();
    params.append('fan', fan);
    params.append('star', star);

    Axios.post(URL + '/follow/request', params, auth)
        .then(response => {
            if (response.data.status == true)
                callback(response)
        })
        .catch(exp => {
            errorCallback(exp);
        })
}

const requestStatus = (fan, star, callback, errorCallback) => {
    // long fan long star
    const params = new URLSearchParams();
    params.append('fan', fan);
    params.append('star', star);

    Axios.post(URL + '/follow/status', params, auth)
        .then(response => {
            if (response.data.status == true)
                callback(response.data.object)
        })
        .catch(exp => {
            errorCallback(exp);
        })
}

const requestunFollow = (fan, star, callback, errorCallback) => {
    // long fan long star
    const params = new URLSearchParams();
    params.append('fan', fan);
    params.append('star', star);

    Axios.post(URL + '/follow/unfollow', params, auth)
        .then(response => {
            if (response.data.status == true)
                callback(response.data.object)
        })
        .catch(exp => {
            errorCallback(exp);
        })
}
const FollowApi = {
    requestFanList: (data, callback, errorCallback) => requestFanList(data, callback, errorCallback),
    requestStarList: (data, callback, errorCallback) => requestStarList(data, callback, errorCallback),
    requestFollow: (fan, star, callback, errorCallback) => requestFollow(fan, star, callback, errorCallback),
    requestStatus: (fan, star, callback, errorCallback) => requestStatus(fan, star, callback, errorCallback),
    requestunFollow: (fan, star, callback, errorCallback) => requestunFollow(fan, star, callback, errorCallback),

}

export default FollowApi
