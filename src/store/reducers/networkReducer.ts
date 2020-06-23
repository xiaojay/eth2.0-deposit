import { Action, ActionTypes } from '../actions';

export interface NetworkInterface {}

const initialState: NetworkInterface = {};

export const networkReducer = (
  state: NetworkInterface = initialState,
  action: Action
) => {
  if (action.type === ActionTypes.updateNetwork) {
    return action.payload;
  }
  return state;
};
