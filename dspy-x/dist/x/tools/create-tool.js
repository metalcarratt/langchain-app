import z from "zod";
const defaultSig = {
    input: z.object({}),
    output: z.string()
};
export const createTool = ({ name, instruct, deterministic, signature: sig, call }) => {
    const resolvedSig = sig ?? defaultSig;
    return {
        name,
        instruct,
        deterministic,
        signature: resolvedSig,
        call
    };
};
//# sourceMappingURL=create-tool.js.map