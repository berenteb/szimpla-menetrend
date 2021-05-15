const { exec } = require("child_process");
function run_update() {
    return new Promise((resolve, reject) => {
        exec("gtfs-import", (error, stdout, stderr) => {
            if (error) {
                console.log(`An error occured during update: ${error}`);
                reject();
            }
            if (stderr) {
                console.log(`An error occured during update: ${stderr}`);
                reject();
            }
            console.log(`DB Updated!`);
            resolve();
        })
    })
}
module.exports = run_update;