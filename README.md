## Overview
A React hook to add the freeCodeCamp test suite bundle.

## Installation

`npm install @asteffey/react-fcc-test` or `yarn add @asteffey/react-fcc-test`

## Usage

- `import { useFccTest, FccTests } from '@asteffey/react-fcc-test'`
- `useFccTest()` will display the FCC test suite.
- `useFccTest({fccTest: 'random-quote-machine'})` will select the specified test from the test suite's dropdown list.  `FccTests` contains an enumeration of all acceptable tests (e.g., `FccTests.random_quote_machine`, `FccTests.bar_chart`).
- `useFccTest({queryParam: 'some-parameter'})` will only display the FCC test suite if the specified parameter is present in the URL query string.

## Example

```javascript
import React from 'react';
import { useFccTest, FccTests } from '@asteffey/react-fcc-test';

const App = () => {
    useFccTest({
        fccTest: FccTests.random_quote_machine,
        queryParam: 'fcc-test'
    });

    return (
        <main>
            ...
        </main>
    );
};

export default App;
```
