
<%* let title = tp.file.title
  if (title.startsWith("Untitled")) {
    title = await tp.system.prompt("Title");
    await tp.file.rename(title);
  } 
-%>
<%*
  let result = title.replace(/\b\w/g, c => c.toUpperCase());
  tR += "---"
%>
id: <% tp.user.new_uuid() %>
title: <%* tR += "\"" + result + "\"" %>
created: <% moment(tp.file.creation_date("YYYY-MM-DDTHH:mm:ss.SSSZ")).toISOString() %>
updated: <% moment(tp.file.last_modified_date("YYYY-MM-DDTHH:mm:ss.SSSZ")).toISOString() %>
tags: <% await tp.system.suggester(["quotes", "swipes", "excerpts phrases", "sayings", "poetry", "fortunes", "idioms"], ["quotes", "swipes", "excerpts phrases", "sayings", "poetry", "fortunes", "idioms"]) %>
---

<% tp.file.cursor() %>
