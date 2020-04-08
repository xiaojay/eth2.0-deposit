import React from 'react';
import styled from 'styled-components';
import 'animate.css/animate.min.css';
import ScrollAnimation from 'react-animate-on-scroll';
import { Heading } from '../../components/Heading';
import { Text } from '../../components/Text';
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

const Container = styled.div`
  background: ${p => p.theme.white};
  padding: ${(p: { isMobile: boolean }) => (p.isMobile ? '60px 0' : '150px 0')};
`;
const SubContainer = styled.div`
  width: 100%;
  max-width: ${p =>
    p.theme.screenSizes.largest}; // needed to contain the chart svg
  margin: 0 auto;
  padding: 0 120px;
  @media only screen and (max-width: ${p => p.theme.screenSizes.largest}) {
    padding: ${(p: { isMobile: boolean }) =>
      p.isMobile ? '0 20px' : '0 60px'};
  }
`;

const data = [
  { index: 0, value: 10.5 },
  { index: 1, value: 8.4 },
  { index: 2, value: 6.7 },
  { index: 3, value: 5.6 },
  { index: 4, value: 4.7 },
  { index: 5, value: 4.2 },
  { index: 6, value: 4.1 },
  { index: 7, value: 4 },
  { index: 8, value: 4 },
  { index: 9, value: 4 },
];
const blue = '#095488';

const ChartContainer = styled.div`
  .recharts-wrapper .recharts-cartesian-grid-horizontal line:nth-child(9) {
    // removes an ugly top line from chart
    stroke-opacity: 0;
  }
`;

const CustomDot = (props: any) => {
  const { cx, cy, value, amountEth } = props;

  return (
    <circle cx={cx} cy={cy} r={7} stroke="white" strokeWidth={5} fill={blue} />
  );
};

const CurrentAmountLabel = (p: any) => {
  console.log('cirrent amount label:', p);
  const { x, y, stroke, amountEth } = p;

  return (
    <text x={x} y={y} dy={-4} fill="red" fontSize={10} textAnchor="middle">
      {amountEth}
    </text>
  );
};

const SimpleLineChart = ({ amountEth }: Props) => {
  return (
    <ChartContainer>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ right: 50 }}>
          <CartesianGrid vertical={false} />
          <XAxis
            allowDecimals
            axisLine={false}
            type="number"
            domain={[0, 9]}
            tickCount={10}
            padding={{ right: 25, left: 25 }}
            dataKey="index"
          />
          <YAxis
            allowDecimals
            axisLine={false}
            type="number"
            padding={{ top: 25, bottom: 25 }}
            domain={[0, 14]}
            tickCount={10}
            tickFormatter={value => `${value}%`}
          />
          <ReferenceLine
            x={0.52}
            stroke="red"
            strokeWidth={1}
            ifOverflow="extendDomain"
            label={<CurrentAmountLabel amountEth={amountEth} />}
            viewBox={{
              x: 60,
              y: 0,
              width: 0,
              height: 100,
            }}
          />
          <ReferenceLine
            x={1.5}
            stroke="#F0F4F8"
            strokeWidth={15}
            ifOverflow="extendDomain"
          />
          <Line
            strokeWidth={3}
            activeDot={false}
            type="basis"
            dataKey="value"
            stroke={blue}
            dot={<CustomDot amountEth={amountEth} />}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

interface Props {
  amountEth: number;
}

export const StakingRewards = ({ amountEth }: Props): JSX.Element => {
  const m = (window as any).mobileCheck();
  return (
    <Container isMobile={m}>
      <SubContainer isMobile={m}>
        <ScrollAnimation animateIn="fadeIn" animateOnce>
          <Heading level={2} size="medium" color="blueDark" margin="none">
            staking and rewards
          </Heading>
        </ScrollAnimation>
        <ScrollAnimation animateIn="fadeInUp" animateOnce>
          <Text className="mt25">
            Validators get rewarded for proposing and attesting to and blocks.
            The rewards are tired to the overall amount of ETH staked in the
            network.
          </Text>
        </ScrollAnimation>
        <ScrollAnimation
          animateIn="fadeIn"
          animateOnce
          delay={450}
          className="mt20"
        >
          <SimpleLineChart amountEth={amountEth} />
        </ScrollAnimation>
      </SubContainer>
    </Container>
  );
};
