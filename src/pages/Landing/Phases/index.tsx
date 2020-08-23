import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import styled from 'styled-components';
import { Text } from '../../../components/Text';
import { Heading } from '../../../components/Heading';
import { PhaseCard } from './PhaseCard';

const Container = styled.div`
  background-color: ${p => p.theme.purple.light};
  padding: ${(p: { isMobile: boolean }) => (p.isMobile ? '20px 0' : '150px 0')};
`;
const SubContainer = styled.div`
  max-width: ${p => p.theme.screenSizes.largest};
  width: 100%;
  margin: 0 auto;
  padding: 0 120px;
  @media only screen and (max-width: ${p => p.theme.screenSizes.largest}) {
    padding: ${(p: { isMobile: boolean }) =>
      p.isMobile ? '0 20px' : '0 60px'};
  }
`;
const PhasesContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;
const ResponsiveContainer = styled.div`
  display: flex;
  justify-content: space-between;
  @media only screen and (max-width: ${p => p.theme.screenSizes.larger}) {
    flex-direction: column;
  }
`;
const StyledHeading = styled(Heading)`
  width: ${(p: { isMobile: boolean }) =>
    p.isMobile ? '220px' : undefined}; // force word break
`;
const PhaseTitle = styled(Text)`
  display: inline;
  font-weight: bold;
`;

interface phase {
  title: string;
  subTitle: string;
  linkUrl: string;
  link: string;
  external: boolean;
}

const phases: phase[] = [
  {
    title: '时间',
    subTitle: '启动/部署ETH2每个阶段的时间取决于多个因素。',
    linkUrl:
      'https://docs.ethhub.io/ethereum-roadmap/ethereum-2.0/eth-2.0-phases/',
    link: '阶段 0, 1, 2 and 3 时间表',
    external: true,
  },
  {
    title: '抵押存款合约已验证',
    subTitle:
      '为了保障验证人的资金安全，抵押存款合约在字节层面通过了形式化验证。',
    linkUrl:
      'https://github.com/runtimeverification/deposit-contract-verification/blob/96434de/deposit-contract-verification.pdf',
    link: '查看验证报告',
    external: true,
  },
  {
    title: '验证人常见问题',
    subTitle: '查看关于验证人角色/责任等的常见问题',
    linkUrl: '/faq',
    link: '学习更多关于验证人的知识',
    external: false,
  },
];

export const Phases = (): JSX.Element => {
  const m: boolean = (window as any).mobileCheck();
  return (
    <Container isMobile={m}>
      <SubContainer isMobile={m}>
        <ResponsiveContainer>
          <div className="px20">
            <ScrollAnimation animateIn="fadeIn" animateOnce>
              <StyledHeading margin="none" className="mt20" isMobile={m}>
                什么是 ETH2.0 阶段0 ？
              </StyledHeading>
            </ScrollAnimation>
            <ScrollAnimation animateIn="fadeInUp" animateOnce>
              <Text className="mt20">
                从工作量证明到权益证明，ETH2会经过至少3个阶段。
              </Text>
              <Text className="mt20">
                <PhaseTitle>阶段 0 </PhaseTitle>
                包含所有形成ETH2共识背后的机制；记录验证人的行为和抵押资金。
              </Text>
              <Text className="mt20">
                <PhaseTitle>阶段 1 </PhaseTitle>
                处理增加/存储和ETH2有关的数据。
              </Text>
              <Text className="mt20">
                <PhaseTitle>阶段 2 </PhaseTitle>
                Phase 2 adds execution to eth2 which enables programmes to be
                run on top of it. 增加执行层，使得能在上面运行程序（智能合约）。
              </Text>
            </ScrollAnimation>
          </div>
          <PhasesContainer>
            {phases.map((phase: phase) => (
              <PhaseCard key={phase.title} {...phase} />
            ))}
          </PhasesContainer>
        </ResponsiveContainer>
      </SubContainer>
    </Container>
  );
};
