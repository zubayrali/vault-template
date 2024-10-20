<% "---" %>
<%*
  const modalForm = app.plugins.plugins.modalforms.api;

  // Get the current note's title, fallback to "Untitled" if no title is set.
  const currentTitle = tp.file.title || "Untitled";

  // Define the default values for the form fields, using the current title as a default.
  const defaultValues = { title: currentTitle };

  // Open the form with default values
  const result = await modalForm.openForm("Effort", { values: defaultValues });

  // If the form was canceled, stop processing the template
  if (!result) {
    tR += "Form was canceled. No note created.";
    return;
  }

  // Log raw values for debugging purposes
  console.log("Raw modal form values:", result);

  // Use the handleTags user function to ensure the 'type/effort' tag is added
  let tags = result.data.tags || '';
  if (typeof tags === 'string') {
    tags = tags.split(',').map(tag => tag.trim());
  } else if (!Array.isArray(tags)) {
    tags = [];
  }
  
  // Ensure the 'type/effort' tag is present
  if (!tags.includes('type/effort')) {
    tags.unshift('type/effort');
  }

  // Normalize aliases into an array if they are not already
  const aliases = result.data.aliases ? result.data.aliases.split(',').map(alias => alias.trim()) : [];

  const formatList = tp.user.formatList;

  const title = result.data.title || currentTitle;
  const description = result.data.description || '';
  const type = result.data.type || '';
  const rank = result.data.rank || '';
  const eol = result.data.eol !== undefined ? result.data.eol : false;

  // Rename the file if the title has changed
  if (title !== currentTitle) {
    await tp.file.rename(title);
  }
-%>
title: <%* tR += title %>
aliases:<%* tR += formatList(aliases) %>
fileClass: effort
description: <%* tR += description %>
type: <%* tR += type %>
created: <% tp.date.now("YYYY-MM-DD") %>
updated: <% tp.date.now("YYYY-MM-DD") %>
rank: <%* tR += rank %>
eol: <%* tR += eol %>
tags: <%* tR += tags.join(', ') %>
<% "---" %>

# <%* tR += title %>

> `VIEW[{description}][text]`



> [!year] Time
> - What time-consuming activities should I reduce to stay focused on this effort?
> - How will I allocate my time each week to ensure consistent progress toward this effort?

> [!training] Energy
> - What activities energize me, and how can I incorporate them into my routine while pursuing this effort?
> - How can I change my environment to make progress on this effort more effortless?

> [!brain] Mindset
> - What limiting beliefs might slow my progress, and how can I reframe them to support this effort?
> - How can I develop a mindset that embraces challenges and learns from obstacles during this effort?

> [!increase] Process
> - What setbacks might I encounter, and how can I prepare for them?
> - What specific daily or weekly actions will keep me on track with this effort?

> [!trophy] Long-term Impact
> - What habits or actions can I consistently maintain for 10 days? 30 days? 100 days?
> - How will progress on this effort contribute to my broader objectives or overall life direction?

> [!example]+ Tasks


> [!summary]- Files
>
> ```dataview
> TABLE file.ctime AS "Created On", file.mtime AS "Updated On"
> FROM "Efforts/<%* tR += title %>"
> WHERE file.name != this.file.name
> SORT file.mtime DESC
> ```

> [!multi-column]
>
> > [!todo]- Todo
>> ```tasks
>> not done
>> path includes {{query.file.path}}
>> (status.type is not IN_PROGRESS)
>> short mode
>> hide due date
>> hide backlink
>> hide edit button
>> hide start date
>> hide scheduled date
>> hide recurrence rule
>> sort by urgency, scheduled
>> ```
>
> > [!warning]- Doing
>> ```tasks
>> not done
>> path includes {{query.file.path}}
>> (status.type is IN_PROGRESS)
>> short mode
>> hide due date
>> hide backlink
>> hide edit button
>> hide start date
>> hide scheduled date
>> hide recurrence rule
>> sort by urgency, due
>> ```
>
> > [!summary]- Done
>> ```tasks
>> done
>> path includes {{query.file.path}}
>> short mode
>> hide due date
>> hide backlink
>> hide edit button
>> hide start date
>> hide scheduled date
>> hide recurrence rule
>> hide priority
>> sort by done reverse
>> ```
