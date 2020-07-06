/**
 * @file: file
 * @author: zhaojianpeng
 */
const axios = require('axios')
const compareVersions = require('compare-versions')

module.exports = async(v) =>{
    const res = await axios({
        url: 'https://nodejs.org/dist/index.json',
        timeout: 1500
    })
    const { data } = res

    console.log(data)
    return data.filter(node => {
        const cp = v
            ? (compareVersions(node.version, `v${v}.0.0`) >= 0) : true
        return node.lts && cp
    }).map(it => {
        // 去掉file这个字段，这个方法好！！
        const { files, ...rest } = it
        return { ...rest }
    })
}

