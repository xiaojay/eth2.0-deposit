import React from 'react';
import styled from 'styled-components';
import { Heading } from '../../components/Heading';
import { Text } from '../../components/Text';
import { Link } from '../../components/Link';
import { Alert } from '../../components/Alert';
//import { CHAIN_NAME, IS_MAINNET } from '../../utils/envVars';
import { Paper } from '../../components/Paper';
//import { colors } from '../../styles/styledComponentsTheme';
import goblinWalletPic from '../../static/goblin_wallet.png';

const ImgContainer = styled.img`
  width: 600px;
`;

export const Option1 = ({
  validatorCount,
  os,
}: {
  validatorCount: number | string;
  os: string;
}) => {
  return (
    <Paper className="mt20">
      <Heading level={2} size="small" color="blueMedium" className="mb20">
        ETH2.0账号生成工具
      </Heading>
      <Text weight={500}>下载开源的ETH2.0账号生成工具Goblin-Wallet</Text>
      <Text>
        Goblin-Wallet是基于ETH官方的 
        <Link
          primary
          external
          to="https://github.com/ethereum/eth2.0-deposit-cli"
          inline
        >
        eth2.0-deposit-cli
        </Link>{' '}开发的、开源的图形化ETH2.0账号生成工具。
      </Text>

      <Text>
        下载
        {(os === 'mac') && (
         <Link
          primary
          external
          to="https://mac"
          inline
        >
          Goblin-Wallet
        </Link>
       )}
       {(os === 'linux') && (
         <Link
          primary
          external
          to="https://linux"
          inline
        >
          Goblin-Wallet
        </Link>
       )}
      {os === 'windows' && (
        <Link
        primary
        external
        to="https://windows"
        inline
        >
          Goblin-Wallet
        </Link>
      )}
      {' '}安装并生成ETH2.0账号。
      </Text>
      <Alert variant="warning" className="my20">
        <Text weight={500} color="yellowDarkest" className="my10">
          保存好助记词和验证人账号文件夹validator_keys
        </Text>
      </Alert>
      <ImgContainer src={goblinWalletPic} alt="" />
      
    </Paper>
  );
};
