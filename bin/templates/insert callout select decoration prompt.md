---
up:
  - "[[templates]]"
---
<%*

const calloutTypes = [
  "cc-callout-center", "cc-image-clip", "cc-image-cover", 
  "cc-header", "cc-header-noborder", "cc-footer", 
  "cc-footer-noborder", "cc-label-left", "cc-label-left-noborder", 
  "cc-label-right", "cc-label-right-noborder"
];

let calloutType = await tp.system.suggester(calloutTypes, calloutTypes, false, "Which type of callout do you want to insert?");

let title = await tp.system.prompt("Optional Title Text", "");

if (calloutType != null) {
  let content = `> [!${calloutType}] ${title}\n`;
  tR += content;
}
%>
