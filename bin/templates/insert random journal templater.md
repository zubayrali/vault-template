---
up:
  - "[[templates]]"
---
<%*
tR = "";

tR += "## Random Questions\n";

const numberOfPrompts = 3;
const selectedIndices = new Set();  // To keep track of selected prompt indices

const promptsFile = app.metadataCache.getFirstLinkpathDest("journal-prompts","");
const promptsContent = await app.vault.read(promptsFile);
const prompts = promptsContent.split("\n").filter(line => line.trim() !== '');  // Filter out blank lines

while (selectedIndices.size < numberOfPrompts && selectedIndices.size < prompts.length) {
  const n = Math.floor(Math.random() * prompts.length);
  if (!selectedIndices.has(n)) {
    tR += "### " + prompts[n] + "\n\n";
    selectedIndices.add(n);
  }
}
%>

