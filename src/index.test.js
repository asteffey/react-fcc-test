import React from 'react';
import { useFccTest, FccTests } from './index';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('react-fcc-test', () => {

    const TestWrapper = ({ code }) => {
        code();
        return <div id='foo'></div>;
    };

    const getFccTest = () => document.querySelector('script[src="https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js"]');

    beforeEach(() => {
        window.history.pushState({}, '', '/');
        localStorage.clear();
    });

    it('adds FCC tests by default', () => {
        render(<TestWrapper code={() => useFccTest()} />);

        expect(getFccTest()).toBeInTheDocument();
    });

    describe('sets the FCC test correctly', () => {
        const goodTest = FccTests.drum_machine;
        const priorTest = FccTests.scatter_plot;
        const badTest = 'some-test-which-doesnt-exist';

        it('sets the FCC test when specified correctly', () => {
            render(<TestWrapper code={() => useFccTest({fccTest: goodTest})} />);

            expect(localStorage.getItem('project_selector')).toBe(goodTest);
        });

        it('does not set the FCC test when not specified correctly', () => {
            render(<TestWrapper code={() => useFccTest({fccTest: badTest})} />);

            expect(localStorage.getItem('project_selector')).toBeNull();
        });

        it('changes the FCC test previously stored in localStorage when specified correctly', () => {
            localStorage.setItem('project_selector', priorTest);
            render(<TestWrapper code={() => useFccTest({fccTest: goodTest})} />);

            expect(localStorage.getItem('project_selector')).toBe(goodTest);
        });

        it('does not change the FCC test previously stored in localStorage when not specified correctly', () => {
            localStorage.setItem('project_selector', priorTest);
            render(<TestWrapper code={() => useFccTest({fccTest: badTest})} />);

            expect(localStorage.getItem('project_selector')).toBe(priorTest);
        });
       
    });
    
    describe('displays test conditionally based on query parameters', () => {
        it('adds FCC tests by when query parameter is present', () => {
            const testParam = 'test_param';
            window.history.pushState({}, '', `/?${testParam}`);
            render(<TestWrapper code={() => useFccTest({queryParam: testParam})} />);
    
            expect(getFccTest()).toBeInTheDocument();
        });
    
        it('does not add FCC tests by when a query string is specified and no parameters are present', () => {
            const testParam = 'test_param';
            render(<TestWrapper code={() => useFccTest({queryParam: testParam})} />);
    
            expect(getFccTest()).not.toBeInTheDocument();
        });
    
        it('does not add FCC tests by when specified query parameter is not present', () => {
            const testParam = 'test_param';
            window.history.pushState({}, '', '/some_other_parameter');
            render(<TestWrapper code={() => useFccTest({queryParam: testParam})} />);
    
            expect(getFccTest()).not.toBeInTheDocument();
        });
    });
});

