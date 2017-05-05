const spawn = require('child_process').spawn;
const path = require('path'),
pathToModule = path.win32.join(process.env.APPDATA, 'npm', 'node_modules', 'selenium-js', 'lib');
pathToJar = path.win32.join(process.env.APPDATA, 'npm', 'node_modules', 'selenium-js', 'lib', 's.jar');
pathToChrome = '-Dwebdriver.chrome.driver=' +  pathToModule + '\\chromedriver2_29.exe',
pathToFirefox = '-Dwebdriver.gecko.driver=' + pathToModule + '\\geckodriver.exe',
pathToEdge = '-Dwebdriver.edge.driver=' +  pathToModule + '\\MicrosoftWebDriver14393.exe',
pathToPhantom = '-Dwebdriver.phantomjs.driver=' +  pathToModule + '\\phantomjs.exe';

const selenium = spawn('Java', [pathToEdge,pathToChrome,pathToFirefox,pathToPhantom,`-jar`,pathToJar]);
/**
* Run Selenium Standalone with all available browser drivers.
*
* @param name Name of the person to greet.
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