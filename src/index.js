let instance = module.exports = {
  getRepositories : function getRepositories(filePath){
    if (getRepositories.arguments.length === 0){
      filePath = "repos.txt";
    }
    return String(require("fs").readFileSync(filePath))
              .split("(\r|\n)")
              .filter(function(el) {return el.length != 0;})
              .map(function(line) {return line.trim();});
  },
  clone : function clone (repository){
    if (clone.arguments.length === 0) {
      let repositories = instance.getRepositories();
      repositories.forEach(clone);
      return;
    }
    let shell = require("shelljs");
    return shell.exec(`git clone ${repository}`);
  }
};
