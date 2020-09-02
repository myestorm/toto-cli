#!/usr/bin/env node

const clone = require('git-clone')
const program = require('commander')
const shell = require('shelljs');
const version = require('../package.json').version
const chalk = require('chalk')
const log = console.log

const templates = {
  'traditional-web': {
    git: 'https://github.com/myestorm/traditional-web.git',
    desc: [
      '多页应用模板，适用于传统页面开发',
      '基本依赖：gulp + webpack + ejs + scss + eslint'
    ]
  }
}

program
  .version(version)
  .description(`
  前端开发应用模板
  multi-page
  `)
program
  .command('* <tpl> <project>')
  .action(function(tpl, project) {
      if (tpl && project) {
        let template = templates[tpl]
        let pwd = shell.pwd()
        if (template) {
          log(chalk.blue(`正在获取${tpl}模板代码，请稍候...`))
          template.desc.forEach(item => {
            log(chalk.white(item))
          })
          clone(template.git, pwd + `/${project}`, null, function() {
            shell.rm('-rf', pwd + `/${project}/.git`)
            log(chalk.green('哇哦，恭喜！！项目创建成功!!! 请使用下面的命令查看结果。'))
            log(chalk.green(`cd ${project} && npm install`))
            log(chalk.green('npm run serve'))
          })
        } else {
          log(chalk.red(`没有找到对应的模板：${tpl}`))
        }
      } else {
        log('使用方式：toto <模板名称> <项目目录>')
      }
  })
program.parse(process.argv)
