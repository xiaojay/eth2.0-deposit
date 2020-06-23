import { ActionTypes } from './index';

export interface UpdateNetworkAction {
  type: ActionTypes.updateNetwork;
  payload: {};
}

export const updateNetwork = (): UpdateNetworkAction => {
  return {
    type: ActionTypes.updateNetwork,
    payload: {},
  };
};

export type DispatchUpdateNetwork = () => void;
