import { GET_USER } from './constants'

const initialState = {
  data: [],
  count: ''
}
export default function reducer(state = initialState, action) {
  switch(action.type) {
    case GET_USER:
      return { ...state, data: action.data, count: action.count }
    default:
      return state
  }
}