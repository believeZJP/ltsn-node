#!/usr/bin/env node

const color = require('cli-color')
// 加载package.json文件
const pkg = require('../package')

// 从顶层index.js中拿到lib下面模块暴露的方法
const query = require('..').query
const update = require('..').update

// 输出结果到命令行
function printResult(v) {
    update(v).then(dists => {
        if (!dists) {
            return;
        }
        const result = query(dists)
        console.log(color.blue(result))
        process.exit()
    })
}

// 打印版本号
function printVersion() {
    console.log(color.bold('ltsnode ' + pkg.version))
    process.exit()
}

// 一些命令的帮助提示
function printHelp(code) {
    const lines = [
        '',
        '  Usage:',
        '    ltsnode [8]',
        '',
        '  Options:',
        '    -v, --version             print the version of vc',
        '    -h, --help                display this message',
        '',
        '  Examples:',
        '    $ ltsnode 8',
        ''
    ]
    console.log(lines.join('\n'))
    process.exit(code || 0)
}

// 包的入口函数，里面对参数做剪裁处理，拿到入参并给予不同入参的处理逻辑
function main(argv) {
    if (!argv || !argv.length) {
        printHelp(1);
    }

    const getArg = function() {
        let args = argv.shift()
        args = args.split('=')

        if (args.length > 1) {
            argv.unshift(args.slice(1).join('='))
        }
        return args[0]
    }

    let args

    while(argv.length) {
        arg = getArg()
        switch(arg) {
            case '-v':
            case '-V':
            case '--version':
                printVersion()
                break
            case '-h':
            case '-H':
            case '--help':
                printHelp()
                break
            default:
                printResult(arg)
        }
    }
}

// 启动程序就开始执行主函数
main(process.argv.slice(2))

module.exports = main