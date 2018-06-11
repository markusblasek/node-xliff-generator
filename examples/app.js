const path = require('path');

var xliffGenerator = require('../dist/');
const outputPath = 'output';
const csvFile = 'testdata/languagekeys.csv';

try{
    xliffGenerator.createFromCsvSync({
        csvFile: csvFile,
        projectName: 'projectName123',
        printPretty: true,
        csvComment: '#',
        csvDelimiter: ';',
        csvEscape: '"',
        csvQuote: '"',
        languageOptions: [
            {
                isSourceLanguage: true,
                languageKey: 'en',
                output: path.join(outputPath, 'xlif.en.xml')
            },
            {
                languageKey: 'de',
                output: path.join(outputPath, 'xlif.de.xml')
            }
        ]
    });
}catch(err) {
    console.error(err);
}


// xliffGenerator.createFromCsv({
//     csvFile: csvFile,
//     projectName: 'projectName123',
//     printPretty: true,
//     csvComment: '#',
//     csvDelimiter: ';',
//     languageOptions: [
//         {
//             isSourceLanguage: true,
//             languageKey: 'en',
//             output: path.join(outputPath, 'xlif.en.xml')
//         },
//         {
//             languageKey: 'de',
//             output: path.join(outputPath, 'xlif.de.xml')
//         }
//     ]
// }).then(() => {
//     console.log('done!');
// }).catch((err) => {
//     console.error('An error occurred...:(');
//     console.error(err);
// });
