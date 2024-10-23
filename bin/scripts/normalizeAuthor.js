function normalizeAuthor(input) {
    if (!input) return "";
    return input.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}

module.exports = normalizeAuthor;
