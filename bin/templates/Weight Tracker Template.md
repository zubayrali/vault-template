<%\*
// Get the current year and month
let currentYear = moment().format("YYYY");
let currentMonth = moment().format("MM");
let currentMonthStart = moment().startOf('month').format("YYYY-MM-DD");
let currentMonthEnd = moment().endOf('month').format("YYYY-MM-DD");

// Prompt for yMin and yMax values for weight tracking if you want dynamic range, otherwise use defaults
let defaultYMin = "40";
let defaultYMax = "150";

let yMin = await tp.system.prompt(`Enter the minimum weight value for the Y-axis (default is ${defaultYMin}):`, defaultYMin);
let yMax = await tp.system.prompt(`Enter the maximum weight value for the Y-axis (default is ${defaultYMax}):`, defaultYMax);

// Tracker template for the weight tracking progress (line chart)
let weightTrackerBlock = `\`\`\`tracker
searchType: frontmatter
searchTarget: weight
folder: "Calendar/${currentYear}/Daily/${currentMonth}"
datasetName: Weight
line:
title: "Weight Progress for ${currentMonth}/${currentYear}"
yAxisLabel: "Weight"
yAxisUnit: kg
lineColor: "#d65d0e"
showPoint: true
pointColor: "yellow"
showLegend: false
yMin: ${yMin} # Minimum value on Y-axis to match typical weight ranges
yMax: ${yMax} # Maximum value on Y-axis
yAxisTickInterval: 5 # Interval between ticks on the Y-axis
xAxisLabel: "Date"
xAxisTickInterval: 7 # Interval between date ticks (every week)
\`\`\`

\`\`\`tracker
searchType: frontmatter
searchTarget: weight
folder: "Calendar/${currentYear}/Daily/${currentMonth}"
datasetName: Weight
startDate: ${currentMonthStart}
endDate: ${currentMonthEnd}
summary:
template: |

    - Minimum Weight: {{min()}} kg
    - Maximum Weight: {{max()}} kg
    - Average Weight: {{average()}} kg
    - Median Weight: {{median()}} kg

\`\`\``;

// Add the weight tracker block to the template result
tR += weightTrackerBlock;
%>
