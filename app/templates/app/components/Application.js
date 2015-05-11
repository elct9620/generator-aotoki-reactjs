/**
 * Application
 */

import React from 'react';

/**
 *
 * Current not support Mixin in ES6, use old React.createClass instead below code
 *
export default class Application extends React.Component {
    render() {
        return (
            <div>Hello World</div>
        );
    }
}
*/

export default React.createClass({
    render: ()=> {
        return (
            <div>Hello World</div>
        );
    }
});
