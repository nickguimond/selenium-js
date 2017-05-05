const spawn = require('child_process').spawn;
const path = require('path');
const selenium = spawn('C:\\ProgramData\\Oracle\\Java\\javapath\\java.EXE', [
    `-Dwebdriver.edge.driver=${process.env.APPDATA}\\npm\\node_modules\\selenium-js\\lib\\MicrosoftWebDriver14393.exe`,
    `-Dwebdriver.chrome.driver=${process.env.APPDATA}\\npm\\node_modules\\selenium-js\\lib\\chromedriver2_29.exe`,
    `-Dwebdriver.gecko.driver=${process.env.APPDATA}\\npm\\node_modules\\selenium-js\\lib\\geckodriver.exe`,
    `-Dwebdriver.phantomjs.driver=${process.env.APPDATA}\\npm\\node_modules\\selenium-js\\lib\\phantomjs.exe`,
    `-jar`,
    `${process.env.APPDATA}\\npm\\node_modules\\selenium-js\\lib\\s.jar`]);
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