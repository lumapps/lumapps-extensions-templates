#!/usr/bin/env node
const path = require('path')
const fs = require('fs-extra')
const argv = require('minimist')(process.argv.slice(2))
const inquirer = require('inquirer');
const chalk = require('chalk')

function logHelp() {
	console.log(`
  Usage: create-lumapps-extension [folder] [--options]

  Options:
	--help, -h                 [boolean] show help
	--version, -v              [boolean] show version
	--template, -t             [string]  use specified template (react)
 `)
}

console.log(chalk.cyan(`create-lumapps-extension v${require('./package.json').version}`))
async function init() {
	const targetDir = argv._[0]
	if(!targetDir) {
		console.error(chalk.red('Please provide a target folder !'))
		logHelp()
		process.exit(1)
	}
	const cwd = process.cwd()
	const root = path.join(cwd, targetDir)
	const renameFiles = {
		_gitignore: '.gitignore'
	}

	const { help, h, template, t, version, v } = argv

	if(help || h) {
		logHelp()
		return
	} else if (version || v) {
		// noop, already logged
		return
	}

	// Template prompt
	let choosedTemplate = t || template
	if(!choosedTemplate) {
		const choices = [
			{key: 1, name: 'Widget Extension', value: 'widget-extension'},
			{key: 2, name: 'Share Extension', value: 'share-extension'}
			{key: 3, name: 'Empty Extension', value: 'empty-extension'}
		]
		choice = await inquirer.prompt({
			type: 'list',
			message: 'Choose a template',
			name: 'template',
			choices
		})
		choosedTemplate = choice.template
	}

	console.log("\n--------------------")
	console.log(`\nScaffolding project in ${root}...`)
	
	await fs.ensureDir(root)

	const templateDir = path.join(
		__dirname,
		`template-${choosedTemplate}`
	)
	const write = async (file, content) => {
		const targetPath = renameFiles[file]
			? path.join(root, renameFiles[file])
			: path.join(root, file)
		if (content) {
			await fs.writeFile(targetPath, content)
		} else {
			await fs.copy(path.join(templateDir, file), targetPath)
		}
	}


	const files = await fs.readdir(templateDir)
	for (const file of files.filter((f) => f !== 'package.json')) {
		await write(file)
    }

	const pkg = require(path.join(templateDir, `package.json`))
	pkg.name = path.basename(root)
	await write('package.json', JSON.stringify(pkg, null, 2))

	console.log(`\n${chalk.green('Done')}. Now run:\n`)
	console.log(chalk.cyan(` 
	${root !== cwd && `cd ${path.relative(cwd, root)}`}
	npm install (or \`yarn\`)
	npm run start (or \`yarn start\`)
	`))
	console.log()
}

init().catch((e) => {
	console.error(e)
})
