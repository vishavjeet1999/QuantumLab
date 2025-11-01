export const complex = (re, im) => {
    return { re, im }
}

// export const qubit = {
//     head:1,
//     tails: 0
// }

export const qubit = {
    alpha: complex(1, 0),
    beta: complex(0, 0)
}


export const magnitudeSquared = (c) => {
    return c.re * c.re + c.im * c.im
}

// export const measure = (qubit) => {
//     const random = Math.random()
//     return random < qubit.head ? 0 : 1
// }

export const measure = (qubit) => {
    const p0 = magnitudeSquared(qubit.alpha)
    const random = Math.random()
    return random < p0 ? 0 : 1
}

// export const rotate = (qubit, angle)=> {
//     const radian = (angle * Math.PI) / 180
//     qubit.head = Math.cos(radian) ** 2
//     qubit.tails = Math.sin(radian) ** 2
// }

export const rotate = (qubit, angle) => {
    const rad = (angle * Math.PI) / 180;
    const cos = Math.cos(rad / 2);
    const sin = Math.sin(rad / 2);

    const alpha = qubit.alpha;
    const beta = qubit.beta;

    qubit.alpha = {
        re: cos * alpha.re - sin * beta.re,
        im: cos * alpha.im - sin * beta.im,
    };

    qubit.beta = {
        re: sin * alpha.re + cos * beta.re,
        im: sin * alpha.im + cos * beta.im,
    };
};

export const addComplex = (a, b) => {
    return {
        re: a.re + b.re,
        im: a.im + b.im
    }
}

export const subtractComplex = (a, b) => {
    return {
        re: a.re - b.re,
        im: a.im - b.im
    }
}

export const multiplyComplexByScalar = (a, s) => {
    return {
        re: a.re * s,
        im: a.im * s
    }
}

export const hadamard = (qubit) => {
    const factor = 1 / Math.sqrt(2)

    const newAlpha = multiplyComplexByScalar(addComplex(qubit.alpha, qubit.beta), factor)

    const newBeta = multiplyComplexByScalar(subtractComplex(qubit.alpha, qubit.beta), factor)

    qubit.alpha = newAlpha

    qubit.beta = newBeta

    return qubit
}

export const paulix = (qubit) => {
    const newAlpha = { ...qubit.beta }
    const newBeta = { ...qubit.alpha }
    qubit.alpha = newAlpha
    qubit.beta = newBeta
}

export const pauliz = (qubit) => {
    qubit.beta = {
        re: -qubit.beta.re,
        im: -qubit.beta.im
    }
}

export const multiplyComplex = (a, b) => {
    return {
        re: a.re * b.re - a.im * b.im,
        im: a.re * b.im - a.im * b.re,
    }
}

export const pauliy = (qubit) => {
    const i = complex(0, 1)
    const minusI = complex(0, -1)

    const newAlpha = multiplyComplex(minusI, qubit.beta)
    const newBeta = multiplyComplex(i, qubit.alpha)

    qubit.alpha = newAlpha
    qubit.beta = newBeta
}

export const normalize = (qubit) => {
    const mag = Math.sqrt(magnitudeSquared(qubit.alpha) + magnitudeSquared(qubit.beta))
    qubit.alpha = {
        re: qubit.alpha.re / mag,
        im: qubit.alpha.im / mag
    }
    qubit.beta = {
        re: qubit.beta.re / mag,
        im: qubit.beta.im / mag
    }
}

export const getBolchAngle = (qubit) => {
    const alphaMag = Math.sqrt(magnitudeSquared(qubit.alpha))
    const betaMag = Math.sqrt(magnitudeSquared(qubit.beta))

    const theta = 2 * Math.acos(alphaMag)
    const phi = Math.atan2(qubit.beta.im, qubit.beta.re)

    return { theta, phi }
}

export const twoQubit = {
    a00: complex(1, 0),
    a01: complex(0, 0),
    a10: complex(0, 0),
    a11: complex(0, 0)
}

export const normalizeTwoQubit = (state) => {
    const mag = Math.sqrt(
        magnitudeSquared(state.a00),
        magnitudeSquared(state.a01),
        magnitudeSquared(state.a10),
        magnitudeSquared(state.a11)
    )

    state.a00 = {
        re: state.a00.re / mag,
        im: state.a00.im / mag
    }

    state.a01 = {
        re: state.a01.re / mag,
        im: state.a01.im / mag
    }

    state.a10 = {
        re: state.a10.re / mag,
        im: state.a10.im / mag
    }

    state.a11 = {
        re: state.a11.re / mag,
        im: state.a11.im / mag
    }
}

export const normalizeThreeQubit = (state) => {
    const mag = Math.sqrt(
        magnitudeSquared(state.a000),
        magnitudeSquared(state.a001),
        magnitudeSquared(state.a010),
        magnitudeSquared(state.a011),
        magnitudeSquared(state.a100),
        magnitudeSquared(state.a101),
        magnitudeSquared(state.a110),
        magnitudeSquared(state.a111)
    )

    state.a000 = {
        re: state.a000.re / mag,
        im: state.a000.im / mag
    }

    state.a001 = {
        re: state.a001.re / mag,
        im: state.a001.im / mag
    }

    state.a010 = {
        re: state.a010.re / mag,
        im: state.a010.im / mag
    }

    state.a011 = {
        re: state.a011.re / mag,
        im: state.a011.im / mag
    }

    state.a100 = {
        re: state.a100.re / mag,
        im: state.a100.im / mag
    }

    state.a101 = {
        re: state.a101.re / mag,
        im: state.a101.im / mag
    }

    state.a110 = {
        re: state.a110.re / mag,
        im: state.a110.im / mag
    }

    state.a111 = {
        re: state.a111.re / mag,
        im: state.a111.im / mag
    }
}

export const cnot = (state) => {
    const newstate = {
        a00: { ...state.a00 },
        a01: { ...state.a01 },
        a10: { ...state.a10 },
        a11: { ...state.a11 }
    }

    newstate.a10 = { ...state.a11 }
    newstate.a11 = { ...state.a10 }

    newstate.a00 = { ...state.a00 }
    newstate.a01 = { ...state.a01 }

    state.a00 = newstate.a00
    state.a01 = newstate.a01
    state.a10 = newstate.a10
    state.a11 = newstate.a11

}

export const measureFirst = (state) => {
    const p0 = magnitudeSquared(state.a00) + magnitudeSquared(state.a01)

    const random = Math.random()

    let result

    if (random < p0) {
        result = 0

        const norm = Math.sqrt(magnitudeSquared(state.a00) + magnitudeSquared(state.a01))

        state.a00 = multiplyComplexByScalar(state.a00, 1 / norm)
        state.a01 = multiplyComplexByScalar(state.a01, 1 / norm)
        state.a10 = complex(0, 0)
        state.a11 = complex(0, 0)
    } else {
        result = 1

        const norm = Math.sqrt(magnitudeSquared(state.a10) + magnitudeSquared(state.a11))

        state.a00 = complex(0, 0)
        state.a01 = complex(0, 0)
        state.a10 = multiplyComplexByScalar(state.a10, 1 / norm)
        state.a11 = multiplyComplexByScalar(state.a11, 1 / norm)
    }

    return result
}

export const measureSecond = (state) => {
    const p0 = magnitudeSquared(state.a00) + magnitudeSquared(state.a10)

    const random = Math.random()

    let result

    if (random < p0) {
        result = 0

        const norm = Math.sqrt(magnitudeSquared(state.a00) + magnitudeSquared(state.a10))

        state.a00 = multiplyComplexByScalar(state.a00, 1 / norm)
        state.a01 = complex(0, 0)
        state.a10 = multiplyComplexByScalar(state.a10, 1 / norm)
        state.a11 = complex(0, 0)
    } else {
        result = 1

        const norm = Math.sqrt(magnitudeSquared(state.a01) + magnitudeSquared(state.a11))

        state.a00 = complex(0, 0)
        state.a01 = multiplyComplexByScalar(state.a01, 1 / norm)
        state.a10 = complex(0, 0)
        state.a11 = multiplyComplexByScalar(state.a11, 1 / norm)
    }

    return result
}

export const getSingleQubitAnglesFromTwo = (state, qubitIndex) => {
    let alpha, beta

    if (qubitIndex === 0) {
        alpha = {
            re: Math.sqrt(magnitudeSquared(state.a00) + magnitudeSquared(state.a01)),
            im: 0
        }
        beta = {
            re: Math.sqrt(magnitudeSquared(state.a10) + magnitudeSquared(state.a11)),
            im: 0
        }
    } else {
        alpha = {
            re: Math.sqrt(magnitudeSquared(state.a00) + magnitudeSquared(state.a10)),
            im: 0
        }
        beta = {
            re: Math.sqrt(magnitudeSquared(state.a01) + magnitudeSquared(state.a11)),
            im: 0
        }
    }

    const theta = 2 * Math.acos(alpha.re)

    const phi = Math.atan2(beta.im, beta.re)

    return { theta, phi }
}

export const getSingleQubitAnglesFromThree = (state, qubitIndex) => {
  let alpha, beta;

  if (qubitIndex === 0) { // A
    alpha = { re: Math.sqrt(
      magnitudeSquared(state.a000) + magnitudeSquared(state.a001) +
      magnitudeSquared(state.a010) + magnitudeSquared(state.a011)
    ), im: 0 };
    beta = { re: Math.sqrt(
      magnitudeSquared(state.a100) + magnitudeSquared(state.a101) +
      magnitudeSquared(state.a110) + magnitudeSquared(state.a111)
    ), im: 0 };
  } else if (qubitIndex === 1) { // B
    alpha = { re: Math.sqrt(
      magnitudeSquared(state.a000) + magnitudeSquared(state.a001) +
      magnitudeSquared(state.a100) + magnitudeSquared(state.a101)
    ), im: 0 };
    beta = { re: Math.sqrt(
      magnitudeSquared(state.a010) + magnitudeSquared(state.a011) +
      magnitudeSquared(state.a110) + magnitudeSquared(state.a111)
    ), im: 0 };
  } else { // C
    alpha = { re: Math.sqrt(
      magnitudeSquared(state.a000) + magnitudeSquared(state.a010) +
      magnitudeSquared(state.a100) + magnitudeSquared(state.a110)
    ), im: 0 };
    beta = { re: Math.sqrt(
      magnitudeSquared(state.a001) + magnitudeSquared(state.a011) +
      magnitudeSquared(state.a101) + magnitudeSquared(state.a111)
    ), im: 0 };
  }

  const theta = 2 * Math.acos(alpha.re);
  const phi = Math.atan2(beta.im, beta.re);

  return { theta, phi };
}

export const runSequence = (state, sequence) => {
    let newState = { ...state }

    sequence.forEach(step => {
        switch (step.type) {
            case "H":
                if (step.target === 0) {
                    let res = hadamard({ alpha: newState.a00, beta: newState.a10 })
                    // newState = {
                    //     ...newState,
                    //     a00: res.alpha,
                    //     a10: res.beta
                    // }
                    // this is modified
                }
                else {
                    let res = hadamard({ alpha: newState.a01, beta: newState.a11 })
                    // newState = {
                    //     ...newState,
                    //     a00: res.alpha,
                    //     a10: res.beta
                    // }
                    // this is modified
                }
                break;
            case "X":
                if (step.target === 0) {
                    let res = paulix({ alpha: newState.a00, beta: newState.a10 })
                    // newState = {
                    //     ...newState,
                    //     a00: res.alpha,
                    //     a10: res.beta
                    // }
                    // this is modified
                }
                else {
                    let res = paulix({ alpha: newState.a01, beta: newState.a11 })
                    // newState = {
                    //     ...newState,
                    //     a00: res.alpha,
                    //     a10: res.beta
                    // }
                    // this is modified
                }
                break;
            case "CNOT":
                cnot(newState)
                break;
        }
    })

    return newState
}

export const threeQubit = {
    a000: complex(1,0),
    a001: complex(0,0),
    a010: complex(0,0),
    a011: complex(0,0),
    a100: complex(0,0),
    a101: complex(0,0),
    a110: complex(0,0),
    a111: complex(0,0),
}

export function teleport(state) {
  // 1. Create entanglement between Qubit B (1) and C (2)
  const factor = 1 / Math.sqrt(2);
  // Apply Hadamard to qubit B
  const tempB0 = multiplyComplexByScalar(addComplex(state.a010, state.a110), factor);
  const tempB1 = multiplyComplexByScalar(subtractComplex(state.a010, state.a110), factor);
  state.a010 = tempB0;
  state.a110 = tempB1;

  // Apply CNOT B→C
  const newState = { ...state };
  newState.a011 = state.a010;
  newState.a010 = state.a011;
  newState.a111 = state.a110;
  newState.a110 = state.a111;
  Object.assign(state, newState);

  // 2. Apply CNOT A→B and Hadamard A
  const tempA0 = multiplyComplexByScalar(addComplex(state.a000, state.a100), factor);
  const tempA1 = multiplyComplexByScalar(subtractComplex(state.a000, state.a100), factor);
  state.a000 = tempA0;
  state.a100 = tempA1;

  // Apply CNOT A→B
  // swap amplitudes where A=1
  const tmp = state.a101;
  state.a101 = state.a111;
  state.a111 = tmp;

  // 3. Measure A and B
  const aMeasurement = Math.random() < magnitudeSquared(state.a000) + magnitudeSquared(state.a001) ? 0 : 1;
  const bMeasurement = Math.random() < magnitudeSquared(state.a000) + magnitudeSquared(state.a010) ? 0 : 1;

  // 4. Apply X/Z on C depending on measurement
  if (bMeasurement) {
    const tmpX = state.a001;
    state.a001 = state.a011;
    state.a011 = tmpX;
  }
  if (aMeasurement) {
    state.a001.re *= -1;
    state.a001.im *= -1;
    state.a011.re *= -1;
    state.a011.im *= -1;
  }

  normalizeThreeQubit(state);
  return { state, aMeasurement, bMeasurement };
}

