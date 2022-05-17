import path from 'path'
const files = require.context('./', true, /\.js$/)
let modules = {}
files.keys().map(e => {
    const list = e.substr(2).split('/')
    const parents = list.slice(0, list.length - 1)
    // 获取文件名
    const name = path.basename(e, '.js')
    let curr = modules
    let prev = null


    parents.forEach(k => {
        if (!curr[k]) {
            curr[k] = {}
        }
        prev = curr
        curr = curr[k]
    })


    curr[name] = files(e)
})
delete modules.index


export default modules