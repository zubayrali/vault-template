---
up:
  - "[[templates]]"
---
<%*
// Start by asking the user about their current mood
let mood = await tp.system.suggester(["Stressed(vent)", "Overwhelmed(obligation dump)", "need to reframe mindset", "creative block(ideate)", "review trajectory"], ["Stressed(vent)", "Overwhelmed(obligation dump)", "need to reframe mindset", "creative block(ideate)", "review trajectory"], false, "How are you feeling today?");

let template = "";

// Based on the mood, select the appropriate template
switch (mood) {
  case "Stressed(vent)":
    template = `
## Vent
### Mind Dump
- What's currently bothering me?
  - 

### Reflection
- How do I feel now that I've vented?
  - 

### Insights
- Any patterns or recurring themes I'm noticing?
  - 
`;
    break;

  case "Overwhelmed(obligation dump)":
    template = `

### Obligation Dump
List everything that feels like a responsibility or task right now:

1. 

### Organize
Categorize the obligations (e.g., Personal, Work, Family):

- Personal:
	- 
- Work:
	- 
- Family:
	- 

### Prioritize
Ask: "Which task, if done, would make everything else easier or unnecessary?"

- 

### Action Plan

- Bare Minimum Tasks (to make tomorrow better):
  - 
- 'Killing It' Tasks (if I have extra energy):
  - 
`;
    break;


  case "need to reframe mindset":
    template = `
## Mindset
### Re-framing
- How could this challenge be seen as an opportunity?
  - 

### Possibility
- "I am capable because..." (List evidence from your day):
  - 

### Inversion
- To reduce a negative, I could... (e.g., "To draw less, I could...")
  - 

### Perspective
- Advice I'd give a friend in my situation:
  - 

### Discipline
- A small habit I can start or change to improve discipline:
  - 

### Gratitude
- Three things I'm grateful for today:
  1. 
  2. 
  3. 
  - Bonus: Something mundane I'm grateful for:
    - 
  - Bonus: Something that happened by chance I'm grateful for:
    - 
  - Bonus: Something I made happen I'm grateful for:
    - 
`;
    break;

  case "creative block(ideate)":
    template = `
## Ideate
### Problem Solving
- Problem I'm facing:
  - 
- Rapid-fire solutions (Aim for 30 in 5 mins):
  1. 

### Perspective Shift
- How would [Person/Role Model] solve this problem?
  - 

### Open the Question Loop
- A question I've been pondering:
  - 
- Let it simmer, and return later for insights.
`;
    break;

  case "review trajectory":
    template = `
## Trajectory
### Direction Check
- Am I moving closer to my goals? Evidence:
  - Closer:
    - 
  - Away:
    - 

### Day-to-Day Reflection
- What excited me today:
  - 
- What drained my energy:
  - 
- What did I learn:
  - 

### Adjustments
- Based on today, what small change can I make tomorrow?
  - 
`;
    break;

  default:
    template = `# Journal Entry
- What are my thoughts today?
  - 
`;
    break;
}

tR += template;
%>
