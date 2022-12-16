import axios from "axios";

const fetchApi = axios.create({
  baseURL: 'https://mytickets.vercel.app',
  //baseURL:'http://localhost:8000',
})

export default fetchApi;