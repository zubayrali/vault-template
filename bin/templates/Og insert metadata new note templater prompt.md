---
up:
  - "[[templates]]"
---
<%\*
// Ask the user to input the title if it starts with "Untitled"
let title = tp.file.title;
if (title.startsWith("Untitled")) {
title = await tp.system.prompt("Title");
await tp.file.rename(title);
}

// Convert title to uppercase and strip unwanted characters
let title_uppercase = title.replace(/\b\w/g, c => c.toUpperCase());
let result = title_uppercase.replace(/[^a-zA-Z0-9 ]/g, '');

// Initialize YAML front matter
let yaml = "---\n";
yaml += "aliases: \n";
yaml += `created: "${tp.date.now("YYYY-MM-DDTHH:mm:ss.SSSZ")}"\n`;
yaml += `id: ${tp.date.now("YYYYMMDDHHmmss")}\n`;
yaml += `title: ${result}\n`;
yaml += `updated: "${tp.date.now("YYYY-MM-DDTHH:mm:ss.SSSZ")}"\n`;
yaml += "tags:\n";

// Suggester for general categories with default "unsorted" and "None" option
let generalCategories = ["None", "unsorted", "indexes", "devlog", "private", "canvas"];
let generalTag = await tp.system.suggester(generalCategories, generalCategories, false, "Select a general category:");

// Add the selected general tag if one was chosen
if (generalTag && generalTag !== "None") {
yaml += `  - ${generalTag}\n`;
}

// Combined options for note states with default "state/incubating" and "None" option
let noteStateOptions = [
"None", "state/incubating", "state/seeds", "state/process", "state/permanent", "source", "state/questions", "state/projects", "state/archived"
];

// Suggester for note states
let selectedState = await tp.system.suggester(noteStateOptions, noteStateOptions, false, "Select the current state for this note:");

if (selectedState && selectedState !== "None") {
yaml += `  - ${selectedState}\n`;
}

// Conditional prompt for references if "source" is selected
if (selectedState === "source") {
let refTypeOptions = [
"None", "books", "articles", "videos", "quotes", "people", "poetry", "films", "tv_shows"
];

let references = await tp.system.suggester(refTypeOptions, refTypeOptions, false, "Select the reference type:");
if (references && references !== "None") {
yaml += `  - sources/${references}\n`;
}
}

// Function to prompt for file and update YAML and inline metadata
async function promptForFile(fieldName) {
let files = app.vault.getMarkdownFiles().map(file => file.basename);
files.unshift("None"); // Add "None" as the first option
let selectedFile = await tp.system.suggester(files, files, false, `Select ${fieldName} (optional):`);
let inlineMetadata = "";
if (selectedFile && selectedFile !== "None") {
yaml += `${fieldName}: '[[${selectedFile}]]'\n`;
inlineMetadata = `\\_${fieldName}:: [[${selectedFile}]]\n`;
} else {
yaml += `${fieldName}: \n`;
inlineMetadata = `\\_${fieldName}:: \n`;
}
return inlineMetadata;
}

// Prompt for hierarchy fields and update YAML and inline metadata
let inlineMetadata = "";
inlineMetadata += await promptForFile("parent");
inlineMetadata += await promptForFile("child");
inlineMetadata += await promptForFile("prev");
inlineMetadata += await promptForFile("next");

// YAML front matter end
yaml += "---\n\n";

// Add inline metadata
yaml += inlineMetadata + "\n";

// Add the heading
yaml += `# ${result}\n\n`;

// Prompt for content
let content = await tp.system.prompt("Enter your note content here", "", true); // multiline input
yaml += content + "\n";

// Output everything
tR += yaml;
%>
