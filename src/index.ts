import yargs from 'yargs'
import Server from './server'

// const argv = yargs.options({
//   port: { type: 'number' },
// }).argv;

yargs
    .command('server [port]', 'start the server', (yargs) => {
        yargs
            .positional('port', {
                describe: 'port to bind on',
                default: 3000,
            })
    }, (argv) => {
        if (argv.verbose) console.info(`start server on :${argv.port}`)

        const port: any = argv.port

        new Server({ port: port })
    })
    .command('build', 'build your static website', (yargs) => {}, (argv) => {
        console.error('not yet implemented')
    })
    .command('test', 'test if your startpage is compatible with https://customstart.page', (yargs) => {}, (argv) => {
        console.error('not yet implemented')
    })
    .option('verbose', {
        alias: 'v',
        type: 'boolean',
        description: 'Run with verbose logging'
    })
    .demandCommand()
    .help()
    .argv
