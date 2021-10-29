const fs = require("fs");
const path = require("path");

function main() {
  const pathIndex = path.resolve(__dirname, "../build/index.html");
  const pathManifest = path.resolve(__dirname, "../build/manifest.json");
  const pathBoot = path.resolve(__dirname, "../build/boot.js");
  let fileIndex = fs.readFileSync(pathIndex).toString();
  const fileManifest = JSON.parse(fs.readFileSync(pathManifest).toString());

  // 0 replace
  // 1 get
  const contentBoot = fileIndex.match(/<script>(.*?)<\/script>/);
  const jssName = fileIndex.matchAll(/<script src="(.*?)"><\/script>/g);
  const cssName = fileIndex.match(/<link href="(.*?)"/);

  fileIndex = fileIndex.replace(
    contentBoot[0],
    `<script src="./boot.js"></script>`
  );
  fileManifest.content_scripts[0].css = [cssName[1]];
  fileManifest.content_scripts[0].js = [
    "contentScript.js",
    "boot.js",
    ...[...jssName].map((item) => item[1]),
  ];
  fs.writeFileSync(pathIndex, fileIndex);
  fs.writeFileSync(pathBoot, contentBoot[1]);
  fs.writeFileSync(pathManifest, JSON.stringify(fileManifest, null, 2));
}

try {
  console.log("========= build-crx start =========");
  main();
  console.log("build done ~");
} catch (error) {
  console.error(error);
}
