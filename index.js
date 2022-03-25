const core = require('@actions/core');
const glob = require('@actions/glob');
const exec = require('@actions/exec');

const {get_content, write_file} = require('./file_handler');


// most @actions toolkit packages have async methods
async function run() {
    try {
        const output_file = core.getInput('output_file')
        const include = core.getInput('file_types').split(' ').map(ext => `**/*.${ext}`)
        const exclude = core.getInput('exclude_path').split(' ').map(ext => `!**/*${ext}`)
        const patterns = include.concat(exclude)
        const globber = await glob.create(patterns.join('\n'))
        const files = await globber.glob()

        core.info(`Getting files with pattern:  ${patterns}`);
        core.info(`Matching files:  ${files}`);

        let contents = await Promise.all(
            files.map(async (file) => {
                return {
                    filename: file,
                    lastmodified: await lastModified(file),
                    content: await get_content(file)
                }
            }))

        if (output_file) write_file(`${output_file}.json`, JSON.stringify(contents))
        core.setOutput('contents', contents);
    } catch (error) {
        core.setFailed(error.message);
    }
}

const lastModified = async (file) => {
    let result = '';
    let error = '';

    const options = {};
    options.listeners = {
        stdout: (data) => {
            result += data.toString();
        },
        stderr: (data) => {
            error += data.toString();
        }
    };
    await exec.exec('git', ['log', '-1', '--format=%cI', file], options)
    return result ? result.trim() : new Date()
}

run();
