const fs = require("fs");
const path = require("path");

function removeReactImports(dir) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      removeReactImports(filePath);
    } else if (file.endsWith(".tsx") || file.endsWith(".ts")) {
      let content = fs.readFileSync(filePath, "utf8");
      const newContent = content.replace(/^import React[^;]*;?\s*$/m, "");
      if (content !== newContent) {
        fs.writeFileSync(filePath, newContent);
        console.log(`Removed React import from ${filePath}`);
      }
    }
  });
}

removeReactImports("./apps");
removeReactImports("./packages");
