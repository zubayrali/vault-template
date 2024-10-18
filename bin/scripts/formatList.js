function formatList(items) {
    if (!items || items.length === 0) return '';
    const list = Array.isArray(items) ? items : items.split(',');
    return '\n' + list
        .map(item => item.trim())
        .filter(Boolean)
        .map(item => `  - ${item}`)
        .join('\n');
}

module.exports = formatList;