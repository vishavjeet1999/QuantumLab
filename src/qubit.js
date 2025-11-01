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
