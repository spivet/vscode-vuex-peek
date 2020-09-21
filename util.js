const readline = require('readline');
const fs = require('fs');

/**
 * 获取指定字符串在文件中的第几行
 * @param {String} filePath 文件路径
 * @param {String} word 要匹配的字符串
 */
function getLineNum(filePath, word) {
  let row = 0
  let found = false
  const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
    crlfDelay: Infinity
  })
  // return new Promise((resolve) => {
    rl.on('line', (line) => {
      !found && row++
      if (new RegExp(word, 'gm').test(line)) {
        found = true
      }
      // resolve(row)
    })
  // })
    return row
}

/**
 * 获取字符串中，单引号或双引号里的内容
 * @param {String} str 字符串
 */
function getQuotedString(str) {
  const res = str.match(/['"](.+)['"]/)
  return res[1]
}

/**
 * 获取字符串里，大写字母的位置
 * @param {String} str 需要获取位置的字符串
 */
function getUpercaseIndex(str) {
  const reg = /[A-Z]/g
  const indexArr = []
  let res
  do {
    res = reg.exec(str)
    if (res !== null){
      indexArr.push(res.index)
    }
    
  } while(res !== null)

  return indexArr
}

/**
 * 将小驼峰格式的字符串转换成用短横线分割的字符串
 * @param {String} str 要转换的字符串
 * @param {Array} indexArr 字符串需要转换的位置
 */
function joinString(str, indexArr) {
  const strArr = str.split('')
  indexArr.forEach((indexVal, index) => {
    strArr.splice(indexVal + index, 0, '-')
  })
  return strArr.join('').toLowerCase()
}

/**
 * 
 * @param {Array} storePathArr store 文件夹的路径
 * @param {String} filePath 当前文件所在路径
 */
function findStorePath(storePathArr, filePath) {
  return storePathArr.find(path => filePath.includes(path))
}

module.exports = {
  getLineNum,
  getQuotedString,
  getUpercaseIndex,
  joinString,
  findStorePath
}