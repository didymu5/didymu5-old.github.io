import * as Pug from "pug";
//publish mode??
//dev mode??
let COMPILE_OPTIONS = {
  pretty: true
};

export const compileTemplates = Pug.compileFile('src/templates/index.pug', COMPILE_OPTIONS);

export const compilePostTemplates = Pug.compileFile('src/templates/posts.pug', COMPILE_OPTIONS);