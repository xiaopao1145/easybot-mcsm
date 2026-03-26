/// <reference path="easybot-sdk/easybot.d.ts" />

// 基础依赖校验
if (!logger) {
  console.error('logger 未初始化');
}

const {
  handleTimeCommand,
  handleInfoCommand
} = require('./handlers/commands.js');

const { setConfig, configureEvents } = require('./utils/config.js');
const { registerEvents, botEvent } = require('./handlers/events.js');

logger.info('多文件插件被加载');

setConfig('pluginName', 'mcsm连接插件');
configureEvents();
registerEvents();
botEvent();

setTimeout(() => {
  handleTimeCommand();
  handleInfoCommand();
}, 2000);