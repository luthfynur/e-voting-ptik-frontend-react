import axios from 'axios';
import { config } from '../config';

export async function getVote(){
  return await axios.get(`${config.api_host}/api/vote`);
}

export async function addVote(id, data){
  return await axios.put(`${config.api_host}/api/vote/${id}`, data);
}

export async function addVoting(data){
  return await axios.post(`${config.api_host}/api/vote`, data);
}

export async function deleteVoting(id){
  return await axios.delete(`${config.api_host}/api/vote/${id}`)
}