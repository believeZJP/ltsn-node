/**
 * @file: file
 * @author: zhaojianpeng
 */
const axios = require('axios')
const compareVersions = require('compare-versions')

module.exports = async(v) =>{
    console.log('开始调接口')
    try {
        const res = await axios({
            url: 'https://nodejs.org/dist/index.json',
            timeout: 1500
        })
        
    } catch (error) {
        console.error('链接超时')
        return
    }
    const { data } = res

    return data.filter(node => {
        const cp = v
            ? (compareVersions(node.version, `v${v}.0.0`) >= 0) : true
        return node.lts && cp
    }).map(it => {
        // 去掉file这个字段，这个方法好！！
        const { files, ...rest } = it
        // 添加文档链接
        const doc = color.yellow(terminalLink('API', `https://nodejs.org/dist/${it.version}/docs/api/documentation.html`))
        return { ...rest, doc }
    })
}

