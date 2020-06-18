import React from 'react';
import styled from 'styled-components';
import { PageTemplate } from '../../components/PageTemplate';
import { Paper } from '../../components/Paper';
import { Text } from '../../components/Text';

const Container = styled(Paper)`
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const ValidatorClients = (): JSX.Element => {
  return (
    <PageTemplate title="Upload Deposit File">
      <Container className="mt20">
        <Text className="mb20">Client Cards Here</Text>
      </Container>
    </PageTemplate>
  );
};
