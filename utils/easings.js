const pow = Math.pow
const sqrt = Math.sqrt
const sin = Math.sin
const cos = Math.cos
const PI = Math.PI
const c1 = 1.70158
const c2 = c1 * 1.525
const c3 = c1 + 1
const c4 = (2 * PI) / 3
const c5 = (2 * PI) / 4.5

const bounceOut = function (x) {
    const n1 = 7.5625
    const d1 = 2.75

    if (x < 1 / d1) {
        return n1 * x * x
    } else if (x < 2 / d1) {
        return n1 * (x -= 1.5 / d1) * x + 0.75
    } else if (x < 2.5 / d1) {
        return n1 * (x -= 2.25 / d1) * x + 0.9375
    } else {
        return n1 * (x -= 2.625 / d1) * x + 0.984375
    }
}

const easings = {
    linear: (x) => x,
    easeInQuad: function (x) {
        return x * x
    },
    easeOutQuad: function (x) {
        return 1 - (1 - x) * (1 - x)
    },
    easeInOutQuad: function (x) {
        return x < 0.5 ? 2 * x * x : 1 - pow(-2 * x + 2, 2) / 2
    },
    easeInCubic: function (x) {
        return x * x * x
    },
    easeOutCubic: function (x) {
        return 1 - pow(1 - x, 3)
    },
    easeInOutCubic: function (x) {
        return x < 0.5 ? 4 * x * x * x : 1 - pow(-2 * x + 2, 3) / 2
    },
    easeInQuart: function (x) {
        return x * x * x * x
    },
    easeOutQuart: function (x) {
        return 1 - pow(1 - x, 4)
    },
    easeInOutQuart: function (x) {
        return x < 0.5 ? 8 * x * x * x * x : 1 - pow(-2 * x + 2, 4) / 2
    },
    easeInQuint: function (x) {
        return x * x * x * x * x
    },
    easeOutQuint: function (x) {
        return 1 - pow(1 - x, 5)
    },
    easeInOutQuint: function (x) {
        return x < 0.5 ? 16 * x * x * x * x * x : 1 - pow(-2 * x + 2, 5) / 2
    },
    easeInSine: function (x) {
        return 1 - cos((x * PI) / 2)
    },
    easeOutSine: function (x) {
        return sin((x * PI) / 2)
    },
    easeInOutSine: function (x) {
        return -(cos(PI * x) - 1) / 2
    },
    easeInExpo: function (x) {
        return x === 0 ? 0 : pow(2, 10 * x - 10)
    },
    easeOutExpo: function (x) {
        return x === 1 ? 1 : 1 - pow(2, -10 * x)
    },
    easeInOutExpo: function (x) {
        return x === 0
            ? 0
            : x === 1
                ? 1
                : x < 0.5
                    ? pow(2, 20 * x - 10) / 2
                    : (2 - pow(2, -20 * x + 10)) / 2
    },
    easeInCirc: function (x) {
        return 1 - sqrt(1 - pow(x, 2))
    },
    easeOutCirc: function (x) {
        return sqrt(1 - pow(x - 1, 2))
    },
    easeInOutCirc: function (x) {
        return x < 0.5
            ? (1 - sqrt(1 - pow(2 * x, 2))) / 2
            : (sqrt(1 - pow(-2 * x + 2, 2)) + 1) / 2
    },
    easeInBack: function (x) {
        return c3 * x * x * x - c1 * x * x
    },
    easeOutBack: function (x) {
        return 1 + c3 * pow(x - 1, 3) + c1 * pow(x - 1, 2)
    },
    easeInOutBack: function (x) {
        return x < 0.5
            ? (pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
            : (pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2
    },
    easeInElastic: function (x) {
        return x === 0
            ? 0
            : x === 1
                ? 1
                : -pow(2, 10 * x - 10) * sin((x * 10 - 10.75) * c4)
    },
    easeOutElastic: function (x) {
        return x === 0
            ? 0
            : x === 1
                ? 1
                : pow(2, -10 * x) * sin((x * 10 - 0.75) * c4) + 1
    },
    easeInOutElastic: function (x) {
        return x === 0
            ? 0
            : x === 1
                ? 1
                : x < 0.5
                    ? -(pow(2, 20 * x - 10) * sin((20 * x - 11.125) * c5)) / 2
                    : (pow(2, -20 * x + 10) * sin((20 * x - 11.125) * c5)) / 2 + 1
    },
    easeInBounce: function (x) {
        return 1 - bounceOut(1 - x)
    },
    easeOutBounce: bounceOut,
    easeInOutBounce: function (x) {
        return x < 0.5
            ? (1 - bounceOut(1 - 2 * x)) / 2
            : (1 + bounceOut(2 * x - 1)) / 2
    },
}

const cubicBezier = {
    easeInQuad:       [0.55, 0.085, 0.68, 0.53],
    easeInCubic:      [0.55, 0.055, 0.675, 0.19],
    easeInQuart:      [0.895, 0.03, 0.685, 0.22],
    easeInQuint:      [0.755, 0.05, 0.855, 0.06],
    easeInExpo:       [0.95, 0.05, 0.795, 0.035],
    easeInCirc:       [0.6, 0.04, 0.98, 0.335],
    easeInBack:       [0.36, 0, 0.66, -0.56],
    easeOutQuad:      [0.25, 0.46, 0.45, 0.94],
    easeOutCubic:     [0.215, 0.61, 0.355, 1],
    easeOutQuart:     [0.165, 0.84, 0.44, 1],
    easeOutQuint:     [0.23, 1, 0.32, 1],
    easeOutExpo:      [0.19, 1, 0.22, 1],
    easeOutCirc:      [0.075, 0.82, 0.165, 1],
    easeOutBack:      [0.34, 1.56, 0.64, 1],
    easeInOutQuad:    [0.455, 0.03, 0.515, 0.955],
    easeInOutCubic:   [0.645, 0.045, 0.355, 1],
    easeInOutQuart:   [0.77, 0, 0.175, 1],
    easeInOutQuint:   [0.86, 0, 0.07, 1],
    easeInOutExpo:    [1, 0, 0, 1],
    easeInOutCirc:    [0.785, 0.135, 0.15, 0.86],
    easeInOutBack:    [0.68, -0.6, 0.32, 1.6]
}

export { easings, cubicBezier }
