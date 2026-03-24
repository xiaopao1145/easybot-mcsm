/// <reference path="../easybot-sdk/easybot.d.ts" />
const { formatTime, parseMcsmConfig } = require('../utils/helper.js');
const { getAllConfig } = require('../utils/config.js');


function registerEvents() {
  bus.on('enable', () => {
    const time = formatTime();
    logger.info(`[${time}] 多文件插件已启用`);
  });

  bus.on('disable', () => {
    const time = formatTime();
    logger.info(`[${time}] 多文件插件已禁用`);
  });
}
function botEvent() {
  bus.on("group_message_event", (event) => {
    const data = config.getConfigValue("mcsmconfig", "mcsm_config")
    const { masterNodes, childNodes, relations } = parseMcsmConfig();
    if (!data) {
      logger.info("[MCSM配置检测] 错误：未获取到 mcsm_config 数据");
    } else {
      // 2. 输出数据长度（数组用 length，对象用键数量）
      const length = Array.isArray(data) ? data.length : Object.keys(data).length;
      logger.info("[MCSM配置检测] 数据长度: {0}", length);
      for (const instance of childNodes) {
      const serverName = instance.serverName;
      logger.info("[MCSM配置检测] 子节点 serverName: {0}", serverName);
      if (event.RawMessage === "开启 " + serverName && event.PeerId === "526191124") {
        event.Context.Reply(new MessageChain().Text("pong")
          .Text("当前配置：")
          .Text(JSON.stringify(getAllConfig()))
        )
      } else
        if (event.RawMessage === "关闭 " + serverName && event.PeerId === "526191124") {
          event.Context.Reply(new MessageChain().Text("pong"));
        } else
          if (event.RawMessage === "重启 " + serverName && event.PeerId === "526191124") {
            event.Context.Reply(new MessageChain().Text("getConfigure()"));
          }
      }
    }
    
  });
}

module.exports = { registerEvents, botEvent };