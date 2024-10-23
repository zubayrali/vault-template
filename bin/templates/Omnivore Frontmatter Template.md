id: {{id}}
fileClass: omnivore
title: "{{title}} {{#siteName}}- {{{siteName}}}{{/siteName}}{{^siteName}}Unknown Source{{/siteName}}"
{{#author.length}}
author:
{{#author}} - "{{author}}"
{{/author}}
{{/author.length}}
date_saved: {{#dateSaved}}{{{dateSaved}}}{{/dateSaved}}{{^dateSaved}}null{{/dateSaved}}
date_published: {{#datePublished}}{{{datePublished}}}{{/datePublished}}{{^datePublished}}null{{/datePublished}}
url: "{{{originalUrl}}}"
omnivore_url: "{{{omnivoreUrl}}}"
site_name: "{{#siteName}}{{{siteName}}}{{/siteName}}{{^siteName}}Unknown Source{{/siteName}}"
status: "{{#labels}}{{#name}}{{name}}{{/name}}{{/labels}}{{^labels}}Unknown{{/labels}}"
tags:

- sources/highlights
- sources/articles
