import connectSSI from 'connect-ssi';
import bs from 'browser-sync';

const browser = bs.create();

browser.init({
    files: [
        'assets/**/*.js'
    ],
    server: {
        baseDir: '.',
        middleware: [
            connectSSI({
                ext: '.html',
                baseDir: '.'
            })
        ]
    }
});
