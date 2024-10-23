module.exports = async (params) => {
    const { quickAddApi: { inputPrompt }, app } = params;

    try {
        // Get the currently active file (assuming it's a markdown file)
        const activeFile = app.workspace.getActiveFile();
        if (!activeFile || activeFile.extension !== "md") {
            new Notice("No valid active markdown file found.");
            return;
        }

        // Get the parent folder of the active file
        const parentFolder = activeFile.parent ? app.vault.getAbstractFileByPath(activeFile.parent.path) : null;
        if (!parentFolder) {
            new Notice("Could not determine the parent folder.");
            return;
        }

        // Prompt the user for the new file name
        const fileName = await inputPrompt("Enter the new file name:");
        if (!fileName || !fileName.trim()) {
            new Notice("No file name provided. Operation cancelled.");
            return;
        }

        // Sanitize the file name to remove invalid characters
        const sanitizedFileName = fileName.replace(/[\/\\?%*:|"<>]/g, '').trim();
        if (!sanitizedFileName) {
            new Notice("Invalid file name. Operation cancelled.");
            return;
        }

        // Construct the new file path in the same folder as the active file
        const newFilePath = `${parentFolder.path}/${sanitizedFileName}.md`;

        // Check if a file with the same name already exists`
        if (app.vault.getAbstractFileByPath(newFilePath)) {
            new Notice("A file with this name already exists.");
            return;
        }

        // Create the new empty file and open it
        await app.vault.create(newFilePath, "");
        const newFile = app.vault.getAbstractFileByPath(newFilePath);

        if (newFile) {
            await app.workspace.getLeaf().openFile(newFile);
            console.log(`File created and opened: ${newFilePath}`);
        } else {
            new Notice("File created but couldn't be opened.");
        }
    } catch (error) {
        console.error("Error creating file:", error);
        new Notice("Error creating file: " + error.message);
    }
};
