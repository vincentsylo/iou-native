import { PEOPLE_FRIENDS_FETCH, PEOPLE_SEARCH } from '../actions/people';

const initialState = {
  friends: null,
  person: null,
};

export default function people(state = initialState, action = {}) {
  switch (action.type) {
    case PEOPLE_FRIENDS_FETCH:
      return {
        ...state,
        friends: action.friends,
      };
    case PEOPLE_SEARCH:
      return {
        ...state,
        person: action.person,
      };
    default:
      return state;
  }
}