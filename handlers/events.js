const { formatTime } = require('../utils/helper.js');

function registerEvents() {
  bus.on('enable', () => {
    const time = formatTime();
    logger.info(`[${time}] 多文件插件已启用`);
  });
  bus.on('disable', () => {
    const time = formatTime();
    logger.info(`[${time}] 多文件插件已禁用`);
  });
  bus.on('bridge.connected', (data) => {
    const time = formatTime();
    logger.info(`[${time}] 服务器已连接: ${data.serverName}`);
  });
}
function registerRobotEvents() {
  bus.on('robot.message', (data) => {
    const time = formatTime();
    logger.info(`[${time}] 收到消息: ${data.message}`);
  });
}
module.exports = { registerEvents, registerRobotEvents };