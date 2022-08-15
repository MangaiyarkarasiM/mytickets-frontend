import axios from "axios";

const fetchApi = axios.create({
  baseURL: 'https://mytickets-backend.herokuapp.com/',
  // baseURL:'http://localhost:8000',
})

export default fetchApi;