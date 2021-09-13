import React from 'react';
import { Stack, Center, Image, Box } from 'native-base';
import { Header } from '../../components/Header';
export function alertReport() {
  return (
    <>
      <Header title="Relatório de alertas" />
      <Stack alignItems="center" mt={10}></Stack>
    </>
  );
}
