function formatTime(date = new Date()) {
  return date.toLocaleString('zh-CN');
}
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getTimestamp() {
  return Date.now();
}
module.exports = { formatTime, randomInt, getTimestamp };