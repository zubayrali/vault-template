---
id: bbc006f5-6f90-48cc-90a7-98fb40ef4f18
fileClass: omnivore
title: Digital Smart Notes in Obsidian Part 2 - How to Create Literature Notes - Harley Stagner
author:
  - Harley Stagner
date_saved: 2023-11-27 16:15:13
date_published: 2021-05-31 08:00:00
url: https://harleystagner.com/digital-smart-notes-in-obsidian-part-2-how-to-create-literature-notes/
omnivore_url: https://omnivore.app/me/digital-smart-notes-in-obsidian-part-2-how-to-create-literature--18c12a2df94
site_name: Harley Stagner
status: read
tags:
  - highlights
  - source/article
---

# Digital Smart Notes in Obsidian Part 2 - How to Create Literature Notes

When creating a Literature Note, I like to use just enough structure to organize.

When creating a Literature Note, I like to use just enough structure to organize.

Welcome to Digital Smart Notes in [Obsidian](https://obsidian.md/?ref=harleystagner.com) Part 2\. In [Part 1](https://harleystagner.com/digital-smart-notes-in-obsidian-part-1-exporting-highlights-from-readwise/), I covered syncing your Readwise reference notes to Obsidian with the [Readwise Community Plugin](https://github.com/renehernandez/obsidian-readwise?ref=harleystagner.com). This article will cover how to create Literature Notes in Obsidian from those highlights you carefully curated during your reading.

As a quick refresher, I follow a workflow adapted from [How to Take Smart Notes](https://www.goodreads.com/book/show/34507927-how-to-take-smart-notes?ref=harleystagner.com) by Sönke Ahrens. These are the high-level tasks described in the book:

* Make fleeting notes
* Make literature notes
* Make permanent notes

## Literature Note Structure

When creating a Literature Note, I like to use just enough structure to organize. I don't want too much metadata getting in the way of the note itself. I have found a good balance of metadata and content for me with the format demonstrated below.

![Obsidian Literature Note](https://proxy-prod.omnivore-image-cache.app/0x0,shYkjVMhmJoxitUeXh1dZI4YuuM-GgWk8UL8UWGrelDg/https://harleystagner.com/content/images/2021/05/Obsidian-LitNote-Preview-Explainer.png)

Obsidian Literature Note

## Title

I repeat the title (without the date stamp) in bold as the first line in the note preview. The title repetition is to help when I display the embedded note inside a Permanent Note.

## Tag Section

The tag section is a single line at the top. This tag section is further broken down into two categories, with a `|` separating these categories.

* **Main Tag**: This tag denotes the type of note that I am creating. I use `#litnote` for this.
* **Secondary Tags**: These are the general related topic areas that I consider when creating the note.

## Note, Quote, Source

I call the next section the NQS section or Note, Quote, Source.

* **Notes**: This is the Literature Note (in my own words) derived from the highlight(s) of the Reference Note.
* **Quotes**: These are embedded highlights from the Reference Note imported from [Readwise](https://readwise.io/?ref=harleystagner.com). A block embed takes this form of `![[<Note Title>#^<block-id>]]` For example, you can create this by starting to type `![[How to Take Smart Notes#^<Select the line from the note or start typing to search>]]`. Once you find the line you are looking for, hit enter, and the embed will be complete.
* **Source**: This is the source material. In this example, the note is derived from the book "How to Take Smart Notes."

That's it for content. I like to keep the note as straightforward as possible while allowing for querying.

## Hidden Metadata: YAML Front Matter

Let's take a look at the same Literature Note in edit mode.

![YAML Front Matter](https://proxy-prod.omnivore-image-cache.app/0x0,sOqnaHVuQgjrGumSAF4Mfv_FkMZNhPXIwLDW6R4JCznc/https://harleystagner.com/content/images/2021/05/Obsidian-LitNote-Edit-Explainer.png)

YAML Front Matter

There is an extra bit of information at the top of the note that does not show in preview mode. The extra information is called [YAML Front Matter](https://help.obsidian.md/Advanced+topics/YAML+front+matter?ref=harleystagner.com). I use this section to give the note additional properties that I don't want to show in preview mode. These properties make it easier for me to search the note later. I also use the `cssclass` YAML property specifically to style the note separately from my other general notes. In this example, I can treat `literature-note`as a regular CSS class to target elements for styling on a note with the `cssclass: literature-note` front matter.

## Literature Notes Section on the Reference Note

If you are using the [Dataview plugin](https://github.com/blacksmithgu/obsidian-dataview?ref=harleystagner.com) that was suggested in [part 1 of this series](https://harleystagner.com/digital-smart-notes-in-obsidian-part-1-exporting-highlights-from-readwise/), the new Literature Note will show up in the Dataview table in preview mode on the Reference Note page. This table view is why we created that Dataview section under the `# Literature Notes` heading. As a reminder, the code for this Dataview query looks like this:

```routeros
```dataview
TABLE rows.file.link AS "Literature Note", rows.file.cday AS "Date"

FROM #litnote AND [[How to Take Smart Notes]]

GROUP BY file.link

sort date ASCENDING
```

```

![Obsidian Reference Note](https://proxy-prod.omnivore-image-cache.app/0x0,stRA6phv3ts_JdDqSP_ICz2Gnpy7INyuUbB_7cS7SMVU/https://harleystagner.com/content/images/2021/05/Obsidian-Reference-Note.png)

Obsidian Reference Note

Every time a new Literature Note is added and linked back to the original Reference Note, it will show up in this table.

## Automating the Process

Everything you need to create a Literature Note can be accomplished by following the structure outlined in this article. If you want to automate the processes to make it easier to capture your thoughts without worrying too much about the structure, then keep reading.

I use the fantastic community plugin called [Templater](https://github.com/SilentVoid13/Templater?ref=harleystagner.com) for most of my automation in Obsidian. You can find setup and configuration for Templater in the [documentation site for the plugin](https://silentvoid13.github.io/Templater/?ref=harleystagner.com). There is also an excellent video from GitMurf about [setting up your first Templater JS script](https://github.com/SilentVoid13/Templater/discussions/187?ref=harleystagner.com). For my Literature Notes creation workflow, I use two different Templater scripts.

* copy.blockref: This script creates a block reference and copies the embed code from that block reference to my clipboard, making it ready to paste into the Literature Note. I tie this to a keyboard shortcut using the [Hotkeys for Templates](https://github.com/Vinzent03/obsidian-hotkeys-for-templates?ref=harleystagner.com) plugin.
* T-Literature Note: This script prompts several items in the Literature Note and then creates a new note with the structure in place. The cursor is placed where you would need to paste the first block reference from your Readwise highlights.

The contents of the two scripts are below.

**copy.blockref**

```javascript
<%*
function createBlockHash() {
    let result = '';
    var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 7; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
let id = createBlockHash();
let blockRef;

blockRef = `![[${tp.file.title}#^${id}]]`.split("\n").join("");
tR = tp.file.selection() + ` ^${id}`.split("\n").join("");
selectedText = blockRef;

navigator.clipboard.writeText(blockRef).then(text => text);
-%>

```

**T-Literature Note**

```javascript
<%*
// show a prompt to enter a note title
const promptNoteTitle = await tp.system.prompt("Note title:");
// show a prompt to enter notes
const promptNotes = await tp.system.prompt("Notes:");
// show a prompt to enter tags
const promptTags = await tp.system.prompt("Tags: Space Delimited");
// choose the Reference Source
const referenceNote = await tp.system.suggester((item) => item.path, this.app.vault.getMarkdownFiles(), false);
// Take the inputted name and prefix with a date
const title = await tp.date.now("YYMMDD") + " - " + promptNoteTitle;
// rename the note with the title defined above and move to proper folder
await tp.file.move("3.Resources/Zettelkasten/Literature Notes/" + title);
-%>
---
<% tp.file.include("[[YFM.NoteType.LiteratureNote]]") -%>
<% tp.file.include("[[YFM.CSSClass.LiteratureNote]]") %>
---
**<%*tR += promptNoteTitle %>**
***
#litnote | <%* tR += promptTags %>
***

# Notes:
<%* tR += promptNotes -%>

## Quote(s):
<% tp.file.cursor() %>
# Source:
[[<%* tR += referenceNote.basename %>]]

```

**Note:** The `tp.file.include` statements that are in the "T-Literature Note" Templater script are pointing to files that are read and included as part of the script processing. In this case, I am filling in the YAML front matter with these two statements. The contents of the files are:

* notetype: "Literature Note"
* cssclass: literature-note

To use the `copy.blockref` script, put the cursor at the end of the line you want to reference, then either Insert Templater Template from the command palette or use the hotkey you have assigned to the script. It will leave a block reference id similar to the one shown below.

![Obsidian Block Reference ID](https://proxy-prod.omnivore-image-cache.app/0x0,sNvNVCRgFQLRGLy3NoR3ND__1A-b6gESONNX_GRAtRCI/https://harleystagner.com/content/images/2021/05/Obsidian-Reference-Note-Block-ID.png)

Obsidian Block Reference ID

You can create a new Literature Note by choosing `Templater: Create new note from template`from the Obsidian command palette. Choose your Literature Note template (T-Literature Note in this case). After you choose, a modal should pop up, and you can follow the prompts to create the Literature Note.

![Obsidian Literature Note Template Modal](https://proxy-prod.omnivore-image-cache.app/0x0,sH21N2LodZMT2ekbuFBiMtHbr1G5fcXAiJkkhkcLAD80/https://harleystagner.com/content/images/2021/05/Obsidian-Literature-Note-Templater-Modal.png)

Obsidian Literature Note Template Modal

Once you have finished filling in the details and choosing the Reference Note, the script will create a new note structured to be a Literature Note.

## Conclusion

Creating a Literature Note doesn't have to be daunting. It's a note tied to a Reference Note highlight that resonates with you in your own words. In this article, we created a Literature Note with "just enough" structure to aid with search-ability and discoverability. We even automated the processes to concentrate on the note's content rather than the structure. The [next article in this series](https://harleystagner.com/digital-smart-notes-in-obsidian-part-3-how-to-create-permanent-notes/) will discuss creating a Permanent Note from several Literature Notes.


## Highlights

highlight:: Creating a Literature Note doesn't have to be daunting. It's a note tied to a Reference Note highlight that resonates with you in your own words. In this article, we created a Literature Note with "just enough" structure to aid with search-ability and discoverability. [⤴️](https://omnivore.app/me/digital-smart-notes-in-obsidian-part-2-how-to-create-literature--18c12a2df94#592e4bd2-aa24-4c52-9ce3-7e5ba39dfeb4) #highlight


---


[View in Omnivore](https://omnivore.app/me/digital-smart-notes-in-obsidian-part-2-how-to-create-literature--18c12a2df94)
