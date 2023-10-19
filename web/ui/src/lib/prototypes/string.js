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

// toCamelCase will return the string with the first letter of each word
// capitalized and all spaces removed (except the first letter of the first word)
String.prototype.toCamelCase = function () {
  return this.toLowerCase().replace(/[-_\s]+(.)?/g, (_, c) =>
    c ? c.toUpperCase() : '',
  );
};

// removeAccents will return the string with all accents removed
// Example: 'héllö wórld' -> 'hello world'
String.prototype.removeAccents = function () {
  return this.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

// toSafeLink will return the string with all accents removed, all characters
// lowercased, and all non-alphanumeric characters replaced with a dash.
String.prototype.toSafeLink = function () {
  return this.removeAccents()
    .replace(/([a-z])([A-Z])/g, '$1-$2') // separate camelCase and PascalCase segments with a dash
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-'); // replace all non-alphanumeric characters with a dash
};

module.exports = {};
