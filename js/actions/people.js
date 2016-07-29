import api from '../utils/api';

export const PEOPLE_FRIENDS_FETCH = 'PEOPLE_FRIENDS_FETCH';
export const PEOPLE_SEARCH = 'PEOPLE_SEARCH';

export function peopleFriendsFetch() {
  return (dispatch, getState) => {
    api(getState().user).get('/user/fb/friends')
      .then((json) => {
        dispatch(peopleFriendsFetched(json.data));
      });
  }
}

function peopleFriendsFetched(friends) {
  return {
    type: PEOPLE_FRIENDS_FETCH,
    friends,
  };
}

export function peopleSearch(fbId) {
  return (dispatch, getState) => {
    api(getState().user).get(`/user/fb/${fbId}`)
      .then((json) => {
        dispatch(peopleSearched(json.data));
      });
  }
}

function peopleSearched(person) {
  return {
    type: PEOPLE_SEARCH,
    person,
  };
}