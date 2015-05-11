/**
 * Gulp Config
 */

const SRC_BASE = ''
const TMP_BASE = './.tmp/'
const DEST_BASE = './bundle/'

module.exports = {
    tmp: TMP_BASE,
    dest: DEST_BASE,
    html: {
        src: `${SRC_BASE}html/*.html`,
        tmp: `${TMP_BASE}`,
        dest: `${DEST_BASE}`,
    },
    javascript: {
        entry:`${SRC_BASE}app/app.js`,
        src: `${SRC_BASE}app/**/*.{js,jsx}`,
        tmp: `${TMP_BASE}js/`,
        dest: `${DEST_BASE}js/`,
    },<% if(options.bUseSass) { %>
    sass: {
        src: `${SRC_BASE}sass/**/*.{sass,scss}`,
        tmp: `${TMP_BASE}css/`,
        dest: `${DEST_BASE}css/`,
        includePaths: ['extra-sass'],
        imagePath: '/images',
    },<% } else { %>
    sass: {
        src: `${SRC_BASE}css/**/*.css`,
        tmp: `${TMP_BASE}css/`,
        dest: `${DEST_BASE}css/`,
    },<% } %>
    images: {
        src: `${SRC_BASE}images/**/*`,
        tmp: `${TMP_BASE}images/`,
        dest: `${DEST_BASE}images/`
    },
    vendor: {
        src: `${SRC_BASE}vendor/**/*`,
        tmp: `${TMP_BASE}`,
        dest: `${DEST_BASE}`
    },
    bower: {
        enable: true,
        dest: `${DEST_BASE}vendor/`
    },
    browserSync: {
        autoOpen: true,
        baseDir: [TMP_BASE, DEST_BASE],
        routes: {
            '/vendor': './bower_components'
        }
    },
    parse: {
        cloud: [`${SRC_BASE}cloud/**/*.js`],
        config: `${SRC_BASE}parse/**/*.json`,
        dest: `./deploy`
    }
}
