console.log(`Current running os is: ${process.platform}`);
const spawn = require('child_process').spawn;
const path = require('path');

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

const selenium = spawn('Java', [pathToEdge,pathToChrome,pathToFirefox,pathToPhantom,`-jar`,pathToJar]);
/**
* Run Selenium Standalone with all available browser drivers.
*
* 
*/
var start = () => {

    selenium.stdout.on('data', (data) => {
    console.log(`${data}`);
    });

    selenium.stderr.on('data', (data) => {
    console.log(`${data}`);
    });

    selenium.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
    });
};
 
exports.start = start;