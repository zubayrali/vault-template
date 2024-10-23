<%*
const modalForm = app.plugins.plugins['modalforms'].api;
const result = await modalForm.openForm('video');

if (result) {
  let tags = ['type/video'];
  if (result.data.status) {
    tags.push(`status/${result.data.status.toLowerCase()}`);
  }
  
  let authorLink = result.data.author ? `[[${result.data.author}]]` : '';

  tR += `---
title: ${result.data.title}
fileClass: video
author: ${authorLink}
url: ${result.data.url}
created: ${tp.date.now("YYYY-MM-DD")}
updated: ${tp.date.now("YYYY-MM-DD")}
tags:
${tags.map(tag => `  - ${tag}`).join('\n')}
---

# ${result.data.title}

${result.data.content}

## Notes

## Related
- 
`;
}
%>