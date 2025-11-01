import React, { useState } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import {
  qubit,
  // rotate,
  measure,
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
  getSingleQubitAnglesFromTwo,
  runSequence,
  threeQubit,
  teleport,
  getSingleQubitAnglesFromThree
} from './src/qubit';

const QubitVisualizer = ({ theta, phi }) => {
  const radius = 100

  let x = radius * Math.sin(theta) * Math.cos(phi)
  let y = radius * Math.sin(theta) * Math.sin(phi)

  return (
    <View style={{flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
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
    </View>
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

const ThreeQubitVisualizer = ({state})=> {
  const qubitA = getSingleQubitAnglesFromThree(state, 0)
  const qubitB = getSingleQubitAnglesFromThree(state, 1)
  const qubitC = getSingleQubitAnglesFromThree(state, 2)
  return (
    <View style={{flexDirection:"row", justifyContent:"space-around", marginTop:20}}>
      <QubitVisualizer theta={qubitA.theta} phi={qubitA.phi} />
      <QubitVisualizer theta={qubitB.theta} phi={qubitB.phi} />
      <QubitVisualizer theta={qubitC.theta} phi={qubitC.phi} />
    </View>
  )
}

function App() {
  const [currentQubit, setCurrentQubit] = useState({ ...qubit });
  // const [angle, setAngle] = useState(0);
  // const [result, setResult] = useState(null);

  const [sequence, setSequence] = useState([])

  // const [state, setState] = useState({ ...twoQubit })
  const [state, setState] = useState({ ...threeQubit })
  // const [result, setResult] = useState({
  //   first: null,
  //   second: null
  // });
  const [result, setResult] = useState({
    a: null,
    b: null
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
    <View style={{flex:1}}>
    <ScrollView style={{ padding: 50, flex:1 }}>

      {/* <View style={{ marginVertical: 10 }}>
        <Text style={{ fontSize: 16, marginBottom: 8 }}>Test:</Text>
        <Text>a00 = {state.a00.re.toFixed(2)} + {state.a00.im.toFixed(2)}i</Text>
        <Text>a01 = {state.a01.re.toFixed(2)} + {state.a01.im.toFixed(2)}i</Text>
        <Text>a10 = {state.a10.re.toFixed(2)} + {state.a10.im.toFixed(2)}i</Text>
        <Text>a11 = {state.a11.re.toFixed(2)} + {state.a11.im.toFixed(2)}i</Text>
      </View> */}

      {/* <View style={{ marginVertical: 10 }}>
        <Text style={{ fontSize: 16, marginBottom: 8 }}>old</Text>
        <Text>α = {currentQubit.alpha.re.toFixed(2)} + {currentQubit.alpha.im.toFixed(2)}i</Text>
        <Text>β = {currentQubit.beta.re.toFixed(2)} + {currentQubit.beta.im.toFixed(2)}i</Text>
      </View> */}

      {/* <View style={{ marginVertical: 10 }}>
        <Text style={{ fontSize: 16, marginBottom: 8 }}>sequence</Text>
        <Text>{sequence?.map(s=>s.type).join(",")}</Text>
      </View> */}

       <View style={{ marginVertical: 10 }}>
        <Text>Measurement A: {result.a}</Text>
        <Text>Measurement B: {result.b}</Text>
      </View>

      {/* <View style={{ marginVertical: 10 }}>
        <Text>theta = {theta.toFixed(2)}</Text>
        <Text>phi = {phi.toFixed(2)}</Text>
      </View> */}

      {/* <View style={{ marginVertical: 10 }}>
        <Text>Probability |0⟩ (Heads): {p0.toFixed(2)}</Text>
        <Text>Probability |1⟩ (Tails): {p1.toFixed(2)}</Text>
      </View> */}

      {/* <View style={{ marginVertical: 10 }}>
        <Text>Angle: {angle}°</Text>
        <Text>Measurement Result: {result !== null ? result : '-'}</Text>
      </View> */}

      {/* <View style={{ marginVertical: 10 }}>
        <Text>Two-Qubit Simulator</Text>
        <Text>First Qubit Measurement: {result.first !== null ? result.first : "-"}</Text>
        <Text>Second Qubit Measurement: {result.second !== null ? result.second : "-"}</Text>
      </View> */}

      <View style={{ marginVertical: 20 }}>


        {/* <QubitVisualizer theta={theta} phi={phi} /> */}
        {/* <TwoQubitVisualizer state={state} /> */}
        <ThreeQubitVisualizer state={state} />

        {/* <Button title="Rotate 0°" onPress={() => applyRotation(0)} /> */}
        {/* <Button title="Rotate 45°" onPress={() => applyRotation(45)} /> */}
        {/* <Button title="Rotate 90°" onPress={() => applyRotation(10)} /> */}
        {/* <Button title="Rotate +10°" onPress={() => applyRotation(angle + 10)} /> */}
        {/* <Button title="Rotate -10°" onPress={() => applyRotation(angle - 10)} /> */}
        {/* <Button
          title="Hadamard Gate"
          onPress={() => {
            const newQubit = { ...currentQubit };
            hadamard(newQubit);
            setCurrentQubit(newQubit);
          }}
        /> */}
        {/* <Button
          title="Apply Pauli-X (NOT)"
          onPress={() => {
            const newQubit = { ...currentQubit };
            paulix(newQubit);
            setCurrentQubit(newQubit);
          }}
        /> */}
        {/* <Button
          title="Apply Pauli-Y"
          onPress={() => {
            const newQubit = { ...currentQubit };
            pauliy(newQubit);
            setCurrentQubit(newQubit);
          }}
        /> */}
        {/* <Button
          title="Apply Pauli-Z (Phase Flip)"
          onPress={() => {
            const newQubit = { ...currentQubit };
            pauliz(newQubit);
            setCurrentQubit(newQubit);
          }}
        /> */}
        {/* <Button
          title="Measure Qubit"
          onPress={() => {
            const outcome = measure(currentQubit);
            setResult(outcome);
          }}
        /> */}
        {/* <Button
          title="Hadamard (First Qubit)"
          onPress={() => {
            let newState = { ...state };
            let res = hadamard({
              alpha: newState.a00,
              beta: newState.a10
            });

            newState = {
              ...newState,
              a00: res.alpha,
              a10: res.beta
            }
            // this is modified

            setState(newState);
          }}
        /> */}
        {/* <Button
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
        /> */}

        {/* <Button
          title="Add Hadamard to Q0"
          onPress={() => {
            setSequence([...sequence, {type: "H", target:0}])
          }}
        /> */}
        {/* <Button
          title="Add CNOT Q0->Q1"
          onPress={() => {
            setSequence([...sequence, {type: "CNOT", control: 0, target:1}])
          }}
        /> */}
         {/* <Button
          title="Run Sequence"
          onPress={() => {
            setState(runSequence(state, sequence))
          }}
        /> */}
         {/* <Button
          title="Clear Sequence"
          onPress={() => {
            setSequence([])
          }}
        /> */}
          <Button
          title="Teleport Qubit A-> C"
          onPress={() => {
            const {state: newState, aMeasurement, bMeasurement} = teleport({...state})
            setState(newState)
            setResult({a: aMeasurement, b: bMeasurement})
          }}
        />
        <View style={{height:100}}>

        </View>
      </View>
    </ScrollView>
    </View>
  );
}

export default App;
