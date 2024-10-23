module.exports = async (params) => {
    const { quickAddApi, app } = params;

    try {
        // Get the current active file (ensure it's a valid markdown file)
        const activeFile = app.workspace.getActiveFile();
        if (!activeFile || activeFile.extension !== "md") {
            new Notice("No valid markdown file is open.");
            return;
        }

        // Get the current file's basename (without the extension)
        const projectName = activeFile.basename;
        if (!projectName) {
            new Notice("Could not determine the project name from the active file.");
            return;
        }

        // Execute the QuickAdd choice
        await quickAddApi.executeChoice('Add Activity to Daily Note with Active File Linked', {
            ProjectName: projectName
        });

        // Provide feedback that the activity was added successfully
        new Notice(`New activity added for project: ${projectName}`);
    } catch (error) {
        console.error("Error executing new activity macro:", error);
        new Notice("An error occurred while adding the activity: " + error.message);
    }
};
