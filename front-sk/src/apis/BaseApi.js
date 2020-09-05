import axios from "axios";

export default axios.create({
    baseURL:
     "http://54.180.160.87:8080",// aws

    withCredentials: false,
    headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem("userToken"),
        Accept: "application/json",
        "Content-Type": "application/json"
    }
});
