import { GIFT_RECEIVED_FETCH, GIFT_SENT_FETCH, GIFT_SEND } from '../actions/gift';

const initialState = {
  received: [],
  sent: [],
};

export default function gift(state = initialState, action = {}) {
  switch (action.type) {
    case GIFT_RECEIVED_FETCH:
      return {
        ...state,
        received: action.received,
      };
    case GIFT_SENT_FETCH:
      return {
        ...state,
        sent: action.sent,
      };
    case GIFT_SEND:
    default:
      return state;
  }
}