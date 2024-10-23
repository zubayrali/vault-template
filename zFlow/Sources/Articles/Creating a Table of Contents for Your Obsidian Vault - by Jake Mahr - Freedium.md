---
id: 7ce814ee-82de-4f7a-baca-14e3dd1f989b
fileClass: omnivore
title: Creating a Table of Contents for Your Obsidian Vault | by Jake Mahr - Freedium - freedium.cfd
author:
  - unknown
date_saved: 2024-09-26 17:43:14
date_published: 
url: https://www.freedium.cfd/@jakeamahr/creating-a-table-of-contents-for-your-obsidian-vault-5c8e71d5e3da
omnivore_url: https://omnivore.app/me/creating-a-table-of-contents-for-your-obsidian-vault-by-jake-mah-1923049c85e
site_name: freedium.cfd
status: Unknown
tags:
  - highlights
  - source/article
---

# Creating a Table of Contents for Your Obsidian Vault | by Jake Mahr - Freedium

[ ![Jake Mahr](https://proxy-prod.omnivore-image-cache.app/0x0,syoxxgvr1ZaprOaHKV60u06Wfqy1BWMYTESU3JlWKXF0/https://miro.medium.com/v2/resize:fill:88:88/1*WXS0fZaRoBTJCTIRH4O0Ow.jpeg) ](https://medium.com/@jakeamahr "Sharing some things I do/make. Learning in public while I'm at it.") 

androidstudio · February 9, 2024 (Updated: February 9, 2024) · Free: No 

#### OPENING THE VAULT

We all have personal preferences about how we organize our notes, files, and ==documents, and Obsidian users are no exception. In fact, Obsidian's flexibility, with options for tags, links, folders, and even custom properties and metadata, means there are countless ways to sort, categorize, and order your notes.==

==Some prefer no folder structure whatsoever, relying== on tags, links, and keywords to find the note they are looking for, often using the search or the built-in Quick Switcher plugin (`ctrl+O` or `cmd+O`). Others use deeply nested file folder structures to keep every note in a specific location (🙋‍♂️ guilty as charged).

Regardless of how you store your notes, though, having an overarching table of contents for your entire vault can often be helpful in finding an elusive note that isn't coming up through searches or doesn't seem to be in the folder you thought. It's also a great way to get a quick overview of your vault contents.

In this article, I'll walk through a simple two-step process to creating a table of contents for your vault that **automatically updates and maintains itself**. The only requirement is that you install the [Dataview](https://blacksmithgu.github.io/obsidian-dataview/) community plugin. Otherwise, this table of contents will work fine with tags, links, folders, or any other metadata you may use to organize your notes.

### Step 1: Create the "Sub" Indices

While it may seem a bit counter-intuitive, we will begin by creating a few notes to group some of our other notes based on certain properties. This just helps minimize the amount of content that we'll call in the main table of contents itself.

While we could theoretically create a table of contents from our entire vault by using a simple dataview query like this:

```routeros
```dataview 
LIST rows.file.link 
GROUP BY tags
```
```

We would soon be left with an unruly table of contents as our number of notes increases.

So instead, we will create a series of notes that ask for more specific queries than the one above, and then use those for our main table of contents.

**Think of it like a textbook:** the table of contents lists the chapters of the book, and then the sections within each chapter. These "sub" indices will act as those sections, and your notes as individual pages within those sections. Meanwhile, the main table of contents will sort those sections into the chapters (more on that later).

The idea in the end is to quickly be able to navigate from the main Table of Contents, to one of these individual section/sub-index notes, and from there to the specific note we want.

The exact contents of these notes are going to depend on your own organizational habits and structure. If you give every note a tag, you could create separate sub-indices for each tag (or at least the most important/prevalent) ones. Alternatively, if you use a folder structure, you could create indices for each folder using file paths.

As someone who uses deeply-nested folders, I mainly use the latter. Within a broad folder, I will have notes for each sub-folder, using the same name. In each of these notes, I create a dataview query to call all of the notes in the associated sub-folder.

For example, here is the query I use to gather all of the notes I take on videos I watch in a "Videos" note:

```pgsql
``` dataview 
TABLE without ID 
file.link as Name, Source, tags as Tags 
FROM "PKM/Videos"
```

> Note: "Source" here is just a custom metadata field I have for a link to the video

However, you could easily rewrite this to grab all notes that are `FROM #video`, for example, or contain some other identifying metadata.

Note that it **isn't necessary to restrict yourself to only one kind of organizational structure here**. You can have some sub-indices that call notes based on file path, and others that use tags or backlinks. You can also certainly have sub-indices with overlapping content (for example, a sub-index for dinner recipes and one for 30-minute meals might pull a few of the same notes). Additionally, you can use `TABLE` or `LIST` dataview queries, or both!

**The only requirements for these sub-index notes are:**

1. That they have some way to be identified in your vault and to be called in a dataview query (such as a specific tag, link, property, or inline field)
2. That they are named something obvious that relates to its contents
3. That they contain a dataview query, calling notes that share some property (a tag, folder, backlink, etc.)
4. That they contain an additional property/metadata to further group them in the main table of contents (the "chapters" mentioned above).

For the first requirement, I typically just add a link to my main table of contents note in the H1 header of each sub-index. For example:

```lua
# [[Table of Contents]]: Videos
```

This not only makes it easy to find every sub-index note, since they are the only ones with this link, but also doubles as a quick way to access the main table of contents from each sub-index.

This is also the example I will be continuing with in this article, but note that you could also use `#toc`, for example, or create a some other unique property.

For the final requirement, I like to add a piece of inline metadata below the H1 title named "Section". The idea here is that you will use the same value across multiple sub-indices to then group them later on in the main table of contents. Of course, you can add this metadata anywhere in the note.

In my example, my "Videos" sub-index might look like this:

```clean
# [[Table of Contents]]: Videos 
#### Section:: PKM 

```dataview 
TABLE without ID 
file.link as Name, Source, tags as Tags 
FROM "PKM/Videos"
```
```

![None](https://proxy-prod.omnivore-image-cache.app/0x0,s_sV0a8cKXFVfsDFgsgn8IBoWRhrjwr23LrGQhSXUCWE/https://miro.medium.com/v2/resize:fit:700/1*TGz_kj0aTlB_UhBjpqGUaQ.png)

A sample from a sub-index, grouping notes I take on videos. (Note that "Table of Contents" in the H1 header is a link, but my style settings make links and H1 headers the same color). And shout out to [this great video](https://youtu.be/ZJop14hgf40?si=lpzwvs8onqEqS90m) by Nicole van der Hoeven!

Now we simply need to create a few more of these sub-index notes, and we'll be ready to go!

### Step 2: Creating the Main Table of Contents

Once we have a collection of sub-index notes that group other notes based on certain data, we can create our main table of contents.

This is actually quite simple, and can be done with just a few lines of dataview code:

```routeros
# Table of Contents 

```dataview 
TABLE 
rows.file.link AS Name 
FROM [[Table of Contents]] 
SORT section ASC 
GROUP BY section AS Section
```
```

Here, I call the links (`rows.file.link`) to each sub-index that has the `[[Table of Contents]]` backlink in it. I then sort and group them by the "section" metadata that I've added to each one (if you used other metadata/properties to identify each sub-index and it's section, simply adjust as needed!).

The result is a well-organized table of contents:

![None](https://proxy-prod.omnivore-image-cache.app/0x0,sY6A98ayAIbG1wfnvB3pa5hAXMzZO_G1FyB2K6eiTKCc/https://miro.medium.com/v2/resize:fit:700/1*kUv4gNIslMsWIt7KZBmRfg.png)

A sample table of contents.

From this table of contents, I can easily click on any of the links to my sub-indices, which then contain links to each related note. Better yet, as I create more notes and different sub-indices, this table of contents will automatically keep itself up-to-date.

### Taking it Further

What I've detailed above is a relatively basic (though entirely functional) approach to the table of contents. However, there are a few things you could do to take it further:

#### Minimum Theme Cards

If you're one of the hundreds of thousands of users of the Minimal theme, a simple tweak to create a more appealing table of contents is to add the "cards" class to the `cssclasses` property in the main table of contents note, and even in any sub-index notes you like:

![None](https://proxy-prod.omnivore-image-cache.app/0x0,sqcPmwyFFIbsWl-5s13egkUoUw6595V23scSjbtwXCsI/https://miro.medium.com/v2/resize:fit:700/1*iV2yEpe4Mz88QHodfHVEfg.png)

A sample table of contents using Minimal's cards.

You can learn more about cards in the [Minimal Documentation](https://minimal.guide/cards).

#### Navigating Back and Forth (and Back Again)

As explained above, using a link to the main table of contents note in the sub-indices not only allows them to be called easily in the main note, but also makes for easy navigation from a sub-index back to the main table of contents. To complete the cycle, you could also add a link to the relevant sub-index note within the other individual notes in your vault (this can be done fairly automatically through the use of templates).

Continuing with my example, I could add a `[[Videos]]` link at the bottom of each note I have about a specific video. This will then lead me to the "Videos" sub-index, which could then lead me back to the table of contents. In this way, your entire vault can become almost entirely navigable through clicking, with links between notes, sub-indices, and the table of contents.

![None](https://proxy-prod.omnivore-image-cache.app/0x0,slfng1T_tKk3VL1H8Po5eJCsQ3AKlYsHY746NC3Fuxrg/https://miro.medium.com/v2/resize:fit:700/1*OKJNsozqTygYaXBoIE9KTA.gif)

An example of adding the necessary links to be able to navigate back and forth between notes, sub-indices, and the main table of contents.

#### More Detailed & Nested Indices

As your vault grows, you may find the need to minimize the number of sub-index notes you have showing up in your main table of contents.

One solution is to create more detailed sub-indices. While the example I've used here is for a "Videos" sub-index, my personal vault actually only contains a single sub-index for everything I consider part of my "PKM". This note is then divided into three sections with subheaders, each with a different dataview query: one for articles, one for videos, and one for books.

Another option is to create nested indices. There is no real reason to stop at just one sub-index as an intermediary between the main table of contents and an individual note. As your vault grows more and more extensive and wide-ranging, you could easily add both broader and more specific sub-indices to help you streamline the content in the main table of contents, and to better drill-down to a specific note.

In my vault, I have a use-case for this in storing recipes. Each recipe note is given a "Section" (i.e., vegetables, grains, cookies) and a "Meal" (i.e., breakfast, dinner, snack) metadata value. My main table of contents leads only to a "Recipes" sub-index, which itself in turn leads to sub-indices for each section and meal type.

### Final Thoughts

As someone who does make extensive use of folders in my vault, I actually find that using a table of contents like the one detailed here makes it easier to navigate to specific notes, as opposed to using the file navigation side pane. Additionally, I appreciate that my sub-indices can sometimes contain the same note, allowing it to be "stored" in multiple places at once.

Even those who eschew folders and rely on Quick Switcher or the search field to find specific notes might fall back on a table of contents like this to narrow in on notes that aren't coming up as expected in searches.

Finally, I enjoy that this table of contents offers me a "bird's-eye view" of my vault, and can even offer hints at areas that might be missing.

If you have any questions or comments about creating your own table of contents, feel free to drop them in the comments!


## Highlights

highlight:: documents, and Obsidian users are no exception. In fact, Obsidian's flexibility, with options for tags, links, folders, and even custom properties and metadata, means there are countless ways to sort, categorize, and order your notes.

Some prefer no folder structure whatsoever, relying [⤴️](https://omnivore.app/me/creating-a-table-of-contents-for-your-obsidian-vault-by-jake-mah-1923049c85e#baaccca5-2259-485c-a9c4-d27413825d8c) #highlight


---


[View in Omnivore](https://omnivore.app/me/creating-a-table-of-contents-for-your-obsidian-vault-by-jake-mah-1923049c85e)
