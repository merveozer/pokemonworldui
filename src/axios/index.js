import axios from "axios";


// //baseUrl should include that "/" after "/api"

export default axios.create({
    baseURL: 'http://localhost:8081/',
})
axios.defaults.baseURL = 'http://localhost:8081/';
axios.defaults.headers.common['Authorization'] = localStorage.getItem("accessToken");

