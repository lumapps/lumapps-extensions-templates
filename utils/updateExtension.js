import inquirer from "inquirer";
import chalk from "chalk";
import { execSync } from "child_process";
import { join } from "path";
import fs from "fs-extra";

import updateIndexFile from "./updateIndexFile.js";
import getDependencies from "./getDependecies.js";
import updateEsLintFile from "./updateEslintFile.js";
import updateTSConfigFile from "./updateTSConfigFile.js";
import {
   forcedDependencies,
   optionalDependencies,
} from "../updateFiles/updatePackages.js";
import updateConfigFile from "./updateConfigFile.js";

const updateExtension = async () => {
   try {
      const { confirmUpdate } = await inquirer.prompt([
         {
            type: "confirm",
            name: "confirmUpdate",
            message:
               "➤ This will update your extension dependencies, do you want to continue?",
            default: true,
         },
      ]);

      if (!confirmUpdate) {
         console.log(chalk.yellow("➤ Update canceled."));
         return;
      }

      // Install forced dependencies
      const dependencies = await getDependencies(
         forcedDependencies.dependencies
      );
      console.log(chalk.blue("➤ Installing/Updating mandatory dependencies"));

      try {
         execSync(`yarn add ${dependencies}`, { stdio: "inherit" });
         console.log(chalk.green("➤ Mandatory dependencies installed!"));
      } catch (error) {
         console.error(chalk.red("Error installing dependencies:"), error);
         return;
      }

      console.log("-------------------------------------------------");

      // Install dev dependencies
      const devDependencies = await getDependencies(
         forcedDependencies.devDependencies
      );
      console.log(
         chalk.blue("➤ Installing/Updating mandatory devDependencies")
      );

      try {
         execSync(`yarn add -D ${devDependencies}`, { stdio: "inherit" });
         console.log(chalk.green("➤ Mandatory devDependencies installed!"));
      } catch (error) {
         console.error(chalk.red("Error installing devDependencies:"), error);
      }

      console.log("-------------------------------------------------");

      // Update optional dependencies
      const optDependencies = await getDependencies(optionalDependencies, true);
      console.log(chalk.blue("➤ Updating optional dependencies"));

      try {
         execSync(`yarn up ${optDependencies}`, { stdio: "inherit" });
         console.log(chalk.green("➤ Optional dependencies updated!"));
      } catch (error) {
         console.error(
            chalk.red("Error updating optional dependencies:"),
            error
         );
      }

      console.log("-------------------------------------------------");

      // Dedupe dependencies
      console.log(
         chalk.blue("➤ Running `yarn dedupe` to remove duplicate dependencies")
      );

      try {
         execSync(`yarn dedupe`, { stdio: "inherit" });
         console.log(chalk.green("➤ Duplicated dependencies removed!"));
      } catch (error) {
         console.error(chalk.red("Error running `yarn dedupe`:"), error);
      }

      console.log("-------------------------------------------------");

      // Update config.js file
      const { confirmUpdateConfig } = await inquirer.prompt([
         {
            type: "confirm",
            name: "confirmUpdateConfig",
            message:
               "➤ Do you want to update your config.js file to be up to date with the last version of the playground ? (The old file will be backed up)",
            default: true,
         },
      ]);

      if (confirmUpdateConfig) {
         await updateConfigFile();
      }

      // Update Index.tsx file
      const { confirmUpdateIndex } = await inquirer.prompt([
         {
            type: "confirm",
            name: "confirmUpdateIndex",
            message:
               "➤ Do you want to update your index.tsx file to use React 18 standard? (The old file will be backed up)",
            default: true,
         },
      ]);

      if (confirmUpdateIndex) {
         await updateIndexFile();
      }

      // Update ESLint config
      const eslintFile = join(process.cwd(), ".eslintrc.json");
      const { confirmElsintUpdate } = await inquirer.prompt([
         {
            type: "confirm",
            name: "confirmElsintUpdate",
            message: fs.existsSync(eslintFile)
               ? "➤ Do you want to update the .eslint.json file? (The old file will be backed up)"
               : "➤ No .eslint.json file detected, do you want to create one ?",
            default: true,
         },
      ]);

      if (confirmElsintUpdate) {
         await updateEsLintFile();
      }

      // Update TSConfig
      const tsConfigFile = join(process.cwd(), "tsconfig.json");
      const { confirmTsConfig } = await inquirer.prompt([
         {
            type: "confirm",
            name: "confirmTsConfig",
            message: fs.existsSync(tsConfigFile)
               ? "➤ Do you want to update the tsconfig.json file? (The old file will be backed up)"
               : "➤ No tsconfig.json file detected, do you want to create one ?",
            default: true,
         },
      ]);

      if (confirmTsConfig) {
         await updateTSConfigFile();
      }

      console.log(
         chalk.green(`
-------------------------------------------------
➤ Your extension has been updated successfully!
➤ You can launch it using 'yarn start'.
➤ If you encounter lint issues, try running "npx eslint . --fix".
-------------------------------------------------`)
      );
   } catch (error) {
      console.error(
         chalk.red("An error occurred during the update process:"),
         error
      );
   }
};

export default updateExtension;
