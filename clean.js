var fs = require('fs');
let folderToEmpty = process.argv[2];
function deleteFolderRecursive(path) {
  if (fs.existsSync(path) && fs.lstatSync(path).isDirectory()) {
    fs.readdirSync(path).forEach(function(file, index){
      var curPath = path + "/" + file;

      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });

    console.log(`Deleting directory "${path}"...`);
    if(folderToEmpty !== path){
    fs.rmdirSync(path);
    }
  }
};

console.log("1. Cleaning working tree...", folderToEmpty);

deleteFolderRecursive(folderToEmpty);

console.log("Successfully cleaned working tree!");