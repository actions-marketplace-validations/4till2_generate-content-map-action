const {get_content} = require('./src/file_handler');
const cp = require('child_process');
const path = require('path');

const TEMP_FILE = 'tmp/test_content_map'

test('read file content as string', async () => {
    const filepath = './README.md'
    let contents = await get_content(filepath)
    expect(typeof contents === 'string').toBeTruthy();
});

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
    process.env['INPUT_FILE_TYPES'] = 'md';
    process.env['INPUT_EXCLUDE_PATH'] = 'node_modules';
    process.env['INPUT_OUTPUT_CONTENT_TYPE'] = 'html';
    process.env['INPUT_OUTPUT_FILE'] = TEMP_FILE;
    const ip = path.join(__dirname, 'src/index.js');
    const result = cp.execSync(`node ${ip}`, {env: process.env}).toString();
    console.log(result);
})
