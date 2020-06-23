import { combineReducers } from 'redux';
import {
  acknowledgementReducer,
  AcknowledgementStateInterface,
} from './acknowledgementReducer';
import { DepositFileInterface, depositFileReducer } from './depositFileReducer';
import { workflowReducer } from './workflowReducer';
import { WorkflowStep } from '../actions/workflowActions';
import { NetworkInterface, networkReducer } from './networkReducer';

export * from './acknowledgementReducer';
export * from './depositFileReducer';
export * from './workflowReducer';
export * from './networkReducer';

export interface StoreState {
  acknowledgementState: AcknowledgementStateInterface;
  depositFile: DepositFileInterface;
  workflow: WorkflowStep;
  network: NetworkInterface;
}

export const reducers = combineReducers<StoreState>({
  acknowledgementState: acknowledgementReducer,
  depositFile: depositFileReducer,
  workflow: workflowReducer,
  network: networkReducer,
});
