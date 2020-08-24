import React from 'react';
import { Option1 } from './Option1';

interface Props {
  validatorCount: number | string;
}

export const LinuxInstructions = ({ validatorCount }: Props) => {
  return (
    <div style={{ animation: 'fadeIn 1s' }}>
      <Option1 validatorCount={validatorCount} os="linux" />
    </div>
  );
};
