import axios from 'axios';
import { config } from '../config';

export async function registerUser(data){
  return await axios.post(`${config.api_host}/auth/register`, data);
}

export async function login(nim, password){
  return await axios.post(`${config.api_host}/auth/login`, {nim, password});
}

export async function loginAdmin(username, password){
  return await axios.post(`${config.api_host}/auth/login-admin`, {username, password});
}


export async function logout(){
  let { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};
  return await axios.post(`${config.api_host}/auth/logout`, null, {
    headers: {
      authorization : `Bearer ${token}`
    }
  }).then((response) => {
    localStorage.removeItem('auth');
    return response;
  });
}