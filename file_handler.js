const fs = require('fs')

const get_content = function (path) {
    return new Promise((resolve) => {
        fs.readFile(path, (error, data) => {
            resolve(data.toString())
        })
    });
};

const write_file = function (path, content) {
    fs.writeFile(path, content, () =>  {})
}

module.exports = {get_content, write_file};
