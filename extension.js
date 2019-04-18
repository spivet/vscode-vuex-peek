const vscode = require('vscode')
const path = require('path')
const fs = require('fs')
const util = require('./util')

/**
 * 查找文件定义的provider，匹配到了就return一个location，否则不做处理
 * 最终效果是，当按住Ctrl键时，如果return了一个location，字符串就会变成一个可以点击的链接，否则无任何效果
 * @param {*} document 
 * @param {*} position
 */
function provideDefinition(document, position) {
	const fileName	= document.fileName
	const filePath = document.uri.path
	const workspacePath = vscode.workspace.workspaceFolders[0].uri.path.substr(1)
	const word		= document.getText(document.getWordRangeAtPosition(position))
	const line		= document.lineAt(position)

	const storePathArr = vscode.workspace.getConfiguration().get('vuex_peek.storePath')
	const storePath = util.findStorePath(storePathArr, filePath)
	// 光标所在行的文字内容
	const lineText = line.text.trim()
	// const projectPath = util.getProjectPath(document)

	console.log('====== 进入 provideDefinition 方法 ======')
	console.log('fileName: ' + fileName) // 当前文件完整路径
	console.log('workspaceFolders: ' + workspacePath) // 当前文件所在目录
	console.log('word: ' + word) // 当前光标所在单词
	console.log('line: ' + line.text.trim()) // 当前光标所在行
	// 只处理package.json文件
	if (lineText.slice(0, 2) === 'vx') {
		const address = util.getQuotedString(lineText)
		const addressArr = address.split('/')
		let destPath
		// vuex 状态没有定义在 module 里
		if (addressArr.length === 1) {
			destPath = `${workspacePath}/${storePath}/store/index.js`
		}
		// vuex 状态定义在 module 里
		if (addressArr.length === 2) {
			const module = addressArr[0]
			const upercaseIndex = util.getUpercaseIndex(module)
			const dirname = util.joinString(module, upercaseIndex)
			destPath = `${workspacePath}/${storePath}/store/modules/${dirname}/index.js`
		}
		if (fs.existsSync(destPath)) {
			return new vscode.Location(vscode.Uri.file(destPath), new vscode.Position(0, 0))
		}
	}
}

exports.activate = function(context) {
	// 注册如何实现跳转到定义，第一个参数表示仅对 vue 文件生效
	context.subscriptions.push(vscode.languages.registerDefinitionProvider(['vue'], {
		provideDefinition
	}))
}
