<% "---" %>
<%*
  const modalForm = app.plugins.plugins.modalforms.api;
  const currentTitle = tp.file.title || "Untitled";
  const defaultValues = { title: currentTitle };
  const result = await modalForm.openForm("Initiative", { values: defaultValues });

  if (!result) {
    tR += "Form was canceled. No note created.";
    return;
  }

  // Log raw values for debugging purposes
  console.log("Raw modal form values:", result);

  // Use the handleTags user function to ensure the 'type/initiative' tag is added
  let tags = result.data.tags || '';
  if (typeof tags === 'string') {
    tags = tags.split(',').map(tag => tag.trim());
  } else if (!Array.isArray(tags)) {
    tags = [];
  }
  
  // Ensure the 'type/initiative' tag is present
  if (!tags.includes('type/initiative')) {
    tags.unshift('type/initiative');
  }

  // Normalize the efforts field into an array and format as YAML backlinks
  const efforts = result.data.effort ? result.data.effort : [];
  const formattedEfforts = tp.user.formatBacklinksAsYamlList(efforts);

  // Normalize aliases into an array if provided
  const aliases = result.data.aliases ? result.data.aliases.split(',').map(alias => alias.trim()) : [];

  const formatList = tp.user.formatList;

  const title = result.data.title || currentTitle;
  const description = result.data.description || '';
  const status = result.data.status || '';
  const dueDate = result.data.dueDate || '';
  const eol = result.data.eol || '';

  // Rename the file if the title has changed
  if (title !== currentTitle) {
    await tp.file.rename(title);
  }
-%>
title: <%* tR += title %>
fileClass: initiative
created: <% tp.date.now("YYYY-MM-DD") %>
updated: <% tp.date.now("YYYY-MM-DD") %>
aliases:<%* tR += formatList(aliases) %>
tags: <%* tR += tags.join(', ') %>
description: <%* tR += description %>
dueDate: <%* tR += dueDate %>
status: <%* tR += status %>
eol: <%* tR += eol %>
efforts:
<%* tR += formattedEfforts %>
<% "---" %>

# <%* tR += title %>

> `VIEW[{description}][text]`


> [!year] Time
> - What tasks or steps require immediate attention today?
> - How can I organize my time each day to make steady progress on this initiative?

> [!training] Energy
> - What activities energize me, and how can I incorporate them into my daily routine to stay engaged in this initiative?

> [!brain] Mindset
> - What challenges or uncertainties are blocking progress, and how can I tackle them?
> - What shifts in my thinking will help me stay flexible and focused on the big picture?

> [!increase] Process
> - What setbacks could arise, and how can I plan around them to keep the initiative on track?
> - What daily habits or actions will keep me moving toward completion?

> [!trophy] Long-term Impact
> - What small wins can I aim for today? This week? This month?
> - How will completing this initiative contribute to my larger objectives or overall vision?

> [!example]+ Tasks

> [!summary]- Files
>
> ```dataview
> TABLE file.ctime AS "Created On", file.mtime AS "Updated On"
> FROM "Efforts/Initiatives/<%* tR += title %>"
> WHERE file.name != this.file.name
> SORT file.mtime DESC
> ```

> [!multi-column]
>
> > [!todo]- Todo
> >
> > ```tasks
> > not done
> > path includes {{query.file.path}}
> > (status.type is not IN_PROGRESS)
> > short mode
> > hide due date
> > hide backlink
> > hide edit button
> > hide start date
> > hide scheduled date
> > hide recurrence rule
> > sort by urgency, scheduled
> > ```
>
> > [!warning]- Doing
> >
> > ```tasks
> > not done
> > path includes {{query.file.path}}
> > (status.type is IN_PROGRESS)
> > short mode
> > hide due date
> > hide backlink
> > hide edit button
> > hide start date
> > hide scheduled date
> > hide recurrence rule
> > sort by urgency, due
> > ```
>
> > [!summary]- Done
> >
> > ```tasks
> > done
> > path includes {{query.file.path}}
> > short mode
> > hide due date
> > hide backlink
> > hide edit button
> > hide start date
> > hide scheduled date
> > hide recurrence rule
> > hide priority
> > sort by done reverse
> > ```
