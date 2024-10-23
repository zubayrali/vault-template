module.exports = async ({ app }) => {
    const trackerKeys = [
        { key: "mindfulness", label: "Mindfulness" },
        { key: "read", label: "Reading" },
        { key: "steps", label: "Steps" },
        { key: "mood", label: "Mood" },
        { key: "energy", label: "Energy" },
        { key: "sleep", label: "Sleep" },
        { key: "exercise", label: "Exercise" },
        { key: "meditation", label: "Meditation" },
        { key: "learning", label: "Learning" },
        { key: "social", label: "Social Activities" },
        { key: "eating", label: "Eating" },
        { key: "hydrate", label: "Hydration" }
    ];

    const currentYear = new Date().getFullYear();
    const currentMonth = String(new Date().getMonth() + 1).padStart(2, '0');

    const trackerBlocks = trackerKeys.map(tracker => {
        return `
\`\`\`tracker
searchType: frontmatter
searchTarget: ${tracker.key}
datasetName: ${tracker.label}
folder: "Calendar/${currentYear}/Daily/${currentMonth}"
startDate: ${currentYear}-${currentMonth}-01
endDate: ${currentYear}-${currentMonth}-31
month:
  startWeekOn: 'Sun'
  threshold: [0.99, 0.99, 7.51, 0.99]
  color: "blue"
  initMonth: ${currentYear}-${currentMonth}
  circleColorByValue: true
  todayRingColor: white
  selectedRingColor: white
\`\`\`
\`\`\`tracker
searchType: frontmatter
searchTarget: ${tracker.key}
folder: "Calendar/${currentYear}/Daily/${currentMonth}"
startDate: ${currentYear}-${currentMonth}-01
summary:
  maxStreak: true
  currentStreak: true
  maxBreaks: true
\`\`\`
`;
    }).join('\n');

    // Get the active file and editor
    const editor = app.workspace.activeLeaf?.view?.editor;
    if (editor) {
        const cursorPosition = editor.getCursor();
        editor.replaceRange(trackerBlocks, cursorPosition);
        new Notice('Tracker blocks inserted.');
    } else {
        new Notice('No active editor found.');
    }
};
