import React from 'react';
import { expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { spy } from 'sinon';

const adapter = new Adapter();
Enzyme.configure({ adapter });

import App from '../src/components/App';
import Schools from '../src/components/Schools';
import SchoolsCreateUpdate from '../src/components/SchoolsCreateUpdate';
import store from '../src/store';

describe('The `School` React Components:', () => {

    const SCHOOLS = [
        { 
            name: 'George Washington',
            description: 'GW',
            address: '231 Main Street, New York, NY 10007' 
        },
        { 
            name: 'Cornwell',
            description: 'CW',
            address: '43 Stewart Avenue, Brooklyn, NY 11216'
        },
        { 
            name: 'West Hempstead',
            description: 'WH',
            address: '4 Linden Street, West Hempstead, NY 11552' 
        }
    ]

    describe('<App /> component', () => {
        let app;

        beforeEach('Create component', () => {
            
            // 'shallow' is a method provided by the enzyme library.
            // It performs a 'virtual render', the component, just as if a parent component had rendered it (or just as if
            // we passed it to ReactDOM.render). However, it doesn't render to the real DOM. Instead, it returns a 'wrapper.'
            // This 'wrapper' object contains information about what the rendered component would look like, and provides
            // useful methods for testing it.

            app = shallow(<App store={ store }/>);
        })

        it('has a `loading` field on its state', () => {
            
            // ShallowWrapper.state() gives us the current 'this.state' of the component
            expect(app.state().loading).to.exist;
        })
    })
})