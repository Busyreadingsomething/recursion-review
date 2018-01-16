// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  var numList = '.-0123456789';
  var index = 0;
  var ch;

  var nextChar = function() {
    index++;
    ch = json[index];
    return ch;
  };

  var checkChar = function() {
    if (json[index] === '"') {
      return isString();
    } else if (json[index] === '[') {
      return isArray();
    } else if (json[index] === '{') {
      return isObject();
    } else if (json[index] === 't' || json[index] === 'f' || json[index] === 'n') {
      return isSpecial();
    } else if (numList.includes(json[index])) {
      return isNumber();
    } else if (json[index] === ',') {
      nextChar();
      checkChar();
    }
  };
  
  var isArray = function() {
    var arr = [];
    nextChar();
    if (json[index] === ']') {
      return arr;
    }

    do {
      arr.push(checkChar());
      if (json[index] === ']') {
        nextChar();
        return arr;
      }
    } while (json[index] && json[index] === ',' && nextChar());
  //   nextChar();
  //   while (json[index] !== ']') {
  //     arr.push(checkChar());
  //   }
  //   nextChar();
    
  };

  var isNumber = function() {
    var strNum = ''; 
    while (numList.includes(json[index])) {
      strNum += json[index];
      nextChar();
    }
    return Number(strNum);
 
  };

  var isSpecial = function() {
    if (json[index] === 't') {
      index += 4;
      return true;
    } else if (json[index] === 'f') {
      index += 5;
      return false;
    } else {
      index += 4;
      return null; 
    }
  };

  var isString = function() {
    var string = '';
    nextChar();
    while (json[index] !== '"') {
      string += json[index];
      nextChar();
    }
    nextChar();
    return string;
  };
  
  return checkChar(json);
  // your code goes here
};