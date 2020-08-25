import React, { useEffect, useState } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import BigNumber from 'bignumber.js';
import styled from 'styled-components';
import { Box, CheckBox } from 'grommet';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { DepositKeyInterface, StoreState } from '../../store/reducers';
import { web3ReactInterface } from '../ConnectWallet';
import { NetworkChainId } from '../ConnectWallet/web3Utils';
import { WorkflowPageTemplate } from '../../components/WorkflowPage/WorkflowPageTemplate';
import { Button } from '../../components/Button';
import { WalletDisconnected } from '../ConnectWallet/WalletDisconnected';
import { WrongNetwork } from '../ConnectWallet/WrongNetwork';
import { Link } from '../../components/Link';
import { routesEnum } from '../../Routes';
import { routeToCorrectWorkflowStep } from '../../utils/RouteToCorrectWorkflowStep';
import { AcknowledgementSection } from './AcknowledgementSection';
import { Text } from '../../components/Text';
import { Paper } from '../../components/Paper';
import { Heading } from '../../components/Heading';
import { InfoBox } from '../../components/InfoBox';
import {
  DispatchWorkflowUpdateType,
  WorkflowStep,
  updateWorkflow,
} from '../../store/actions/workflowActions';
import {
  IS_MAINNET,
  PRICE_PER_VALIDATOR,
  TICKER_NAME,
} from '../../utils/envVars';

const Container = styled.div`
  width: 100%;
`;
const NETWORK_ID = IS_MAINNET
  ? NetworkChainId.Mainnet
  : NetworkChainId['Göerli'];

// Prop definitions
interface OwnProps {}
interface StateProps {
  depositKeys: DepositKeyInterface[];
  workflow: WorkflowStep;
}

interface DispatchProps {
  dispatchWorkflowUpdate: DispatchWorkflowUpdateType;
}
type Props = StateProps & DispatchProps & OwnProps;

const _SummaryPage = ({
  workflow,
  dispatchWorkflowUpdate,
  depositKeys,
}: Props): JSX.Element => {
  const [allChecked, setAllChecked] = useState(false);
  const [losePhrase, setLosePhrase] = useState(false);
  const [earlyAdopt, setEarlyAdopt] = useState(false);
  const [nonReverse, setNonReverse] = useState(false);
  const [noPhish, setNoPhish] = useState(false);
  const amountValidators = new BigNumber(depositKeys.length);
  const convertedPrice = new BigNumber(PRICE_PER_VALIDATOR);

  useEffect(() => {
    setAllChecked(losePhrase && earlyAdopt && nonReverse && noPhish);
  }, [losePhrase, earlyAdopt, nonReverse, noPhish]);

  const { account, chainId, connector }: web3ReactInterface = useWeb3React<
    Web3Provider
  >();

  const handleSubmit = () => {
    if (workflow === WorkflowStep.SUMMARY) {
      dispatchWorkflowUpdate(WorkflowStep.TRANSACTION_SIGNING);
    }
  };

  if (workflow < WorkflowStep.SUMMARY)
    return routeToCorrectWorkflowStep(workflow);

  if (!account || !connector) return <WalletDisconnected />;
  if (chainId !== NETWORK_ID) return <WrongNetwork />;

  return (
    <WorkflowPageTemplate title="总结">
      <Paper>
        <Heading level={3} size="small" color="blueDark">
          启动面板总结
        </Heading>
        <Box className="flex flex-row space-between mt10">
          <Container>
            <Text>验证人个数</Text>
            <InfoBox>{amountValidators.toString()}</InfoBox>
          </Container>
          <Container className="mx20">
            <Text>抵押金额总计</Text>
            <InfoBox>
              {amountValidators.times(convertedPrice).toString()}
              {TICKER_NAME}
            </InfoBox>
          </Container>
        </Box>
      </Paper>
      <AcknowledgementSection title="继续前请注意">
        <CheckBox
          onChange={e => setLosePhrase(e.target.checked)}
          checked={losePhrase}
          label={
            <Text>
              我了解如果我丢失了助记词，我将无法取回抵押的资金
            </Text>
          }
        />
        <span className="mt20">
          <CheckBox
            onChange={e => setEarlyAdopt(e.target.checked)}
            checked={earlyAdopt}
            label={
              <Text> 我了解早期使用者风险</Text>
            }
          />
        </span>
        <span className="mt20">
          <CheckBox
            onChange={e => setNonReverse(e.target.checked)}
            checked={nonReverse}
            label={
              <Text> 我了解目前抵押存款是单向的</Text>
            }
          />
        </span>
      </AcknowledgementSection>
      <AcknowledgementSection title="请确保发送抵押存款到正确地址">
        <Text>
          你对这个抵押存款交易负责。
          有些欺诈网站也许会欺骗你把{PRICE_PER_VALIDATOR} {TICKER_NAME}发送给他们，而不是发送到正确的抵押存款合约地址。
          发送前请确认正确的抵押存款合约地址。
        </Text>
        <Link to={routesEnum.phishingPage} className="my10" primary withArrow>
          学习相关内容
        </Link>
        <span className="mt20">
          <CheckBox
            onChange={e => setNoPhish(e.target.checked)}
            checked={noPhish}
            label={
              <Text>
                我知道怎么检查正确的抵押存款合约地址并且会发送到正确地址。
              </Text>
            }
          />
        </span>
      </AcknowledgementSection>
      <div className="flex center p30">
        <Link to={routesEnum.connectWalletPage}>
          <Button className="mr10" width={100} label="返回" />
        </Link>
        <Link to={routesEnum.transactionsPage} onClick={handleSubmit}>
          <Button width={300} rainbow disabled={!allChecked} label="继续" />
        </Link>
      </div>
    </WorkflowPageTemplate>
  );
};

const mapStateToProps = ({
  depositFile,
  workflow,
}: StoreState): StateProps => ({
  depositKeys: depositFile.keys,
  workflow,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  dispatchWorkflowUpdate: (step: WorkflowStep) => {
    dispatch(updateWorkflow(step));
  },
});

export const SummaryPage = connect<
  StateProps,
  DispatchProps,
  OwnProps,
  StoreState
>(
  mapStateToProps,
  mapDispatchToProps
)(_SummaryPage);
