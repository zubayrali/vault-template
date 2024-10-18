<%\*
// Metric options with corresponding colors
let metricOptions = [
{ metric: "pomodoros", label: "Pomodoros", color: "yellow" },
{ metric: "mood", label: "Mood", color: "red" },
{ metric: "focus", label: "Focus", color: "blue" },
{ metric: "energy", label: "Energy", color: "green" },
{ metric: "stress", label: "Stress", color: "purple" },
{ metric: "anxiety", label: "Anxiety", color: "orange" },
{ metric: "motivation", label: "Motivation", color: "pink" },
{ metric: "self_esteem", label: "Self-Esteem", color: "cyan" },
{ metric: "life_satisfaction", label: "Life Satisfaction", color: "aqua" }
];

// Ask the user to select one or more metrics
let chosenMetrics = [];
let addMore = true;

// Loop to allow the user to select multiple metrics
while (addMore) {
let selectedMetric = await tp.system.suggester(
metricOptions.map(opt => `${opt.label}`), // Display metric label
metricOptions.map(opt => opt.metric), // Get metric key
false,
"Select a metric to track:"
);
chosenMetrics.push(metricOptions.find(m => m.metric === selectedMetric));

// Ask if they want to add another metric
addMore = await tp.system.suggester(["Yes", "No"], ["Yes", "No"], false, "Add another metric?");
addMore = (addMore === "Yes");
}

// Prompt for folder path based on the current month
let currentMonth = tp.date.now("MM");
let currentYear = tp.date.now("YYYY");
let folderPath = `Calendar/${currentYear}/Daily/${currentMonth}`;

// Combine searchTarget, datasetName, and lineColor
let searchTarget = chosenMetrics.map(m => m.metric).join(', ');
let datasetName = chosenMetrics.map(m => m.label).join(', ');
let lineColors = chosenMetrics.map(m => m.color).join(', ');

// Generate the tracker template
let trackerBlock = `\`\`\`tracker
searchType: frontmatter
searchTarget: ${searchTarget}
folder: "${folderPath}"
datasetName: ${datasetName}
line:
    title: "${datasetName} Comparison"
lineColor: ${lineColors}
yAxisLocation: left, right
showLegend: true
\`\`\``;

// Return the tracker block
tR += trackerBlock;
%>
