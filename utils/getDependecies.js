   import { readFile } from "fs/promises";
   import { join } from "path";

   const getDependencies = async (refDependencies, optional = false) => {
      const dependencies = [];

      for (let pck in refDependencies) {
         if (optional) {
            const packageJsonPath = join(process.cwd(), "package.json");
            const packageJson = JSON.parse(
               await readFile(packageJsonPath, "utf-8")
            );

            if (packageJson.dependencies[pck] || packageJson.devDependencies[pck]) {
               dependencies.push(`${pck}@${refDependencies[pck]}`);
            }
         } else {
            dependencies.push(`${pck}@${refDependencies[pck]}`);
         }
      }

      return dependencies.join(" ");
   };

   export default getDependencies;
