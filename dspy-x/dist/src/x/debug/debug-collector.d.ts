type DebugCollector = {
    collection: {
        name: string;
        content: string;
    }[];
    collect: (name: string, content: string) => void;
    printReport: () => void;
};
export declare const getDebugCollector: () => DebugCollector;
export {};
//# sourceMappingURL=debug-collector.d.ts.map