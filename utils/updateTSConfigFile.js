import { join } from "path";
import fs from "fs-extra";
import chalk from "chalk";

import { getDirname } from "./getDirname.js";

const updateTSConfigFile = async () => {
   try {
      const tsConfigFile = join(process.cwd(), "tsconfig.json");
      const backupFilePath = join(process.cwd(), "tsconfig.json.old");

      // If no file, create one
      if (!fs.existsSync(tsConfigFile)) {
         await fs.copy(
            join(getDirname(), "..", "updateFiles", "tsconfig.json"),
            tsConfigFile
         );

         console.log(chalk.green("➤ tsconfig.json file created"));

         return;
      }

      // File content
      const data = await fs.readFile(tsConfigFile, "utf8");

      console.log("---------------------------------");

      const jsonContent = JSON.parse(data);

      // Check if @types/react is already in the file
      if (
         jsonContent?.compilerOptions?.paths?.react?.includes(
            "./node_modules/@types/react"
         )
      ) {
         console.log(
            chalk.green("➤ tsconfig.json file is already up to date.")
         );
         return;
      }

      // Check if object is correctly set
      jsonContent.compilerOptions = jsonContent.compilerOptions || {};
      jsonContent.compilerOptions.paths =
         jsonContent.compilerOptions.paths || {};

      // Add react type path
      jsonContent.compilerOptions.paths["react"] = [
         "./node_modules/@types/react",
      ];

      const updatedData = JSON.stringify(jsonContent, null, 2);

      // Create a backup before modifying the file
      await fs.copy(tsConfigFile, backupFilePath);
      console.log(chalk.yellow("➤ Backup created: tsconfig.json.old"));

      // Write the updated content back to tsconfig.json
      await fs.writeFile(tsConfigFile, updatedData, "utf8");

      console.log(chalk.green("➤ tsconfig.json file updated successfully!"));
   } catch (err) {
      console.error(chalk.red("➤ Error updating tsconfig.json file:", err));
   }
};

export default updateTSConfigFile;
