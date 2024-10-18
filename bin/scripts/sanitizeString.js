function sanitizeString(input) {
    if (!input) return "";
    return input.replace(/[\.\,\/#!$%\^&\*;:{}=\-_`~()]/g, "").trim();
}
module.exports = sanitizeString;
