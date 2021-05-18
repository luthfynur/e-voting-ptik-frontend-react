import { GET_VOTE } from './constants'

const initialState = {
  data: [],
  count: '',
  suara1: [],
  suara2: []
}
export default function reducer(state = initialState, action) {
  switch(action.type) {
    case GET_VOTE:
      return { ...state, data: action.data, count: action.count, suara1: action.suara1, suara2: action.suara2 }
    default:
      return state
  }
}