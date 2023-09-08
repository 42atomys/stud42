// equalsIgnoreCase will return true if the two strings are equal, ignoring case
String.prototype.equalsIgnoreCase = function (searchString) {
  if (typeof searchString !== 'string') return false;
  return this.toLowerCase() === searchString.toLowerCase();
};

// toTitleCase will return the string with the first letter of each word capitalized
// Example: 'hello world' -> 'Hello World'
String.prototype.toTitleCase = function () {
  return this.replace(/\w\S*/g, function (token) {
    return token.toSentenceCase();
  });
};

// toSentenceCase will return the string with the first letter of the first word capitalized
// Example: 'hello world' -> 'Hello world'
String.prototype.toSentenceCase = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

module.exports = {};
