// equalsIgnoreCase will return true if the two strings are equal, ignoring case
String.prototype.equalsIgnoreCase = function (searchString) {
  if (typeof searchString !== 'string') return false;
  return this.toLowerCase() === searchString.toLowerCase();
};

module.exports = {};
