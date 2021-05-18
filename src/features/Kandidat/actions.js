import { getKandidat } from '../../api/kandidat'
import { GET_KANDIDAT } from "./constants";
// (2) action userLogin

export const fetchKandidat = ({data, count}) => {
  return {
    type: GET_KANDIDAT,
    data,
    count
  }
}

export const getCandidate = () => {
  return async (dispatch, getState) => {
    try {
      let { data : { data, count }} = await getKandidat()
      dispatch(fetchKandidat({data, count}))
    } catch(err) {
      return err
    }
  }
}
