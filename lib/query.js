/**
 * @file: file
 * @author: zhaojianpeng
 */

const Table = require('cli-table')

function query(dists) {
    if (dists.length < 1) {
        console.log('数据为空')
        return
    }
    const keys = Object.keys(dists[0])
    // 建立表头
    const table = new Table({
        head: keys
    })

    // 拼接处表格的每一行
    return dists.reduce((res, item) => {
        table.push(Object.values(item))
        return res
    }, table)
    .toString()
}

module.exports = query