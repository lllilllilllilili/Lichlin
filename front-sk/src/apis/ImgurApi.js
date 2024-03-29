import Axios from "axios"

const CLIENT_ID = 'imgur-id';
const ROOT_URL = 'https://api.imgur.com'


// Axios.defaults.headers.post['Authorization'] = CLIENT_ID

const uploadProfile = (data, callback, errorCallback) => {
    

    const fd = new FormData();
    fd.append('image', data);

    // 1) Imgur에 파일을 업로드
    Axios.post('https://api.imgur.com/3/image', fd, {
            headers: {
                Authorization: 'Client-ID 489cf71f2491ea6'
            }
        })
        .then(response => {
            callback(response.data);
  
        })
        .catch(exp => {
                errorCallback(exp);
            }

        )
}

const ImgurApi = {
    uploadProfile: (data, callback, errorCallback) => uploadProfile(data, callback, errorCallback)
}

export default ImgurApi
