const spawn = require('child_process').spawn;
const selenium = spawn('C:\\ProgramData\\Oracle\\Java\\javapath\\java.EXE', ['-Dwebdriver.edge.driver=MicrosoftWebDriver14393.exe', '-Dwebdriver.chrome.driver=chromedriver2_29.exe', '-Dwebdriver.firefox.driver=geckodriver.exe','-Dwebdriver.phantomjs.driver=phantomjs.exe', '-jar', 's.jar']);
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