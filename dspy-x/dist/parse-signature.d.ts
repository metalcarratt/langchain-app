export type Variable = {
    name: string;
    type: string;
};
export type Signature = {
    inputs: Variable[];
    outputs: Variable[];
};
export declare const ERROR_NO_INPUTS = "No inputs found";
export declare const ERROR_INPUT_NO_NAME = "Input without name found";
export declare const ERROR_NO_OUTPUTS = "No outputs found";
export declare const ERROR_OUTPUT_NO_NAME = "Output without name found";
export declare const parseSignature: (signature: string) => Signature;
//# sourceMappingURL=parse-signature.d.ts.map