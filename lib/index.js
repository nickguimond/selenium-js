// console.log(`Current running os is: ${process.platform}`);
const spawn = require('child_process').spawn;
const path = require('path');
const http = require('http');

    let pathToModule;
    let pathToJar;
    let chromedriverVersion;
    let geckodriverVersion;
    let edgeVersion;
    let phantomJSVersion;

if(process.platform === "win32") {
    pathToModule = path.win32.join(process.env.APPDATA, 'npm', 'node_modules', 'selenium-js', 'drivers','windows');
    pathToJar = path.win32.join(process.env.APPDATA, 'npm', 'node_modules', 'selenium-js', 'lib', 's.jar');
    chromedriverVersion = '\\chromedriver2_29.exe';
    geckodriverVersion = '\\geckodriver.exe';
    edgeVersion = '\\MicrosoftWebdriver14393.exe';
    phantomJSVersion = '\\phantomjs.exe'
} else {
    pathToModule = path.join('usr','local','lib','node_modules', 'selenium-js', 'drivers');
    pathToJar = path.join('usr','local','lib','node_modules', 'selenium-js', 'lib', 's.jar');
    chromedriverVersion = '\\chromedriver2_29';
    geckodriverVersion = '\\geckodriver16_1';
    phantomJSVersion = '\\phantomjs2_1_1'
}

pathToChrome = '-Dwebdriver.chrome.driver=' +  pathToModule + chromedriverVersion,
pathToFirefox = '-Dwebdriver.gecko.driver=' + pathToModule + geckodriverVersion,
pathToEdge = '-Dwebdriver.edge.driver=' +  pathToModule + edgeVersion,
pathToPhantom = '-Dwebdriver.phantomjs.driver=' +  pathToModule + phantomJSVersion;

const start = () => {


http.get({ host: '127.0.0.1', port:'4444', path: '/wd/hub/status'}, (res) => {
        const { statusCode } = res;
        const contentType = res.headers['content-type'];
        if (statusCode !== 200) { console.log(`Request Failed. \nStatus Code: ${statusCode}`); }
        
        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });
        res.on('end', () => {
            try {
            const parsedData = JSON.parse(rawData);
            console.log(`Selenium server allready running on localhost port 4444 
Selenium version: ${parsedData.value.build.version}
Operating System: ${parsedData.value.os.name}
Java version: ${parsedData.value.java.version}
`);
            } catch (e) {
            console.error(e.message);
            }
        });
        }).on('error', (e) => {
        if(e.message === 'connect ECONNREFUSED 127.0.0.1:4444') {
            console.error(`No selenium server currently running on localhost:4444 \nStarting new selenium server instance...`);
            const selenium = spawn('Java', [pathToEdge,pathToChrome,pathToFirefox,pathToPhantom,`-jar`,pathToJar]);
            selenium.stdout.on('data', (data) => {
            console.log(`${data}`);
            });

            selenium.stderr.on('data', (data) => {
            console.log(`${data}`);
            });

            selenium.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
            });
        } else {
            console.error(`Error: ${e.message}`);
        }
        });

};
 
exports.start = start;