import { htmlReport, htmlSection, htmlSubSection } from './generate-html.js';
import { printToFile } from './print-to-file.js';
export const getDebugCollector = () => ({
    collection: [],
    collect(name, content, startHidden = true) {
        this.collection.push({ name, content, type: 'Section', startHidden, error: false });
    },
    error(name, content, startHidden = true) {
        this.collection.push({ name, content, type: 'Section', startHidden, error: true });
    },
    createSubSection(name, startHidden = true) {
        const subSection = getDebugCollector();
        this.collection.push({ name, content: subSection, type: 'SubSection', startHidden, error: false });
        return subSection;
    },
    printSection(id = '') {
        return this.collection.map((section, index) => {
            const nindex = index + 1;
            if (section.type === 'SubSection') {
                return htmlSubSection(section.name, section.content.printSection(`${id}${nindex}-`), section.startHidden, `section${id}${nindex}`);
            }
            return htmlSection(section.name, `${section.content}`, section.startHidden, `section${id}${nindex}`, section.error);
        }).join('');
    },
    printReport() {
        const sections = this.printSection();
        const html = htmlReport('Report', sections);
        printToFile(html);
    }
});
//# sourceMappingURL=debug-collector.js.map