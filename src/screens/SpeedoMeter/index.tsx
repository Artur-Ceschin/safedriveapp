// import React, { useState, useEffect } from 'react';
// import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
// import { Accelerometer } from 'expo-sensors';
// import { Header } from '../../components/Header';
// import Speedometer from '../../Services/Speedometer';
// import MathUtils from '../../Services/MathUtils';

// export function SpeedoMeter() {
//   const [accData, setAccData] = useState({
//     x: 0,
//     y: 0,
//     z: 0,
//   });
//   const [acceleration, setAcceleration] = useState({
//     x: 0,
//     y: 0,
//     z: 0,
//   });
//   const [velocity, setVelocity] = useState({
//     x: 0,
//     y: 0,
//     z: 0,
//   });
//   const [subscription, setSubscription] = useState<any>();
//   const [updateIntervalMilliseconds, setUpdateInterval] = useState<number>(100);
//   const [speed, setSpeed] = useState<number>(0);

//   const _slow = () => {
//     setUpdateInterval(200);
//   };

//   const _fast = () => {
//     setUpdateInterval(100);
//   };

//   useEffect(() => {
//     Accelerometer.setUpdateInterval(updateIntervalMilliseconds);
//     Speedometer.setUpdateInterval(updateIntervalMilliseconds);
//   }, [updateIntervalMilliseconds]);

//   const _subscribe = () => {
//     setSubscription(
//       Accelerometer.addListener((accelerometerData) => {
//         const { acceleration, speed, velocity } =
//           Speedometer.getVelocityFromAccelerometerData(accelerometerData);
//         setAccData(accelerometerData);
//         setAcceleration(acceleration);
//         setSpeed(speed);
//         setVelocity(velocity);
//       })
//     );
//   };

//   const _unsubscribe = () => {
//     subscription && subscription.remove();
//     setSubscription(null);
//   };

//   useEffect(() => {
//     _subscribe();
//     return () => _unsubscribe();
//   }, []);

//   const round = MathUtils.round;

//   return (
//     <>
//       <Header title="SpeedoMeter" />
//       <View style={styles.container}>
//         <Text style={styles.text}>
//           Accelerometer: (in Gs where 1 G = 9.81 m s^-2)
//         </Text>
//         <Text style={styles.text}>
//           ax: {round(accData.x)} ay: {round(accData.y)} az: {round(accData.z)}
//         </Text>
//         <Text style={{ ...styles.text, marginTop: 32 }}>
//           Acceleration and velocity (m s^-2) on device referential
//         </Text>
//         <Text style={styles.text}>
//           ax: {round(acceleration.x)} ay: {round(acceleration.y)} az:{' '}
//           {round(acceleration.z)}
//         </Text>
//         <Text style={styles.text}>
//           vx: {round(velocity.x)} vy: {round(velocity.y)} vz:{' '}
//           {round(velocity.z)}
//         </Text>
//         <Text style={{ ...styles.text, marginBottom: 32 }}>
//           Speed: {round(speed)} m/s - {round(speed / 3.6)} km/h
//         </Text>
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity
//             onPress={subscription ? _unsubscribe : _subscribe}
//             style={styles.button}
//           >
//             <Text>{subscription ? 'On' : 'Off'}</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={_slow}
//             style={[styles.button, styles.middleButton]}
//           >
//             <Text>Slow</Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={_fast} style={styles.button}>
//             <Text>Fast</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingHorizontal: 10,
//   },
//   text: {
//     textAlign: 'center',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     alignItems: 'stretch',
//     marginTop: 15,
//   },
//   button: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#eee',
//     padding: 10,
//   },
//   middleButton: {
//     borderLeftWidth: 1,
//     borderRightWidth: 1,
//     borderColor: '#ccc',
//   },
// });
