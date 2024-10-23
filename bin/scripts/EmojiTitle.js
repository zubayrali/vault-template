module.exports = async (tp) => {
    // Prompt the user for an emoji
    const emoji = await tp.system.prompt("Enter an emoji to use in the file title:");

    // If no emoji is provided, use a default one
    const finalEmoji = emoji ? emoji : "😄";

    // Construct the new file name with the emoji
    const newFileName = `> [!banner-icon] ${finalEmoji}`; // remove the > [!banner-icon] if you are using the banners plugin

    // Rename the file
    await tp.file.rename(newFileName);

    // Return the new file name (optional)
    return newFileName;
};
