import React, { useEffect, useState } from 'react';
import { Hero } from './Hero';
import { NetworkStatus } from './NetworkStatus';
import { StakingRewards } from './StakingRewards';
import { TimelineMileStones } from './TimelineMilestones';
import { Introduction } from './Introduction';
import { SignupSteps } from './SignupSteps';
import { Phases } from './Phases';
import { CTAFooter } from './CTAFooter';
import { queryContract } from '../../utils/queryContract';

export const LandingPage = (): JSX.Element => {
  const [amountEth, setAmountEth] = useState(0);

  useEffect(() => {
    const getBalance = async () => {
      const ethBalance = await queryContract();
      setAmountEth(ethBalance);
    };

    getBalance();
  });
  return (
    <>
      <Hero />
      <NetworkStatus amountEth={amountEth} />
      <StakingRewards amountEth={amountEth} />
      <TimelineMileStones />
      <Introduction />
      <SignupSteps />
      <Phases />
      <CTAFooter />
    </>
  );
};
