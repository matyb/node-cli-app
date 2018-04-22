describe("npm-cli-app", function (){
  describe("getRepositories", function(){
    it("returns the repositories from repos.txt", function(){
      expect(require("./index").getRepositories()).toContain("https://github.com/matyb/node-cli-app");
    });
  });
  describe("clone", function(){
    it("will clone all repositories if no argument supplied", function(){
      let proxyquire = require('proxyquire');
      let execSpy = jasmine.createSpy("exec spy").and.returnValue(function(cmd){return cmd;});
      let index = proxyquire('./index', {"shelljs" : {exec: execSpy}});
      let repoSpy = spyOn(index, 'getRepositories').and.returnValue(["repo"]);
      index.clone();
      expect(repoSpy).toHaveBeenCalled();
      expect(execSpy).toHaveBeenCalledWith("git clone repo");
    });
    it("will clone the provided repository", function(){
      let proxyquire = require('proxyquire');
      let execSpy = jasmine.createSpy("exec spy").and.returnValue(function(cmd){return cmd;});
      let index = proxyquire('./index', {"shelljs" : {exec: execSpy}});
      index.clone('repo');
      expect(execSpy).toHaveBeenCalledWith("git clone repo");
    });
  });
});
