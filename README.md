# xliff-generator

[![Build Status](https://travis-ci.org/markusblasek/node-xliff-generator.svg?branch=master)](https://travis-ci.org/markusblasek/node-xliff-generator)
[![Coverage Status](https://coveralls.io/repos/github/markusblasek/node-xliff-generator/badge.svg)](https://coveralls.io/github/markusblasek/node-xliff-generator)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[![https://nodei.co/npm/xliff-generator.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/xliff-generator.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/xliff-generator)

Reads from an source file the translation keys and 
their corresponding translation values and 
creates the xliff file ([here](https://docs.typo3.org/typo3cms/CoreApiReference/6.2/Internationalization/Introduction/Index.html)).

Currently only csv is supported.

# License

The MIT License. See the [license file](LICENSE) for details.

# Build

```sh
$ npm run build-dev # build module incl. source maps
$ npm run build # build module (for production - no source maps), run eslint and execute unit tests
```

# Testing

```sh
$ npm test
```

# Install

```sh
$ npm install --save xliff-generator
```

# Usage

## sync

````js
'use strict';

const xliffGenerator = require('xliff-generator');

try {
    xliffGenerator.createFromCsvSync({
        csvFile: 'input/csvFile.csv',
        productName: 'myProject',
        printPretty: true,
        csvDelimiter: ',',
        csvComment: '',
        csvEscape: '"',
        csvQuote: '"',
        languageOptions: [
            {
                isSourceLanguage: true,
                languageKey: 'en',
                output: 'output/xliff.en.xml'
            },
            {
                languageKey: 'de',
                output: 'output/xliff.de.xml'
            }
        ]
    });
} catch (err) {
    // An error occured...
    console.error(err);
}
````

## async

````js
'use strict';

const xliffGenerator = require('xliff-generator');

xliffGenerator.createFromCsv({
    csvFile: 'input/csvFile.csv',
    productName: 'myProject',
    printPretty: true,
    csvDelimiter: ',',
    csvComment: '',
    csvEscape: '"',
    csvQuote: '"',
    languageOptions: [
        {
            isSourceLanguage: true,
            languageKey: 'en',
            output: 'output/xliff.en.xml'
        },
        {
            languageKey: 'de',
            output: 'output/xliff.de.xml'
        }
    ]
})
.then(() => {
    // Successfully completed
}).catch((err) => {
    // An error occured...
    console.error(err);
});
````

## Parameters

|Parameter|Mandatory|Default Value|Description|
|-|-|-|-|
|csvFile|yes|--|The path to the csv file|
|productName|yes|--|The product name used in the resulting xlif file|
|printPretty|no|`false`|If `true` the resulting xml file will be printed pretty (see also [here](http://csv.adaltas.com/parse/))|
|csvDelimiter|no|`','`|The csv delimiter. Exactly one character has to be entered (see also [here](http://csv.adaltas.com/parse/))|
|csvComment|no|`''`|The csv comment character. Zero or one character has to be entered (see also [here](http://csv.adaltas.com/parse/))|
|csvEscape|no|`'"'`|The csv escape character. Exactly one character has to be entered (see also [here](http://csv.adaltas.com/parse/))|
|csvQuote|no|`'"'`|The csv quote character. Exactly one character has to be entered (see also [here](http://csv.adaltas.com/parse/))|
|languageOptions|yes|--|The supported languages. Exactly one element has to be a source language (the boolean value of the `isSourceLanguage` has to be `true`)

### Parameters: languageOptions

|Parameter|Mandatory|Default Value|Description|
|-|-|-|-|
|isSourceLanguage|depends|`false`|true if the language is a source language. See also parameter `languageOptions`|
|languageKey|yes|--|The language key. See also at the [structure of the csv file](#Structure-of-the-csv-file)|
|output|yes|--|Path where the resulting xml file of the language will be stored 

# Structure of the csv file

## Header

The first row of the csv file contains the header information. The first column of the header contains the translation id. The following colums contains the language keys e.g. `en`, `de` etc.. The values of the language keys must match with the entered values of the `languageOptions`.

The following rows contains per row exactly one translation values.

## Example

````
key,en,de
errorMessage.error1,Error message 1,Fehlermeldung 1
errorMessage.error2,Error message 2,Fehlermeldung 2
````

# Example of a xml file

````xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<xliff version="1.0">
  <file datatype="plaintext" date="2018-06-11T22:55:35.935Z" 
  	original="input/csvFile.csv" productname="myProject" source-language="en">
    <header/>
    <body>
      <trans-unit id="errorMessage.error1" xml:space="preserve">
        <source>Error message 1</source>
      </trans-unit>
      <trans-unit id="errorMessage.error2" xml:space="preserve">
        <source>Error message 2</source>
      </trans-unit>
    </body>
  </file>
</xliff>
````
