const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const ora = require('ora');
const projectPath = process.cwd();
const bundleFile = require('./3.webacpk-ast');

function init() {
    const spinner = ora('正在打包配置文件...');
    spinner.start();

    const config = {
        entry: './src/index.js',
        output: './dist/main.js'
    };

    const result = bundleFile(config);
    try {
        fs.writeFileSync(path.join(projectPath, config.output), result)
    } catch (e) {
        fs.mkdirSync(path.dirname(config.output));
        fs.writeFileSync(path.join(projectPath, config.output), result)
    }
    spinner.stop();
    chalk.yellow('已生成对应文件.')
}

init();
