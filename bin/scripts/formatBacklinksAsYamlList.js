function formatBacklinksAsYamlList(input) {
    if (!input) return '';

    // If input is a string, split it into an array
    const items = Array.isArray(input) ? input : input.split(',');

    return items
        .map(item => item.trim())
        .filter(Boolean)
        .map(item => {
            // Clean the item content to remove any internal quotes or brackets
            const cleanItem = item.replace(/^\[*|\]*$/g, '').replace(/"/g, '');
            return `  - "[[${cleanItem}]]"`; // Ensure each item is properly indented
        })
        .join('\n'); // Join items with new lines to ensure each appears on a new line
}

module.exports = formatBacklinksAsYamlList;
