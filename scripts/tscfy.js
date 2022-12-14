const chalk = require('chalk');
const execa = require('execa');
const fs = require('fs-extra');
const { run } = require('./run');

function getCommand(watch) {
    const args = [
        '--outDir ./lib/ts3.9',
        '--listEmittedFiles false',
        '--declaration true',
        '--noErrorTruncation',
        '--pretty',
        '--emitDeclarationOnly',
    ];

    if (watch) {
        args.push('-w', '--preserveWatchOutput');
    }

    return `yarn run -T tsc ${args.join(' ')}`;
}

async function tscfy(options = {}) {
    const { watch = false, silent = false, errorCallback } = options;
    const tsConfigFile = 'tsconfig.json';

    if (!(await fs.pathExists(tsConfigFile))) {
        if (!silent) {
            console.log(`No '${chalk.yellow(tsConfigFile)}'`);
        }
        return;
    }

    const tsConfig = await fs.readJSON(tsConfigFile);

    if (!(tsConfig && tsConfig.lerna && tsConfig.lerna.disabled === true)) {
        const command = getCommand(watch);
        await run({ watch, command, silent, errorCallback });
    }

    if (!watch) {
        await execa.command('yarn run -T downlevel-dts lib/ts3.9 lib/ts3.4');
    }
}

module.exports = {
    tscfy,
};