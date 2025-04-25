function decodeValue(valueStr, baseStr) {
    const base = parseInt(baseStr);
    return BigInt([...valueStr].reduce((acc, digit) => {
        const value = parseInt(digit, base);
        return acc * BigInt(base) + BigInt(isNaN(value) ? parseInt(digit, 36) : value);
    }, 0n));
}

function lagrangeInterpolation(points) {
    let secret = 0n;
    const k = points.length;

    for (let i = 0; i < k; i++) {
        let [xi, yi] = points[i];
        xi = BigInt(xi);
        yi = BigInt(yi);

        let num = 1n;
        let den = 1n;

        for (let j = 0; j < k; j++) {
            if (j !== i) {
                const xj = BigInt(points[j][0]);
                num *= -xj;
                den *= (xi - xj);
            }
        }

        const term = (yi * num) / den;
        secret += term;
    }

    return secret.toString();
}

function processTestCase(testCase) {
    const points = [];

    for (const key in testCase) {
        if (key !== 'keys') {
            const x = parseInt(key);
            const base = testCase[key].base;
            const value = testCase[key].value;
            const y = decodeValue(value, base);
            points.push([x, y]);
        }
    }

    points.sort((a, b) => a[0] - b[0]);

    const k = testCase.keys.k;
    const selectedPoints = points.slice(0, k);

    return lagrangeInterpolation(selectedPoints);
}

const testCase1 = {
    "keys": {
        "n": 4,
        "k": 3
    },
    "1": {
        "base": "10",
        "value": "4"
    },
    "2": {
        "base": "2",
        "value": "111"
    },
    "3": {
        "base": "10",
        "value": "12"
    },
    "6": {
        "base": "4",
        "value": "213"
    }
};

const testCase2 = {
    "keys": {
        "n": 10,
        "k": 7
    },
    "1": {
        "base": "6",
        "value": "13444211440455345511"
    },
    "2": {
        "base": "15",
        "value": "aed7015a346d63"
    },
    "3": {
        "base": "15",
        "value": "6aeeb69631c227c"
    },
    "4": {
        "base": "16",
        "value": "e1b5e05623d881f"
    },
    "5": {
        "base": "8",
        "value": "316034514573652620673"
    },
    "6": {
        "base": "3",
        "value": "2122212201122002221120200210011020220200"
    },
    "7": {
        "base": "3",
        "value": "20120221122211000100210021102001201112121"
    },
    "8": {
        "base": "6",
        "value": "20220554335330240002224253"
    },
    "9": {
        "base": "12",
        "value": "45153788322a1255483"
    },
    "10": {
        "base": "7",
        "value": "1101613130313526312514143"
    }
};

const secret1 = processTestCase(testCase1);
const secret2 = processTestCase(testCase2);

console.log("Secret for Test Case 1:", secret1);
console.log("Secret for Test Case 2:", secret2);
