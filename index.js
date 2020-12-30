#!/usr/bin/env node
const program = require("commander");
const shell = require("shelljs");
const download = require("git-clone");
const { spawn } = require("child_process");

program.version("1.0.0");
program
  .command("new <name>")
  .description("创建项目")
  .action(name => {
    let gitUrl = "https://github.com/dolymood/vue-next-webpack-preview.git";
    console.log('正在创建项目')
    download(gitUrl, `./${name}`, () => {
      shell.rm("-rf", `${name}/.git`);
      shell.cd(name);
      shell.exec("npm install");
      console.log(`
           创建项目${name}成功
           cd ${name} 进入目录
           mycli run 启动项目
           mycli start 预览项目
           `);
    });
  });
program
  .command("run")
  .description("启动项目")
  .action(() => {
    let cp = spawn("npm", ["run", "dev"]);
    cp.stdout.pipe(process.stdout);
    cp.stdout.pipe(process.stderr);
    cp.on("close", () => {
      console.log("启动项目成功");
    });
  });
program
  .command("start")
  .description("预览项目")
  .action(() => {
    open("http://localhost:8080");
    console.log("预览项目");
  });
program.parse(process.argv);
