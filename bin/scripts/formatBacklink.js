function formatBacklink(item) {
    if (!item) return '';
    const cleanItem = typeof item === 'string' ? item.trim().replace(/^\[*|\]*$/g, '') : item;
    return `[[${cleanItem}]]`;
}

module.exports = formatBacklink;