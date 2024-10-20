<% "---" %>
<%*
  const modalForm = app.plugins.plugins.modalforms.api;
  const currentTitle = tp.file.title;
  const defaultValues = { title: currentTitle };
  const result = await modalForm.openForm("Note", { values: defaultValues });

  if (!result) {
    tR += "Form was canceled. No note created.";
    return;
  }

  // Directly log the raw values to help in debugging
  console.log("Raw modal form values:", result);

  const formatBacklinksAsYamlList = tp.user.formatBacklinksAsYamlList;

  // Extract values from the form
  const type = result.data.type || 'note';
  const title = result.data.title || currentTitle;
  const content = result.data.content || '';
  const defType = result.get("def-type") || '';
  const up = result.get("up") || '';
  const related = result.get("related") || '';
  const prev = result.get("prev") || '';
  const down = result.get("down") || '';
  const aliases = result.data.aliases ? result.data.aliases.split(',').map(alias => alias.trim()) : [];

  // Ensure tags are always an array, even if no tags or a single tag is provided
  let tags = result.data.tags;
  if (typeof tags === 'string') {
    tags = tags ? tags.split(',').map(tag => tag.trim()) : [];
  } else if (!Array.isArray(tags)) {
    tags = [];
  }

  // Add the required tag (e.g., type/concept or type/initiative)
  const typeTag = `type/${result.data.type || 'note'}`;
  if (!tags.includes(typeTag)) {
    tags.unshift(typeTag);  // Add the required tag if it's not already there
  }

  const isDefinitionNote = typeTag === 'type/definition';


  // Format aliases and tags for YAML
  const formatList = (items) => {
    if (!items || items.length === 0) return '';
    return '\n' + items.map(item => `  - ${item}`).join('\n');
  };

  // Format backlinks
  const formattedUp = formatBacklinksAsYamlList(up);
  const formattedRelated = formatBacklinksAsYamlList(related);
  const formattedPrev = formatBacklinksAsYamlList(prev);
  const formattedDown = formatBacklinksAsYamlList(down);

  const formattedTags = formatList(tags);
  const formattedAliases = formatList(aliases);

  // Rename the file if the title has changed
  if (title !== currentTitle) {
    await tp.file.rename(title);
  }
-%>
title: <%* tR += title %>
fileClass: <%* tR += type %>
created: <% tp.date.now("YYYY-MM-DD") %>
updated: <% tp.date.now("YYYY-MM-DD") %>
aliases: <%* tR += formattedAliases %>
tags: <%* tR += formattedTags %> <%* if (isDefinitionNote) { %>
def-type: <%* tR += defType %> <%* } %>
up: <%* tR += formattedUp ? '\n' + formattedUp : '' %>
related: <%* tR += formattedRelated ? '\n' + formattedRelated : '' %>
prev: <%* tR += formattedPrev ? '\n' + formattedPrev : '' %>
down: <%* tR += formattedDown ? '\n' + formattedDown : '' %>
<% "---" %>

# <%* tR += title %>

 <%* tR += content %>
