export type DebugCollector = {
    collection: {
        name: string;
        content: any;
        type: 'Section' | 'SubSection';
        startHidden: boolean;
        error: boolean;
    }[];
    collect: (name: string, content: string, startHidden?: boolean) => void;
    error: (name: string, content: string, startHidden?: boolean) => void;
    createSubSection(name: string, startHidden?: boolean): DebugCollector;
    printSection: (id?: string) => string;
    printReport: () => void;
};
export declare const getDebugCollector: () => DebugCollector;
//# sourceMappingURL=debug-collector.d.ts.map