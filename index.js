#!/usr/bin/env node
const path = require("path");
const fs = require("fs-extra");
const argv = require("minimist")(process.argv.slice(2));
const inquirer = require("inquirer");
const chalk = require("chalk");

const { execSync } = require("child_process");

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

async function backAndCopyFile(fileName) {
   const tsConfigExtension = path.join(process.cwd(), fileName);

   if (fs.existsSync(tsConfigExtension)) {
      fs.renameSync(
         tsConfigExtension,
         path.join(process.cwd(), `${fileName}.old`),
         function (err) {
            if (err) console.log("ERROR: " + err);
         }
      );
   }

   await fs.copy(
      path.join(__dirname, "updateFiles", fileName),
      tsConfigExtension
   );
}

function getDependencies(refDependencies, optional = false) {
   const dependencies = [];

   for (package in refDependencies) {
      if (optional) {
         const pkg = require(path.join(process.cwd(), `package.json`));

         if (pkg.dependencies[package] || pkg.devDependencies[package]) {
            dependencies.push(`${package}@${refDependencies[package]}`);
         }
      } else {
         dependencies.push(`${package}@${refDependencies[package]}`);
      }
   }

   return dependencies.join(" ");
}

async function updateExtension() {
   await inquirer
      .prompt([
         {
            type: "confirm",
            name: "confirmUpdate",
            message:
               "➤ This will update your extension dependencies, do you want to continue ?",
            default: true,
         },
      ])
      .then(async (answers) => {
         if (answers.confirmUpdate) {
            const {
               forcedDependencies,
               optionalDependencies,
            } = require("./updateFiles/updatePackages");

            // FORCED DEP
            const dependencies = getDependencies(
               forcedDependencies.dependencies
            );

            console.log(
               chalk.blue("➤ Installing/Updating mandatory dependencies")
            );
            try {
               execSync(`yarn add ${dependencies}`, { stdio: "inherit" });
            } catch (error) {
               console.log(
                  chalk.red(`An error occured while installing the dependencies.
You should check the yarn logs.
Some of your dependencies might not be available with this version of node.
Try to fix this issues before launching the update again.`)
               );
               return;
            }

            console.log(chalk.green("➤ Mandatory dependencies installed !"));
            console.log("-------------------------------------------------");

            // FORCED DEV DEP
            const devDependencies = getDependencies(
               forcedDependencies.devDependencies
            );

            console.log(
               chalk.blue("➤ Installing/Updating mandatory devDependecies")
            );
            try {
               execSync(
                  `yarn add -D ${devDependencies}`,
                  { stdio: "inherit" },
                  (err) => {
                     if (err) {
                        console.log(err);
                        return;
                     }
                  }
               );
            } catch (error) {
               console.log(error);
            }

            console.log(chalk.green("➤ Mandatory devDependencies installed !"));
            console.log("-------------------------------------------------");

            // OPTIONAL
            const optDependencies = getDependencies(optionalDependencies, true);

            console.log(chalk.blue("➤ Updating optional dependencies"));

            try {
               execSync(
                  `yarn up ${optDependencies}`,
                  { stdio: "inherit" },
                  (err) => {
                     if (err) {
                        console.log(err);
                        return;
                     }
                  }
               );
            } catch (error) {
               console.log(error);
            }

            console.log(chalk.green("➤ Optional dependencies updated !"));
            console.log("-------------------------------------------------");

            await inquirer
               .prompt([
                  {
                     type: "confirm",
                     name: "confirmElsintUpdate",
                     message:
                        "➤ Do you want to update your .eslint.json file ? (the old one will be backed up)",
                     default: true,
                  },
               ])
               .then(async (answers) => {
                  if (answers.confirmElsintUpdate) {
                     await backAndCopyFile(".eslintrc.json");
                     console.log(
                        chalk.green(
                           "➤ .eslint.json file updated successfully !"
                        )
                     );
                  }
               });

            await inquirer
               .prompt([
                  {
                     type: "confirm",
                     name: "confirmTsConfig",
                     message:
                        "➤ Do you want to update your tsconfig.json file ? (the old one will be backed up)",
                     default: true,
                  },
               ])
               .then(async (answers) => {
                  if (answers.confirmTsConfig) {
                     await backAndCopyFile("tsconfig.json");
                     console.log(
                        chalk.green(
                           "➤ tsconfig.json file updated successfully !"
                        )
                     );
                  }
               });

            console.log(
               chalk.green(`
-------------------------------------------------
➤ Your extension has been updated, successfully !
➤ You can launch it using yarn start.
➤ You might encounter some lint issues, you can try to use the command "npx eslint . --fix" to fix it automatically
-------------------------------------------------`)
            );
         }
      });
}

console.log(
   chalk.cyan(`create-lumapps-extension v${require("./package.json").version}`)
);

async function init() {
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
   const root = path.join(cwd, targetDir);
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

      choice = await inquirer.prompt({
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

   const templateDir = path.join(__dirname, `template-${choosedTemplate}`);
   const write = async (file, content) => {
      const targetPath = renameFiles[file]
         ? path.join(root, renameFiles[file])
         : path.join(root, file);
      if (content) {
         await fs.writeFile(targetPath, content);
      } else {
         await fs.copy(path.join(templateDir, file), targetPath);
      }
   };

   const files = await fs.readdir(templateDir);
   for (const file of files.filter((f) => f !== "package.json")) {
      await write(file);
   }

   const pkg = require(path.join(templateDir, `package.json`));
   pkg.name = path.basename(root);
   await write("package.json", JSON.stringify(pkg, null, 2));

   console.log(`\n${chalk.green("Done")}. Now run:\n`);
   console.log(
      chalk.cyan(` 
	${root !== cwd && `cd ${path.relative(cwd, root)}`}
	npm install (or \`yarn\`)
	npm run start (or \`yarn start\`)
	`)
   );
   console.log();
}

init().catch((e) => {
   console.error(e);
});
