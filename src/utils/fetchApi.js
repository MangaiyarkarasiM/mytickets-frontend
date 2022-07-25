import axios from "axios";

const fetchApi = axios.create({
  //baseURL: 'https://bookyourshow-backend.herokuapp.com',
  baseURL:'http://localhost:8000',
})

export default fetchApi;