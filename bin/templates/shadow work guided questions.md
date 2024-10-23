<%*
tR = "";

tR += "## Guided Questions\n\n";
tR += "%%These Guided Questions will help you explore those unconscious beliefs, patterns, and self-reflection, and encourage acceptance. This can be hard and maybe uncomfortable but it is outside of comfort where we truly grow.%%\n\n";

const numberOfPrompts = 3;

const selectedIndices = new Set();

const promptsFile = app.metadataCache.getFirstLinkpathDest("shadow-work-guided-questions","");

const promptsContent = await app.vault.read(promptsFile);
const prompts = promptsContent.split("\n").filter(line => line.trim() !== '');

while (selectedIndices.size < numberOfPrompts && selectedIndices.size < prompts.length) {
  const n = Math.floor(Math.random() * prompts.length);
  if (!selectedIndices.has(n)) {
    tR += "### " + prompts[n] + "\n\n";
    selectedIndices.add(n);
  }
}
%>
