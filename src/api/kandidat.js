import axios from 'axios';
import { config } from '../config';

export async function getKandidat(){
  return await axios.get(`${config.api_host}/api/kandidat`);
}

export async function deleteKandidat(id){
  return await axios.delete(`${config.api_host}/api/kandidat/${id}`)
}

export async function addKandidat(data){
  console.log('sampe api')
  return await axios.post(`${config.api_host}/api/kandidat`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// export async function deleteUser(id){
//   return await axios.delete(`${config.api_host}/api/users/${id}`)
// }