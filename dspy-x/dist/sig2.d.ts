export type Variable2 = {
    name: string;
    desc?: string;
};
export type Output = {
    type?: string;
} & Variable2;
export type Signature2 = {
    action: string;
    inputs: Variable2[];
    outputs: Output[];
};
//# sourceMappingURL=sig2.d.ts.map