import api from '../utils/api';

export const PEOPLE_FETCH = 'PEOPLE_FETCH';

export function peopleFetch() {
  return (dispatch, getState) => {
    api(getState().user).get('/user/fb/friends')
      .then((json) => {
        dispatch(peopleFetched(json.data));
      });
  }
}

function peopleFetched(friends) {
  return {
    type: PEOPLE_FETCH,
    friends,
  };
}