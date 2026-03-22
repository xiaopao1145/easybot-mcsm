/// <reference path="easybot-sdk/easybot.d.ts" />

const {
  handleTimeCommand,
  handleRandomCommand,
  handleInfoCommand
} = require('./handlers/commands.js');
const { registerEvents } = require('./handlers/events.js');
const { setConfig } = require('./utils/config.js');

logger.info('多文件插件被加载');

setConfig('pluginName', '我的多文件插件');

registerEvents();

setTimeout(() => {
  handleTimeCommand();
  handleRandomCommand(1, 10);
  handleInfoCommand();
}, 2000);