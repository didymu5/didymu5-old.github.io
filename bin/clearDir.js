'use strict';
import rimraf from "../node_modules/rimraf";

const clearDir = (dirPath) => {
  return rimraf(dirPath, (err, s) => {
    console.log(dirPath)
    console.log(s);
    return 'something';
  });
};

export default clearDir;