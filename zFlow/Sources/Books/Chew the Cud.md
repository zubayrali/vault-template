---
title: Chew the Cud
created: 2024-10-06T20:34:38.000-04:00
updated: 2024-10-19T22:24:28.084-04:00
---

# Chew the Cud

## 1. Introduction

This is an Obsidian vault. But it isn't just a vault, its something I came up with after revamping my Obsidian vault after kinda leaving it untended for a couple of months in 2023. I started using it 2022 and I half understood Zettelkasten and my bastardaized approach to PKM and note taking was working out fine as I was using it in a information hogger fashion not of a creative outlet place of mind so a revamp was due and this was a really good time with so many stable ways of doing thing within Obsidian. I often procastinate by scroll the community plugins page to find what new complex way of doing thing but adds a little bit of coolness to the workflow overall. I knew the day wasn't far where I could get exactly the system I wanted to have.

I want to try to use this app in Reading view only as its much faster in my experience and I can leverage the Modal form with Templater to create cool templates which is much better than typing in a file directly even though I love the flat file so much. The daulity of a man am i right?

I didn't see Obsidian as a Task manager until I started using Memos which is great to capture tasks and I can get a dual view of my tasks from with Memos and I also found the Tasks plugin combined with the Tabs plugin offer a great filtering view for different types and I used it with multi-column everywhere in my daily note and in efforts and initiatives templates.

"Chew the Cud" is a comprehensive information management system in Obsidian that leverages a blend of structured note-taking practices, task management techniques, and integration with powerful tools like LifeOS and usememos. This system is designed to create a cohesive environment for capturing, processing, and organizing thoughts, tasks, and projects effectively.

The setup focuses on flexibility, interconnectedness, and making knowledge easily accessible. By emphasizing tags over traditional folder structures and combining them with dynamic tools, this system is both scalable and adaptable, growing with evolving needs.

## 2. Periodic Notes

### Daily Note

The **Daily Note** is at the heart of my daily workflow, providing a structured way to capture, track, and reflect on everything that happens throughout the day. Each daily note is stored in the `Calendar/YYYY/Daily` directory, organized by year and date for easy navigation. The template is designed to streamline daily planning, focus on tasks, and ensure that key activities and reflections are all in one place.

#### Key Features of the Daily Note

- **Metadata Frontmatter:** The daily note starts with YAML frontmatter containing fields like `title`, `created`, `updated`, `journal`, and `tags`. This helps to automatically set dates, timestamps, and categorize the note as part of the daily workflow.
- **Quick Navigation:** At the top, there are quick links to the **Calendar** and **Logbook**, making it easy to move between days and review past entries.
- **Focus and Work Sections:** Dedicated callouts like **Daily Focus** and **Work** help to keep priorities in check. The Daily Focus section prompts you to identify the most important task of the day, while the Work section encourages time-blocking for deep work sessions.
- **Dynamic Task Management:** The template includes embedded widgets like `Tasks Tabs Today` and `Tasks Tabs Upcoming`, which pull in tasks directly into the note, keeping them front and center. This allows you to see what's due today and what's coming up next.
- **Daily Log:** This section serves as a space for jotting down thoughts, ideas, and tasks in real-time. It's where all unfiltered notes and observations of the day are captured, ready to be reviewed later.
- **Evening Review:** A structured space to reflect on the day's achievements, challenges, and lessons learned. This helps in closing the day with a clear understanding of what worked well and what could be improved.
- **Recent Activity:** The Recent Activity section shows lists of recently created and updated notes using Dataview queries. It gives a quick snapshot of your latest note-taking actions, making it easier to track your progress.

#### Inline Metadata and Tracking

- **Highlight and Reflection:** Inline metadata fields like `highlight::` are used to mark significant moments or achievements during the day. This makes it easier to find key highlights when looking back at your notes.
- **Memento Mori Integration:** There's a subtle reminder with `Memento Mori Day` to keep perspective and reflect on what's important, tying into the day's focus and mindfulness.

This daily note template acts as the control center for my day-to-day activities, making sure that everything—from tasks to reflections—is captured in a way that's both organized and easy to access. Its layout is designed to reduce friction, enabling quick capture and review, while also promoting mindful focus and end-of-day reflection.

![[Pasted image 20241006221516.png]]

### Using QuickAdd for Daily Capture

The **QuickAdd** plugin is used to quickly log and insert content into daily notes. Some of the QuickAdd actions include:
- **Log a Highlight of the Day**
- **What gave you motivation today?**
- **Achievements that got closer to Efforts**
- **Daily Focus** and **Deep Work** time-blocking prompts

This approach ensures all relevant information is captured seamlessly, feeding directly into weekly, monthly, and yearly reflections for comprehensive tracking.

### Weekly Note Template

The **Weekly Note** template is structured to reflect on the past week, plan for upcoming tasks, and track progress on ongoing initiatives. Key features include:
- **Weekly Initiatives:** Goals and action items for the week.
- **Wheel of Life:** A self-assessment tool that evaluates well-being and areas of improvement.
- **Highlights and Wins:** DataviewJS queries that extract weekly achievements from daily notes, highlighting progress.

### Monthly Note Template

The **Monthly Note** provides a broad overview of goals, ongoing projects, and long-term objectives. It includes:
- **Monthly Initiatives:** A focus on larger goals that align with overall vision.
- **Trackers:** Embedded elements to monitor habits and project milestones.
- **Stand-Out Days:** An automatically generated list of significant days based on daily reflections.

### Quarterly Note Template

Personal Retreat

### Yearly Note Template

Life Audit

## 3. Flow Method

Welcome to the **Flow Method**, a comprehensive system designed to bring clarity and action to your task and project management. This method bridges the gap between your day-to-day activities and your long-term ambitions by integrating **Efforts** and **Initiatives** into a cohesive approach. It’s not just about managing to-do lists; it’s about creating a dynamic workflow that adapts to your evolving needs, whether you're tackling personal projects or professional goals.

Imagine the Flow Method as a living system, where each task, project, and goal is part of a larger picture—allowing you to seamlessly transition from idea generation to execution. This method doesn't just help you track what needs to be done; it empowers you to understand how to channel your energy where it matters most, leveraging tools like **Obsidian**, the **Tasks plugin**, and thoughtful note templates to stay on top of your commitments.

Efforts was straight up taken from [[Nick Milo]]'s [How to Manage Projects with Four Intensities - YouTube](https://youtu.be/Ew7ZBu4r8vg?si=DbviKciMYzEYdfCW)

### What Are Efforts and Initiatives?

The Flow Method is built upon two central components: **Efforts** and **Initiatives**. Understanding their distinct roles is key to making this system work for you.

- **Efforts** are flexible commitments that focus on consistent action and personal growth. They represent areas where you’re continuously investing your energy, like learning a new skill, nurturing a habit, or pursuing a creative project. Efforts don’t require strict deadlines; instead, they allow you to adapt, adjust, and progress at your own pace. They are all about sustaining momentum and embracing fluidity in your workflow.
- **Initiatives** are the big-picture projects or goals that provide direction and purpose to your actions. Initiatives have a clear objective, milestones, and desired outcomes. They act as your guiding stars, helping you prioritize tasks that align with your longer-term vision, whether it’s launching a new product, writing a book, or planning a significant life event.

This combination of Efforts and Initiatives forms a balanced approach to managing both the flexible, ongoing commitments of daily life and the structured, outcome-focused projects that drive you forward.

**The Flow Method isn’t just about organization—it’s about action. Here's how you can use this method to transform your daily activities and long-term goals into tangible progress.**

Efforts differ from traditional projects in that they don’t impose rigid structures or deadlines. Where conventional project management often fails is in its demand for clear steps and defined outcomes. Efforts, by contrast, are more adaptable, allowing you to embrace changes, pivots, and new ideas as they emerge.

The **looser format of Efforts** supports a mindset that is both **architectural and gardening-like**:

- **Architectural** in that it gives you a framework to organize and prioritize your actions.
- **Gardener-like** in its flexibility, allowing you to nurture ideas as they grow and adapt to new information.

This dual approach lets you pivot when necessary without losing momentum, making the Flow Method an ideal solution for creative professionals, lifelong learners, and anyone looking to manage their ambitions with a blend of discipline and flexibility.

#### Managing Efforts by Intensity

Efforts are categorized into four levels of intensity, each reflecting the amount of focus and energy you need to invest:

1. **🔥 On Efforts**: These are your most active projects, the ones that require your immediate attention and daily focus. They are where you allocate your highest energy levels, ensuring that you move the needle on your most important tasks.
2. **♻️ Ongoing Efforts**: These efforts represent activities that are part of your routine. They don’t have a strict deadline but are essential to maintaining your momentum. Whether it’s regular exercise, learning, or ongoing work tasks, they remain on your radar consistently.
3. **〰️ Simmering Efforts**: These are ideas and tasks that are in the background. They aren’t urgent, but you don’t want to forget about them. Simmering Efforts are like slow-cooking projects that you revisit when the time is right.
4. **💤 Sleeping Efforts**: These efforts are in cold storage, waiting for the right moment or conditions to come alive again. You put them aside to clear your mental space, knowing that you can wake them up when they’re needed.

#### Navigating Initiatives by Status

Initiatives in the Flow Method help you track the lifecycle of your projects from inception to completion:

1. **🟥 Backlog**: A list of ideas and projects that you might work on in the future. They are not ready to be activated but are recorded so you don’t lose sight of them.
2. **🟦 Planning**: These are the Initiatives where you’re gathering resources, setting objectives, and laying the groundwork for action. It’s the preparatory phase where you turn ideas into actionable plans.
3. **🟨 Active**: Initiatives that are in full swing, requiring your focus and consistent effort to push them toward completion. These are the projects that move the needle toward your goals.
4. **🟩 Finished**: Successfully completed initiatives. This status not only celebrates your achievements but also allows you to reflect on what worked well and what could be improved for future projects.
  

## 4. Task Management

A **Tasks Overview** note serves as a high-level view of all tasks across different Efforts and Initiatives. It includes:
- **Task Breakdown by Status**: Real-time statistics of tasks, including counts of completed, in-progress, and pending tasks.
- **Dynamic Queries**: DataviewJS or LifeOS queries to provide insights into task completion rates and performance metrics.

This centralized view offers actionable insights into productivity, helping in goal setting and performance evaluation.

The **Tasks plugin** in Obsidian allows you to create, manage, and visualize tasks directly within your notes. By integrating task management into your Efforts and Initiatives, you can keep everything in one place, from daily to-dos to complex project milestones. The plugin supports features like due dates, priorities, and recurring tasks, providing the flexibility to handle both short-term actions and long-term goals.

Tasks are automatically filtered and displayed according to their status or priority, giving you real-time insights into what needs to be done. This setup reduces the mental load of deciding what to focus on by surfacing the most relevant tasks based on your current context.

### Taskido

#### 1. **Daily Note Task Management:**

   - **Primary View:** We're using the Daily Note template in Obsidian to log and manage tasks directly within each daily note. This approach helps centralize task creation and tracking within your daily workflow.
   - **Tabbed View:** Tasks are organized in a tabbed format (e.g., Todo, In Progress, Done), making it easier to track task states within the context of the daily note itself.

#### 2. **Dynamic Embedded Taskido Sidebar:**

   - **Alternative View:** Taskido's dynamic sidebar is utilized as an alternative task management interface outside the daily notes.
   - **Contextual Filtering:** The sidebar allows you to filter, sort, and view tasks dynamically across different dates, projects, or tags without needing to open individual daily notes.


![[bin/assets/Chew the Cud/15b9b6d382cfd6390c84da943cb40c3d_MD5.jpeg]]

## 7. Tag Taxonomy and Note Classification

A well-defined **tag taxonomy** helps in categorizing notes, improving retrieval and organization. Key tags include:
- **Source Tags**: Classify different types of references (`#source/book`, `#source/article`, `#source/quote`).
- **Type Tags**: Define note categories (`#type/MOCs`, `#type/effort`, `#type/initiative`).

These tags work as anchors that connect related notes, making the entire system more intuitive and searchable.

## 8. Folder Structure and Organization

The system uses a minimalistic folder structure that is adopted from Nick Milo's ACE framework based on STIR

- **Calendar**: Stores daily, weekly, and monthly notes in a structured hierarchy.
- **Efforts**: Dedicated to projects, tasks, and goal-tracking notes.
- **zFlow**: Functions as a zettelkasten, housing interconnected ideas, concepts, and long-term knowledge.

This approach relies heavily on tags and metadata to maintain order, reducing dependency on rigid folder structures but I am still keeping my notes tidy in their respective folder using th **Auto Note Mover** plugin based on tags/type of the note.

## 9. Integrations

- **usememos** provides an alternative front-end for capturing quick notes and ideas that sync directly with Obsidian.

## Example Flow 1

1. While reading "Thinking, Fast and Slow" by Daniel Kahneman:

   Create a Source Note:

   ```yaml
   ---
   title: Thinking, Fast and Slow
   fileClass: book
   author: "[[Daniel Kahneman]]"
   year: 2011
   isbn: 978-0374275631
   publisher: Farrar, Straus and Giroux
   total_pages: 499
   created: 2023-09-23
   updated: 2023-09-23
   tags:
     - source/book
   ---
   # Thinking, Fast and Slow

   [Your overall impressions and summary]
   ```

2. Create Literature Notes while reading:

   ```yaml
   ---
   title: 
   fileClass: literature
   up: "[[Thinking, Fast and Slow]]"
   related:
   prev:
   down:
   created: 2023-09-23
   updated: 2023-09-23
   tags:
     - type/literature
   ---

   # System 1 and System 2

   Kahneman introduces two systems of thinking:
   - System 1: Fast, intuitive, and emotional
   - System 2: Slower, more deliberative, and more logical

   [Your notes and initial thoughts]
   ```

3. Develop an Insight Note:

   ```yaml
   ---
   fileClass: insight
   up: "[[Cognitive Psychology MOC]]"
   related: "[[Decision Making]]", "[[Behavioral Economics]]"
   prev: "[[Heuristics and Biases]]"
   down: "[[Anchoring Effect]]", "[[Availability Heuristic]]"
   created: 2023-09-24
   updated: 2023-09-24
   tags:
     - type/permanent
   ---

   # Dual Process Theory in Decision Making

   The concept of two systems in thinking, as proposed by [[Daniel Kahneman]] in [[Thinking, Fast and Slow]], offers a framework for understanding human decision making.

   [[System 1]] operates automatically and quickly, with little or no effort and no sense of voluntary control. It's our intuitive, gut-reaction system.

   [[System 2]] allocates attention to the effortful mental activities that demand it, including complex computations. It's often associated with the subjective experience of agency, choice, and concentration.

   This dual-process theory helps explain various [[Cognitive Biases]] and decision-making phenomena…

   [Your developed thoughts and connections]
   ```

4. Update or create an MOC:

   ```yaml
   ---
   fileClass: moc
   up: "[[Psychology MOC]]"
   related: "[[Neuroscience MOC]]", "[[Philosophy of Mind MOC]]"
   prev:
   down: "[[Dual Process Theory]]", "[[Cognitive Biases]]", "[[Decision Making]]"
   created: 2023-09-20
   updated: 2023-09-24
   tags:
     - type/moc
   ---

   # Cognitive Psychology MOC

   ## Core Concepts
   - [[Dual Process Theory]]
   - [[Cognitive Biases]]
   - [[Decision Making]]

   ## Key Thinkers
   - [[Daniel Kahneman]]
   - [[Amos Tversky]]

   ## Important Studies
   - [[Heuristics and Biases Program]]

   [More structured links and brief descriptions]
   ```

5. Create or update Definition Notes:

For a consolidated definition file:

```yaml
---
fileClass: definition
up: "[[Cognitive Psychology MOC]]"
related: "[[System 1 and System 2]]"
prev:
down:
created: 2023-09-24
updated: 2023-09-24
tags:
  - type/definition
def-type: consolidated
---

# Dual Process Theory

*dual-process model, two-system theory*

A psychological theory proposing two distinct systems of thinking: a fast, automatic, and intuitive system (System 1), and a slower, more deliberate, and analytical system (System 2). This theory is fundamental in understanding human cognition, decision making, and the formation of judgments.

---

# System 1

*intuitive thinking, fast thinking*

The cognitive process that operates automatically and quickly, with little or no effort and no sense of voluntary control. It's responsible for intuitive responses and gut reactions.

---

# System 2

*analytical thinking, slow thinking*

The cognitive process that allocates attention to effortful mental activities. It's associated with complex computations and the subjective experience of agency, choice, and concentration.

```

For an atomic definition file (e.g., "Dual Process Theory.md"):

```yaml
---
fileClass: definition
up: "[[Cognitive Psychology MOC]]"
related: "[[System 1 and System 2]]"
prev:
down:
created: 2023-09-24
updated: 2023-09-24
tags:
  - type/definition
def-type: atomic
aliases:
  - dual-process model
  - two-system theory
---

A psychological theory proposing two distinct systems of thinking: a fast, automatic, and intuitive system (System 1), and a slower, more deliberate, and analytical system (System 2). This theory is fundamental in understanding human cognition, decision making, and the formation of judgments.
```

These structures now correctly incorporate the metadata required for the Note Definitions plugin:

1. For consolidated files:

   - The `def-type: consolidated` in the YAML frontmatter
   - Each term is a level 1 header (#)
   - Aliases are in italics on the line immediately following the header
   - The definition follows, with multiple paragraphs if needed
   - Definitions are separated by horizontal rules (---)

2. For atomic files:
   - The `def-type: atomic` in the YAML frontmatter
   - Aliases are listed in the YAML frontmatter
   - The entire content of the file (after the frontmatter) is the definition

This approach allows you to use the Note Definitions plugin effectively within your Zettelkasten system, providing quick access to definitions while maintaining the connection to your broader knowledge structure through the `up`, `related`, `prev`, and `down` fields.
In this flow, each note type plays a specific role:

- Fleeting Notes capture initial ideas
- Source Notes provide reference points
- Literature Notes process source material
- Insight Notes develop your own ideas
- MOC Notes organize and structure your knowledge
- Definition Notes clarify key concepts

The connections between notes (using `up`, `related`, `prev`, `down` with [[backlinks]]) to create a rich network of ideas, allowing for easy navigation and discovery of relationships between concepts.

This setup maintains the core principles of the Zettelkasten method while leveraging Obsidian's features for a digital implementation. It allows for flexible note-taking and organization while providing clear structures and connections between different types of information.

## Example Flow 2

Day 1: Setting up the plugin

1. Create a new folder called "Biology Definitions" in your Obsidian vault.
2. Right-click on this folder and select "Set definition folder" to register it with the plugin.
3. Create two files in this folder:
   - "General Biology Terms.md" (for consolidated definitions)
   - "Cell Structure.md" (for atomic definitions)

4. Open "General Biology Terms.md" and use the command "Register consolidated definition file". This adds the frontmatter:
   ```yaml
   ---
   def-type: consolidated
   ---
   ```

5. Open "Cell Structure.md" and use the command "Register atomic definition file". This adds the frontmatter:
   ```yaml
   ---
   def-type: atomic
   ---
   ```

Day 2: Adding definitions during a lecture

1. You're taking notes in a file called "Lecture: Introduction to Cell Biology.md".
2. You encounter the term "mitochondria" and want to add a definition.
3. Highlight the word "mitochondria" and use the "Add definition" command.
4. In the pop-up, choose "General Biology Terms.md" as the target file.
5. Enter the definition: "Organelles that generate most of the cell's supply of ATP (energy)."
6. Add an alias: "powerhouse of the cell"

The plugin adds this to "General Biology Terms.md":

```markdown
# Mitochondria
*powerhouse of the cell*
Organelles that generate most of the cell's supply of ATP (energy).
---
```

1. Later in the lecture, you learn about the cell membrane. You decide to create an atomic definition for this.
2. Create a new file "Cell Membrane.md" in your definitions folder.
3. Use the "Register atomic definition file" command on this file.
4. Add the content:
    ```yaml
    ---
    def-type: atomic
    aliases:
      - plasma membrane
      - cytoplasmic membrane
    ---
    The semipermeable membrane surrounding the cytoplasm of a cell, composed of a phospholipid bilayer with embedded proteins.
    ```

5. Use the "Refresh definitions" command to update the plugin's database.

Day 3: Using definitions in your notes

1. You're reviewing your notes and writing a summary in "Cell Biology Summary.md".
2. As you type "mitochondria", you notice it's underlined, indicating a definition exists.
3. Hover over the word to preview the definition.
4. You want to add more detail, so you right-click and choose "Go to definition" to jump to the definition in "General Biology Terms.md".
5. Edit the definition to add more information.
6. Return to your summary and continue writing.
7. You mention the cell membrane, and decide you want to use only cell-related definitions for this note.
8. Use the "Add definition context" command and select "Cell Structure.md" and "Cell Membrane.md".
9. This adds to your note's properties:
   ```yaml
   ---
   def-context:
     - Biology Definitions/Cell Structure.md
     - Biology Definitions/Cell Membrane.md
   ---
   ```
10. Now, only definitions from these files will be recognized in this note.

Day 4: Expanding your definitions

1. You're reading a paper and encounter the term "endoplasmic reticulum".
2. You decide to add this as a new atomic definition.
3. Create "Endoplasmic Reticulum.md" in your definitions folder and register it as an atomic definition file.
4. Add the content:
   ```yaml
   ---
   def-type: atomic
   aliases:
     - ER
   ---
   A network of membranous tubules within the cytoplasm of a eukaryotic cell, continuous with the nuclear membrane. It occurs in two forms: rough (with ribosomes) and smooth (without ribosomes).
   ```
5. Use the "Refresh definitions" command to update the plugin's database.
6. Reviewing and organizing

- Open your "General Biology Terms.md" file to review your consolidated definitions.
- Use markdown formatting to enhance your definitions, adding bold text, lists, or even links to other notes.
- Decide to move some definitions to atomic files for more detailed explanations.
- Create new atomic definition files as needed, and cut/paste content from the consolidated file.
- Update the "def-context" property in relevant notes to include or exclude specific definition files based on the topic of each note.

---

1. Use the `up`, `related`, `prev`, and `down` fields to create connections between notes.

   - `up`: Link to broader topics or MOCs
   - `related`: Link to related concepts or notes
   - `prev`: Link to predecessors in a sequence of thoughts
   - `down`: Link to more specific subtopics or examples

### Note Types and Their Structures

All notes will have the following basic structure in their YAML frontmatter:

```yaml
---
fileClass: [type]
up:
related:
prev:
down:
created: YYYY-MM-DD
updated: YYYY-MM-DD
tags:
  - type/[actual-type]
  - [additional-tags]
---
```

### Fleeting Note(Eggs), Literature Note (Incubating), Permanent Note (Insight)

```yaml
---
fileClass: 
up:
related:
prev:
down:
created:
updated:
tags:
  - [type/fleeting, type/insight, type/incubating, type/source, type/MOC,]
---
```

### Source Note (Eg: Book)

```yaml
---
fileClass: book
id: 20241019120051
title: "Don't Believe Everything You Think"
aliases:
lead: "Why Your Thinking Is The Beginning & End Of Suffering"
author: "[[Joseph Nguyen]]"
authors: Joseph Nguyen
category: Self-Help
cover: "bin/assets/Don't Believe Everything You Think/b9366c9a21298bc3db4757e30c79919c_MD5.jpg"
isbn10: 
isbn13: "9798986406510"
publisher: "One Satori LLC"
publish_date: 2022-03-28
total: 0
created: 2024-10-19T12:00:51.714-04:00
updated: 2024-10-19T12:04:38.355-04:00
started: 2024-10-19
finished:
genres: "[[Self-Help]]"
status: queue
bibliography:  +++ Copy here from Zotero +++
rating: ⭐️⭐️⭐️
volume: 84
timestamp: 0
units: pages
tags:
  - source/book
aliases:
---
```

### Effort

```yaml
---
title: 
fileClass: effort
description:
type: On,Ongoing,Simmering,Sleeping
created: 
updated: 
rank: 1,2,3,4,5
eol: false
tags:
  - type/effort
---
```

### Daily Note

```yaml
---
fileClass: calendar, daily
title: "2024-10-19"
created: 2024-10-19T10:59:21.564-04:00
updated: 2024-10-19T11:05:16.413-04:00
journal: calendar
journal-start-date: 2024-10-19
journal-end-date: 2024-10-19
journal-section: day
date: 2024-10-19
tags:
  - calendar/daily
---
```

### Initiative

```yaml
---
title: 
description:
fileClass: initiative
effort: On,Ongoing,Simmering,Sleeping
created: 
updated: 
dueDate: 
status: [🟥 Backlog, 🟦 Planning, 🟨 Active, 🟩 Finished]
eol: false
tags:
  - type/initiative
---
```

### Definition Note

```yaml
---
fileClass: definition
up:
related:
prev:
down:
created: 
updated: 
def-type: [atomic,consolidated]
aliases:
tags:
  - type/definition
---
```

## Note Types and Their Roles

1. **Fleeting Notes** ([[QuickCapture]] to [[Daily Note]])
   - Quick capture of ideas, thoughts, and observations
   - Temporary by nature, waiting to be processed
2. **Literature Notes** (fileClass: note)
   - Processed notes from sources
   - Contain key ideas, quotes, and your initial thoughts
3. **Source Notes** (fileClass: source/book, source/article, etc.)
   - Reference materials
   - Contain metadata about the source and your overall impressions
4. **Insight Notes** (fileClass: insight)
   - Well-developed, permanent notes
   - Contain your own thoughts and connections
5. **MOC Notes** (fileClass: moc)
   - Index notes that organize and structure your knowledge
   - Each MOC has a corresponding Canvas file for visual organization
6. **Definition Notes** (fileClass: definition)
   - Concise explanations of key terms and concepts
   - Can be individual files or consolidated for specific domains

## Workflow

1. **Capture**:
   - Create Fleeting Notes to quickly capture ideas
   - Use the fleeting note template with minimal metadata
2. **Process Sources**:
   - Create a Source Note for each book, article, or other reference
   - While reading, create Literature Notes linked to the Source Note
   - Use the `up` field in Literature Notes to link to the Source Note
3. **Develop Insights**:
   - Review and develop Literature Notes into Insight Notes
   - Make connections using the `up`, `related`, `prev`, and `down` fields
   - Link to Definition Notes for key terms using `[[backlinks]]`
4. **Organize Knowledge**:
   - Create and update MOC Notes to structure your knowledge
   - Use the `up` field in Insight Notes to link to relevant MOCs
   - Create corresponding Canvas or Excalidraw files for visual organization
5. **Define Terms**:
   - Create individual Definition Notes for key concepts
   - For domain-specific terms, use consolidated Definition Notes
   - Link definitions to relevant Insight Notes and MOCs
6. **Review and Refine**:
   - Regularly review MOCs and update connections
   - Process remaining Fleeting Notes into Literature or Insight Notes
   - Update Canvas files to visualize and discover new connections