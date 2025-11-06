export const parseResponse = (response, signature) => {
    const outputs = signature.outputs.map(o => o.name);
    const lines = response.split('\n');
    const result = {};
    for (const key of outputs) {
        const upperKey = key[0]?.toUpperCase() + key.slice(1);
        // console.log('upperKey', upperKey);
        const match = lines.find(line => line.includes(`${upperKey}:`));
        if (match)
            result[key] = match.slice(key.length + 1).trim();
    }
    return result;
};
//# sourceMappingURL=parse-response.js.map