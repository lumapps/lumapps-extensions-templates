import babel from 'rollup-plugin-babel'
import postcss from 'rollup-plugin-postcss'
import resolve from 'rollup-plugin-node-resolve' // For paths resolving
import commonjs from 'rollup-plugin-commonjs' // For @lumapps-widget resolving
import json from 'rollup-plugin-json' // For translations
import image from '@rollup/plugin-image'
import filesize from 'rollup-plugin-filesize'

import config, { useGlobalSettings } from './src/config'

export const plugins = [
	postcss({
		extensions: ['.css']
	}),
	babel({
		plugins: ['@babel/plugin-proposal-class-properties'],
		presets: ['@babel/env', '@babel/preset-react']
	}),
	json(),
	resolve({
		browser: true,
    modulesOnly: true,
		extensions: ['.mjs', '.js', '.jsx', '.json']
	}),
	commonjs({
		include: [
			'node_modules/@lumapps-extensions-playground/common/**',
			'node_modules/@lumapps-extensions-playground/translations/**'
		]
	}),
	image(),
	filesize()
]

export const outputFormat = 'amd'

const input = `src/${
	useGlobalSettings ? 'index.widget.js' : 'index.widget.no_global.js'
}`

export default {
	input,
	output: {
		file: `${config.bundleName}`,
		format: outputFormat
	},
	context: 'this', // temp hack because we are bundling the raw code of react intl with our widget
	plugins
}
