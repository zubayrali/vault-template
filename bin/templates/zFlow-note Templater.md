<% "---" %>
<%*
  const modalForm = app.plugins.plugins.modalforms.api;
  const currentTitle = app.workspace.activeLeaf.view.file ? app.workspace.activeLeaf.view.file.basename : "Untitled";
  const defaultValues = { title: currentTitle };
  const result = await modalForm.openForm("zFlow-note", { values: defaultValues });

  if (!result) {
    tR += "Form was canceled. No note created.";
    return;
  }

  // Directly log the raw values to help in debugging
  console.log("Raw modal form values:", result);
  
  const formatBacklinksAsYamlList = tp.user.formatBacklinksAsYamlList;

  // Extract form values
  const title = result.get("title") || currentTitle;
  const lead = result.get("lead") || '';
  const tags = result.get("tags") || '';
  const up = result.get("up") || '';
  const related = result.get("related") || '';
  const prev = result.get("prev") || '';
  const down = result.get("down") || '';

  // Handle tags
  let formattedTags = tp.user.handleTags(tags, 'type/note');

  // Format backlinks
  const formattedUp = formatBacklinksAsYamlList(up);
  const formattedRelated = formatBacklinksAsYamlList(related);
  const formattedPrev = formatBacklinksAsYamlList(prev);
  const formattedDown = formatBacklinksAsYamlList(down);

  // Rename the file if the title has changed
  if (title !== currentTitle) {
    await tp.file.rename(title);
  }
-%>
title: <%* tR += title %>
lead: <%* tR += lead %>
tags: <%* tR += formattedTags.join(', ') %>
up:<%* tR += formattedUp ? '\n' + formattedUp : '' %>
related:<%* tR += formattedRelated ? '\n' + formattedRelated : '' %>
prev:<%* tR += formattedPrev ? '\n' + formattedPrev : '' %>
down:<%* tR += formattedDown ? '\n' + formattedDown : '' %>
<% "---" %>

# <%* tR += title %>

`VIEW[{lead}][text]`