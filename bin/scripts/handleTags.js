function handleTags(tags, requiredTag) {
    // If tags is a string (comma-separated), convert it to an array
    let tagArray = Array.isArray(tags) ? tags : (typeof tags === 'string' ? tags.split(',') : []);
    
    // Clean up any white spaces and ensure all tags are strings
    tagArray = tagArray.map(tag => tag.trim()).filter(Boolean);

    // Add required tag if it's not already in the array
    if (requiredTag && !tagArray.includes(requiredTag)) {
        tagArray.unshift(requiredTag);
    }

    // Return a properly formatted array of tags for YAML
    return tagArray.map(tag => `  - ${tag}`).join('\n');
}

module.exports = handleTags;
