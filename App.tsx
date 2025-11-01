import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { qubit, rotate, measure, magnitudeSquared, hadamard, paulix, pauliy, pauliz, getBolchAngle } from './src/qubit';

function App() {
  const [currentQubit, setCurrentQubit] = useState({ ...qubit });
  const [result, setResult] = useState(null);
  const [angle, setAngle] = useState(0);

  const p0 = magnitudeSquared(currentQubit.alpha);
  const p1 = magnitudeSquared(currentQubit.beta);

  const applyRotation = (newAngle) => {
    const newQubit = {
      alpha: { ...currentQubit.alpha },
      beta: { ...currentQubit.beta },
    };
    rotate(newQubit, newAngle);
    setCurrentQubit(newQubit);
    setAngle(newAngle);
  };

  const { theta, phi } = getBolchAngle(currentQubit)

  return (
    <View style={{ padding: 50 }}>

      <View style={{ marginVertical: 10 }}>
        <Text style={{ fontSize: 16, marginBottom: 8 }}>Quantum State:</Text>
        <Text>α = {currentQubit.alpha.re.toFixed(2)} + {currentQubit.alpha.im.toFixed(2)}i</Text>
        <Text>β = {currentQubit.beta.re.toFixed(2)} + {currentQubit.beta.im.toFixed(2)}i</Text>
      </View>

      <View style={{ marginVertical: 10 }}>
        <Text>theta = {theta.toFixed(2)}</Text>
        <Text>phi = {phi.toFixed(2)}</Text>
      </View>

      <View style={{ marginVertical: 10 }}>
        <Text>Probability |0⟩ (Heads): {p0.toFixed(2)}</Text>
        <Text>Probability |1⟩ (Tails): {p1.toFixed(2)}</Text>
      </View>

      <Text>Angle: {angle}°</Text>
      <Text>Measurement Result: {result !== null ? result : '-'}</Text>

      <View style={{ marginVertical: 20 }}>
        <Button title="Rotate 0°" onPress={() => applyRotation(0)} />
        <Button title="Rotate 45°" onPress={() => applyRotation(45)} />
        <Button title="Rotate 90°" onPress={() => applyRotation(10)} />
        <Button title="Rotate +10°" onPress={() => applyRotation(angle + 10)} />
        <Button title="Rotate -10°" onPress={() => applyRotation(angle - 10)} />
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
        <Button
          title="Measure Qubit"
          onPress={() => {
            const outcome = measure(currentQubit);
            setResult(outcome);
          }}
        />
      </View>
    </View>
  );
}

export default App;
