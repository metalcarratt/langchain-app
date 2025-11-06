export type Variable = {
    name: string;
    desc?: string;
};
export type Output = {
    type?: string;
} & Variable;
export type Signature = {
    action: string;
    inputs: Variable[];
    outputs: Output[];
};
//# sourceMappingURL=signature.d.ts.map