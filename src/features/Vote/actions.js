import {getVote} from '../../api/vote'
// import {deleteUser} from '../../api/users'
import { GET_VOTE } from "./constants";
//import { DELETE_USER } from "./constants";
// (2) action userLogin

export const fetchVote = ({data, count, suara1, suara2}) => {
  return {
    type: GET_VOTE,
    data,
    count,
    suara1,
    suara2
  }
}

// export const removeUser = ({data}) => {
//   return {
//     type: DELETE_USER,
//     data
//   }
// }

export const getVotes = () => {
  return async (dispatch, getState) => {
    try {
      let { data : { data, count, suara1, suara2 }} = await getVote()
      dispatch(fetchVote({data, count, suara1, suara2}))
    } catch(err) {
      return err
    }
  }
}

// export const delUser = (id) => {
//   return async (dispatch, getState) => {
//     try {
//       let { data : { data }} = await deleteUser(id)
//       dispatch(removeUser({data}))
//     } catch(err) {
//       return err
//     }
//   }
// }