#!/usr/bin/env node
import { join, basename, relative } from "path";
import fs from "fs-extra";
import minimist from "minimist";
import inquirer from "inquirer";
import chalk from "chalk";

import packageJson from "./package.json" assert { type: "json" };

import updateExtension from "./utils/updateExtension.js";
import { getDirname } from "./utils/getDirname.js";
import updateConfigFile from "./utils/updateConfigFile.js";

function logHelp() {
   console.log(`
  Usage: create-lumapps-extension [folder] [--options]

  Update usage : create-lumapps-extension --update

  Options:
	--help, -h                 [boolean] show help
	--version, -v              [boolean] show version
	--template, -t             [string]  use specified template (react)
	--update, -u               [boolean] update extension packages
 `);
}

console.log(chalk.cyan(`create-lumapps-extension v${packageJson.version}`));

const init = async () => {
   const argv = minimist(process.argv.slice(2));

   const targetDir = argv._[0];
   const { help, h, template, t, version, v, update, u } = argv;

   const userNode = process.version;

   if (!userNode.startsWith("v20")) {
      console.log(
         chalk.red(
            `You are using node version ${userNode}, you need to use the lts (V20.x.x)`
         )
      );
      return;
   }

   if (!targetDir && (update || u)) {
      updateExtension();
      return;
   }

   if (!targetDir) {
      console.error(chalk.red("Please provide a target folder !"));
      logHelp();
      process.exit(1);
   }
   const cwd = process.cwd();
   const root = join(cwd, targetDir);
   const renameFiles = {
      _gitignore: ".gitignore",
      _yarnrc_yml: ".yarnrc.yml",
   };

   if (help || h) {
      logHelp();
      return;
   } else if (version || v) {
      // noop, already logged
      return;
   }

   // Template prompt
   let choosedTemplate = t || template;
   if (!choosedTemplate) {
      const choices = [
         { key: 1, name: "Widget Extension", value: "widget-extension" },
         { key: 2, name: "Share Extension", value: "share-extension" },
         { key: 3, name: "Empty Extension", value: "empty-extension" },
         { key: 4, name: "Search Extension - BETA", value: "search-extension" },
         {
            key: 5,
            name: "Backend Extension - BETA",
            value: "backend-extension",
         },
      ];

      const choice = await inquirer.prompt({
         type: "list",
         message: "Choose a template",
         name: "template",
         choices,
      });
      choosedTemplate = choice.template;
   }

   console.log("\n--------------------");
   console.log(`\nScaffolding project in ${root}...`);

   await fs.ensureDir(root);

   const templateDir = join(getDirname(), "..", `template-${choosedTemplate}`);
   const write = async (file, content) => {
      const targetPath = renameFiles[file]
         ? join(root, renameFiles[file])
         : join(root, file);
      if (content) {
         await fs.writeFile(targetPath, content);
      } else {
         await fs.copy(join(templateDir, file), targetPath);
      }
   };

   const files = await fs.readdir(templateDir);
   for (const file of files.filter((f) => f !== "package.json")) {
      await write(file);
   }

   const pkg = JSON.parse(
      await fs.readFile(join(templateDir, `package.json`), "utf-8")
   );

   pkg.name = basename(root);
   await write("package.json", JSON.stringify(pkg, null, 2));

   console.log(`\n${chalk.green("Done")}. Now run:\n`);
   console.log(
      chalk.cyan(` 
	${root !== cwd && `cd ${relative(cwd, root)}`}
	npm install (or \`yarn\`)
	npm run start (or \`yarn start\`)
	`)
   );
   console.log();
};

init().catch((e) => {
   console.error(e);
});
