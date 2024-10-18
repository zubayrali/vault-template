function formatAsYamlList(items) {
    if (!items) return '';

    const list = Array.isArray(items) ? items : [items];
    return list
        .filter(item => item && item.trim())
        .map(item => {
            const formattedItem = formatBacklink(item);
            return `  - "${formattedItem}"`;
        })
        .join('\n');
}

module.exports = formatAsYamlList;