import 'url-search-params-polyfill';
import { useEffect } from 'react';

export const FccTests = {
    tribute_page: 'tribute-page',
    portfolio: 'portfolio',
    survey_form: 'survey-form',
    product_landing_page: 'product-landing-page',
    technical_docs_page: 'technical-docs-page',
    random_quote_machine: 'random-quote-machine',
    markdown_previewer: 'markdown-previewer',
    drum_machine: 'drum-machine',
    pomodoro_clock: 'pomodoro-clock',
    javascript_calculator: 'javascript-calculator',
    bar_chart: 'bar-chart',
    scatter_plot: 'scatter-plot',
    heat_map: 'heat-map',
    choropleth: 'choropleth',
    tree_map: 'tree-map'
};

export const useFccTest = ({ fccTest, queryParam } = {}) => {
    useEffect(() => {
        if (hasQueryParam(queryParam)) {

            setFccTest(fccTest);
            const script = document.createElement('script');
            script.src = 'https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js';
            script.async = true;

            document.body.appendChild(script);

            return function cleanup() {
                script.remove();
            };
        }
    }, [fccTest, queryParam]);
};

const hasQueryParam = (param) => {
    if (isDefined(param))
        return new URLSearchParams(window.location.search).get(param) != null;
    else
        return true;
};

const setFccTest = (fccTest) => {
    if (isDefined(fccTest) && isValidFccTest(fccTest)) {
        localStorage.setItem('project_selector', fccTest);
    }
};

const isDefined = v => typeof v !== 'undefined';

const isValidFccTest = (fccTest) => {
    return Object.values(FccTests).includes(fccTest);
};
