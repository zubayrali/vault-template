---
up:
  - "[[templates]]"
---
<%*
const trackerKeys = [
  { key: "mindfulness", label: "Mindfulness", color: "green" },
  { key: "read", label: "Reading", color: "blue" },
  { key: "steps", label: "Steps", color: "darkblue" },
  { key: "mood", label: "Mood", color: "purple" },
  { key: "energy", label: "Energy", color: "orange" },
  { key: "sleep", label: "Sleep", color: "darkgreen" },
  { key: "exercise", label: "Exercise", color: "red" },
  { key: "meditation", label: "Meditation", color: "lightblue" },
  { key: "learning", label: "Learning", color: "yellow" },
  { key: "social", label: "Social Activities", color: "pink" },
  { key: "eating", label: "Eating", color: "lightgreen" },
  { key: "hydrate", label: "Hydration", color: "cyan" }
];

const currentYear = moment().format("YYYY");
const currentMonth = moment().format("MM");

let trackerBlock = `
\`\`\`tracker
searchType: frontmatter
searchTarget: [${trackerKeys.map(tracker => `"${tracker.key}"`).join(", ")}]
datasetName: [${trackerKeys.map(tracker => `"${tracker.label}"`).join(", ")}]
folder: "Calendar/${currentYear}/Daily/${currentMonth}"
startDate: ${currentYear}-${currentMonth}-01
endDate: ${currentYear}-${currentMonth}-${currentMonth === "02" ? (currentYear % 4 === 0 ? "29" : "28") : ["04", "06", "09", "11"].includes(currentMonth) ? "30" : "31"}
month:
  startWeekOn: 'Sun'
  threshold: [0.99, 0.99, 7.51, 0.99]
  color: [${trackerKeys.map(tracker => `"${tracker.color}"`).join(", ")}]
  initMonth: ${currentYear}-${currentMonth}
  circleColorByValue: true
  todayRingColor: white
  selectedRingColor: white
\`\`\`
`;

tR += trackerBlock;
%>
