import { join } from "path";
import { promises as fs } from "fs";
import chalk from "chalk";

const updateConfigFile = async () => {
   try {
      const configFile = join(process.cwd(), "src", "config.js");
      const mjsCopy = join(process.cwd(), "src", "config.mjs");
      const backupFilePath = join(process.cwd(), "src", "config.js.old");

      // Check if config.js exists before proceeding
      if (!(await fs.stat(configFile).catch(() => false))) {
         console.log(chalk.red("➤ config.js not found, skipping update."));
         return;
      }

      // Copy config.js to config.mjs for dynamic import
      await fs.copyFile(configFile, mjsCopy);

      // Dynamically import the config file
      const configData = await import(mjsCopy);
      await fs.unlink(mjsCopy); // Delete temporary file after import

      // Check if already up to date
      const authorizedProps = ["category", "extensionId"];
      const legacyProps = Object.keys(configData.default).filter(
         (key) => !authorizedProps.includes(key)
      );

      if (legacyProps.length <= 0) {
         console.log(chalk.green("➤ config.js already up to date."));
         return;
      }

      // Set new config
      let extensionId = configData?.default?.extensionId ?? "";
      const category = configData?.default?.category ?? "";

      // Handle extensionId if string or object
      let extensionIdCode = "";
      if (typeof extensionId === "string") {
         // Format extension id string 
         extensionIdCode = `const extensionId = '${extensionId}';\n`;
      } else if (typeof extensionId === "object") {
         // Format extension id object 
         const formattedObject = Object.entries(extensionId)
            .map(([key, value]) => `    ${key}: '${value}',`)
            .join("\n");

         extensionIdCode = `const extensionId = {\n${formattedObject}\n};\n`;
      } else {
         console.log(
            chalk.red("➤ Invalid extensionId format. Skipping update.")
         );
         return;
      }

      // Format the new config content
      const updatedConfig = `${extensionIdCode}
const config = {
    extensionId,
    category: '${category}',
};

export default config;`;

      // Backup existing config.js
      await fs.copyFile(configFile, backupFilePath);
      console.log(chalk.yellow(`➤ Backup created: ${backupFilePath}`));

      // Write the updated content to config.js
      await fs.writeFile(configFile, updatedConfig, "utf8");

      console.log(chalk.green("➤ config.js updated successfully!"));
   } catch (err) {
      console.error(chalk.red("Error updating config file:"), err);
   }
};

export default updateConfigFile;
