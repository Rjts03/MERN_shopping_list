import axios from 'axios';
import { ADD_ITEM, DELETE_ITEM, GET_ITEMS, ITEMS_LOADING } from './types';

export const getItems = () => dispatch => {
  dispatch(setItemsLoading());
  axios
    .get('/api/items')
    .then(res => {
      dispatch({
        type: GET_ITEMS,
        payload: res.data
      });
    })
    .catch(e => console.log('GetERR', e));
};

export const addItem = item => dispatch => {
  axios
    .post('/api/items', item)
    .then(res => {
      dispatch({
        type: ADD_ITEM,
        payload: res.data
      });
    })
    .catch(e => console.log('AddERR', e));
};

export const deleteItem = id => dispatch => {
  axios
    .delete(`/api/items/${id}`)
    .then(res => {
      dispatch({
        type: DELETE_ITEM,
        payload: id
      });
    })
    .catch(e => console.log('DelERR', e));
  return {
    type: DELETE_ITEM,
    payload: id
  };
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};