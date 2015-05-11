/**
 * Application
 */

import React from 'react'
import Application from './components/Application'
<% if(options.bUseParse) { %>
Parse.initialize('<%= "\<%= PARSE_APP_ID %\>" %>', '<%= "\<%= PARSE_JAVASCRIPT_KEY %\>" %>');<% } %>
window.onload = () => { React.render(<Application />, document.getElementById("app")) }
