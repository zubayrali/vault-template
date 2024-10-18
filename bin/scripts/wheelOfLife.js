module.exports = async (params) => {
    const { quickAddApi: { inputPrompt }, app } = params;

    const WHEEL_CATEGORIES = [
        "Spiritual",
        "Career/Work",
        "Love/Relationship",
        "Health/Fitness",
        "Personal Growth",
        "Fun/Recreation",
        "Social",
        "Finance"
    ];

    try {
        // Create an array to store the values from user prompts
        const categoryValues = [];

        // Loop through each category and prompt the user for a value
        for (const category of WHEEL_CATEGORIES) {
            const userInput = await inputPrompt(`Enter a value for ${category} (0-10):`, "0");

            // Handle canceling the prompt (null return indicates cancellation)
            if (userInput === null) {
                new Notice("Operation canceled. No Wheel of Life chart was generated.");
                return; // Exit the function if the user cancels
            }

            let value = parseInt(userInput);

            // If input is not a valid number or out of bounds, default to 0 and notify the user
            if (isNaN(value) || value < 0 || value > 10) {
                new Notice(`Invalid input for ${category}. Defaulting to 0.`);
                value = 0;
            }

            categoryValues.push(value); // Add the value to the array
        }

        // Generate the polar area chart with the values
        const chartData = `
\`\`\`chart
type: polarArea
labels: ${JSON.stringify(WHEEL_CATEGORIES)}
series:
  - title:
    data: ${JSON.stringify(categoryValues)}
tension: 0.2
width: 80%
labelColors: true
fill: true
beginAtZero: true
rMax: 10
bestFit: false
bestFitTitle: Wheel of Life
bestFitNumber: 0
legendPosition: right
\`\`\``;

        // Insert the generated chart at the current cursor position in the active editor
        const editor = app.workspace.activeEditor?.editor;
        if (editor) {
            const cursorPosition = editor.getCursor();
            editor.replaceRange(chartData, cursorPosition);
            new Notice("Wheel of Life chart successfully inserted.");
        } else {
            new Notice("No active editor found. Please run the macro in an open note.");
        }

    } catch (error) {
        new Notice("An error occurred: " + error.message);
        console.error("Wheel of Life script error:", error);
    }
};
