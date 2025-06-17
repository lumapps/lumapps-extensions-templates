import { join } from "path";
import fs from "fs-extra";
import chalk from "chalk";

import { getDirname } from "./getDirname.js";

const updateEsLintFile = async () => {
   try {
      const eslintFile = join(process.cwd(), ".eslintrc.json");
      const backupFilePath = join(process.cwd(), ".eslintrc.json.old");

      // If no file, create one
      if (!fs.existsSync(eslintFile)) {
         await fs.copy(
            join(getDirname(), "..", "updateFiles", ".eslintrc.json"),
            eslintFile
         );

         console.log(chalk.green("➤ .eslintrc.json file created"));

         return;
      }

      // File content
      const data = await fs.readFile(eslintFile, "utf8");

      const jsonContent = JSON.parse(data);

      // Check if "prettier/react" is in the "extends" array
      if (
         jsonContent.extends &&
         Array.isArray(jsonContent.extends) &&
         !jsonContent.extends.includes("prettier/react")
      ) {
         console.log(
            chalk.green("➤ .eslintrc.json file is already up to date.")
         );
         return;
      }

      // Remove "prettier/react" from the "extends" array
      jsonContent.extends = jsonContent.extends.filter(
         (item) => item !== "prettier/react"
      );

      const updatedData = JSON.stringify(jsonContent, null, 2);

      // Create a backup before modifying the file
      await fs.copy(eslintFile, backupFilePath);
      console.log(yellow("➤ Backup created: .eslintrc.json.old"));

      // Write the updated content back to .eslintrc.json
      await fs.writeFile(eslintFile, updatedData, "utf8");

      console.log(chalk.green("➤ .eslintrc.json file updated successfully!"));
   } catch (err) {
      console.error(chalk.red("Error updating .eslintrc.json file:", err));
   }
};

export default updateEsLintFile;
