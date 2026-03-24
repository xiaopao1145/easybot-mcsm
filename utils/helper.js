/// <reference path="../easybot-sdk/easybot.d.ts" />
function formatTime(date = new Date()) {
  return date.toLocaleString('zh-CN');
}
function getTimestamp() {
  return Date.now();
}
function parseMcsmConfig() {
  // 1. 初始化三个结果数组
  const masterNodes = []; // 主节点组：{ masterId, serverUrl, apiKey, daemonId }
  const childNodes = [];  // 子节点组：{ childId, serverName, uuid, groupuuid, ownerid, use_regex }
  const relations = [];   // 关系组：{ childId, masterId }

  try {
    // 2. 获取并校验原始配置数据
    const data = config.getConfigValue("mcsmconfig", "mcsm_config");
    if (!data || (typeof data !== "object" && !Array.isArray(data))) {
      throw new Error("配置数据不是有效对象/数组");
    }

    // 3. 遍历主节点
    let masterIndex = 0;
    for (const key in data) {
      const serverObj = data[key];
      if (!serverObj) continue;

      // 生成主节点唯一ID
      const masterId = `master_${masterIndex++}`;
      
      // 存入主节点组
      masterNodes.push({
        masterId,
        serverUrl: serverObj.serverUrl,
        apiKey: serverObj.apiKey,
        daemonId: serverObj.daemonId
      });

      // 4. 遍历该主节点下的子节点
      if (serverObj.instanceList) {
        let childIndex = 0;
        for (const instKey in serverObj.instanceList) {
          const instanceObj = serverObj.instanceList[instKey];
          if (!instanceObj) continue;

          // 生成子节点唯一ID
          const childId = `child_${masterIndex - 1}_${childIndex++}`;

          // 存入子节点组
          childNodes.push({
            childId,
            serverName: instanceObj.serverName,
            uuid: instanceObj.uuid,
            groupuuid: instanceObj.groupuuid,
            ownerid: instanceObj.ownerid,
            use_regex: instanceObj.use_regex
          });

          // 存入关系组
          relations.push({ childId, masterId });
        }
      }
    }

    // 5. 返回解析结果
    return { masterNodes, childNodes, relations };

  } catch (error) {
    // 错误处理
    logger.error(
      "错误：解析 mcsm_config 失败！{0}，当前获取到的数据：{1}",
      error.message,
      JSON.stringify(data)
    );
    // 出错时返回空数组
    return { masterNodes: [], childNodes: [], relations: [] };
  }
}

// 使用示例：
// const { masterNodes, childNodes, relations } = parseMcsmConfig();


module.exports = { formatTime, getTimestamp, parseMcsmConfig };