#!/usr/bin/env node

const clone = require('git-clone')
const program = require('commander')
const shell = require('shelljs');
const log = require('tracer').colorConsole()
const version = require('../package.json').version

const templates = {
  'multi-page': {
    git: 'https://github.com/myestorm/multi-page.git',
    desc: [
      '多页应用模板，适用于传统页面开发',
      '基本依赖：webpack + ejs + sass + eslint'
    ]
  }
}

program
  .version(version)
  .description('前端开发应用模板')
program
  .command('* <tpl> <project>')
  .action(function(tpl, project) {
      if (tpl && project) {
        let template = templates[tpl]
        let pwd = shell.pwd()
        if (template) {
          log.info(`正在获取${tpl}模板代码，请稍候...`)
          template.desc.forEach(item => {
            log.info(item)
          })
          clone(template.git, pwd + `/${project}`, null, function() {
            shell.rm('-rf', pwd + `/${project}/.git`)
            log.info('哇哦，恭喜！！项目创建成功')
            log.info(`cd ${project} && npm install`)
            log.info(`npm run serve`)
          })
        } else {
          log.error(`没有找到对应的模板：${tpl}`)
        }
      } else {
        log.error('使用方式：toto-cli <模板名称> <项目目录>')
      }
  })
program.parse(process.argv)
