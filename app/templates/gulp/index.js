/**
 * Gulp Task Loader
 */

const fs = require('fs')
const path = require('path')

fs.readdirSync('./gulp/tasks')
  .filter(function(name) {  return /(\.(coffee|js)$)/i.test(path.extname(name)) })
  .forEach(function(task) { require(`./tasks/${task}`) })
