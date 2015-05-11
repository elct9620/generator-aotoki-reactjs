import React from 'react/addons';
const TestUtils = React.addons.TestUtils;

jest.dontMock('../app.js');
jest.dontMock('../components/Application.js')
describe('Application', function() {
   it('should be rendered', function() {

        var Application = require('../components/Application.js')
        var App = TestUtils.renderIntoDocument(
            <Application/>
        );

        var mainDiv = TestUtils.findRenderedDOMComponentWithTag(App, 'div');
        expect(mainDiv.getDOMNode().textContent).toEqual('Hello World');
   });
});
