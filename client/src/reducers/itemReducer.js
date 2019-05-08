import { ADD_ITEM, DELETE_ITEM, GET_ITEMS, ITEMS_LOADING } from '../actions/types';

const initialState = {
  items: [],
  loading: false
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch(type) {
    case GET_ITEMS:
      return {
        ...state,
        items: payload,
        loading: false
      };
    case ADD_ITEM:
      return {
        ...state,
        items: [payload, ...state.items]
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item._id !== payload)
      };
    case ITEMS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};