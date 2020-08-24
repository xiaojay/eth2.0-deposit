import React from 'react';
import { AcknowledgementIdsEnum } from '../../store/reducers';
import { Link } from '../../components/Link';
import { Text } from '../../components/Text';
import { PRICE_PER_VALIDATOR, TICKER_NAME } from '../../utils/envVars';

export interface PageContentInterface {
  title: string;
  content: JSX.Element;
  acknowledgementText?: string;
}

export const pageContent = {
  [AcknowledgementIdsEnum.introSection]: {
    title: 'ETH2.0 阶段0 介绍 ',
    content: (
      <>
        <Text size="large" className="my10">
          以太坊2.0 用权益证明(POS)来保障网络安全。
        </Text>
        <Text size="large" className="my10">
          所以，我们需要活跃的参与者(即“验证人”)来提出/验证/投票正确的区块。
          作为回报，诚实的验证人将会得到经济激励。
        </Text>
        <Text size="large" className="my10">
          此外，验证人需要抵押 {TICKER_NAME}-也就是说，需要抵押一些资金。
        </Text>
        <Link
          external
          to="https://docs.ethhub.io/ethereum-roadmap/ethereum-2.0/proof-of-stake/"
          className="my10"
          primary
          withArrow
        >
          学习更多
        </Link>
      </>
    ),
  },
  [AcknowledgementIdsEnum.signup]: {
    title: '验证人注册',
    content: (
      <Text size="large" className="my10">
        要成为一个ETH2验证者，你需要存入{PRICE_PER_VALIDATOR} {` `}
        {TICKER_NAME}。
        抵押存款过程不可逆（即你在ETH1存入的以太坊，只能在ETH2用，无法回到ETH1链上）。
      </Text>
    ),
    acknowledgementText: `我理解 我需要存入${PRICE_PER_VALIDATOR} ${TICKER_NAME} 来成为一个验证者，并且存入 ${TICKER_NAME} 到ETH2是单向/不可逆的。`,
  },
  [AcknowledgementIdsEnum.responsibilities]: {
    title: '责任',
    content: (
      <>
        <Text size="large" className="my10">
          只有那些活跃参与共识形成的验证人，才能获得经济激励。
          那些离线的验证人会受到惩罚。
          一次离线错过验证的罚款数额等同于你参与一次验证获得奖励数额。
        </Text>
        <Link
          external
          to="https://docs.google.com/spreadsheets/d/15tmPOvOgi3wKxJw7KQJKoUe-uonbYR6HF7u83LR5Mj4/edit#gid=842896204"
          className="my10"
          primary
          withArrow
        >
          学习更多关于ETH2经济学的知识
        </Link>
      </>
    ),
    acknowledgementText: '我理解 保持我的验证人程序一直在线联网非常重要。',
  },
  [AcknowledgementIdsEnum.slashing]: {
    title: '作恶惩罚风险',
    content: (
      <>
        <Text size="large" className="my10">
          验证人如果作恶，或者违反规定，会被处以较大金额的罚款。
        </Text>
        <Link to="/faq" className="my10" primary withArrow>
          学习更多罚款的知识
        </Link>
      </>
    ),
    acknowledgementText:
      '我理解 验证人如果作恶，或者违反规定，会被以较大金额罚款。',
  },
  [AcknowledgementIdsEnum.keyManagement]: {
    title: '备份助记词',
    content: (
      <Text size="large" className="my10">
        验证人账号从一个助记词推导出来。
        并且你的助记词是你取回抵押资金的唯一方法。 请安全保存它。
      </Text>
    ),
    acknowledgementText: '我理解 我的助记词是取回我的抵押资金的唯一方法。',
  },
  [AcknowledgementIdsEnum.signingKeys]: {
    title: '签名密钥',
    content: (
      <Text size="large" className="my10">
        本启动面板将会帮助你创建验证人的签名密钥。
        这些密钥以keystore的方式存储，并且需要你上传到验证人软件/矿机。
      </Text>
    ),
    acknowledgementText: '我会安全保存这些密钥，并把它上传到验证人软件/矿机。',
  },
  [AcknowledgementIdsEnum.transferDelay]: {
    title: '转账延后',
    content: (
      <>
        <Text size="large" className="my10">
          阶段0无法转账， 验证人之间转账需要等到阶段1，
          直到阶段2才能提取抵押资金到eth2.0的某个分片(大概需要2年时间)。
        </Text>
        <Link
          external
          // TODO: NEED LINK HERE
          to="https://docs.ethhub.io/ethereum-roadmap/ethereum-2.0/eth-2.0-phases/"
          className="my10"
          primary
          withArrow
        >
          学习更多关于ETH2分阶段的知识
        </Link>
      </>
    ),
    acknowledgementText: `我了解道ETH2.0阶段1才能转账，到阶段2.0才能提现。`,
  },
  [AcknowledgementIdsEnum.commitment]: {
    title: '长期付出',
    content: (
      <Text size="large" className="my10">
        因为在阶段0验证人无法转账，如果你现在成为了验证人，至少在阶段1(1-2年)才能退出。
        这是个长期付出过程。
      </Text>
    ),
    acknowledgementText: '我了解这这是个长期付出过程（1-2年）。',
  },
  [AcknowledgementIdsEnum.earlyAdoptionRisks]: {
    title: '早期使用者风险',
    content: (
      <Text size="large" className="my10">
        目前验证人参与的是一个全新网络的启动过程。
        就像所有新开发出来的软件，有可能存在潜在的bug。
        虽然概率很小，但是出现bug导致抵押资金损失的可能性是存在的。
      </Text>
    ),
    acknowledgementText:
      '我是早期使用者，我了解ETH2.0如果出现bug，有可能导致资金损失。',
  },
  [AcknowledgementIdsEnum.confirmation]: {
    title: '确定',
    content: (
      <>
        <Text size="large" className="my10">
          为了成为验证人，需要生成ETH2.0密钥对。
          在接下来的步骤中，你需要在电脑上安装生成ETH2.0密钥对的软件。
        </Text>
      </>
    ),
    acknowledgementText:
      '我了解上面所说的知识和提示的风险，准备成为ETH2.0的验证人。',
  },
};
