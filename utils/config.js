const config = {
  pluginName: '多文件示例插件',
  version: '1.0.0',
  maxRetries: 3,
  timeout: 5000
};
function getConfig(key) { return config[key]; }
function setConfig(key, value) { config[key] = value; }
function getAllConfig() { return { ...config }; }
module.exports = { getConfig, setConfig, getAllConfig, config };