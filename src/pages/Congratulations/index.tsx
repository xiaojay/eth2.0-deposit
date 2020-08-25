import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import _shuffle from 'lodash/shuffle';
import { AppBar } from '../../components/AppBar';
import { Heading } from '../../components/Heading';
import { Text } from '../../components/Text';
//import { Link } from '../../components/Link';
import { colors } from '../../styles/styledComponentsTheme';
import { ProgressBar } from './ProgresBar';
import { queryContract } from '../../utils/queryContract';
import { ProgressBarInfo } from './ProgressBarInfo';
import { DepositKeyInterface, StoreState } from '../../store/reducers';
import { WorkflowStep } from '../../store/actions/workflowActions';
import {
  ENABLE_RPC_FEATURES,
  ETH_REQUIREMENT,
  PRICE_PER_VALIDATOR,
} from '../../utils/envVars';
//import { ClientCard } from './ClientCard';
//import PrysmaticBg from '../../static/prysmatic-bg.png';
//import LighthouseBg from '../../static/lighthouse-bg.png';
//import NimbusBg from '../../static/nimbus-bg.png';
//import TekuBg from '../../static/teku-bg.png';
import { routesEnum } from '../../Routes';
import { routeToCorrectWorkflowStep } from '../../utils/RouteToCorrectWorkflowStep';

const RainbowBackground = styled.div`
  background-image: ${p =>
    `radial-gradient(circle at 100% -80%, ${p.theme.rainbowLight})`};
  min-height: 100vh;
`;

const Gutter = styled.div`
  padding: 0 48px;
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  width: 100%;
  max-width: 1024px;
  margin: 30px 0;
`;

const ClientContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 30px;
`;

interface OwnProps {}
interface StateProps {
  depositKeys: DepositKeyInterface[];
  workflow: WorkflowStep;
}
interface DispatchProps {}
interface Client {
  header: string;
  text: string;
  imgUrl: any;
  url: routesEnum;
  linkText: string;
}
type Props = StateProps & DispatchProps & OwnProps;

const _CongratulationsPage = ({
  depositKeys,
  workflow,
}: Props): JSX.Element => {
  const [amountEth, setAmountEth] = useState(0);

  useEffect(() => {
    if (ENABLE_RPC_FEATURES) {
      const getBalance = async () => {
        const ethBalance = await queryContract();
        setAmountEth(ethBalance);
      };
      getBalance();
    }
  });

  const stakingBalancePercent = (() => {
    // @ts-ignore (type check in envVars.ts)
    const percent = (amountEth / ETH_REQUIREMENT) * 100;
    if (percent === 0) return 0;
    if (percent < 1) return 0.25;
    return percent;
  })();
  const amountAddedPercent = (() => {
    const percent =
      // @ts-ignore
      ((depositKeys.length * PRICE_PER_VALIDATOR) / ETH_REQUIREMENT) * 100;
    if (percent === 0) return 0;
    if (percent < 1) return 0.25;
    return percent;
  })();
  const thresholdPercent = 100 - stakingBalancePercent - amountAddedPercent;

  if (workflow < WorkflowStep.CONGRATULATIONS) {
    return routeToCorrectWorkflowStep(workflow);
  }

  return (
    <RainbowBackground>
      <AppBar />
      <Gutter>
        <Content>
          <Heading level={2} size="medium" color="blueDark" margin="none">
            <span role="img" aria-label="congratulations">
              🎉{' '}
            </span>
            祝贺！
          </Heading>
          <Heading
            level={3}
            size="medium"
            color="blueDark"
            margin="none"
            className="mt10"
          >
            感谢你支持ETH2网络！
          </Heading>
          <div>
            {ENABLE_RPC_FEATURES && (
              <>
                <ProgressBar
                  complete={stakingBalancePercent}
                  newlyAdded={amountAddedPercent}
                  incomplete={thresholdPercent}
                />
                <div className="flex space-between mt20">
                  <ProgressBarInfo
                    title="Staking balance:"
                    color={colors.blue.dark}
                    amountEth={amountEth}
                    // @ts-ignore
                    amountValidators={amountEth / PRICE_PER_VALIDATOR}
                  />
                  <ProgressBarInfo
                    title="You added:"
                    color={colors.blue.light}
                    // @ts-ignore
                    amountEth={depositKeys.length * PRICE_PER_VALIDATOR}
                    amountValidators={depositKeys.length}
                  />
                  <ProgressBarInfo
                    title="Launch threshold:"
                    color={colors.blue.lightest}
                    // @ts-ignore
                    amountEth={ETH_REQUIREMENT}
                    // @ts-ignore
                    amountValidators={ETH_REQUIREMENT / PRICE_PER_VALIDATOR}
                  />
                </div>
              </>
            )}
          </div>
          <br/>
          <Text>
            现在你可以把Account.zip文件上传到Goblin矿机，开始验证人之旅了 :)
          </Text>
         
        </Content>
      </Gutter>
    </RainbowBackground>
  );
};

const mapStateToProps = ({
  depositFile,
  workflow,
}: StoreState): StateProps => ({
  depositKeys: depositFile.keys,
  workflow,
});

export const CongratulationsPage = connect<
  StateProps,
  DispatchProps,
  OwnProps,
  StoreState
>(mapStateToProps)(_CongratulationsPage);
