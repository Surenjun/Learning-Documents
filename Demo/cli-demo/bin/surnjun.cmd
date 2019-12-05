#!/usr/bin/env node
const program = require('commander');

program
    .version(require('../package.json').version,'-v, --version', 'output the current version')
    .command('init', '初始化')
    .command('build', '构建')
    .option('-c, --cheese <type>', 'add the specified type of cheese', 'blue')
    .option('-d, --debug', 'output extra debugging')
    .option('-s, --small', 'small pizza size')
    .option('-p, --pizza-type <type>', 'flavour of pizza');

program.parse(process.argv);

console.log(`cheese: ${program.cheese}`);
if (program.debug) console.log(program.opts());
if (program.small) console.log('- small pizza size');
if (program.pizzaType) console.log(`- ${program.pizzaType}`);