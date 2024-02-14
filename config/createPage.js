const path = require('path')

const craetePage = (page) => path.resolve('./views', `${page}.ejs`)


module.exports = craetePage