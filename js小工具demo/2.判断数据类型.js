function getType(obj) {
  const str = Object.prototype.toString.call(obj);
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object',
  };
  if (obj instanceof Element) {
    // 判断是否是dom元素，如div等
    return 'element';
  }
  return map[str];
}

function isObject(obj) {
  return (typeof obj === 'object' || typeof obj === 'function') && obj !== null;
}
function isFunc(obj) {
  return typeof obj === 'function';
}
function isArray(obj) {
  return Array.isArray(obj);
}
function isDate(obj) {
  return Object.prototype.toString.call(obj) === '[object Date]';
}
function isMap(obj) {
  return Object.prototype.toString.call(obj) === '[object Map]';
}
function isSet(obj) {
  return Object.prototype.toString.call(obj) === '[object Set]';
}
function isRegExp(obj) {
  return Object.prototype.toString.call(obj) === '[object RegExp]';
}
