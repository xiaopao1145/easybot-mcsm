const { formatTime, randomInt } = require('../utils/helper.js');
const { getConfig } = require('../utils/config.js');

function handleTimeCommand() {
  const currentTime = formatTime();
  logger.info(`当前时间: ${currentTime}`);
  return currentTime;
}
function handleRandomCommand(min = 1, max = 100) {
  const result = randomInt(min, max);
  logger.info(`随机数 (${min}-${max}): ${result}`);
  return result;
}
function handleInfoCommand() {
  const name = getConfig('pluginName');
  const version = getConfig('version');
  logger.info(`插件信息: ${name} v${version}`);
  return { name, version };
}
function handleHelpCommand() {
  const commands = ['time', 'random', 'info', 'help'];
  logger.info(`可用命令: ${commands.join(', ')}`);
  return commands;
}
module.exports = {
  handleTimeCommand,
  handleRandomCommand,
  handleInfoCommand,
  handleHelpCommand
};