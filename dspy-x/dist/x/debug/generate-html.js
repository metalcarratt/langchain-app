export const htmlReport = (title, body) => `
<html>
    <head>
        <title>Debug Report</title>
        <link rel="stylesheet" href="debug.css">
        <script src="debug.js"></script>
    </head>
    <body>
        <h1>${title}</h1>
        <div class="report">
        ${body}
        </div>
    </body>
<html>
`;
export const htmlSection = (title, section, startHidden, id, error) => `
<div class="section ${startHidden ? 'hidden' : 'showing'} ${error ? 'error' : ''}">
    <h2>
        ${title}
        <a href="#" onclick="hide('${id}', event)" class="hideBtn">hide</a>
        <a href="#" onclick="show('${id}', event)" class="showBtn">show</a>
    </h2>
    <pre id="${id}">${section}</pre>
</div>
`;
export const htmlSubSection = (title, section, startHidden, id) => `
<div class="section ${startHidden ? 'hidden' : 'showing'}">
    <h2>
        ${title}
        <a href="#" onclick="hide('${id}', event)" class="hideBtn">hide</a>
        <a href="#" onclick="show('${id}', event)" class="showBtn">show</a>
    </h2>
    <div class="subSection" id=${id}>${section}</div>
</div>
`;
//# sourceMappingURL=generate-html.js.map