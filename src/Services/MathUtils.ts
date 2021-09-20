export default class MathUtils {
    static round(n: number | null | undefined) {
    if (!n) {
        return 0;
    }
    return Math.round(n * 100) / 100;
    }

    static integrate(array: number[], interval: number) {
    const delta = array.map((v, i, a) => v - (a[i - 1] || 0))
    return delta.map(value => value / interval).slice(1);
    }

    static arraySum(array: number[]) {
    return array.reduce((a, b) => a + b, 0);
    }

    static arrayMean(array: number[]) {
    return MathUtils.arraySum(array) / (array.length);
    }
}