// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {
  var classArray = [];

  var searchDOM = function (node) {
    if (node.classList && node.classList.contains(className)) {
      classArray.push(node);
    }
     
    for (var i = 0; i < node.children.length; i++) {
      searchDOM(node.children[i]);
    }
  };

  searchDOM(document.body);

  return classArray;
  // your code here
};
