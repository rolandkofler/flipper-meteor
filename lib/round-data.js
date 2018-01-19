export const roundPc = (x) => Math.round((x + 1e-15) * 10000) / 100; //1e-15 scaling for binary division problems
export const round2 = (x) => Math.round((x + 1e-15) * 10000) / 10000; //1e-15 scaling for binary division problems
export const formatNumbers = (input) => {
    const str = '' + input;
    const splitIntoParts = str.split('.');
    let x1 = splitIntoParts[0];
    const x2 = splitIntoParts.length > 1 ? `.${x[1]}` : '';
    const rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return `${x1}${x2}`
}
export default {
    round2,
    roundPc,
    formatNumbers
}