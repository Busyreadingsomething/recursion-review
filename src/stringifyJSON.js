// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  // your code goes here
  var result = '';

  if (obj === null) {
    result += 'null';
  } else if (typeof obj === 'string') {
    result += '"' + obj + '"';
  } else if (typeof obj === 'number' || typeof obj === 'boolean') {
    result += obj;
  } else if (typeof obj === 'function') {
    result += '';
  } else if (typeof obj === 'object') {
    
    if (Array.isArray(obj)) {
      result += '[';
      _.each(obj, function(item, i) {
        result += stringifyJSON(item);
        if (i !== obj.length - 1) {
          result += ',';
        }
      });
      result += ']';
    } else {
      result += '{';
      _.each(obj, function(item, key) {
        if (typeof item !== 'function' && typeof item !== 'undefined') {
          result += '"' + key + '":';
          result += stringifyJSON(item);
          var value = Object.keys(obj)[Object.keys(obj).length - 1];
          if (value !== key) {
            result += ',';
          }
        }
      });
      result += '}';
    }
  }

  // console.log(result);
  return result;
};
