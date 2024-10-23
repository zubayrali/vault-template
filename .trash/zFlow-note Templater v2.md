<% "---" %>
<%*
  const modalForm = app.plugins.plugins.modalforms.api;
  const currentTitle = app.workspace.activeLeaf.view.file ? app.workspace.activeLeaf.view.file.basename : "Untitled";
  const defaultValues = { title: currentTitle };
  const result = await modalForm.openForm("zFlow-note", { values: defaultValues });

  // Use Modal Form's built-in methods to format the result
  tR += result.asFrontmatterString(['title', 'lead', 'tags', 'up', 'related', 'prev', 'down']);
-%>
<% "---" %>
# <% tp.frontmatter.title %>

<% tp.frontmatter.lead %>