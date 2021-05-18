import axios from 'axios';
import { config } from '../config';

export async function getUsers(){
  return await axios.get(`${config.api_host}/api/users`);
}

export async function deleteUser(id){
  return await axios.delete(`${config.api_host}/api/users/${id}`)
}

export async function updatePassword(id, data) {
  return await axios.put(`${config.api_host}/api/users/${id}`, data)
}