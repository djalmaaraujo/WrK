const sade = require('sade')
const prog = sade('wrk')
const version = require('./package.json').version
const figlet = require('figlet')
const chalk = require('chalk')
const clear = require('clear')

const commandEntry = require('./commands/entry')

const log = (x) => console.log(x)
const layout = new Promise((rs, rj) => {
  figlet('WrK   logger', (err, data) => {
    if (err) rj(err)

    clear()
    log(chalk.yellow(data))
    rs(true)
  })
})

layout.then(() => {
  prog.version(version)

  prog
    .command('e <entry>')
    .describe('List your entries')
    .option('e, --entries')
    .action(commandEntry.list)

  prog
    .command('add <entry>')
    .describe('Add a new entry')
    .example('add Did something yesterday')
    .example('--add Did something yesterday')
    .option('add, --add')
    .action(commandEntry.create)

    prog.parse(process.argv)
})