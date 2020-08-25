import React from 'react';
import { Spinning } from 'grommet-controls';
import { Text } from '../../../components/Text';
import { Dot } from '../../../components/Dot';
import { TransactionStatus } from '../../../store/actions/depositFileActions';

interface Props {
  status: TransactionStatus;
}

export const Status = ({ status }: Props) => {
  if (status === TransactionStatus.READY) {
    return (
      <div className="flex">
        <Dot success className="mr5" />
        <Text>准备好了</Text>
      </div>
    );
  }
  if (status === TransactionStatus.PENDING) {
    return (
      <div className="flex">
        <Dot className="mr5" />
        <Text>等待钱包确认</Text>
      </div>
    );
  }
  if (status === TransactionStatus.STARTED) {
    return (
      <div className="flex">
        <Spinning kind="pulse" />
        <Text color="green">交易已经发出</Text>
      </div>
    );
  }
  if (status === TransactionStatus.SUCCEEDED) {
    return (
      <div className="flex">
        <Dot success className="mr5" />
        <Text>交易成功</Text>
      </div>
    );
  }
  if (status === TransactionStatus.FAILED) {
    return (
      <div className="flex">
        <Dot error className="mr5" />
        <Text>交易失败</Text>
      </div>
    );
  }
  if (status === TransactionStatus.REJECTED) {
    return (
      <div className="flex">
        <Dot error className="mr5" />
        <Text>交易被拒绝</Text>
      </div>
    );
  }

  return <Text>有错误发生</Text>;
};
