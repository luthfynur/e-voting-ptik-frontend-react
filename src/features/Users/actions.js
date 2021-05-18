import {getUsers} from '../../api/users'
import {deleteUser} from '../../api/users'
import { GET_USER } from "./constants";
import { DELETE_USER } from "./constants";
// (2) action userLogin

export const fetchUsers = ({data, count}) => {
  return {
    type: GET_USER,
    data,
    count
  }
}

export const getUser = () => {
  return async (dispatch, getState) => {
    try {
      let { data : { data, count }} = await getUsers()
      dispatch(fetchUsers({data, count}))
    } catch(err) {
      return err
    }
  }
}
