'use strict';
import * as fs from "fs";
import * as Copy from "./bin/copy";
import clearDir from "./bin/clearDir";
import * as Pug from "./node_modules/pug";
import siteConfig from "./site_config.json";

//publish mode
//dev mode




console.log(Copy.copyFolderRecursiveSync(siteConfig.ASSETS, siteConfig.DIST));

const compileTemplates = Pug.compileFile('src/templates/index.pug', {pretty: true});

clearDir('./dist/*');

fs.writeFileSync("./dist/index.html", compileTemplates({title: 'Hello world'}));

console.log(compileTemplates({title: 'Hello world'}));