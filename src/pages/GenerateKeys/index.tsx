import React, { useState } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
//import BigNumber from 'bignumber.js';
import { CheckBox } from 'grommet';
import { WorkflowPageTemplate } from '../../components/WorkflowPage/WorkflowPageTemplate';
import { Paper } from '../../components/Paper';
import { OperatingSystemButtons } from './OperatingSystemButtons';
import { LinuxInstructions } from './LinuxInstructions';
import { MacInstructions } from './MacInstructions';
import { WindowsInstructions } from './WindowsInstructions';
import { routeToCorrectWorkflowStep } from '../../utils/RouteToCorrectWorkflowStep';
import { StoreState } from '../../store/reducers';
import { Button } from '../../components/Button';
import { routesEnum } from '../../Routes';
import { Link } from '../../components/Link';
import { Text } from '../../components/Text';
import { Heading } from '../../components/Heading';
//import { NumberInput } from './NumberInput';
import {
  DispatchWorkflowUpdateType,
  updateWorkflow,
  WorkflowStep,
} from '../../store/actions/workflowActions';
//import { PRICE_PER_VALIDATOR, TICKER_NAME } from '../../utils/envVars';
import instructions1 from '../../static/instructions_1.svg';
import instructions2 from '../../static/instructions_2.svg';

export enum operatingSystem {
  'MAC',
  'LINUX',
  'WINDOWS',
}

const Highlight = styled.span`
  color: ${p => p.theme.blue.medium};
  margin-left: 5px;
`;

const InstructionImgContainer = styled.div`
  height: 250px;
  margin: 20px;
  border: 1px solid ${(p: any) => p.theme.gray.medium};
  border-radius: 4px;
  display: flex;
  justify-content: center;
`;

// Prop definitions
interface OwnProps {}
interface StateProps {
  workflow: WorkflowStep;
}
interface DispatchProps {
  dispatchWorkflowUpdate: DispatchWorkflowUpdateType;
}
type Props = StateProps & DispatchProps & OwnProps;

const _GenerateKeysPage = ({
  dispatchWorkflowUpdate,
  workflow,
}: Props): JSX.Element => {
  const [validatorCount, setValidatorCount] = useState<number | string>(0);
  const [
    mnemonicAcknowledgementChecked,
    setMnemonicAcknowledgementChecked,
  ] = useState<boolean>(workflow > WorkflowStep.GENERATE_KEY_PAIRS);
  const [chosenOs, setChosenOs] = useState<operatingSystem>(
    operatingSystem.LINUX
  );

  const onCheckboxClick = (e: any) => {
    setMnemonicAcknowledgementChecked(e.target.checked);
  };

  const handleSubmit = () => {
    if (workflow === WorkflowStep.GENERATE_KEY_PAIRS) {
      dispatchWorkflowUpdate(WorkflowStep.UPLOAD_VALIDATOR_FILE);
    }
  };

  const renderOSInstructions = (): React.ReactNode => {
    switch (chosenOs) {
      case operatingSystem.WINDOWS:
        return <WindowsInstructions validatorCount={validatorCount} />;
      case operatingSystem.MAC:
        return <MacInstructions validatorCount={validatorCount} />;
      case operatingSystem.LINUX:
        return <LinuxInstructions validatorCount={validatorCount} />;
      default:
        return null;
    }
  };

  if (workflow < WorkflowStep.GENERATE_KEY_PAIRS) {
    return routeToCorrectWorkflowStep(workflow);
  }

  return (
    <WorkflowPageTemplate title="Generate Key Pairs">
      
      <Paper className="mt20">
        <Heading level={2} size="small" color="blueMedium">
          你目前用什么操作系统？
        </Heading>
        <Text className="mt20">
          选择你的操作系统，学习相应的教程。
        </Text>
        <OperatingSystemButtons chosenOs={chosenOs} setChosenOs={setChosenOs} />
      </Paper>

      {renderOSInstructions()}

      <Paper className="mt20">
        <Heading level={2} size="small" color="blueMedium">
          保存你的密钥文件
        </Heading>
        <Text className="mt20">
          你现在应该把助记词写下来并保存到安全地方。
          同时备份好 刚才生成的验证人账号文件夹 <Highlight>validator_keys</Highlight>。
        </Text>
        <InstructionImgContainer>
          <img src={instructions1} alt="" />
        </InstructionImgContainer>
        <Text>
          刚才生成的 <Highlight>deposit_data.json</Highlight> 包含你验证人账号的公钥；
          在下一步中会用到。
        </Text>
        <InstructionImgContainer>
          <img src={instructions2} alt="" />
        </InstructionImgContainer>
      </Paper>
      <Paper className="mt20">
        <CheckBox
          onChange={onCheckboxClick}
          checked={mnemonicAcknowledgementChecked}
          label={
            <Text>
              我已经保存好助记词和验证人账号文件夹validator_keys。
            </Text>
          }
        />
      </Paper>

      <div className="flex center p30">
        <Link to={routesEnum.acknowledgementPage}>
          <Button className="mr10" width={100} label="返回" />
        </Link>
        <Link to={routesEnum.uploadValidatorPage} onClick={handleSubmit}>
          <Button
            width={300}
            rainbow
            disabled={!mnemonicAcknowledgementChecked}
            label="继续"
          />
        </Link>
      </div>
    </WorkflowPageTemplate>
  );
};

const mapStateToProps = ({ workflow }: StoreState): StateProps => ({
  workflow,
});
const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  dispatchWorkflowUpdate: (workflowStep: WorkflowStep) => {
    dispatch(updateWorkflow(workflowStep));
  },
});

export const GenerateKeysPage = connect<
  StateProps,
  DispatchProps,
  OwnProps,
  StoreState
>(
  mapStateToProps,
  mapDispatchToProps
)(_GenerateKeysPage);
