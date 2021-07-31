const moment = require("moment"); // npm i moment
function formatMessage(username, text) {
    return {
        username,
        text
    };
}

module.exports = formatMessage;
