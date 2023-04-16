import axios from 'axios';
let token = localStorage.getItem('token');
const TodoClientAPI = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    'x-auth-token': token,
  },
});

export const sendGetRequest = async () => {
  try {
    const response = await TodoClientAPI.get('api/todos/');
    return response.data;
    //console.log(response.data);
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
};
