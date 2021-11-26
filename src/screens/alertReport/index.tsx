import React from 'react';
import { Stack, Center, Image, Box, Text } from 'native-base';
import { Header } from '../../components/Header';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ScrollView } from 'react-native';
import { number } from 'yargs';

interface Coordinate {
  latitude: number;
  longitude: number;
}

interface DriverAlert {
  id: number;
  eventDateTime: string;
  coordinates: Coordinate;
  generatedScore: number;
  eventType: number;
  eventTypeDescription: string;
  precisionLevel: number;
}

function formatAlertDateTime(date: Date) {
  return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
}

function translateEventDescription(eventTypeDescription: string) {
  switch (eventTypeDescription) {
    case 'TRIP_COMPLETE':
      return 'Viagem completa';
    
    case 'ACCIDENT':
      return 'Acidente';
    
    case 'SUDDEN_BREAK':
      return 'Freada brusca';
    
    case 'OVER_VELOCITY':
      return 'Acima da velocidade';
        
    case 'CELLPHONE_USAGE':
      return 'Uso do celular';
    
    case 'ILLEGAL_TURN':
      return 'Virada ilegal';
      
    default:
      return '';
      break;
  }
}

export function alertReport() {

  const [alertState, setAlertState] = useState<DriverAlert[]>([{}]);
  
  const api = axios.create({
    baseURL: ''
  });

  useEffect(() => {
    api
    .get(`https://safe-driver-api.herokuapp.com/api/DriverEvent/6fff8cff-1cb9-447d-8a5e-18c6ba70b759`)
    .then((response) => {
      setAlertState(response.data)
    })
    .catch((error) => {
      console.log(error)
    });

  }, [])

  return (
    <>
      <Header title="Relatório de alertas" />
      <ScrollView>
        <Stack alignItems="flex-start" m={6}>
          {
            alertState.map((alertData) => (
              <Stack
              padding={3}
              bg="#3575BE"
              rounded="md"
              direction="column"
              space={2}
              mb={2}
              width="100%"
            >
              <Text color="white">{"Registrado em: " + formatAlertDateTime(new Date(alertData.eventDateTime))}</Text>
              <Text color="white">{translateEventDescription(alertData.eventTypeDescription)}</Text>
              <Text color="white">{"Score: " + alertData.generatedScore}</Text>
            </Stack>
            ))
          }
        </Stack>

      </ScrollView>
    </>
  );
}
