import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import {
  qubit,
  // rotate,
  // measure,
  // magnitudeSquared,
  getBolchAngle,
  twoQubit,
  hadamard,
  paulix,
  pauliy,
  pauliz,
  cnot,
  measureFirst,
  measureSecond,
  getSingleQubitAnglesFromTwo
} from './src/qubit';

const QubitVisualizer = ({ theta, phi }) => {
  const radius = 100

  let x = radius * Math.sin(theta) * Math.cos(phi)
  let y = radius * Math.sin(theta) * Math.sin(phi)

  return (
    <>
      <View
        style={{
          width: radius * 2,
          height: radius * 2,
          borderRadius: radius,
          borderWidth: 2,
          borderColor: "black",
          position: "relative",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <View
          style={{
            width: 4,
            height: 4,
            backgroundColor: "red",
            position: "absolute",
            left: radius + x - 2,
            top: radius - y - 2,
            borderRadius: 2
          }}
        />
      </View>
      {/* <View>
        <Text>x: {x}</Text>
        <Text>y: {y}</Text>
      </View> */}
    </>
  )
}

const TwoQubitVisualizer = ({state})=> {
  const qubit0Angles = getSingleQubitAnglesFromTwo(state, 0)
  const qubit1Angles = getSingleQubitAnglesFromTwo(state, 1)
  return (
    <View style={{flexDirection:"row", justifyContent:"space-around", marginTop:20}}>
      <QubitVisualizer theta={qubit0Angles.theta} phi={qubit0Angles.phi} />
      <QubitVisualizer theta={qubit1Angles.theta} phi={qubit1Angles.phi} />
    </View>
  )
}

function App() {
  const [currentQubit, setCurrentQubit] = useState({ ...qubit });
  // const [angle, setAngle] = useState(0);
  // const [result, setResult] = useState(null);

  const [state, setState] = useState({ ...twoQubit })
  const [result, setResult] = useState({
    first: null,
    second: null
  });

  // const p0 = magnitudeSquared(currentQubit.alpha);
  // const p1 = magnitudeSquared(currentQubit.beta);

  // const applyRotation = (newAngle) => {
  //   const newQubit = {
  //     alpha: { ...currentQubit.alpha },
  //     beta: { ...currentQubit.beta },
  //   };
  //   rotate(newQubit, newAngle);
  //   setCurrentQubit(newQubit);
  //   setAngle(newAngle);
  // };

  let { theta, phi } = getBolchAngle(currentQubit)

  return (
    <View style={{ padding: 50 }}>

      {/* <View style={{ marginVertical: 10 }}>
        <Text style={{ fontSize: 16, marginBottom: 8 }}>Quantum State:</Text>
        <Text>α = {currentQubit.alpha.re.toFixed(2)} + {currentQubit.alpha.im.toFixed(2)}i</Text>
        <Text>β = {currentQubit.beta.re.toFixed(2)} + {currentQubit.beta.im.toFixed(2)}i</Text>
      </View> */}

      <View style={{ marginVertical: 10 }}>
        <Text>theta = {theta.toFixed(2)}</Text>
        <Text>phi = {phi.toFixed(2)}</Text>
      </View>

      {/* <View style={{ marginVertical: 10 }}>
        <Text>Probability |0⟩ (Heads): {p0.toFixed(2)}</Text>
        <Text>Probability |1⟩ (Tails): {p1.toFixed(2)}</Text>
      </View> */}

      {/* <View style={{ marginVertical: 10 }}>
        <Text>Angle: {angle}°</Text>
        <Text>Measurement Result: {result !== null ? result : '-'}</Text>
      </View> */}

      <View style={{ marginVertical: 10 }}>
        <Text>Two-Qubit Simulator</Text>
        <Text>First Qubit Measurement: {result.first !== null ? result.first : "-"}</Text>
        <Text>Second Qubit Measurement: {result.second !== null ? result.second : "-"}</Text>
      </View>

      <View style={{ marginVertical: 20 }}>


        {/* <QubitVisualizer theta={theta} phi={phi} /> */}
        <TwoQubitVisualizer state={state} />

        {/* <Button title="Rotate 0°" onPress={() => applyRotation(0)} /> */}
        {/* <Button title="Rotate 45°" onPress={() => applyRotation(45)} /> */}
        {/* <Button title="Rotate 90°" onPress={() => applyRotation(10)} /> */}
        {/* <Button title="Rotate +10°" onPress={() => applyRotation(angle + 10)} /> */}
        {/* <Button title="Rotate -10°" onPress={() => applyRotation(angle - 10)} /> */}
        <Button
          title="Hadamard Gate"
          onPress={() => {
            const newQubit = { ...currentQubit };
            hadamard(newQubit);
            setCurrentQubit(newQubit);
          }}
        />
        <Button
          title="Apply Pauli-X (NOT)"
          onPress={() => {
            const newQubit = { ...currentQubit };
            paulix(newQubit);
            setCurrentQubit(newQubit);
          }}
        />
        <Button
          title="Apply Pauli-Y"
          onPress={() => {
            const newQubit = { ...currentQubit };
            pauliy(newQubit);
            setCurrentQubit(newQubit);
          }}
        />
        <Button
          title="Apply Pauli-Z (Phase Flip)"
          onPress={() => {
            const newQubit = { ...currentQubit };
            pauliz(newQubit);
            setCurrentQubit(newQubit);
          }}
        />
        {/* <Button
          title="Measure Qubit"
          onPress={() => {
            const outcome = measure(currentQubit);
            setResult(outcome);
          }}
        /> */}
        <Button
          title="Hadamard (First Qubit)"
          onPress={() => {
            const newState = { ...state };
            hadamard({
              alpha: newState.a00,
              beta: newState.a10
            });
            setState(newState);
          }}
        />
        <Button
          title="CNOT"
          onPress={() => {
            const newState = { ...state };
            cnot(newState);
            setState(newState);
          }}
        />
        <Button
          title="Measure Both"
          onPress={() => {
            const newState = { ...state };

            setState(newState);

            const first = measureFirst(newState)
            const second = measureSecond(newState)

            setResult({
              first,
              second
            })
          }}
        />
      </View>
    </View>
  );
}

export default App;
