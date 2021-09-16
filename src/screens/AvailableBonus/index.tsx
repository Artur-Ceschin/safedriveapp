import React, { useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import { Text } from 'react-native';
import bonusCardImage from '../../assets/bonusCard.png';
import { Stack, Center, Image, Box, Flex, Spacer } from 'native-base';
import axios from 'axios';
import { StyleSheet } from 'react-native';

interface DriverBonus {
  bonusId: number;
  vendor: string;
  promotionText: string;
}

export function AvailableBonus() {
  const [bonusData, setBonusData] = useState<DriverBonus[]>([{}]);

  const api = axios.create({
    baseURL: ''
  });

  useEffect(() => {
    api
    .get(`https://safe-driver-api.herokuapp.com/api/Driver/9ac3a29c-a0e8-4107-a540-005bdab6a7ac/bonuses`)
    .then((response) => {
      setBonusData(response.data)
    })
    .catch((error) => {
      console.log(error)
    });
  }, [])

  const styles = StyleSheet.create({
    titleText: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 10
    },
    headerText: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#fff"
    },
    fontMedium: {
      fontSize: 16,
      fontWeight: "normal",
      color: "#fff"
    }
  });
  
  return (
    <>
      <Header title="Bonus" />
      <Stack alignItems="flex-start" m={8}>
        <Text style={styles.titleText}>
          Bonus disponíveis pra você!
        </Text>
        
        <Stack
          direction="column"
          space={3}
          mb={3}
          width="100%"
        >
          {bonusData.map((bonus) => (
            <Flex
              height="130px"
              border=""
              direction="column"
              bg="#3575BE"
              padding={3}
              rounded="md"
              justify="space-between"
              key={bonus.bonusId}
            >
              <Text style={styles.headerText}>{bonus.vendor}</Text>
              <Text style={styles.fontMedium}>{bonus.promotionText}</Text>
              <Text style={styles.fontMedium}>Clique aqui para ver como resgatar</Text>
            </Flex>
          ))}
        </Stack>
      </Stack>
    </>
  );
}
