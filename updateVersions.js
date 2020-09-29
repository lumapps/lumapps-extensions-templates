#!/usr/bin/env node
const fs = require('fs-extra')
const path = require('path')
// const inquirer = require('inquirer')
const argv = require('minimist')(process.argv.slice(2))

function logHelp() {
	console.log(`
  Usage: node updateVersions [--options]
  Options:
	--help, -h                                       [boolean] show help
	--version, -v                                    [boolean] show version
	--updateLumappsPlaygroundDeps, -ulpd             [string]  update @lumapps-extensions-playground deps to specified version
 `)
}

async function init() {
	const templates = (await fs.readdir(__dirname)).filter((d) =>
		d.startsWith('template-')
	)
	const currentPkg = require(path.join(__dirname, `package.json`))

	const { help, h, version, v, updateLumappsPlaygroundDeps, ulpd } = argv

	if (help || h) {
		logHelp()
		return
	} else if (version || v) {
		// noop, already logged
		return
	}

	let updatePlaygroundDepsToVersion
	if (updateLumappsPlaygroundDeps || ulpd) {
		updatePlaygroundDepsToVersion = updateLumappsPlaygroundDeps || ulpd
		console.log(
			'Updating @lumapps-extensions-playground deps to version ' +
				updatePlaygroundDepsToVersion
		)
	}

	console.log('Updating package versions to ' + currentPkg.version)

	for (const t of templates) {
		const pkgPath = path.join(__dirname, t, `package.json`)
		const pkg = require(pkgPath)

		// Update package json version
		pkg.version = currentPkg.version

		if (updatePlaygroundDepsToVersion) {
			pkg.dependencies[
				'@lumapps-extensions-playground/common'
			] = `^${updatePlaygroundDepsToVersion}`
			pkg.dependencies[
				'@lumapps-extensions-playground/translations'
			] = `^${updatePlaygroundDepsToVersion}`
			pkg.devDependencies[
				'@lumapps-extensions-playground/devenv'
			] = `^${updatePlaygroundDepsToVersion}`
		}

		await fs.writeFile(pkgPath, JSON.stringify(pkg, null, 2))
	}
}

init().catch((e) => {
	console.error(e)
})
