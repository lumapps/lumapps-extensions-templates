import { join } from "path";
import fs from "fs-extra";
import chalk from "chalk";

const updateIndexFile = async () => {
   try {
      const indexFilePath = join(process.cwd(), "src", "index.tsx");
      const backupFilePath = join(process.cwd(), "src", "index.tsx.old");

      // File content
      let data = await fs.readFile(indexFilePath, "utf8");

      console.log("---------------------------------");

      // Check if up to date
      if (data.includes("createRoot")) {
         console.log(chalk.green("➤ index.ts file already up to date"));
         return;
      }

      // Update react/dom import
      let updatedData = data.replace(
         `import ReactDOM from 'react-dom';`,
         `import { createRoot } from 'react-dom/client';`
      );

      // Update renderer
      updatedData = updatedData.replace(
         /ReactDOM\.render\(([\s\S]+?),\s*document\.getElementById\('root'\)\,\s\);/,
         `const container = document.getElementById('root') as Element;
const root = createRoot(container);
root.render($1,
);`
      );

      // Update config import
      updatedData = updatedData.replace(
         /import config from '(.*)\.js';/,
         "import config from '$1';"
      );

      // Update config props in Playground component
      const findConfigProps =
         /(<Playground\s+(?:[^>]*\s+)?)config=\{\s*(config\s+as\s+(?:(?:\{[\s\S]*?\})|(?:import\([^)]*\)\.[\w.]+)))\s*\}/gs;

      updatedData = updatedData.replace(
         findConfigProps,
         (match, openingTag) => {
            return `${openingTag}config={config as Pick<import('lumapps-sdk-js').ExtensionConfig, 'category' | 'extensionId'>}`;
         }
      );

      // Create a backup before modifying the file
      await fs.copy(indexFilePath, backupFilePath);
      console.log(chalk.yellow("➤ Backup created: index.tsx.old"));

      // Write the updated content back to the index.tsx file
      await fs.writeFile(indexFilePath, updatedData, "utf8");

      console.log(chalk.green("➤ index.tsx file updated successfully!"));
   } catch (err) {
      console.error(chalk.red("➤ Error updating index.ts file : ", err));
   }
};

export default updateIndexFile;
