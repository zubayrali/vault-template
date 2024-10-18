---
up:
  - "[[templates]]"
---
<%*
// Start by asking the user about their current focus or feeling
let focus = await tp.system.suggester(["Transformative Power of Journaling", "Five-Minute Death Journal", "Meaning in the Mundane", "Lessons from the Wise Old Man", "Imagined Accountability for Productivity", "Contributions to the Karmic Well", "Gratitude's Neurological and Psychological Benefits", "Philosophical Underpinning of the Death Journal", "Five-Minute Investment Impact", "Empowerment Through Reflective Practices"], ["Transformative Power of Journaling", "Five-Minute Death Journal", "Meaning in the Mundane", "Lessons from the Wise Old Man", "Imagined Accountability for Productivity", "Contributions to the Karmic Well", "Gratitude's Neurological and Psychological Benefits", "Philosophical Underpinning of the Death Journal", "Five-Minute Investment Impact", "Empowerment Through Reflective Practices"], false, "What aspect of journaling are you focusing on today?");

let template = "";

// Based on the focus, select the appropriate template
switch (focus) {
  case "Transformative Power of Journaling":
    template = `
# The Transformative Power of Journaling - {{date}}

## Today's Reflection:

- **Key Memories:** 
	- 
	- 
	- 
- **Mind Declutter:** What thoughts or feelings did I need to clear out today?
	- 
- **Gratitude:** What am I grateful for today?
	- 

---
`;
    break;

  case "Five-Minute Death Journal":
    template = `

## Today's Top 3 Moments:

1. 
2. 
3. 

## Today's Productivity & Happiness:

- What made me productive today?
	- 
- What brought me happiness?
	- 

---
`;
    break;

  case "Meaning in the Mundane":
    template = `

## Today's Ordinary Yet Meaningful Moments:

1. 
2. 
3. 

## Reflection:

- How did these moments add significance to my day?
	- 

---
`;
    break;

  case "Lessons from the Wise Old Man":
    template = `

## Today's Lesson:

- What wisdom did today offer?
	- 

## Insight:

- How can this lesson impact my future?
	- 

---
`;
    break;

  case "Imagined Accountability for Productivity":
    template = `

## Tomorrow's Top 3 Tasks (As dictated by the "evil serial kidnapper"):

1. 
2. 
3. 

## Reflection on Commitment:

- How committed am I to completing these tasks to avoid the whimsical consequences?
	- 

---
`;
    break;

  case "Contributions to the Karmic Well":
    template = `

## Today's Acts of Kindness:

1. 
2. 
3. 

## Reflection on Impact:

- How did my actions contribute to the greater good?
	- 

---
`;
    break;

  case "Gratitude's Neurological and Psychological Benefits":
    template = `

## Today's Gratitude Entries:

1. 
2. 
3. 

## Reflection on Well-being:

- How has expressing gratitude today affected my mood and outlook?
	- 

---
`;
    break;

  case "Philosophical Underpinning of the Death Journal":
    template = `

## Today's Ephemeral Moments:

1. 
2. 
3. 

## Reflecting on Impermanence:

- How does acknowledging the finiteness of each day impact my appreciation for life?
	- 

---
`;
    break;

  case "Five-Minute Investment Impact":
    template = `

## Today's Quick Reflections:

- Top 3 Moments:
  1. 
  2. 
  3. 
- Lesson Learned:
	- 
- Act of Kindness:
	- 
- Gratitude Entry:
	- 

## Reflecting on Impact:

- How have these five minutes of reflection enriched my day?
	- 

---
`;
    break;

  case "Empowerment Through Reflective Practices":
    template = `

## Today's Insights:

- What have I learned about myself today?
- How have I grown or changed today?
- Today's Empowering Actions:
- Reflecting on Personal Growth:
- How do these reflections empower me to live a more intentional life?
`;
break;

default:
template = `# General Journal Entry - {{date}}

What are my thoughts today?
`;
break;
}

tR += template;
%>