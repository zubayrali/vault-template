<%*
// YAML front matter start
tR += "---\n";
tR += `title: "${tp.file.title}"\n`;  // Title is automatically set to the file name
tR += `description: "${await tp.system.prompt("Enter description")}"\n`;  // Description prompt
tR += `date: "${await tp.system.prompt("Enter date (YYYY-MM-DD)", moment().format("YYYY-MM-DD"))}"\n`;  // Date prompt with default to current date
tR += `lastmod: "${moment().format("YYYY-MM-DD")}"\n`;  // Last modified date automatically set to today
tR += `draft: ${await tp.system.suggester(["True", "False"], ["true", "false"], false, "Is this a draft?")}\n`;  // Draft flag
tR += `author: "${await tp.system.prompt("Enter author name")}"\n`;  // Author prompt
tR += `tags: [${await tp.system.prompt("Enter tags (comma-separated)")}] \n`;  // Tags prompt
tR += "---\n\n";

// Prompt for article content
tR += await tp.system.prompt("Enter your article content here");
%>
