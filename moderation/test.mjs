const expMilliseconds = 1685091160 * 1000;
const iatMilliseconds = 1684952330 * 1000;
const currentlyMilliseconds = 1685101446 * 1000;

console.log("exp ==> ", new Date(expMilliseconds).toISOString().replace("T", " ").replace(".000Z", ""));
console.log("timestamp atendimento ==> ", new Date(currentlyMilliseconds).toISOString().replace("T", " ").replace(".000Z", ""));
