export const groupBy = (arr, key) => {
    return arr.reduce((acc, value) => {
        (acc[value[key]] = acc[value[key]] || []).push(value);
        return acc;
    }, {})
}