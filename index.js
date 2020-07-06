/**
 * @file: file
 * @author: zhaojianpeng
 */

const query = require('./lib/query')
const update = require('./lib/update')
// 暴露lib下的模块
module.exports = {
    query,
    update
}