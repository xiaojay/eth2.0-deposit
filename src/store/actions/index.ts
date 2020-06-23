import { UpdateAcknowledgementStateAction } from './acknowledgementActions';
import {
  UpdateDepositFileNameAction,
  UpdateDepositFileKeysAction,
  UpdateTransactionStatusAction,
} from './depositFileActions';
import { UpdateWorkflowAction } from './workflowActions';
import { UpdateNetworkAction } from './networkActions';

export enum ActionTypes {
  updateAcknowledgementState,
  updateDepositFileKeys,
  updateDepositFileName,
  updateTransactionStatus,
  updateWorkflow,
  updateNetwork,
}

export type Action =
  | UpdateAcknowledgementStateAction
  | UpdateDepositFileKeysAction
  | UpdateTransactionStatusAction
  | UpdateWorkflowAction
  | UpdateDepositFileNameAction
  | UpdateNetworkAction;
