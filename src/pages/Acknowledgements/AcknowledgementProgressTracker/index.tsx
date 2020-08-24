import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import _map from 'lodash/map';
import {
  AcknowledgementIdsEnum,
  AcknowledgementStateInterface,
  StoreState,
} from '../../../store/reducers';
import { AcknowledgementProgressStep } from './AcknowledgementProgressStep';

const Container = styled.div`
  min-width: 250px;
  margin-right: 40px;
  @media only screen and (max-width: 940px) {
    display: none;
  }
`;

const acknowledgementsWithCopy = {
  [AcknowledgementIdsEnum.introSection]: '概览',
  [AcknowledgementIdsEnum.signup]: '注册',
  [AcknowledgementIdsEnum.responsibilities]: '责任',
  [AcknowledgementIdsEnum.slashing]: '惩罚',
  [AcknowledgementIdsEnum.keyManagement]: '密钥管理',
  [AcknowledgementIdsEnum.signingKeys]: '签名密钥',
  [AcknowledgementIdsEnum.transferDelay]: '延后转账',
  [AcknowledgementIdsEnum.commitment]: '付出',
  [AcknowledgementIdsEnum.earlyAdoptionRisks]: '早期使用者风险',
  [AcknowledgementIdsEnum.confirmation]: '确认',
};

export interface AcknowledgementProgressTrackerProps {
  acknowledgementState: AcknowledgementStateInterface;
  activeAcknowledgementId: AcknowledgementIdsEnum;
  setActiveAcknowledgementId: (id: AcknowledgementIdsEnum) => void;
}

export const _AcknowledgementProgressTracker = ({
  acknowledgementState,
  activeAcknowledgementId,
  setActiveAcknowledgementId,
}: AcknowledgementProgressTrackerProps): JSX.Element => {
  return (
    <Container>
      {_map(
        acknowledgementsWithCopy,
        (_, acknowledgementId: AcknowledgementIdsEnum) => {
          return (
            <AcknowledgementProgressStep
              key={acknowledgementId}
              acknowledgementsWithCopy={acknowledgementsWithCopy}
              acknowledgementId={acknowledgementId}
              setActiveAcknowledgementId={setActiveAcknowledgementId}
              /* eslint-disable-next-line eqeqeq */
              isActive={activeAcknowledgementId == acknowledgementId}
              acknowledgementState={acknowledgementState}
            />
          );
        }
      )}
    </Container>
  );
};

const mapStateToProps = ({ acknowledgementState }: StoreState) => ({
  acknowledgementState,
});

export const AcknowledgementProgressTracker = connect(mapStateToProps)(
  _AcknowledgementProgressTracker
);
