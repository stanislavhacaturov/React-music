import axios from 'axios';

export const addList = (id, text) => ({
  type: 'ADD_LIST',
  id,
  text
});

export const addMyList = (id, text)=> ({
  type: 'ADD_MY_LIST',
  id,
  text
});

export const reload = () => ({
  type: 'RELOAD',
})

export const user = (id, name, lastname, email, password) => ({
  type: 'USER',
  id,
  name,
  lastname,
  email,
  password
})

export const removeSong = id => {
  axios.post(`http://localhost:3001/musicList/deleteSong/` + id,
    { id }
  ).catch(err => console.log('err', err))
  return ({
    type: 'REMOVE_SONG',
    id
  })
};
