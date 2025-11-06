export declare const checkEmail: (input: {
    email: string;
}, debug?: boolean) => Promise<{
    prompt: string;
    raw: string;
    data: {
        reason: string;
        safety: "dangerous" | "warning" | "safe";
    };
}>;
//# sourceMappingURL=email-checker.d.ts.map