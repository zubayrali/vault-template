// view.js
function flowDashboard(dv, input) {
    const { pages, effortsFolder, initiativesFolder } = input;

    function getTasksFromFile(file) {
        const content = dv.io.load(file.path);
        const taskSection = content.split("> [!example]- Tasks")[1];
        if (!taskSection) return [];
        return dv.taskList(taskSection, file.path).where(t => !t.completed);
    }

    function createProjectSection(title, folder) {
        const sectionPages = dv.pages(folder)
            .where(p => p.file.name !== "Efforts" && p.file.name !== "Initiatives");

        dv.header(3, title);
        
        dv.table(
            ["Project", "Status/Type", "Task Count", "Due Date"],
            sectionPages.map(p => {
                const tasks = getTasksFromFile(p.file);
                return [
                    p.file.link,
                    p.status || p.type,
                    tasks.length,
                    p.dueDate || ""
                ];
            })
        );

        sectionPages.forEach(p => {
            const tasks = getTasksFromFile(p.file);
            if (tasks.length > 0) {
                dv.header(4, `Tasks for ${p.file.name}`);
                dv.taskList(tasks, false);
            }
        });
    }

    dv.header(2, "Flow Dashboard");
    createProjectSection("Efforts", effortsFolder);
    createProjectSection("Initiatives", initiativesFolder);
}

module.exports = flowDashboard;


