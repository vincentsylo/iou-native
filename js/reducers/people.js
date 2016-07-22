import { PEOPLE_FETCH } from '../actions/people';

const initialState = {
  friends: null,
};

export default function people(state = initialState, action = {}) {
  switch (action.type) {
    case PEOPLE_FETCH:
      return {
        ...state,
        friends: action.friends,
      };
    default:
      return state;
  }
}