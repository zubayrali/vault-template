'use strict';

var obsidian = require('obsidian');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

const DEFAULT_NAME_TEMPLATE_CALENDAR = "{{date}}";
const DEFAULT_NAME_TEMPLATE_INTERVAL = "{{journal_name}} {{index}}";
const DEFAULT_NAV_DATES_TEMPLATE_INTERVAL = "{{start_date}}|to|{{end_date}}";
const DEFAULT_DATE_FORMAT = "YYYY-MM-DD";
const DEFAULT_DATE_FORMATS_CALENDAR = {
    day: "YYYY-MM-DD",
    week: "YYYY-[W]ww",
    month: "YYYY-MM",
    quarter: "YYYY-[Q]Q",
    year: "YYYY",
};
const DEFAULT_RIBBON_ICONS_CALENDAR = "calendar-days";
const DEFAULT_RIBBON_ICONS_INTERVAL = "calendar-range";
const DEFAULT_RIBBON_TOOLTIPS = {
    day: "Open today's note",
    week: "Open this week's note",
    month: "Open this month's note",
    quarter: "Open this quarter's note",
    year: "Open this year's note",
};
const DEFAULT_CONFIG_CALENDAR = {
    id: "",
    type: "calendar",
    name: "",
    rootFolder: "",
    openOnStartup: false,
    startupSection: "day",
    day: {
        enabled: false,
        openMode: "active",
        nameTemplate: "",
        dateFormat: "",
        folder: "",
        template: "",
        ribbon: {
            show: false,
            icon: "",
            tooltip: "",
        },
        createOnStartup: false,
    },
    week: {
        enabled: false,
        openMode: "active",
        nameTemplate: "",
        dateFormat: "",
        folder: "",
        template: "",
        ribbon: {
            show: false,
            icon: "",
            tooltip: "",
        },
        createOnStartup: false,
    },
    month: {
        enabled: false,
        openMode: "active",
        nameTemplate: "",
        dateFormat: "",
        folder: "",
        template: "",
        ribbon: {
            show: false,
            icon: "",
            tooltip: "",
        },
        createOnStartup: false,
    },
    quarter: {
        enabled: false,
        openMode: "active",
        nameTemplate: "",
        dateFormat: "",
        folder: "",
        template: "",
        ribbon: {
            show: false,
            icon: "",
            tooltip: "",
        },
        createOnStartup: false,
    },
    year: {
        enabled: false,
        openMode: "active",
        nameTemplate: "",
        dateFormat: "",
        folder: "",
        template: "",
        ribbon: {
            show: false,
            icon: "",
            tooltip: "",
        },
        createOnStartup: false,
    },
};
const DEFAULT_CONFIG_INTERVAL = {
    id: "",
    type: "interval",
    name: "",
    duration: 1,
    granularity: "day",
    start_date: "",
    start_index: 1,
    numeration_type: "increment",
    end_type: "never",
    end_date: "",
    repeats: 1,
    limitCreation: false,
    openOnStartup: false,
    openMode: "active",
    nameTemplate: "",
    navNameTemplate: "",
    navDatesTemplate: "",
    dateFormat: "",
    folder: "",
    template: "",
    ribbon: {
        show: false,
        icon: "",
        tooltip: "",
    },
    createOnStartup: false,
    calendar_view: {
        order: "chrono",
    },
};
const DEFAULT_PLUGIN_SETTINGS = {
    journals: {},
    calendar: {
        firstDayOfWeek: -1,
        firstWeekOfYear: 1,
    },
    calendar_view: {
        leaf: "right",
        weeks: "left",
    },
};

class DatePickerModal extends obsidian.Modal {
    constructor(app, manager, cb, selectedDate, granularity = "day") {
        super(app);
        this.manager = manager;
        this.cb = cb;
        this.selectedDate = selectedDate;
        this.granularity = granularity;
        this.mode = "month";
        this.selected = "";
        if (this.selectedDate) {
            this.selected = this.selectedDate;
            this.currentDate = this.manager.calendar.date(this.selected).startOf("month");
        }
        else {
            this.currentDate = this.manager.calendar.today().startOf("month");
        }
        switch (granularity) {
            case "day":
                this.mode = "month";
                break;
            case "week":
                this.mode = "month";
                break;
            case "month":
                this.mode = "year";
                break;
            case "year":
                this.mode = "decade";
                break;
            case "quarter":
                this.mode = "quarter";
                break;
        }
    }
    onOpen() {
        this.display();
        this.titleEl.setText("Select Date");
        this.modalEl.classList.add("journal-date-picker-modal");
    }
    display() {
        const { contentEl } = this;
        contentEl.empty();
        switch (this.mode) {
            case "month":
                this.displayMonth(contentEl);
                break;
            case "quarter":
                this.displayQuarter(contentEl);
                break;
            case "year":
                this.displayYear(contentEl);
                break;
            case "decade":
                this.displayDecade(contentEl);
                break;
        }
    }
    displayMonth(contentEl) {
        const today = this.manager.calendar.today();
        const startWithWeek = this.currentDate.clone().startOf("week");
        const endWithWeek = this.currentDate.clone().endOf("month").endOf("week");
        this.renderName(contentEl, "MMMM YYYY", "month", "year");
        const view = contentEl.createDiv({
            cls: "journal-month-view",
        });
        view.on("click", ".journal-day", (e) => {
            var _a, _b;
            const date = (_b = (_a = e.target.closest("[data-date]")) === null || _a === void 0 ? void 0 : _a.dataset) === null || _b === void 0 ? void 0 : _b.date;
            if (date) {
                this.cb(date, e);
                this.close();
            }
        });
        const week = startWithWeek.clone().startOf("week");
        const weekEnd = week.clone().endOf("week");
        const placeWeeks = this.manager.config.calendarView.weeks || "left";
        if (placeWeeks !== "none") {
            view.classList.add("with-week");
        }
        if (placeWeeks === "left")
            view.createDiv();
        while (week.isSameOrBefore(weekEnd)) {
            view.createDiv({
                cls: "journal-weekday",
                text: week.format("ddd"),
            });
            week.add(1, "day");
        }
        if (placeWeeks === "right")
            view.createDiv();
        const curr = startWithWeek.clone();
        while (curr.isSameOrBefore(endWithWeek)) {
            if (placeWeeks === "left" && curr.isSame(curr.clone().startOf("week"), "day")) {
                this.renderWeekNumber(view, curr);
            }
            const cls = ["journal-day", "journal-clickable"];
            if (curr.isSame(today, "day")) {
                cls.push("journal-is-today");
            }
            if (!curr.isSame(this.currentDate, "month")) {
                cls.push("journal-is-not-same-month");
            }
            const day = view.createDiv({
                cls,
                text: curr.format("D"),
            });
            day.dataset.date = curr.format("YYYY-MM-DD");
            if (this.selected === day.dataset.date) {
                day.classList.add("journal-is-selected");
            }
            if (placeWeeks === "right" && curr.isSame(curr.clone().endOf("week"), "day")) {
                this.renderWeekNumber(view, curr);
            }
            curr.add(1, "day");
        }
    }
    renderWeekNumber(parent, curr) {
        const weekNumber = parent.createDiv({
            cls: "journal-weeknumber",
            text: curr.format("[W]ww"),
        });
        weekNumber.dataset.date = curr.format("YYYY-MM-DD");
    }
    displayQuarter(contentEl) {
        const start = this.currentDate.clone().startOf("year").startOf("quarter");
        const end = this.currentDate.clone().endOf("year");
        this.renderName(contentEl, "YYYY", "year", "quarter");
        const view = contentEl.createDiv({
            cls: "journal-dp-quarters-view",
        });
        view.on("click", ".journal-dp-quarter", (e) => {
            var _a, _b;
            const date = (_b = (_a = e.target.closest("[data-date]")) === null || _a === void 0 ? void 0 : _a.dataset) === null || _b === void 0 ? void 0 : _b.date;
            if (date) {
                this.currentDate = this.manager.calendar.date(date);
                this.cb(this.currentDate.startOf("quarter").format("YYYY-MM-DD"), e);
                this.close();
            }
        });
        const curr = start.clone();
        while (curr.isSameOrBefore(end, "year")) {
            view.createEl("button", {
                cls: "journal-dp-quarter journal-clickable",
                text: curr.format("[Q]Q"),
                attr: {
                    "data-date": curr.format("YYYY-MM-DD"),
                },
            });
            curr.add(1, "quarter");
        }
    }
    displayYear(contentEl) {
        const start = this.currentDate.clone().startOf("year");
        const end = this.currentDate.clone().endOf("year");
        this.renderName(contentEl, "YYYY", "year", "decade");
        const view = contentEl.createDiv({
            cls: "journal-dp-year-view",
        });
        view.on("click", ".journal-dp-month", (e) => {
            var _a, _b;
            const date = (_b = (_a = e.target.closest("[data-date]")) === null || _a === void 0 ? void 0 : _a.dataset) === null || _b === void 0 ? void 0 : _b.date;
            if (date) {
                this.currentDate = this.manager.calendar.date(date);
                if (this.granularity === "month") {
                    this.cb(this.currentDate.startOf("month").format("YYYY-MM-DD"), e);
                    this.close();
                }
                else {
                    this.mode = "month";
                    this.display();
                }
            }
        });
        const curr = start.clone();
        while (curr.isSameOrBefore(end, "year")) {
            view.createEl("button", {
                cls: "journal-dp-month journal-clickable",
                text: curr.format("MMMM"),
                attr: {
                    "data-date": curr.format("YYYY-MM-DD"),
                },
            });
            curr.add(1, "month");
        }
    }
    displayDecade(contentEl) {
        const startYear = this.currentDate.year() - (this.currentDate.year() % 10);
        const endYear = startYear + 9;
        const nameRow = contentEl.createDiv({
            cls: "journal-dp-name-row",
        });
        const prevButton = nameRow.createEl("button", {
            cls: `clickable-icon journal-dp-prev-decade journal-clickable`,
        });
        prevButton.on("click", `.journal-dp-prev-decade`, () => {
            this.currentDate.year(this.currentDate.year() - 10);
            this.display();
        });
        const prevIcon = obsidian.getIcon("arrow-left");
        if (prevIcon)
            prevButton.appendChild(prevIcon);
        nameRow.createDiv({
            cls: `journal-dp-decade-name `,
            text: `${startYear} - ${endYear}`,
        });
        const nextButton = nameRow.createEl("button", {
            cls: `clickable-icon journal-dp-next-decade journal-clickable`,
        });
        nextButton.on("click", `.journal-dp-next-decade`, () => {
            this.currentDate.year(this.currentDate.year() + 10);
            this.display();
        });
        const nextIcon = obsidian.getIcon("arrow-right");
        if (nextIcon)
            nextButton.appendChild(nextIcon);
        const view = contentEl.createDiv({
            cls: "journal-dp-decade-view",
        });
        view.on("click", ".journal-dp-year", (e) => {
            var _a, _b;
            const year = (_b = (_a = e.target.closest("[data-year]")) === null || _a === void 0 ? void 0 : _a.dataset) === null || _b === void 0 ? void 0 : _b.year;
            if (year) {
                this.currentDate.year(parseInt(year, 10));
                if (this.granularity === "year") {
                    this.cb(this.currentDate.startOf("year").format("YYYY-MM-DD"), e);
                    this.close();
                }
                else {
                    this.mode = "year";
                    this.display();
                }
            }
        });
        for (let i = startYear - 1; i <= endYear + 1; i++) {
            const yearButton = view.createEl("button", {
                cls: `journal-dp-year journal-clickable`,
                text: i.toString(),
                attr: {
                    "data-year": i,
                },
            });
            if (i < startYear || i > endYear) {
                yearButton.classList.add("journal-out-of-range");
            }
        }
    }
    renderName(contentEl, format, granularity, mode) {
        const nameRow = contentEl.createDiv({
            cls: "journal-dp-name-row",
        });
        const prevButton = nameRow.createEl("button", {
            cls: `clickable-icon journal-dp-prev-${granularity} journal-clickable`,
        });
        prevButton.on("click", `.journal-dp-prev-${granularity}`, () => {
            this.currentDate.subtract(1, granularity);
            this.display();
        });
        const prevIcon = obsidian.getIcon("arrow-left");
        if (prevIcon)
            prevButton.appendChild(prevIcon);
        const monthName = nameRow.createEl("button", {
            cls: `journal-dp-${granularity}-name journal-clickable`,
            text: this.currentDate.format(format),
        });
        monthName.on("click", `.journal-dp-${granularity}-name`, () => {
            this.mode = mode;
            this.display();
        });
        const nextButton = nameRow.createEl("button", {
            cls: `clickable-icon journal-dp-next-${granularity} journal-clickable`,
        });
        nextButton.on("click", `.journal-dp-next-${granularity}`, () => {
            this.currentDate.add(1, granularity);
            this.display();
        });
        const nextIcon = obsidian.getIcon("arrow-right");
        if (nextIcon)
            nextButton.appendChild(nextIcon);
    }
}

class CreateJournalModal extends obsidian.Modal {
    constructor(app, manager) {
        super(app);
        this.manager = manager;
        this.name = "";
        this.id = "";
        this.type = "calendar";
        this.duration = 1;
        this.granularity = "week";
        this.start_date = "";
        this.start_index = 1;
        this.numeration_type = "increment";
        this.errors = [];
    }
    onOpen() {
        this.titleEl.innerText = "Add Journal";
        this.display();
    }
    validate() {
        this.errors = [];
        if (!this.name)
            this.errors.push("Name is required");
        if (!this.id)
            this.errors.push("ID is required");
        else {
            const existing = this.manager.get(this.id);
            if (existing)
                this.errors.push(`ID is already used for ${existing.name}`);
        }
        if (this.type === "interval") {
            if (!this.duration)
                this.errors.push("Duration is required");
            if (!this.granularity)
                this.errors.push("Granularity is required");
            if (!this.start_date)
                this.errors.push("Start date is required");
            if (!this.start_index)
                this.errors.push("Start index is required");
        }
    }
    display() {
        const { contentEl } = this;
        contentEl.empty();
        new obsidian.Setting(contentEl)
            .setName("Type")
            .setDesc(this.type === "interval"
            ? "Interval based journal can be used for notes that are bound to time intervals not aligned with the calendar (like financial quarters or 2 week sprints)"
            : "Calendar based journal can be used for daily, weekly, monthly, quarterly, and yearly notes")
            .addDropdown((dropdown) => {
            dropdown
                .addOptions({
                calendar: "Calendar based",
                interval: "Interval based",
            })
                .setValue(this.type)
                .onChange((value) => {
                this.type = value;
                this.display();
            });
        });
        new obsidian.Setting(contentEl).setName("Name").addText((text) => {
            text.setPlaceholder("ex. Work").onChange((value) => {
                this.name = value;
            });
            text.inputEl.required = true;
        });
        new obsidian.Setting(contentEl)
            .setName("ID")
            .setDesc("This will be used to connect nodes to journal in frontmatter")
            .addText((text) => {
            text.setPlaceholder("ex. work").onChange((value) => {
                this.id = value;
            });
            text.inputEl.required = true;
        });
        if (this.type === "interval") {
            new obsidian.Setting(contentEl)
                .setName("Interval")
                .setDesc("Define duration of an interval")
                .addText((text) => {
                text.inputEl.classList.add("journal-small-input");
                text.setValue(this.duration.toString()).onChange((value) => {
                    this.duration = parseInt(value, 10);
                });
            })
                .addDropdown((dropdown) => {
                dropdown
                    .addOptions({
                    day: "Day",
                    week: "Week",
                    month: "Month",
                })
                    .setValue(this.granularity)
                    .onChange((value) => {
                    this.granularity = value;
                });
            });
            new obsidian.Setting(contentEl)
                .setName("Start date")
                .setDesc("This date is used as base for calculations")
                .addButton((button) => {
                button.setButtonText(this.start_date || "Pick date").onClick(() => {
                    new DatePickerModal(this.app, this.manager, (date) => {
                        this.start_date = date;
                        this.display();
                    }, this.start_date).open();
                });
            });
            new obsidian.Setting(contentEl).setName("Start index").addText((text) => {
                text.inputEl.type = "number";
                text.inputEl.classList.add("journal-small-input");
                text.setValue(this.start_index.toString()).onChange((value) => {
                    this.start_index = parseInt(value, 10);
                });
            });
            new obsidian.Setting(contentEl)
                .setName("Index change")
                .setDesc("Define how index of ongoing interval will change")
                .addDropdown((dropdown) => {
                dropdown
                    .addOptions({
                    increment: "Increasing",
                    year: "Yearly restart (ex. quarters)",
                })
                    .setValue(this.numeration_type)
                    .onChange((value) => {
                    this.numeration_type = value;
                });
            });
        }
        if (this.errors.length > 0) {
            const ul = contentEl.createEl("ul", { cls: "journal-warning" });
            for (const error of this.errors) {
                ul.createEl("li", { text: error });
            }
        }
        new obsidian.Setting(contentEl)
            .addButton((button) => {
            button.setButtonText("Close").onClick(() => this.close());
        })
            .addButton((button) => {
            button
                .setButtonText("Add")
                .setCta()
                .onClick(() => __awaiter(this, void 0, void 0, function* () {
                this.validate();
                if (this.errors.length > 0) {
                    this.display();
                    return;
                }
                this.close();
                if (this.type === "interval") {
                    const config = Object.assign(Object.assign({}, DEFAULT_CONFIG_INTERVAL), { id: this.id, name: this.name, duration: this.duration, granularity: this.granularity, start_date: this.start_date, start_index: this.start_index, numeration_type: this.numeration_type });
                    const id = yield this.manager.createIntervalJournal(config);
                    this.app.workspace.trigger("journal:settings-navigate", {
                        type: "journal",
                        id,
                    });
                    return;
                }
                const id = yield this.manager.createCalendarJournal(this.id, this.name);
                this.app.workspace.trigger("journal:settings-navigate", {
                    type: "journal",
                    id,
                });
            }));
        });
    }
    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
}

class SettingsWidget {
    constructor(app) {
        this.app = app;
    }
    navigate(state) {
        this.app.workspace.trigger("journal:settings-navigate", state);
    }
    save(redraw = false) {
        this.app.workspace.trigger("journal:settings-save", redraw);
    }
}

class DeleteJournalModal extends obsidian.Modal {
    constructor(app, manager, config) {
        super(app);
        this.manager = manager;
        this.config = config;
        this.notesProcessing = "keep";
    }
    onOpen() {
        this.display();
        this.titleEl.setText(`Delete ${this.config.name} Journal`);
    }
    display() {
        const { contentEl } = this;
        contentEl.empty();
        new obsidian.Setting(contentEl)
            .setName("Journal notes")
            .setDesc("What to do with notes connected to this journal")
            .addDropdown((dropdown) => {
            dropdown
                .addOptions({
                keep: "Keep",
                clear: "Clear journal data",
                delete: "Delete",
            })
                .setValue(this.notesProcessing)
                .onChange((value) => {
                this.notesProcessing = value;
                this.display();
            });
        });
        new obsidian.Setting(contentEl)
            .addButton((button) => {
            button.setButtonText("Cancel").onClick(() => __awaiter(this, void 0, void 0, function* () {
                this.close();
            }));
        })
            .addButton((button) => {
            button
                .setButtonText("Delete")
                .setWarning()
                .onClick(() => __awaiter(this, void 0, void 0, function* () {
                yield this.manager.deleteJournal(this.config.id, this.notesProcessing);
                this.close();
                this.app.workspace.trigger("journal:settings-navigate", { type: "home" });
            }));
        });
    }
}

class FolderSuggestion extends obsidian.AbstractInputSuggest {
    constructor(app, textInputEl, root) {
        super(app, textInputEl);
        this.textInputEl = textInputEl;
        this.root = root;
    }
    getSuggestions(inputStr) {
        var _a;
        const fileAndFolders = this.app.vault.getAllLoadedFiles();
        const search = inputStr.toLocaleLowerCase();
        const root = (_a = this.root) === null || _a === void 0 ? void 0 : _a.toLocaleLowerCase();
        return fileAndFolders.filter((f) => {
            if (!(f instanceof obsidian.TFolder))
                return false;
            let path = f.path.toLocaleLowerCase();
            if (path === "/")
                return false;
            if (root) {
                if (!path.startsWith(root))
                    return false;
                path = path.slice(root.length);
            }
            return path.includes(search);
        });
    }
    renderSuggestion(value, el) {
        el.setText(this.extractFolderPath(value));
    }
    selectSuggestion(value) {
        this.textInputEl.value = this.extractFolderPath(value);
        this.textInputEl.trigger("input");
        this.close();
    }
    extractFolderPath(folder) {
        const path = folder.path;
        if (this.root)
            return path.slice(this.root.length + 1);
        return path;
    }
}

const CALENDAR_VIEW_TYPE = "journal-calendar";
const FRONTMATTER_DATE_FORMAT = "YYYY-MM-DD";
const FRONTMATTER_ID_KEY = "journal";
const FRONTMATTER_START_DATE_KEY = "journal-start-date";
const FRONTMATTER_END_DATE_KEY = "journal-end-date";
const FRONTMATTER_SECTION_KEY = "journal-section";
const FRONTMATTER_INDEX_KEY = "journal-interval-index";
const SECTIONS_MAP = {
    day: "daily",
    week: "weekly",
    month: "monthly",
    quarter: "quarterly",
    year: "yearly",
};

function deepCopy(input) {
    return JSON.parse(JSON.stringify(input));
}
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function extractCurrentlocaleData() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const localeData = obsidian.moment.localeData();
    return Object.assign(Object.assign({}, deepCopy(localeData._config)), { ordinal: localeData._config.ordinal, meridiem: localeData._config.meridiem, meridiemParse: localeData._config.meridiemParse, dayOfMonthOrdinalParse: localeData._config.dayOfMonthOrdinalParse, isPM: localeData._config.isPM });
}
const localeData = obsidian.moment.localeData();
const formatRegExpParts = new Map([
    [
        "o",
        String(localeData._config.dayOfMonthOrdinalParse) // eslint-disable-line @typescript-eslint/no-explicit-any
            .replace("/\\d{1,2}", "")
            .slice(0, -1),
    ],
    ["M", "([1-9]|1[0-2])"],
    ["MM", "(0[1-9]|1[0-2])"],
    ["MMM", "(" + localeData.monthsShort().join("|") + ")"],
    ["MMMM", "(" + localeData.months().join("|") + ")"],
    ["Q", "[1-4]"],
    ["D", "[0-9]{1,2}"],
    ["DD", "[0-9]{2}"],
    ["DDD", "[1-9]{1,3}"],
    ["DDDD", "[1-9]{3}"],
    ["d", "[0-6]"],
    ["dd", "(" + localeData.weekdaysMin().join("|") + ")"],
    ["ddd", "(" + localeData.weekdaysShort().join("|") + ")"],
    ["dddd", "(" + localeData.weekdays().join("|") + ")"],
    ["w", "[0-9]{1,2}"],
    ["ww", "[0-9]{2}"],
    ["W", "[0-9]{1,2}"],
    ["WW", "[0-9]{2}"],
    ["YY", "[0-9]{2}"],
    ["YYYY", "[0-9]{4}"],
]);
const supportedSymbols = new Set(["o", "M", "Q", "D", "d", "w", "W", "Y"]);
function formatToRegexp(format) {
    const parts = [];
    let lastChar = "";
    let lastCharCount = 0;
    let exact = false;
    let exactText = "";
    for (const char of format) {
        if (exact) {
            if (char === "]") {
                parts.push(exactText);
                exact = false;
                exactText = "";
            }
            else {
                exactText += char;
            }
        }
        else if (char === "[") {
            exact = true;
        }
        else {
            if (supportedSymbols.has(char)) {
                if (lastChar === char) {
                    lastCharCount++;
                }
                else {
                    if (lastCharCount > 0) {
                        const prepared = formatRegExpParts.get(lastChar.repeat(lastCharCount));
                        if (prepared)
                            parts.push(prepared);
                    }
                    lastCharCount = 1;
                    lastChar = char;
                }
            }
            else {
                if (lastCharCount > 0) {
                    const prepared = formatRegExpParts.get(lastChar.repeat(lastCharCount));
                    if (prepared)
                        parts.push(prepared);
                    lastCharCount = 0;
                    lastChar = "";
                }
                parts.push(char);
            }
        }
    }
    if (lastCharCount > 0) {
        const prepared = formatRegExpParts.get(lastChar.repeat(lastCharCount));
        if (prepared)
            parts.push(prepared);
        lastCharCount = 0;
        lastChar = "";
    }
    return new RegExp(parts.join(""));
}

class AddNotesJournalModal extends obsidian.Modal {
    constructor(app, manager, config) {
        super(app);
        this.manager = manager;
        this.config = config;
        this.mode = "setup";
        this.folder = "";
        this.granularity = "day";
        this.date_place = "title";
        this.date_propery_name = "";
        this.date_format = DEFAULT_DATE_FORMATS_CALENDAR.day;
        this.filters_combination = "no";
        this.filters = [];
        this.console_ident = 0;
        this.journal = this.manager.get(this.config.name);
    }
    onOpen() {
        this.display();
        this.titleEl.setText(`Add notes to ${this.config.name} Journal`);
        this.modalEl.classList.add("journal-add-notes-modal");
    }
    display() {
        switch (this.mode) {
            case "setup":
                this.displaySetup();
                break;
            case "processing":
                this.displayProcessing();
                break;
        }
    }
    displaySetup() {
        const { contentEl } = this;
        contentEl.empty();
        new obsidian.Setting(contentEl)
            .setName("Folder")
            .setDesc("Select folder with existing notes that you want to process")
            .addText((text) => {
            new FolderSuggestion(this.app, text.inputEl);
            text.setValue(this.folder).onChange((value) => {
                this.folder = value;
            });
        });
        const sections = [];
        if (this.config.day.enabled)
            sections.push("day");
        if (this.config.week.enabled)
            sections.push("week");
        if (this.config.month.enabled)
            sections.push("month");
        if (this.config.quarter.enabled)
            sections.push("quarter");
        if (this.config.year.enabled)
            sections.push("year");
        if (!sections.length) {
            new obsidian.Setting(contentEl)
                .setName("No sections enabled")
                .setDesc("Enable at least one journal section to start process");
            return;
        }
        if (!sections.includes(this.granularity)) {
            this.granularity = sections[0];
            this.date_format = DEFAULT_DATE_FORMATS_CALENDAR[this.granularity];
        }
        new obsidian.Setting(contentEl).setName("Search for").addDropdown((dropdown) => {
            for (const section of sections) {
                dropdown.addOption(section, `${SECTIONS_MAP[section]} notes`);
            }
            dropdown.setValue(this.granularity).onChange((value) => {
                this.granularity = value;
                this.date_format = DEFAULT_DATE_FORMATS_CALENDAR[this.granularity];
                this.display();
            });
        });
        new obsidian.Setting(contentEl).setName("Take date from").addDropdown((dropdown) => {
            dropdown
                .addOption("title", "Note title")
                .addOption("property", "Property")
                .setValue(this.date_place)
                .onChange((value) => {
                this.date_place = value;
                this.display();
            });
        });
        if (this.date_place === "property") {
            new obsidian.Setting(contentEl).setName("Property containing date").addText((text) => {
                text.setValue(this.date_propery_name).onChange((value) => {
                    this.date_propery_name = value;
                });
            });
        }
        const dateFormat = new obsidian.Setting(contentEl).setName(`Date format`).addMomentFormat((text) => {
            text.setValue(this.date_format).onChange((value) => {
                this.date_format = value;
                if (this.date_format) {
                    dateFormatHint.innerText = this.manager.calendar.today().format(this.date_format);
                }
                else {
                    dateFormatHint.innerText = "";
                }
            });
        });
        dateFormat.descEl.createEl("a", {
            text: "Syntax reference.",
            attr: {
                target: "_blank",
            },
            href: "https://momentjs.com/docs/#/displaying/format/",
        });
        dateFormat.descEl.createDiv({
            text: "If your dates have time component in them - please omit it in format.",
        });
        dateFormat.descEl.createEl("span", {
            text: "Your current syntax looks like this: ",
        });
        const dateFormatHint = dateFormat.descEl.createEl("b", {
            cls: "u-pop",
        });
        if (this.date_format) {
            dateFormatHint.innerText = this.manager.calendar.today().format(this.date_format);
        }
        if (this.date_place === "property") {
            dateFormat.descEl.createDiv({
                text: "Please pay attention that dates might differ from how they are stored. Check format in Source display mode.",
            });
        }
        new obsidian.Setting(contentEl).setName("Process").addDropdown((dropdown) => {
            dropdown
                .addOption("no", "All notes")
                .addOption("or", "Notes that match any filter")
                .addOption("and", "Notes that match all filters")
                .setValue(this.filters_combination)
                .onChange((value) => {
                this.filters_combination = value;
                this.display();
            });
        });
        if (this.filters_combination !== "no") {
            const filtersEl = contentEl.createDiv();
            this.renderFilters(filtersEl);
        }
        this.errorsEl = contentEl.createDiv({
            cls: "journal-warning",
        });
        new obsidian.Setting(contentEl).addButton((button) => {
            button
                .setButtonText("Start")
                .setCta()
                .onClick(() => __awaiter(this, void 0, void 0, function* () {
                this.startProcessing();
            }));
        });
    }
    renderFilters(contentEl) {
        contentEl.empty();
        new obsidian.Setting(contentEl).setName("Filters").addButton((button) => {
            button.setIcon("plus").onClick(() => {
                this.filters.push({
                    type: "name",
                    name_condition: "contains",
                    tag_condition: "contains",
                    property_name: "",
                    property_condition: "exists",
                    value: "",
                });
                this.renderFilters(contentEl);
            });
        });
        for (const filter of this.filters) {
            const filterEl = contentEl.createDiv();
            this.renderSectionFilterConfig(filterEl, filter, () => {
                this.filters.remove(filter);
                this.renderFilters(contentEl);
            });
        }
    }
    renderSectionFilterConfig(contentEl, filter, removeFilter) {
        contentEl.empty();
        const setting = new obsidian.Setting(contentEl);
        setting.addDropdown((dropdown) => {
            dropdown
                .addOption("name", "Node title")
                .addOption("tag", "Any tag in note")
                .addOption("property", "Property")
                .setValue(filter.type)
                .onChange((value) => {
                filter.type = value;
                this.renderSectionFilterConfig(contentEl, filter, removeFilter);
            });
        });
        if (filter.type === "name") {
            setting.addDropdown((dropdown) => {
                dropdown
                    .addOption("contains", "contains")
                    .addOption("not_contains", "doesn't contain")
                    .addOption("starts_with", "starts with")
                    .addOption("ends_with", "ends with")
                    .setValue(filter.name_condition)
                    .onChange((value) => {
                    filter.name_condition = value;
                });
            });
            setting.addText((text) => {
                text.setValue(filter.value).onChange((value) => {
                    filter.value = value;
                });
            });
        }
        else if (filter.type === "tag") {
            setting.addDropdown((dropdown) => {
                dropdown
                    .addOption("contains", "contains")
                    .addOption("starts_with", "starts with")
                    .addOption("ends_with", "ends with")
                    .setValue(filter.tag_condition)
                    .onChange((value) => {
                    filter.tag_condition = value;
                });
            });
            setting.addText((text) => {
                text.setValue(filter.value).onChange((value) => {
                    filter.value = value;
                });
            });
        }
        else if (filter.type === "property") {
            setting.addText((text) => {
                text
                    .setValue(filter.property_name)
                    .setPlaceholder("ex. Important")
                    .onChange((value) => {
                    filter.property_name = value;
                });
            });
            setting.addDropdown((dropdown) => {
                dropdown
                    .addOption("exists", "exists")
                    .addOption("not_exists", "doesn't exist")
                    .addOption("is", "is")
                    .addOption("is_not", "is not")
                    .addOption("contains", "contains")
                    .addOption("not_contains", "doesn't contain")
                    .addOption("starts_with", "starts with")
                    .addOption("ends_with", "ends with")
                    .setValue(filter.property_condition)
                    .onChange((value) => {
                    filter.property_condition = value;
                    this.renderSectionFilterConfig(contentEl, filter, removeFilter);
                });
            });
            if (filter.property_condition !== "exists" && filter.property_condition !== "not_exists") {
                setting.addText((text) => {
                    text.setValue(filter.value).onChange((value) => {
                        filter.value = value;
                    });
                });
            }
        }
        setting.addExtraButton((button) => {
            button.setIcon("trash").onClick(() => {
                removeFilter();
            });
        });
    }
    displayProcessing() {
        const { contentEl } = this;
        contentEl.empty();
        this.consoleEl = contentEl.createEl("pre");
    }
    startProcessing() {
        return __awaiter(this, void 0, void 0, function* () {
            this.errorsEl.empty();
            const folder = this.app.vault.getFolderByPath(this.folder ? this.folder : "/");
            if (!folder) {
                this.errorsEl.setText(`Folder ${this.folder} not found`);
                return;
            }
            this.dateRegexp = formatToRegexp(this.date_format);
            this.mode = "processing";
            this.displayProcessing();
            yield this.processFolder(folder);
            this.writeToConsole("Finished");
            new obsidian.Setting(this.contentEl)
                .addButton((button) => {
                button.setButtonText("Close").onClick(() => {
                    this.close();
                });
            })
                .addButton((button) => {
                button
                    .setButtonText("Add other notes")
                    .setCta()
                    .onClick(() => {
                    this.mode = "setup";
                    this.display();
                });
            });
        });
    }
    processFolder(folder) {
        return __awaiter(this, void 0, void 0, function* () {
            this.writeToConsole(`Processing ${folder.name ? folder.name : "vault"}`);
            this.console_ident++;
            for (const child of folder.children) {
                if (child instanceof obsidian.TFolder) {
                    yield this.processFolder(child);
                }
                else if (child instanceof obsidian.TFile) {
                    yield this.processNote(child);
                }
            }
            this.console_ident--;
        });
    }
    processNote(note) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            this.writeToConsole(`Processing ${note.basename}`);
            const journalData = yield this.manager.getJournalData(note.path);
            this.console_ident++;
            try {
                if (journalData) {
                    if (journalData.id === this.journal.id)
                        return this.writeToConsole(`Already in journal - skipped`);
                    const otherJournal = this.manager.get(journalData.id);
                    if (otherJournal)
                        return this.writeToConsole(`Already in another journal ${otherJournal.name} - skipped`);
                }
                if (!this.checkFilters(note))
                    return this.writeToConsole(`Does not match filters - skipped`);
                const dateString = this.date_place === "title"
                    ? note.basename
                    : (_b = (_a = this.app.metadataCache.getFileCache(note)) === null || _a === void 0 ? void 0 : _a.frontmatter) === null || _b === void 0 ? void 0 : _b[this.date_propery_name];
                const match = dateString === null || dateString === void 0 ? void 0 : dateString.match(this.dateRegexp);
                if (!match)
                    return this.writeToConsole(`Date not found - skipped`);
                const date = this.manager.calendar.date(match[0], this.date_format);
                if (!date.isValid())
                    return this.writeToConsole(`Invalid date - skipped`);
                const section = this.journal[this.granularity];
                const rangeStart = section.getRangeStart(date.format("YYYY-MM-DD"));
                const rangeEnd = section.getRangeEnd(date.format("YYYY-MM-DD"));
                const indexed = this.journal.index.get(rangeStart, this.granularity);
                if (indexed) {
                    if (indexed.path === note.path)
                        return this.writeToConsole(`Note ${note.basename} is already connected to journal - skipped`);
                    else
                        return this.writeToConsole(`Other note ${indexed.path} is connected to this date - skipped`);
                }
                yield this.journal[this.granularity].connectNote(note, rangeStart, rangeEnd, {});
                this.writeToConsole(`Added ${note.basename} to journal for ${date.format(section.dateFormat)}`);
            }
            finally {
                this.console_ident--;
            }
        });
    }
    checkFilters(note) {
        if (this.filters_combination === "no")
            return true;
        if (this.filters_combination === "and")
            return this.filters.every((filter) => this.checkFilter(note, filter));
        return this.filters.some((filter) => this.checkFilter(note, filter));
    }
    checkFilter(note, filter) {
        switch (filter.type) {
            case "name":
                return this.checkNameFilter(note, filter);
            case "tag":
                return this.checkTagFilter(note, filter);
            case "property":
                return this.checkPropertyFilter(note, filter);
        }
        return true;
    }
    checkNameFilter(note, filter) {
        switch (filter.name_condition) {
            case "contains":
                return note.basename.contains(filter.value);
            case "not_contains":
                return !note.basename.contains(filter.value);
            case "starts_with":
                return note.basename.startsWith(filter.value);
            case "ends_with":
                return note.basename.endsWith(filter.value);
        }
        return true;
    }
    checkTagFilter(note, filter) {
        const metadata = this.app.metadataCache.getFileCache(note);
        if (!metadata)
            return false;
        if (!metadata.tags)
            return false;
        switch (filter.tag_condition) {
            case "contains":
                return metadata.tags.some((tag) => tag.tag.contains(filter.value));
            case "starts_with":
                return metadata.tags.some((tag) => tag.tag.startsWith(filter.value));
            case "ends_with":
                return metadata.tags.some((tag) => tag.tag.endsWith(filter.value));
        }
        return true;
    }
    checkPropertyFilter(note, filter) {
        var _a;
        const metadata = this.app.metadataCache.getFileCache(note);
        if (!metadata)
            return false;
        const propertyValue = (_a = metadata.frontmatter) === null || _a === void 0 ? void 0 : _a[filter.property_name];
        const type = typeof propertyValue;
        switch (filter.property_condition) {
            case "exists":
                return !!metadata.frontmatter && filter.property_name in metadata.frontmatter;
            case "not_exists":
                return !!metadata.frontmatter && !(filter.property_name in metadata.frontmatter);
            case "is":
                return propertyValue == filter.value;
            case "is_not":
                return propertyValue != filter.value;
            case "contains":
                return type === "string" && (propertyValue === null || propertyValue === void 0 ? void 0 : propertyValue.contains(filter.value));
            case "not_contains":
                return type !== "string" || (type === "string" && !(propertyValue === null || propertyValue === void 0 ? void 0 : propertyValue.contains(filter.value)));
            case "starts_with":
                return type === "string" && (propertyValue === null || propertyValue === void 0 ? void 0 : propertyValue.startsWith(filter.value));
            case "ends_with":
                return type === "string" && (propertyValue === null || propertyValue === void 0 ? void 0 : propertyValue.endsWith(filter.value));
        }
        return true;
    }
    writeToConsole(text) {
        var _a;
        const identText = " ".repeat(this.console_ident * 2);
        (_a = this.consoleEl) === null || _a === void 0 ? void 0 : _a.createDiv({
            text: identText + text,
        });
    }
}

class SettingsHomePage extends SettingsWidget {
    constructor(app, manager, containerEl, config) {
        super(app);
        this.manager = manager;
        this.containerEl = containerEl;
        this.config = config;
    }
    display() {
        const { containerEl } = this;
        new obsidian.Setting(containerEl)
            .setName("Start week on")
            .setDesc("Which day to consider as first day of week.")
            .addDropdown((dropdown) => {
            const fow = obsidian.moment().localeData().firstDayOfWeek();
            const fowText = obsidian.moment().localeData().weekdays()[fow];
            dropdown
                .addOption("-1", `Locale default (${fowText})`)
                .addOptions({
                "0": "Sunday",
                "1": "Monday",
                "2": "Tuesday",
                "3": "Wednesday",
                "4": "Thursday",
                "5": "Friday",
                "6": "Saturday",
            })
                .setValue(String(this.config.calendar.firstDayOfWeek))
                .onChange((value) => {
                this.config.calendar.firstDayOfWeek = parseInt(value, 10);
                this.manager.calendar.updateLocale();
                this.save(true);
            });
        });
        if (this.config.calendar.firstDayOfWeek !== -1) {
            const s = new obsidian.Setting(containerEl).setName("First week of year");
            s.setDesc(`Define what date in January a week should contain to be considered first week of a year.`);
            s.addText((text) => {
                var _a;
                text.setValue(String((_a = this.config.calendar.firstWeekOfYear) !== null && _a !== void 0 ? _a : 1)).onChange((value) => {
                    if (value) {
                        this.config.calendar.firstWeekOfYear = parseInt(value, 10);
                        this.manager.calendar.updateLocale();
                        this.save();
                    }
                });
            });
        }
        new obsidian.Setting(containerEl)
            .setName("Journals")
            .setHeading()
            .addButton((button) => {
            button
                .setTooltip("Create new journal configuration")
                .setCta()
                .setClass("journal-clickable")
                .setIcon("plus")
                .onClick(() => {
                new CreateJournalModal(this.app, this.manager).open();
            });
        });
        if (this.config.size === 0) {
            containerEl.createEl("p", { text: "No journals configured yet." });
        }
        for (const entry of this.config) {
            const row = new obsidian.Setting(containerEl).setName(entry.name).setDesc(`ID: ${entry.id}`);
            const badge = row.nameEl.createEl("span");
            badge.innerText = `${entry.type}`;
            badge.classList.add("flair");
            if (entry.type === "calendar") {
                row.addButton((button) => {
                    button
                        .setIcon("import")
                        .setTooltip("Add existing notes to journal")
                        .setClass("clickable-icon")
                        .setClass("journal-clickable")
                        .onClick(() => {
                        new AddNotesJournalModal(this.app, this.manager, entry).open();
                    });
                });
            }
            row.addButton((button) => {
                button
                    .setIcon("pencil")
                    .setTooltip(`Edit ${entry.name}`)
                    .setClass("clickable-icon")
                    .setClass("journal-clickable")
                    .onClick(() => {
                    this.navigate({
                        type: "journal",
                        id: entry.id,
                    });
                });
            });
            row.addButton((button) => {
                button
                    .setIcon("trash-2")
                    .setTooltip(`Delete ${entry.name}`)
                    .setClass("clickable-icon")
                    .setClass("journal-clickable")
                    .onClick(() => __awaiter(this, void 0, void 0, function* () {
                    new DeleteJournalModal(this.app, this.manager, entry).open();
                }));
            });
        }
        new obsidian.Setting(containerEl).setName("Calendar view").setHeading();
        new obsidian.Setting(containerEl).setName("Add to").addDropdown((dropdown) => {
            dropdown
                .addOptions({
                left: "Left sidebar",
                right: "Right sidebar",
            })
                .setValue(this.config.calendarView.leaf || "right")
                .onChange((value) => {
                this.config.calendarView.leaf = value;
                this.save();
                this.manager.placeCalendarView(true);
            });
        });
        new obsidian.Setting(containerEl).setName("Show weeks").addDropdown((dropdown) => {
            dropdown
                .addOptions({
                none: "Don't show",
                left: "Before weekdays",
                right: "After weekdays",
            })
                .setValue(this.config.calendarView.weeks || "left")
                .onChange((value) => {
                this.config.calendarView.weeks = value;
                this.save();
            });
        });
    }
}

class SettingsCalendarPage extends SettingsWidget {
    constructor(app, containerEl, config) {
        super(app);
        this.containerEl = containerEl;
        this.config = config;
    }
    get headingText() {
        return `Configuring ${this.config.name}`;
    }
    display() {
        const { containerEl } = this;
        const heading = new obsidian.Setting(containerEl)
            .setName(this.headingText)
            .setHeading()
            .addButton((button) => {
            button
                .setClass("journal-clickable")
                .setIcon("chevron-left")
                .setTooltip("Back to list")
                .onClick(() => {
                this.navigate({ type: "home" });
            });
        });
        const badge = heading.nameEl.createEl("span");
        badge.innerText = `ID: ${this.config.id}`;
        badge.classList.add("flair");
        new obsidian.Setting(containerEl).setName("Journal name").addText((text) => {
            text.setValue(this.config.name).onChange(() => {
                this.config.name = text.getValue();
                heading.setName(this.headingText);
                this.save();
            });
        });
        new obsidian.Setting(containerEl)
            .setName("Root folder")
            .setDesc("All other folders in sections will be relative to this one")
            .addText((text) => {
            new FolderSuggestion(this.app, text.inputEl);
            text
                .setValue(this.config.rootFolder)
                .setPlaceholder("Example: folder 1/folder 2")
                .onChange(() => {
                this.config.rootFolder = text.getValue();
                this.save();
            });
        });
        const startUp = new obsidian.Setting(containerEl)
            .setName("Open on startup")
            .setDesc("Open a note whenever you open this vault?")
            .addToggle((toggle) => {
            toggle.setValue(this.config.openOnStartup).onChange(() => {
                this.config.openOnStartup = toggle.getValue();
                this.save(true);
            });
        });
        if (this.config.openOnStartup) {
            startUp.addDropdown((dropdown) => {
                const available = [];
                if (this.config.day.enabled) {
                    dropdown.addOption("day", "Daily note");
                    available.push("day");
                }
                if (this.config.week.enabled) {
                    dropdown.addOption("week", "Weekly note");
                    available.push("week");
                }
                if (this.config.month.enabled) {
                    dropdown.addOption("month", "Monthly note");
                    available.push("month");
                }
                if (this.config.quarter.enabled) {
                    dropdown.addOption("quarter", "Quarterly note");
                    available.push("quarter");
                }
                if (this.config.year.enabled) {
                    dropdown.addOption("year", "Yearly note");
                    available.push("year");
                }
                if (!available.contains(this.config.startupSection)) {
                    this.config.startupSection = available[0];
                    this.save();
                }
                dropdown.setValue(this.config.startupSection).onChange((value) => {
                    this.config.startupSection = value;
                    this.save();
                });
            });
        }
        this.renderSectionsHeading("day", this.config.day);
        this.renderSectionsHeading("week", this.config.week);
        this.renderSectionsHeading("month", this.config.month);
        this.renderSectionsHeading("quarter", this.config.quarter);
        this.renderSectionsHeading("year", this.config.year);
    }
    renderSectionsHeading(sectionName, config) {
        const setting = new obsidian.Setting(this.containerEl).setName(`${capitalize(SECTIONS_MAP[sectionName])} notes`);
        if (config.enabled) {
            setting.addButton((button) => {
                button
                    .setIcon("cog")
                    .setClass("journal-clickable")
                    .setTooltip(`Configure ${SECTIONS_MAP[sectionName]} notes`)
                    .onClick(() => {
                    this.navigate({
                        type: "journal",
                        id: this.config.id,
                        section: sectionName,
                    });
                });
            });
        }
        setting.addToggle((toggle) => {
            toggle.setValue(config.enabled).onChange((value) => {
                config.enabled = value;
                this.save(true);
            });
        });
    }
}

class IconSuggestion extends obsidian.AbstractInputSuggest {
    constructor(app, textInputEl) {
        super(app, textInputEl);
        this.textInputEl = textInputEl;
    }
    getSuggestions(inputStr) {
        const icons = obsidian.getIconIds();
        const search = inputStr.toLocaleLowerCase();
        return icons
            .filter((icon) => {
            return icon.toLocaleLowerCase().includes(search);
        })
            .sort();
    }
    renderSuggestion(value, el) {
        const icon = obsidian.getIcon(value);
        if (icon) {
            icon.classList.add("suggestion-icon");
            el.classList.add("mod-complex");
            el.classList.add("journal-suggestion-icon");
            el.appendChild(icon);
            const name = el.createSpan();
            name.classList.add("journal-suggestion-name");
            name.style.marginLeft = "8px";
            name.appendText(value);
        }
    }
    selectSuggestion(value) {
        this.textInputEl.value = value;
        this.textInputEl.trigger("input");
        this.close();
    }
}

class VariableReferenceModal extends obsidian.Modal {
    constructor(app, type, granularity, dateFormat) {
        super(app);
        this.type = type;
        this.granularity = granularity;
        this.dateFormat = dateFormat;
    }
    onOpen() {
        this.titleEl.innerText = "Variable reference";
        this.contentEl.on("click", ".journal-variable", (e) => {
            navigator.clipboard.writeText(e.target.innerText);
        });
        this.display();
    }
    display() {
        const { contentEl } = this;
        contentEl.empty();
        contentEl.createEl("p", {
            cls: "journal-hint",
            text: "Clicking on variable will copy it to clipboard.",
        });
        const grid = contentEl.createEl("div", {
            cls: "journal-variables-grid",
        });
        this.renderVariable(grid.createDiv(), "journal_name");
        grid.createDiv({
            text: "Name of corresponding journal",
        });
        this.renderVariable(grid.createDiv(), "note_name");
        grid.createDiv({
            text: "Name of current note",
        });
        if (this.granularity === "day") {
            this.renderVariable(grid.createDiv(), "date");
            const div = grid.createDiv({
                text: `Note date formatted using default format settings (${this.dateFormat}).`,
            });
            div.createEl("br");
            div.createSpan({
                text: "You can also use {{date:format}} to override format once, and use {{date+5d:format}} to add 5 days.",
            });
            div.createEl("br");
            div.createEl("a", {
                text: "Formatting reference.",
                attr: {
                    target: "_blank",
                },
                href: "https://momentjs.com/docs/#/displaying/format/",
            });
            div.createEl("br");
            div.createEl("a", {
                text: "Date manipulation reference.",
                attr: {
                    target: "_blank",
                },
                href: "https://momentjs.com/docs/#/manipulating/add/",
            });
        }
        else {
            this.renderVariable(grid.createDiv(), "start_date");
            const div1 = grid.createDiv({
                text: this.type === "interval"
                    ? `Starting date of note interval formatted using default format settings (${this.dateFormat}). `
                    : `First day of ${this.granularity} formatted using default format settings (${this.dateFormat}).`,
            });
            div1.createEl("br");
            div1.createSpan({
                text: "You can also use {{start_date:format}} to override format once, and use {{start_date+5d:format}} to add 5 days.",
            });
            div1.createEl("br");
            div1.createEl("a", {
                text: "Formatting reference.",
                attr: {
                    target: "_blank",
                },
                href: "https://momentjs.com/docs/#/displaying/format/",
            });
            div1.createEl("br");
            div1.createEl("a", {
                text: "Date manipulation reference.",
                attr: {
                    target: "_blank",
                },
                href: "https://momentjs.com/docs/#/manipulating/add/",
            });
            this.renderVariable(grid.createDiv(), "end_date");
            const div2 = grid.createDiv({
                text: this.type === "interval"
                    ? `End date of note interval formatted using default format settings (${this.dateFormat}).`
                    : `Last day of ${this.granularity} formatted using default format settings (${this.dateFormat}).`,
            });
            div2.createEl("br");
            div2.createSpan({
                text: "You can also use {{end_date:format}} to override format once, and use {{end_date+5d:format}} to add 5 days.",
            });
            div2.createEl("br");
            div2.createEl("a", {
                text: "Formatting reference.",
                attr: {
                    target: "_blank",
                },
                href: "https://momentjs.com/docs/#/displaying/format/",
            });
            div2.createEl("br");
            div2.createEl("a", {
                text: "Date manipulation reference.",
                attr: {
                    target: "_blank",
                },
                href: "https://momentjs.com/docs/#/manipulating/add/",
            });
        }
        if (this.type === "interval") {
            this.renderVariable(grid.createDiv(), "index");
            grid.createDiv({
                text: "Index of current interval",
            });
        }
    }
    renderVariable(parent, name) {
        parent.createEl("span", {
            cls: "journal-variable",
            text: `{{${name}}}`,
        });
    }
}

function ensureFolderExists(app, path) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!path)
            return;
        const dirs = path.split("/");
        if (path.endsWith(".md")) {
            dirs.pop();
        }
        if (dirs.length) {
            const folderPath = dirs.join("/");
            if (!app.vault.getAbstractFileByPath(folderPath)) {
                yield app.vault.createFolder(folderPath);
            }
        }
    });
}

function replaceTemplateVariables(template, context) {
    let content = template !== null && template !== void 0 ? template : "";
    if (context.date) {
        const { value: date, defaultFormat } = context.date;
        content = content
            .replaceAll(/{{\s*(date)\s*(([+-]\d+)([yqmwdhs]))?\s*(:(.*?))?}}/gi, (_, _variableName, calc, timeDelta, unit, _customFormat, format) => {
            const templateVar = date.clone();
            if (calc) {
                templateVar.add(parseInt(timeDelta, 10), unit);
            }
            if (format) {
                return templateVar.format(format);
            }
            return templateVar.format(defaultFormat);
        });
    }
    if (context.start_date) {
        const { value: start_date, defaultFormat } = context.start_date;
        content = content
            .replaceAll(/{{\s*(start_date)\s*(([+-]\d+)([yqmwdhs]))?\s*(:(.*?))?}}/gi, (_, _variableName, calc, timeDelta, unit, _customFormat, format) => {
            const templateVar = start_date.clone();
            if (calc) {
                templateVar.add(parseInt(timeDelta, 10), unit);
            }
            if (format) {
                return templateVar.format(format);
            }
            return templateVar.format(defaultFormat);
        });
    }
    if (context.end_date) {
        const { value: end_date, defaultFormat } = context.end_date;
        content = content
            .replaceAll(/{{\s*(end_date)\s*(([+-]\d+)([yqmwdhs]))?\s*(:(.*?))?}}/gi, (_, _variableName, calc, timeDelta, unit, _customFormat, format) => {
            const templateVar = end_date.clone();
            if (calc) {
                templateVar.add(parseInt(timeDelta, 10), unit);
            }
            if (format) {
                return templateVar.format(format);
            }
            return templateVar.format(defaultFormat);
        });
    }
    if (context.index) {
        const { value: index } = context.index;
        content = content.replaceAll("{{index}}", index.toString());
    }
    if (context.journal_name) {
        const { value: name } = context.journal_name;
        content = content.replaceAll("{{journal_name}}", name);
    }
    if (context.note_name) {
        const { value: name } = context.note_name;
        content = content.replaceAll("{{note_name}}", name);
    }
    return content;
}
function canApplyTemplater(app, content) {
    if (!content.includes("<%") && !content.includes("%>"))
        return false;
    const templaterPlugin = app.plugins.getPlugin("templater-obsidian");
    if (!templaterPlugin)
        return false;
    // version support check
    if (!("templater" in templaterPlugin))
        return false;
    if (!("create_running_config" in templaterPlugin.templater))
        return false;
    if (!("parse_template" in templaterPlugin.templater))
        return false;
    return true;
}
function tryApplyingTemplater(app, templateFile, note, content) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!canApplyTemplater(app, content))
            return content;
        const templaterPlugin = app.plugins.getPlugin("templater-obsidian");
        if (!templaterPlugin)
            return "";
        try {
            const running_config = templaterPlugin.templater.create_running_config(templateFile, note, 0);
            return yield templaterPlugin.templater.parse_template(running_config, content);
        }
        catch (e) {
            console.error("Error applying templater", e);
        }
        return content;
    });
}

class CalendarJournalSection {
    constructor(app, journal, config, granularity, calendar) {
        this.app = app;
        this.journal = journal;
        this.config = config;
        this.granularity = granularity;
        this.calendar = calendar;
    }
    get folderPath() {
        const folderPath = this.journal.config.rootFolder ? [this.journal.config.rootFolder] : [];
        if (this.config.folder) {
            folderPath.push(this.config.folder);
        }
        return folderPath.join("/").replaceAll(/\/{2,}/g, "/");
    }
    get nameTemplate() {
        return this.config.nameTemplate || DEFAULT_NAME_TEMPLATE_CALENDAR;
    }
    get dateFormat() {
        return this.config.dateFormat || DEFAULT_DATE_FORMATS_CALENDAR[this.granularity];
    }
    get ribbonIcon() {
        return this.config.ribbon.icon || DEFAULT_RIBBON_ICONS_CALENDAR;
    }
    get ribbonTooltip() {
        return this.config.ribbon.tooltip || DEFAULT_RIBBON_TOOLTIPS[this.granularity];
    }
    getRangeStart(date) {
        return this.calendar.date(date).startOf(this.granularity);
    }
    getRangeEnd(date) {
        return this.calendar.date(date).endOf(this.granularity);
    }
    autoCreateNote() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.config.enabled)
                return;
            if (!this.config.createOnStartup)
                return;
            yield this.ensureDateNote(this.getRangeStart(), this.getRangeEnd());
        });
    }
    configureRibbonIcons(plugin) {
        if (!this.config.enabled)
            return;
        if (!this.config.ribbon.show)
            return;
        plugin.addRibbonIcon(this.ribbonIcon, this.ribbonTooltip, () => {
            this.open();
        });
    }
    open(date) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.openDate(this.getRangeStart(date), this.getRangeEnd(date));
        });
    }
    openPath(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = this.app.vault.getAbstractFileByPath(filePath);
            if (!file)
                return;
            if (!(file instanceof obsidian.TFile))
                return;
            yield this.openFile(file);
        });
    }
    openNext(date) {
        return __awaiter(this, void 0, void 0, function* () {
            const startDate = this.getRangeStart(date).add(1, this.granularity);
            const endDate = startDate.clone().endOf(this.granularity);
            return yield this.openDate(startDate, endDate);
        });
    }
    openPrev(date) {
        return __awaiter(this, void 0, void 0, function* () {
            const startDate = this.getRangeStart(date).subtract(1, this.granularity);
            const endDate = startDate.clone().endOf(this.granularity);
            return yield this.openDate(startDate, endDate);
        });
    }
    getDateFilename(startDate, endDate) {
        const templateContext = this.getTemplateContext(startDate, endDate);
        return replaceTemplateVariables(this.nameTemplate, templateContext) + ".md";
    }
    getDateFolder(startDate, endDate) {
        const templateContext = this.getTemplateContext(startDate, endDate);
        return replaceTemplateVariables(this.folderPath, templateContext);
    }
    connectNote(file, startDate, endDate, options) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const indexed = this.journal.index.get(startDate, this.granularity);
            if (indexed) {
                if (!options.override)
                    return false;
                yield this.journal.disconnectNote(indexed.path);
            }
            let path = file.path;
            if (options.rename || options.move) {
                const folderPath = options.move ? this.getDateFolder(startDate, endDate) : (_a = file.parent) === null || _a === void 0 ? void 0 : _a.path;
                const filename = options.rename ? this.getDateFilename(startDate, endDate) : file.name;
                path = obsidian.normalizePath(folderPath ? `${folderPath}/${filename}` : filename);
                yield ensureFolderExists(this.app, path);
                yield this.app.vault.rename(file, path);
                file = this.app.vault.getAbstractFileByPath(path);
            }
            this.journal.index.add(startDate, endDate, {
                path: path,
                granularity: this.granularity,
                startDate: startDate.format(FRONTMATTER_DATE_FORMAT),
                endDate: endDate.format(FRONTMATTER_DATE_FORMAT),
            });
            yield this.ensureFrontMatter(file, startDate, startDate);
            return true;
        });
    }
    ensureDateNote(startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const filePath = this.getDatePath(startDate, endDate);
            let file = this.app.vault.getAbstractFileByPath(filePath);
            if (!file) {
                yield ensureFolderExists(this.app, filePath);
                file = yield this.app.vault.create(filePath, "");
                if (!(file instanceof obsidian.TFile))
                    throw new Error("File is not a TFile");
                const content = yield this.getContent(file, this.getTemplateContext(startDate, endDate, this.getNoteName(startDate, endDate)));
                if (content)
                    yield this.app.vault.modify(file, content);
                yield this.processFrontMatter(file, startDate, endDate);
            }
            else {
                if (!(file instanceof obsidian.TFile))
                    throw new Error("File is not a TFile");
                yield this.ensureFrontMatter(file, startDate, endDate);
            }
            return file;
        });
    }
    openDate(startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = yield this.ensureDateNote(startDate, endDate);
            yield this.openFile(file);
        });
    }
    openFile(file) {
        return __awaiter(this, void 0, void 0, function* () {
            const mode = this.config.openMode === "active" ? undefined : this.config.openMode;
            const leaf = this.app.workspace.getLeaf(mode);
            yield leaf.openFile(file, { active: true });
        });
    }
    getTemplateContext(start_date, end_date, note_name) {
        return {
            date: {
                value: start_date,
                defaultFormat: this.dateFormat,
            },
            start_date: {
                value: start_date,
                defaultFormat: this.dateFormat,
            },
            end_date: {
                value: end_date,
                defaultFormat: this.dateFormat,
            },
            journal_name: {
                value: this.journal.name,
            },
            note_name: {
                value: note_name !== null && note_name !== void 0 ? note_name : "",
            },
        };
    }
    getNoteName(startDate, endDate) {
        const templateContext = this.getTemplateContext(startDate, endDate);
        return replaceTemplateVariables(this.nameTemplate, templateContext);
    }
    getDatePath(startDate, endDate) {
        const indexed = this.journal.index.get(startDate, this.granularity);
        if (indexed)
            return indexed.path;
        const templateContext = this.getTemplateContext(startDate, endDate);
        const filename = replaceTemplateVariables(this.nameTemplate, templateContext) + ".md";
        const folderPath = replaceTemplateVariables(this.folderPath, templateContext);
        return obsidian.normalizePath(folderPath ? `${folderPath}/${filename}` : filename);
    }
    getContent(note, context) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.config.template) {
                const path = replaceTemplateVariables(this.config.template.endsWith(".md") ? this.config.template : this.config.template + ".md", context);
                const templateFile = this.app.vault.getAbstractFileByPath(path);
                if (templateFile instanceof obsidian.TFile) {
                    const templateContent = yield this.app.vault.cachedRead(templateFile);
                    return tryApplyingTemplater(this.app, templateFile, note, replaceTemplateVariables(templateContent, context));
                }
            }
            return "";
        });
    }
    ensureFrontMatter(file, startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e;
            const metadata = this.app.metadataCache.getFileCache(file);
            if (!((_a = metadata === null || metadata === void 0 ? void 0 : metadata.frontmatter) === null || _a === void 0 ? void 0 : _a[FRONTMATTER_ID_KEY]) ||
                ((_b = metadata === null || metadata === void 0 ? void 0 : metadata.frontmatter) === null || _b === void 0 ? void 0 : _b[FRONTMATTER_ID_KEY]) ||
                ((_c = metadata === null || metadata === void 0 ? void 0 : metadata.frontmatter) === null || _c === void 0 ? void 0 : _c[FRONTMATTER_START_DATE_KEY]) ||
                ((_d = metadata === null || metadata === void 0 ? void 0 : metadata.frontmatter) === null || _d === void 0 ? void 0 : _d[FRONTMATTER_END_DATE_KEY]) ||
                ((_e = metadata === null || metadata === void 0 ? void 0 : metadata.frontmatter) === null || _e === void 0 ? void 0 : _e[FRONTMATTER_SECTION_KEY])) {
                yield this.processFrontMatter(file, startDate, endDate);
            }
        });
    }
    processFrontMatter(file, startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.app.fileManager.processFrontMatter(file, (frontmatter) => {
                frontmatter[FRONTMATTER_ID_KEY] = this.journal.id;
                frontmatter[FRONTMATTER_START_DATE_KEY] = startDate.format(FRONTMATTER_DATE_FORMAT);
                frontmatter[FRONTMATTER_END_DATE_KEY] = endDate.format(FRONTMATTER_DATE_FORMAT);
                frontmatter[FRONTMATTER_SECTION_KEY] = this.granularity;
            });
            this.journal.index.add(startDate, endDate, {
                path: file.path,
                granularity: this.granularity,
                startDate: startDate.format(FRONTMATTER_DATE_FORMAT),
                endDate: endDate.format(FRONTMATTER_DATE_FORMAT),
            });
        });
    }
}

/**
 * Created by Alex Bol on 4/1/2017.
 */

/**
 * Interval is a pair of numbers or a pair of any comparable objects on which may be defined predicates
 * *equal*, *less* and method *max(p1, p1)* that returns maximum in a pair.
 * When interval is an object rather than a pair of numbers, this object should have properties *low*, *high*, *max*
 * and implement methods *less_than(), equal_to(), intersect(), not_intersect(), clone(), output()*.
 * Two static methods *comparable_max(), comparable_less_than()* define how to compare values in pair. <br/>
 * This interface is described in typescript definition file *index.d.ts*
 *
 * Axis aligned rectangle is an example of such interval.
 * We may look at rectangle as an interval between its low left and top right corners.
 * See **Box** class in [flatten-js](https://github.com/alexbol99/flatten-js) library as the example
 * of Interval interface implementation
 * @type {Interval}
 */
const Interval = class Interval {
    /**
     * Accept two comparable values and creates new instance of interval
     * Predicate Interval.comparable_less(low, high) supposed to return true on these values
     * @param low
     * @param high
     */
    constructor(low, high) {
        this.low = low;
        this.high = high;
    }

    /**
     * Clone interval
     * @returns {Interval}
     */
    clone() {
        return new Interval(this.low, this.high);
    }

    /**
     * Propery max returns clone of this interval
     * @returns {Interval}
     */
    get max() {
        return this.clone();   // this.high;
    }

    /**
     * Predicate returns true is this interval less than other interval
     * @param other_interval
     * @returns {boolean}
     */
    less_than(other_interval) {
        return this.low < other_interval.low ||
            this.low === other_interval.low && this.high < other_interval.high;
    }

    /**
     * Predicate returns true is this interval equals to other interval
     * @param other_interval
     * @returns {boolean}
     */
    equal_to(other_interval) {
        return this.low === other_interval.low && this.high === other_interval.high;
    }

    /**
     * Predicate returns true if this interval intersects other interval
     * @param other_interval
     * @returns {boolean}
     */
    intersect(other_interval) {
        return !this.not_intersect(other_interval);
    }

    /**
     * Predicate returns true if this interval does not intersect other interval
     * @param other_interval
     * @returns {boolean}
     */
    not_intersect(other_interval) {
        return (this.high < other_interval.low || other_interval.high < this.low);
    }

    /**
     * Returns new interval merged with other interval
     * @param {Interval} other_interval - Other interval to merge with
     * @returns {Interval}
     */
    merge(other_interval) {
        return new Interval(
            this.low === undefined ?
                other_interval.low : (this.low < other_interval.low ? this.low : other_interval.low),
            this.high === undefined ?
                other_interval.high : (this.high > other_interval.high ? this.high : other_interval.high)
        );
    }

    /**
     * Returns how key should return
     */
    output() {
        return [this.low, this.high];
    }

    /**
     * Function returns maximum between two comparable values
     * @param interval1
     * @param interval2
     * @returns {Interval}
     */
    static comparable_max(interval1, interval2) {
        return interval1.merge(interval2);
    }

    /**
     * Predicate returns true if first value less than second value
     * @param val1
     * @param val2
     * @returns {boolean}
     */
    static comparable_less_than(val1, val2 ) {
        return val1 < val2;
    }
};

/**
 * Created by Alex Bol on 3/28/2017.
 */


// module.exports = {
//     RB_TREE_COLOR_RED: 0,
//     RB_TREE_COLOR_BLACK: 1
// };

const RB_TREE_COLOR_RED = 0;
const RB_TREE_COLOR_BLACK = 1;

/**
 * Created by Alex Bol on 4/1/2017.
 */


class Node {
    constructor(key = undefined, value = undefined,
                left = null, right = null, parent = null, color = RB_TREE_COLOR_BLACK) {
        this.left = left;                     // reference to left child node
        this.right = right;                   // reference to right child node
        this.parent = parent;                 // reference to parent node
        this.color = color;

        this.item = {key: key, value: value};   // key is supposed to be instance of Interval

        /* If not, this should by an array of two numbers */
        if (key && key instanceof Array && key.length === 2) {
            if (!Number.isNaN(key[0]) && !Number.isNaN(key[1])) {
                let [low, high] = key;
                if (low > high) [low, high] = [high, low];
                this.item.key = new Interval(low, high);
            }
        }

        this.max = this.item.key ? this.item.key.max : undefined;
    }

    isNil() {
        return (this.item.key === undefined && this.item.value === undefined &&
            this.left === null && this.right === null && this.color === RB_TREE_COLOR_BLACK);
    }

    _value_less_than(other_node) {
        return this.item.value && other_node.item.value && this.item.value.less_than ?
            this.item.value.less_than(other_node.item.value) :
            this.item.value < other_node.item.value;
    }

    less_than(other_node) {
        // if tree stores only keys
        if (this.item.value === this.item.key && other_node.item.value === other_node.item.key) {
            return this.item.key.less_than(other_node.item.key);
        }
        else {    // if tree stores keys and values
            return this.item.key.less_than(other_node.item.key) ||
                this.item.key.equal_to((other_node.item.key)) && this._value_less_than(other_node)
        }
    }

    _value_equal(other_node) {
        return this.item.value && other_node.item.value && this.item.value.equal_to ?
            this.item.value.equal_to(other_node.item.value) :
            this.item.value === other_node.item.value;
    }
    equal_to(other_node) {
        // if tree stores only keys
        if (this.item.value === this.item.key && other_node.item.value === other_node.item.key) {
            return this.item.key.equal_to(other_node.item.key);
        }
        else {    // if tree stores keys and values
            return this.item.key.equal_to(other_node.item.key) && this._value_equal(other_node);
        }
    }

    intersect(other_node) {
        return this.item.key.intersect(other_node.item.key);
    }

    copy_data(other_node) {
        this.item.key = other_node.item.key;
        this.item.value = other_node.item.value;
    }

    update_max() {
        // use key (Interval) max property instead of key.high
        this.max = this.item.key ? this.item.key.max : undefined;
        if (this.right && this.right.max) {
            const comparable_max = this.item.key.constructor.comparable_max;  // static method
            this.max = comparable_max(this.max, this.right.max);
        }
        if (this.left && this.left.max) {
            const comparable_max = this.item.key.constructor.comparable_max;  // static method
            this.max = comparable_max(this.max, this.left.max);
        }
    }

    // Other_node does not intersect any node of left subtree, if this.left.max < other_node.item.key.low
    not_intersect_left_subtree(search_node) {
        const comparable_less_than = this.item.key.constructor.comparable_less_than;  // static method
        let high = this.left.max.high !== undefined ? this.left.max.high : this.left.max;
        return comparable_less_than(high, search_node.item.key.low);
    }

    // Other_node does not intersect right subtree if other_node.item.key.high < this.right.key.low
    not_intersect_right_subtree(search_node) {
        const comparable_less_than = this.item.key.constructor.comparable_less_than;  // static method
        let low = this.right.max.low !== undefined ? this.right.max.low : this.right.item.key.low;
        return comparable_less_than(search_node.item.key.high, low);
    }
}

/**
 * Created by Alex Bol on 3/31/2017.
 */

// const nil_node = new Node();

/**
 * Implementation of interval binary search tree <br/>
 * Interval tree stores items which are couples of {key:interval, value: value} <br/>
 * Interval is an object with high and low properties or simply pair [low,high] of numeric values <br />
 * @type {IntervalTree}
 */
class IntervalTree {
    /**
     * Construct new empty instance of IntervalTree
     */
    constructor() {
        this.root = null;
        this.nil_node = new Node();
    }

    /**
     * Returns number of items stored in the interval tree
     * @returns {number}
     */
    get size() {
        let count = 0;
        this.tree_walk(this.root, () => count++);
        return count;
    }

    /**
     * Returns array of sorted keys in the ascending order
     * @returns {Array}
     */
    get keys() {
        let res = [];
        this.tree_walk(this.root, (node) => res.push(
            node.item.key.output ? node.item.key.output() : node.item.key
        ));
        return res;
    }

    /**
     * Return array of values in the ascending keys order
     * @returns {Array}
     */
    get values() {
        let res = [];
        this.tree_walk(this.root, (node) => res.push(node.item.value));
        return res;
    }

    /**
     * Returns array of items (<key,value> pairs) in the ascended keys order
     * @returns {Array}
     */
    get items() {
        let res = [];
        this.tree_walk(this.root, (node) => res.push({
            key: node.item.key.output ? node.item.key.output() : node.item.key,
            value: node.item.value
        }));
        return res;
    }

    /**
     * Returns true if tree is empty
     * @returns {boolean}
     */
    isEmpty() {
        return (this.root == null || this.root === this.nil_node);
    }

    /**
     * Clear tree
     */
    clear() {
        this.root = null;
    }

    /**
     * Insert new item into interval tree
     * @param {Interval} key - interval object or array of two numbers [low, high]
     * @param {any} value - value representing any object (optional)
     * @returns {Node} returns reference to inserted node as an object {key:interval, value: value}
     */
    insert(key, value = key) {
        if (key === undefined) return;
        let insert_node = new Node(key, value, this.nil_node, this.nil_node, null, RB_TREE_COLOR_RED);
        this.tree_insert(insert_node);
        this.recalc_max(insert_node);
        return insert_node;
    }

    /**
     * Returns true if item {key,value} exist in the tree
     * @param {Interval} key - interval correspondent to keys stored in the tree
     * @param {any} value - value object to be checked
     * @returns {boolean} true if item {key, value} exist in the tree, false otherwise
     */
    exist(key, value = key) {
        let search_node = new Node(key, value);
        return !!this.tree_search(this.root, search_node);
    }

    /**
     * Remove entry {key, value} from the tree
     * @param {Interval} key - interval correspondent to keys stored in the tree
     * @param {any} value - value object
     * @returns {boolean} true if item {key, value} deleted, false if not found
     */
    remove(key, value = key) {
        let search_node = new Node(key, value);
        let delete_node = this.tree_search(this.root, search_node);
        if (delete_node) {
            this.tree_delete(delete_node);
        }
        return delete_node;
    }

    /**
     * Returns array of entry values which keys intersect with given interval <br/>
     * If no values stored in the tree, returns array of keys which intersect given interval
     * @param {Interval} interval - search interval, or tuple [low, high]
     * @param outputMapperFn(value,key) - optional function that maps (value, key) to custom output
     * @returns {Array}
     */
    search(interval, outputMapperFn = (value, key) => value === key ? key.output() : value) {
        let search_node = new Node(interval);
        let resp_nodes = [];
        this.tree_search_interval(this.root, search_node, resp_nodes);
        return resp_nodes.map(node => outputMapperFn(node.item.value, node.item.key))
    }

    /**
     * Returns true if intersection between given and any interval stored in the tree found
     * @param {Interval} interval - search interval or tuple [low, high]
     * @returns {boolean}
     */
    intersect_any(interval) {
        let search_node = new Node(interval);
        return this.tree_find_any_interval(this.root, search_node);
    }

    /**
     * Tree visitor. For each node implement a callback function. <br/>
     * Method calls a callback function with two parameters (key, value)
     * @param visitor(key,value) - function to be called for each tree item
     */
    forEach(visitor) {
        this.tree_walk(this.root, (node) => visitor(node.item.key, node.item.value));
    }

    /**
     * Value Mapper. Walk through every node and map node value to another value
     * @param callback(value,key) - function to be called for each tree item
     */
    map(callback) {
        const tree = new IntervalTree();
        this.tree_walk(this.root, (node) => tree.insert(node.item.key, callback(node.item.value, node.item.key)));
        return tree;
    }

    /**
     * @param {Interval} interval - optional if the iterator is intended to start from the beginning
     * @param outputMapperFn(value,key) - optional function that maps (value, key) to custom output
     * @returns {Iterator}
     */
    *iterate(interval, outputMapperFn = (value, key) => value === key ? key.output() : value) {
        let node;
        if (interval) {
            node = this.tree_search_nearest_forward(this.root, new Node(interval));
        } else if (this.root) {
            node = this.local_minimum(this.root);
        }
        while (node) {
            yield outputMapperFn(node.item.value, node.item.key);
            node = this.tree_successor(node);
        }
    }

    recalc_max(node) {
        let node_current = node;
        while (node_current.parent != null) {
            node_current.parent.update_max();
            node_current = node_current.parent;
        }
    }

    tree_insert(insert_node) {
        let current_node = this.root;
        let parent_node = null;

        if (this.root == null || this.root === this.nil_node) {
            this.root = insert_node;
        }
        else {
            while (current_node !== this.nil_node) {
                parent_node = current_node;
                if (insert_node.less_than(current_node)) {
                    current_node = current_node.left;
                }
                else {
                    current_node = current_node.right;
                }
            }

            insert_node.parent = parent_node;

            if (insert_node.less_than(parent_node)) {
                parent_node.left = insert_node;
            }
            else {
                parent_node.right = insert_node;
            }
        }

        this.insert_fixup(insert_node);
    }

// After insertion insert_node may have red-colored parent, and this is a single possible violation
// Go upwords to the root and re-color until violation will be resolved
    insert_fixup(insert_node) {
        let current_node;
        let uncle_node;

        current_node = insert_node;
        while (current_node !== this.root && current_node.parent.color === RB_TREE_COLOR_RED) {
            if (current_node.parent === current_node.parent.parent.left) {   // parent is left child of grandfather
                uncle_node = current_node.parent.parent.right;              // right brother of parent
                if (uncle_node.color === RB_TREE_COLOR_RED) {             // Case 1. Uncle is red
                    // re-color father and uncle into black
                    current_node.parent.color = RB_TREE_COLOR_BLACK;
                    uncle_node.color = RB_TREE_COLOR_BLACK;
                    current_node.parent.parent.color = RB_TREE_COLOR_RED;
                    current_node = current_node.parent.parent;
                }
                else {                                                    // Case 2 & 3. Uncle is black
                    if (current_node === current_node.parent.right) {     // Case 2. Current if right child
                        // This case is transformed into Case 3.
                        current_node = current_node.parent;
                        this.rotate_left(current_node);
                    }
                    current_node.parent.color = RB_TREE_COLOR_BLACK;    // Case 3. Current is left child.
                    // Re-color father and grandfather, rotate grandfather right
                    current_node.parent.parent.color = RB_TREE_COLOR_RED;
                    this.rotate_right(current_node.parent.parent);
                }
            }
            else {                                                         // parent is right child of grandfather
                uncle_node = current_node.parent.parent.left;              // left brother of parent
                if (uncle_node.color === RB_TREE_COLOR_RED) {             // Case 4. Uncle is red
                    // re-color father and uncle into black
                    current_node.parent.color = RB_TREE_COLOR_BLACK;
                    uncle_node.color = RB_TREE_COLOR_BLACK;
                    current_node.parent.parent.color = RB_TREE_COLOR_RED;
                    current_node = current_node.parent.parent;
                }
                else {
                    if (current_node === current_node.parent.left) {             // Case 5. Current is left child
                        // Transform into case 6
                        current_node = current_node.parent;
                        this.rotate_right(current_node);
                    }
                    current_node.parent.color = RB_TREE_COLOR_BLACK;    // Case 6. Current is right child.
                    // Re-color father and grandfather, rotate grandfather left
                    current_node.parent.parent.color = RB_TREE_COLOR_RED;
                    this.rotate_left(current_node.parent.parent);
                }
            }
        }

        this.root.color = RB_TREE_COLOR_BLACK;
    }

    tree_delete(delete_node) {
        let cut_node;   // node to be cut - either delete_node or successor_node  ("y" from 14.4)
        let fix_node;   // node to fix rb tree property   ("x" from 14.4)

        if (delete_node.left === this.nil_node || delete_node.right === this.nil_node) {  // delete_node has less then 2 children
            cut_node = delete_node;
        }
        else {                                                    // delete_node has 2 children
            cut_node = this.tree_successor(delete_node);
        }

        // fix_node if single child of cut_node
        if (cut_node.left !== this.nil_node) {
            fix_node = cut_node.left;
        }
        else {
            fix_node = cut_node.right;
        }

        // remove cut_node from parent
        /*if (fix_node != this.nil_node) {*/
            fix_node.parent = cut_node.parent;
        /*}*/

        if (cut_node === this.root) {
            this.root = fix_node;
        }
        else {
            if (cut_node === cut_node.parent.left) {
                cut_node.parent.left = fix_node;
            }
            else {
                cut_node.parent.right = fix_node;
            }
            cut_node.parent.update_max();        // update max property of the parent
        }

        this.recalc_max(fix_node);              // update max property upward from fix_node to root

        // COPY DATA !!!
        // Delete_node becomes cut_node, it means that we cannot hold reference
        // to node in outer structure and we will have to delete by key, additional search need
        if (cut_node !== delete_node) {
            delete_node.copy_data(cut_node);
            delete_node.update_max();           // update max property of the cut node at the new place
            this.recalc_max(delete_node);       // update max property upward from delete_node to root
        }

        if (/*fix_node != this.nil_node && */cut_node.color === RB_TREE_COLOR_BLACK) {
            this.delete_fixup(fix_node);
        }
    }

    delete_fixup(fix_node) {
        let current_node = fix_node;
        let brother_node;

        while (current_node !== this.root && current_node.parent != null && current_node.color === RB_TREE_COLOR_BLACK) {
            if (current_node === current_node.parent.left) {          // fix node is left child
                brother_node = current_node.parent.right;
                if (brother_node.color === RB_TREE_COLOR_RED) {   // Case 1. Brother is red
                    brother_node.color = RB_TREE_COLOR_BLACK;         // re-color brother
                    current_node.parent.color = RB_TREE_COLOR_RED;    // re-color father
                    this.rotate_left(current_node.parent);
                    brother_node = current_node.parent.right;                      // update brother
                }
                // Derive to cases 2..4: brother is black
                if (brother_node.left.color === RB_TREE_COLOR_BLACK &&
                    brother_node.right.color === RB_TREE_COLOR_BLACK) {  // case 2: both nephews black
                    brother_node.color = RB_TREE_COLOR_RED;              // re-color brother
                    current_node = current_node.parent;                  // continue iteration
                }
                else {
                    if (brother_node.right.color === RB_TREE_COLOR_BLACK) {   // case 3: left nephew red, right nephew black
                        brother_node.color = RB_TREE_COLOR_RED;          // re-color brother
                        brother_node.left.color = RB_TREE_COLOR_BLACK;   // re-color nephew
                        this.rotate_right(brother_node);
                        brother_node = current_node.parent.right;                     // update brother
                        // Derive to case 4: left nephew black, right nephew red
                    }
                    // case 4: left nephew black, right nephew red
                    brother_node.color = current_node.parent.color;
                    current_node.parent.color = RB_TREE_COLOR_BLACK;
                    brother_node.right.color = RB_TREE_COLOR_BLACK;
                    this.rotate_left(current_node.parent);
                    current_node = this.root;                         // exit from loop
                }
            }
            else {                                             // fix node is right child
                brother_node = current_node.parent.left;
                if (brother_node.color === RB_TREE_COLOR_RED) {   // Case 1. Brother is red
                    brother_node.color = RB_TREE_COLOR_BLACK;         // re-color brother
                    current_node.parent.color = RB_TREE_COLOR_RED;    // re-color father
                    this.rotate_right(current_node.parent);
                    brother_node = current_node.parent.left;                        // update brother
                }
                // Go to cases 2..4
                if (brother_node.left.color === RB_TREE_COLOR_BLACK &&
                    brother_node.right.color === RB_TREE_COLOR_BLACK) {   // case 2
                    brother_node.color = RB_TREE_COLOR_RED;             // re-color brother
                    current_node = current_node.parent;                              // continue iteration
                }
                else {
                    if (brother_node.left.color === RB_TREE_COLOR_BLACK) {  // case 3: right nephew red, left nephew black
                        brother_node.color = RB_TREE_COLOR_RED;            // re-color brother
                        brother_node.right.color = RB_TREE_COLOR_BLACK;    // re-color nephew
                        this.rotate_left(brother_node);
                        brother_node = current_node.parent.left;                        // update brother
                        // Derive to case 4: right nephew black, left nephew red
                    }
                    // case 4: right nephew black, left nephew red
                    brother_node.color = current_node.parent.color;
                    current_node.parent.color = RB_TREE_COLOR_BLACK;
                    brother_node.left.color = RB_TREE_COLOR_BLACK;
                    this.rotate_right(current_node.parent);
                    current_node = this.root;                               // force exit from loop
                }
            }
        }

        current_node.color = RB_TREE_COLOR_BLACK;
    }

    tree_search(node, search_node) {
        if (node == null || node === this.nil_node)
            return undefined;

        if (search_node.equal_to(node)) {
            return node;
        }
        if (search_node.less_than(node)) {
            return this.tree_search(node.left, search_node);
        }
        else {
            return this.tree_search(node.right, search_node);
        }
    }

    tree_search_nearest_forward(node, search_node) {
        let best;
        let curr = node;
        while (curr && curr !== this.nil_node) {
            if (curr.less_than(search_node)) {
                if (curr.intersect(search_node)) {
                    best = curr;
                    curr = curr.left;
                } else {
                    curr = curr.right;
                }
            } else {
                if (!best || curr.less_than(best)) best = curr;
                curr = curr.left;
            }
        }
        return best || null;
    }

    // Original search_interval method; container res support push() insertion
    // Search all intervals intersecting given one
    tree_search_interval(node, search_node, res) {
        if (node != null && node !== this.nil_node) {
            // if (node->left != this.nil_node && node->left->max >= low) {
            if (node.left !== this.nil_node && !node.not_intersect_left_subtree(search_node)) {
                this.tree_search_interval(node.left, search_node, res);
            }
            // if (low <= node->high && node->low <= high) {
            if (node.intersect(search_node)) {
                res.push(node);
            }
            // if (node->right != this.nil_node && node->low <= high) {
            if (node.right !== this.nil_node && !node.not_intersect_right_subtree(search_node)) {
                this.tree_search_interval(node.right, search_node, res);
            }
        }
    }

    tree_find_any_interval(node, search_node) {
        let found = false;
        if (node != null && node !== this.nil_node) {
            if (node.left !== this.nil_node && !node.not_intersect_left_subtree(search_node)) {
                found = this.tree_find_any_interval(node.left, search_node);
            }
            if (!found) {
                found = node.intersect(search_node);
            }
            if (!found && node.right !== this.nil_node && !node.not_intersect_right_subtree(search_node)) {
                found = this.tree_find_any_interval(node.right, search_node);
            }
        }
        return found;
    }

    local_minimum(node) {
        let node_min = node;
        while (node_min.left != null && node_min.left !== this.nil_node) {
            node_min = node_min.left;
        }
        return node_min;
    }

    // not in use
    local_maximum(node) {
        let node_max = node;
        while (node_max.right != null && node_max.right !== this.nil_node) {
            node_max = node_max.right;
        }
        return node_max;
    }

    tree_successor(node) {
        let node_successor;
        let current_node;
        let parent_node;

        if (node.right !== this.nil_node) {
            node_successor = this.local_minimum(node.right);
        }
        else {
            current_node = node;
            parent_node = node.parent;
            while (parent_node != null && parent_node.right === current_node) {
                current_node = parent_node;
                parent_node = parent_node.parent;
            }
            node_successor = parent_node;
        }
        return node_successor;
    }

    //           |            right-rotate(T,y)       |
    //           y            ---------------.       x
    //          / \                                  / \
    //         x   c          left-rotate(T,x)      a   y
    //        / \             <---------------         / \
    //       a   b                                    b   c

    rotate_left(x) {
        let y = x.right;

        x.right = y.left;           // b goes to x.right

        if (y.left !== this.nil_node) {
            y.left.parent = x;     // x becomes parent of b
        }
        y.parent = x.parent;       // move parent

        if (x === this.root) {
            this.root = y;           // y becomes root
        }
        else {                        // y becomes child of x.parent
            if (x === x.parent.left) {
                x.parent.left = y;
            }
            else {
                x.parent.right = y;
            }
        }
        y.left = x;                 // x becomes left child of y
        x.parent = y;               // and y becomes parent of x

        if (x != null && x !== this.nil_node) {
            x.update_max();
        }

        y = x.parent;
        if (y != null && y !== this.nil_node) {
            y.update_max();
        }
    }

    rotate_right(y) {
        let x = y.left;

        y.left = x.right;           // b goes to y.left

        if (x.right !== this.nil_node) {
            x.right.parent = y;        // y becomes parent of b
        }
        x.parent = y.parent;          // move parent

        if (y === this.root) {        // x becomes root
            this.root = x;
        }
        else {                        // y becomes child of x.parent
            if (y === y.parent.left) {
                y.parent.left = x;
            }
            else {
                y.parent.right = x;
            }
        }
        x.right = y;                 // y becomes right child of x
        y.parent = x;               // and x becomes parent of y

        if (y !== null && y !== this.nil_node) {
            y.update_max();
        }

        x = y.parent;
        if (x != null && x !== this.nil_node) {
            x.update_max();
        }
    }

    tree_walk(node, action) {
        if (node != null && node !== this.nil_node) {
            this.tree_walk(node.left, action);
            // arr.push(node.toArray());
            action(node);
            this.tree_walk(node.right, action);
        }
    }

    /* Return true if all red nodes have exactly two black child nodes */
    testRedBlackProperty() {
        let res = true;
        this.tree_walk(this.root, function (node) {
            if (node.color === RB_TREE_COLOR_RED) {
                if (!(node.left.color === RB_TREE_COLOR_BLACK && node.right.color === RB_TREE_COLOR_BLACK)) {
                    res = false;
                }
            }
        });
        return res;
    }

    /* Throw error if not every path from root to bottom has same black height */
    testBlackHeightProperty(node) {
        let height = 0;
        let heightLeft = 0;
        let heightRight = 0;
        if (node.color === RB_TREE_COLOR_BLACK) {
            height++;
        }
        if (node.left !== this.nil_node) {
            heightLeft = this.testBlackHeightProperty(node.left);
        }
        else {
            heightLeft = 1;
        }
        if (node.right !== this.nil_node) {
            heightRight = this.testBlackHeightProperty(node.right);
        }
        else {
            heightRight = 1;
        }
        if (heightLeft !== heightRight) {
            throw new Error('Red-black height property violated');
        }
        height += heightLeft;
        return height;
    }
}

class CalendarIndex {
    constructor() {
        this.intervalTree = new IntervalTree();
    }
    find(startDate, endDate) {
        return this.intervalTree.search([startDate.toDate().getTime(), endDate.toDate().getTime()]);
    }
    get(date, granularity) {
        const list = this.intervalTree.search([date.toDate().getTime(), date.toDate().getTime()]);
        return list.find((entry) => entry.granularity === granularity);
    }
    add(startDate, endDate, value) {
        const interval = [startDate.toDate().getTime(), endDate.toDate().getTime()];
        this.intervalTree.insert(interval, value);
    }
    findNextNote(endDate, granularity) {
        var _a;
        const list = this.intervalTree.search([endDate.toDate().getTime(), Infinity]);
        const [note] = list.filter((entry) => entry.granularity === granularity);
        return (_a = note === null || note === void 0 ? void 0 : note.path) !== null && _a !== void 0 ? _a : null;
    }
    findPreviousNote(startDate, granularity) {
        var _a;
        const list = this.intervalTree.search([0, startDate.toDate().getTime()]);
        const note = list.filter((entry) => entry.granularity === granularity).pop();
        return (_a = note === null || note === void 0 ? void 0 : note.path) !== null && _a !== void 0 ? _a : null;
    }
    clearForPath(path) {
        if (!this.intervalTree.size)
            return;
        const toDelete = [];
        for (const [key, entry] of this.intervalTree.iterate(undefined, (value, key) => [key, value])) {
            if ((entry === null || entry === void 0 ? void 0 : entry.path) === path) {
                toDelete.push([key, entry]);
            }
        }
        for (const [key, entry] of toDelete) {
            this.intervalTree.remove(key, entry);
        }
    }
    *[Symbol.iterator]() {
        for (const entry of this.intervalTree.iterate()) {
            yield entry;
        }
    }
}

const calendarCommands = {
    "calendar:open-day": "Open today's note",
    "calendar:open-week": "Open weekly note",
    "calendar:open-month": "Open monthly note",
    "calendar:open-quarter": "Open quarterly note",
    "calendar:open-year": "Open yearly note",
    "calendar:open-next-day": "Open tomorrow's note",
    "calendar:open-next-week": "Open next week note",
    "calendar:open-next-month": "Open next month note",
    "calendar:open-next-quarter": "Open next quarter note",
    "calendar:open-next-year": "Open next year note",
    "calendar:open-prev-day": "Open yesterday's note",
    "calendar:open-prev-week": "Open last week note",
    "calendar:open-prev-month": "Open last month note",
    "calendar:open-prev-quarter": "Open last quarter note",
    "calendar:open-prev-year": "Open last year note",
};
class CalendarJournal {
    constructor(app, config, calendar) {
        this.app = app;
        this.config = config;
        this.calendar = calendar;
        this.index = new CalendarIndex();
        this.type = "calendar";
        this.day = new CalendarJournalSection(app, this, this.config.day, "day", this.calendar);
        this.week = new CalendarJournalSection(app, this, this.config.week, "week", this.calendar);
        this.month = new CalendarJournalSection(app, this, this.config.month, "month", this.calendar);
        this.quarter = new CalendarJournalSection(app, this, this.config.quarter, "quarter", this.calendar);
        this.year = new CalendarJournalSection(app, this, this.config.year, "year", this.calendar);
    }
    get id() {
        return this.config.id;
    }
    get name() {
        return this.config.name;
    }
    get today() {
        return this.calendar.today();
    }
    date(date, format) {
        return this.calendar.date(date, format);
    }
    supportsCommand(id) {
        switch (id) {
            case "calendar:open-day":
            case "calendar:open-next-day":
            case "calendar:open-prev-day":
                return this.config.day.enabled;
            case "calendar:open-week":
            case "calendar:open-next-week":
            case "calendar:open-prev-week":
                return this.config.week.enabled;
            case "calendar:open-month":
            case "calendar:open-next-month":
            case "calendar:open-prev-month":
                return this.config.month.enabled;
            case "calendar:open-quarter":
            case "calendar:open-next-quarter":
            case "calendar:open-prev-quarter":
                return this.config.quarter.enabled;
            case "calendar:open-year":
            case "calendar:open-next-year":
            case "calendar:open-prev-year":
                return this.config.year.enabled;
        }
        return false;
    }
    execCommand(id) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (id) {
                case "calendar:open-prev-day":
                    return this.day.openPrev();
                case "calendar:open-day":
                    return this.day.open();
                case "calendar:open-next-day":
                    return this.day.openNext();
                case "calendar:open-prev-week":
                    return this.week.openPrev();
                case "calendar:open-week":
                    return this.week.open();
                case "calendar:open-next-week":
                    return this.week.openNext();
                case "calendar:open-prev-month":
                    return this.month.openPrev();
                case "calendar:open-month":
                    return this.month.open();
                case "calendar:open-next-month":
                    return this.month.openNext();
                case "calendar:open-prev-quarter":
                    return this.quarter.openPrev();
                case "calendar:open-quarter":
                    return this.quarter.open();
                case "calendar:open-next-quarter":
                    return this.quarter.openNext();
                case "calendar:open-prev-year":
                    return this.year.openPrev();
                case "calendar:open-year":
                    return this.year.open();
                case "calendar:open-next-year":
                    return this.year.openNext();
            }
        });
    }
    configureRibbonIcons(plugin) {
        this.day.configureRibbonIcons(plugin);
        this.week.configureRibbonIcons(plugin);
        this.month.configureRibbonIcons(plugin);
        this.quarter.configureRibbonIcons(plugin);
        this.year.configureRibbonIcons(plugin);
    }
    autoCreateNotes() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.day.autoCreateNote();
            yield this.week.autoCreateNote();
            yield this.month.autoCreateNote();
            yield this.quarter.autoCreateNote();
            yield this.year.autoCreateNote();
        });
    }
    findNextNote(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.index.findNextNote(this.calendar.date(data.end_date).add(1, "day").startOf("day"), data.granularity);
        });
    }
    findPreviousNote(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.index.findPreviousNote(this.calendar.date(data.start_date).subtract(1, "day").endOf("day"), data.granularity);
        });
    }
    openStartupNote() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.config.openOnStartup || !this.config.startupSection)
                return;
            const section = this.config.startupSection;
            yield this[section].open();
        });
    }
    openPath(path, frontmatter) {
        return __awaiter(this, void 0, void 0, function* () {
            const section = frontmatter.granularity;
            yield this[section].openPath(path);
        });
    }
    parseFrontMatter(frontmatter) {
        const start_date = frontmatter[FRONTMATTER_START_DATE_KEY];
        const end_date = frontmatter[FRONTMATTER_END_DATE_KEY];
        if (!obsidian.moment(start_date).isValid() || !obsidian.moment(end_date).isValid()) {
            return null;
        }
        return {
            type: "calendar",
            id: this.id,
            start_date,
            end_date,
            granularity: frontmatter[FRONTMATTER_SECTION_KEY],
        };
    }
    indexNote(frontmatter, path) {
        const startDate = this.calendar.date(frontmatter.start_date, FRONTMATTER_DATE_FORMAT);
        const endDate = this.calendar.date(frontmatter.end_date, FRONTMATTER_DATE_FORMAT).endOf("day");
        this.index.add(startDate, endDate, {
            path,
            granularity: frontmatter.granularity,
            startDate: frontmatter.start_date,
            endDate: frontmatter.end_date,
        });
    }
    clearForPath(path) {
        this.index.clearForPath(path);
    }
    disconnectNote(path) {
        return __awaiter(this, void 0, void 0, function* () {
            this.clearForPath(path);
            const file = this.app.vault.getAbstractFileByPath(path);
            if (!file)
                return;
            if (!(file instanceof obsidian.TFile))
                return;
            yield this.app.fileManager.processFrontMatter(file, (frontmatter) => {
                delete frontmatter[FRONTMATTER_ID_KEY];
                delete frontmatter[FRONTMATTER_START_DATE_KEY];
                delete frontmatter[FRONTMATTER_END_DATE_KEY];
                delete frontmatter[FRONTMATTER_SECTION_KEY];
                // TODO remove when issue is fixed
                if (!Object.keys(frontmatter).length) {
                    frontmatter[" "] = "";
                }
            });
        });
    }
    clearNotes() {
        return __awaiter(this, void 0, void 0, function* () {
            const promises = [];
            for (const entry of this.index) {
                promises.push(this.disconnectNote(entry.path));
            }
            yield Promise.allSettled(promises);
        });
    }
    deleteNotes() {
        return __awaiter(this, void 0, void 0, function* () {
            const promises = [];
            for (const entry of this.index) {
                const file = this.app.vault.getAbstractFileByPath(entry.path);
                if (!file)
                    continue;
                promises.push(this.app.vault.delete(file));
            }
            yield Promise.allSettled(promises);
        });
    }
}

class CodeBlockMonth extends obsidian.MarkdownRenderChild {
    constructor(containerEl, journal, date, ctx, addLinks = true) {
        super(containerEl);
        this.journal = journal;
        this.date = date;
        this.ctx = ctx;
        this.addLinks = addLinks;
        this.showPrevMonthDays = true;
    }
    display() {
        this.containerEl.empty();
        this.containerEl.classList.add("journal-month-timeline");
        const today = this.journal.today;
        const start = this.journal.month.getRangeStart(this.date);
        const end = this.journal.month.getRangeEnd(this.date);
        const startWithWeek = start.clone().startOf("week");
        const endWithWeek = end.clone().endOf("week");
        const name = this.containerEl.createEl("h6", {
            cls: "journal-name",
            text: start.format("MMMM YYYY"),
        });
        if (this.addLinks && this.journal.config.month.enabled) {
            name.classList.add("journal-clickable");
            name.on("click", ".journal-name", () => {
                this.journal.month.open(this.date);
            });
        }
        const view = this.containerEl.createDiv({
            cls: "journal-month-view journal-month-with-week",
        });
        if (this.addLinks && this.journal.config.day.enabled) {
            view.on("click", ".journal-day", (e) => {
                var _a, _b;
                const date = (_b = (_a = e.target.closest("[data-date]")) === null || _a === void 0 ? void 0 : _a.dataset) === null || _b === void 0 ? void 0 : _b.date;
                if (date) {
                    this.journal.day.open(date);
                }
            });
        }
        const week = start.clone().startOf("week");
        const weekEnd = week.clone().endOf("week");
        view.createDiv();
        while (week.isSameOrBefore(weekEnd)) {
            view.createDiv({
                cls: "journal-weekday",
                text: week.format("ddd"),
            });
            week.add(1, "day");
        }
        const curr = startWithWeek.clone();
        while (curr.isSameOrBefore(endWithWeek)) {
            if (curr.isSame(curr.clone().startOf("week"), "day")) {
                const weekNum = view.createDiv({
                    cls: "journal-weeknumber",
                    text: curr.format("[W]ww"),
                });
                if (this.addLinks && this.journal.config.week.enabled) {
                    weekNum.classList.add("journal-clickable");
                    weekNum.dataset.date = curr.format("YYYY-MM-DD");
                    weekNum.on("click", ".journal-weeknumber", (e) => {
                        var _a, _b;
                        const date = (_b = (_a = e.currentTarget) === null || _a === void 0 ? void 0 : _a.dataset) === null || _b === void 0 ? void 0 : _b.date;
                        if (date) {
                            this.journal.week.open(date);
                        }
                    });
                }
            }
            const cls = ["journal-day"];
            let text = curr.format("D");
            if (curr.isSame(today, "day")) {
                cls.push("journal-is-today");
            }
            if (!curr.isSame(start, "month")) {
                cls.push("journal-is-not-same-month");
                if (!this.showPrevMonthDays) {
                    text = "";
                }
            }
            if (this.addLinks && this.journal.config.day.enabled) {
                cls.push("journal-clickable");
            }
            const day = view.createDiv({
                cls,
                text,
            });
            day.dataset.date = curr.format("YYYY-MM-DD");
            curr.add(1, "day");
        }
    }
}

class CodeBlockCalendar extends obsidian.MarkdownRenderChild {
    constructor(containerEl, journal, date, ctx, addLinks = true) {
        super(containerEl);
        this.journal = journal;
        this.date = date;
        this.ctx = ctx;
        this.addLinks = addLinks;
    }
    display() {
        this.containerEl.empty();
        const start = this.journal.year.getRangeStart(this.date);
        const end = this.journal.year.getRangeEnd(this.date);
        const name = this.containerEl.createEl("h6", {
            cls: "journal-name",
            text: start.format("YYYY"),
        });
        if (this.addLinks && this.journal.config.year.enabled) {
            name.classList.add("journal-clickable");
            name.on("click", ".journal-name", () => {
                this.journal.year.open(this.date);
            });
        }
        const view = this.containerEl.createDiv({
            cls: "journal-calendar-view",
        });
        const curr = start.clone();
        while (curr.isSameOrBefore(end, "year")) {
            const month = view.createDiv();
            const monthView = new CodeBlockMonth(month, this.journal, curr.format("YYYY-MM-DD"), this.ctx, this.addLinks);
            monthView.showPrevMonthDays = false;
            this.ctx.addChild(monthView);
            monthView.display();
            curr.add(1, "month");
        }
    }
}

class CodeBlockQuarter extends obsidian.MarkdownRenderChild {
    constructor(containerEl, journal, date, ctx, addLinks = true) {
        super(containerEl);
        this.journal = journal;
        this.date = date;
        this.ctx = ctx;
        this.addLinks = addLinks;
    }
    display() {
        this.containerEl.empty();
        const start = this.journal.quarter.getRangeStart(this.date);
        const end = this.journal.quarter.getRangeEnd(this.date);
        const name = this.containerEl.createEl("h6", {
            cls: "journal-name",
            text: start.format("[Q]Q YYYY"),
        });
        if (this.addLinks && this.journal.config.quarter.enabled) {
            name.classList.add("journal-clickable");
            name.on("click", ".journal-name", () => {
                this.journal.quarter.open(this.date);
            });
        }
        const view = this.containerEl.createDiv({
            cls: "journal-calendar-view",
        });
        const curr = start.clone();
        while (curr.isSame(end, "quarter")) {
            const month = view.createDiv();
            const monthView = new CodeBlockMonth(month, this.journal, curr.format("YYYY-MM-DD"), this.ctx, this.addLinks);
            monthView.showPrevMonthDays = false;
            this.ctx.addChild(monthView);
            monthView.display();
            curr.add(1, "month");
        }
    }
}

class CodeBlockWeek extends obsidian.MarkdownRenderChild {
    constructor(containerEl, journal, date, ctx, addLinks = true) {
        super(containerEl);
        this.journal = journal;
        this.date = date;
        this.ctx = ctx;
        this.addLinks = addLinks;
    }
    display() {
        this.containerEl.empty();
        const today = this.journal.today;
        const start = this.journal.week.getRangeStart(this.date);
        const end = this.journal.week.getRangeEnd(this.date);
        const name = this.containerEl.createEl("h6", {
            cls: "journal-name",
            text: start.format(this.journal.week.dateFormat),
        });
        if (this.addLinks && this.journal.config.week.enabled) {
            name.classList.add("journal-clickable");
            name.on("click", ".journal-name", () => {
                this.journal.week.open(this.date);
            });
        }
        const view = this.containerEl.createDiv({
            cls: "journal-week-view",
        });
        if (this.addLinks && this.journal.config.day.enabled) {
            view.on("click", ".journal-weekday", (e) => {
                var _a, _b;
                const date = (_b = (_a = e.target.closest("[data-date]")) === null || _a === void 0 ? void 0 : _a.dataset) === null || _b === void 0 ? void 0 : _b.date;
                if (date) {
                    this.journal.day.open(date);
                }
            });
        }
        while (start.isSameOrBefore(end)) {
            const cls = ["journal-weekday"];
            if (start.isSame(today, "day")) {
                cls.push("journal-is-today");
            }
            if (this.addLinks && this.journal.config.day.enabled) {
                cls.push("journal-clickable");
            }
            const day = view.createDiv({
                cls,
            });
            day.createDiv({
                cls: "journal-day-of-week",
                text: start.format("ddd"),
            });
            day.createDiv({
                cls: "journal-day",
                text: start.format("D"),
            });
            day.dataset.date = start.format("YYYY-MM-DD");
            start.add(1, "day");
        }
    }
}

const timelineModes = {
    month: CodeBlockMonth,
    week: CodeBlockWeek,
    quarter: CodeBlockQuarter,
    calendar: CodeBlockCalendar,
};
const timelineGranularityMapping = {
    day: "week",
    week: "week",
    month: "month",
    quarter: "quarter",
    year: "calendar",
};

const stubMarkdownContext = {
    docId: "",
    sourcePath: "",
    frontmatter: undefined,
    addChild: function (_child) {
        // no-op
    },
    getSectionInfo: function (_el) {
        // no-op
        return null;
    },
};

class CodeBlockNav extends obsidian.MarkdownRenderChild {
    constructor(containerEl, journal, date, addLinks = true) {
        super(containerEl);
        this.journal = journal;
        this.date = date;
        this.addLinks = addLinks;
        this.granularity = "day";
    }
    display() {
        this.containerEl.empty();
        const date = this.journal.date(this.date).startOf(this.granularity);
        const view = this.containerEl.createDiv({
            cls: "journal-nav-view",
        });
        const prevDate = date.clone().subtract(1, this.granularity);
        const prevBlock = view.createDiv({
            cls: `journal-${this.granularity}-nav journal-nav-prev`,
        });
        this.renderOne(prevBlock, prevDate, true);
        const current = view.createDiv({
            cls: `journal-${this.granularity}-nav journal-nav-current`,
        });
        this.renderOne(current, date, false);
        const iconPrev = current.createDiv({
            cls: "journal-nav-icon journal-nav-icon-prev",
        });
        const iconPrevEl = obsidian.getIcon("arrow-left");
        if (iconPrevEl)
            iconPrev.appendChild(iconPrevEl);
        const iconNext = current.createDiv({
            cls: "journal-nav-icon journal-nav-icon-next",
        });
        const iconNextEl = obsidian.getIcon("arrow-right");
        if (iconNextEl)
            iconNext.appendChild(iconNextEl);
        const nextDate = date.clone().add(1, this.granularity);
        const nextBlock = view.createDiv({
            cls: `journal-${this.granularity}-nav journal-nav-next`,
        });
        this.renderOne(nextBlock, nextDate, true);
        if (this.addLinks && this.isCurrentEnabled()) {
            iconPrev.classList.add("journal-clickable");
            iconPrev.dataset.date = prevDate.format("YYYY-MM-DD");
            iconNext.classList.add("journal-clickable");
            iconNext.dataset.date = nextDate.format("YYYY-MM-DD");
            iconPrev.on("click", ".journal-nav-icon-prev", (e) => {
                var _a, _b;
                const date = (_b = (_a = e.currentTarget) === null || _a === void 0 ? void 0 : _a.dataset) === null || _b === void 0 ? void 0 : _b.date;
                if (date) {
                    this.openDate(date);
                }
            });
            iconNext.on("click", ".journal-nav-icon-next", (e) => {
                var _a, _b;
                const date = (_b = (_a = e.currentTarget) === null || _a === void 0 ? void 0 : _a.dataset) === null || _b === void 0 ? void 0 : _b.date;
                if (date) {
                    this.openDate(date);
                }
            });
        }
        if (this.addLinks && this.journal.config.day.enabled) {
            const today = this.journal.today;
            if (!today.isSame(date)) {
                const todayBlock = view.createDiv({
                    cls: `journal-nav-today`,
                    text: "Today",
                });
                todayBlock.classList.add("journal-clickable");
                todayBlock.dataset.date = today.format("YYYY-MM-DD");
                todayBlock.on("click", ".journal-nav-today", (e) => {
                    var _a, _b;
                    const date = (_b = (_a = e.currentTarget) === null || _a === void 0 ? void 0 : _a.dataset) === null || _b === void 0 ? void 0 : _b.date;
                    if (date) {
                        this.journal.day.open(date);
                    }
                });
            }
        }
    }
    renderWeek(parent, date, clickable = true) {
        const week = parent.createDiv({
            cls: "journal-nav-week",
            text: date.format("[W]w"),
        });
        if (this.addLinks && clickable && this.journal.config.week.enabled) {
            week.classList.add("journal-clickable");
            week.dataset.date = date.format("YYYY-MM-DD");
            week.on("click", ".journal-nav-week", (e) => {
                var _a, _b;
                const date = (_b = (_a = e.currentTarget) === null || _a === void 0 ? void 0 : _a.dataset) === null || _b === void 0 ? void 0 : _b.date;
                if (date) {
                    this.journal.week.open(date);
                }
            });
        }
        return week;
    }
    renderMonth(parent, date) {
        const month = parent.createDiv({
            cls: "journal-nav-month",
            text: date.format("MMMM"),
        });
        if (this.addLinks && this.journal.config.month.enabled) {
            month.classList.add("journal-clickable");
            month.dataset.date = date.format("YYYY-MM");
            month.on("click", ".journal-nav-month", (e) => {
                var _a, _b;
                const date = (_b = (_a = e.currentTarget) === null || _a === void 0 ? void 0 : _a.dataset) === null || _b === void 0 ? void 0 : _b.date;
                if (date) {
                    this.journal.month.open(date);
                }
            });
        }
        return month;
    }
    renderYear(parent, date) {
        const year = parent.createDiv({
            cls: "journal-nav-year",
            text: date.format("YYYY"),
        });
        if (this.addLinks && this.journal.config.year.enabled) {
            year.classList.add("journal-clickable");
            year.dataset.date = date.format("YYYY");
            year.on("click", ".journal-nav-year", (e) => {
                var _a, _b;
                const date = (_b = (_a = e.currentTarget) === null || _a === void 0 ? void 0 : _a.dataset) === null || _b === void 0 ? void 0 : _b.date;
                if (date) {
                    this.journal.year.open(date);
                }
            });
        }
        return year;
    }
}

class CodeBlockNavDay extends CodeBlockNav {
    constructor(containerEl, journal, date, addLinks = true) {
        super(containerEl, journal, date, addLinks);
    }
    isCurrentEnabled() {
        return this.journal.config.day.enabled;
    }
    openDate(date) {
        this.journal.day.open(date);
    }
    renderOne(parent, date, clickable = true) {
        const dayWrapper = parent.createDiv({
            cls: "journal-nav-day-wrapper",
        });
        dayWrapper.createDiv({
            cls: "journal-nav-weekday",
            text: date.format("ddd"),
        });
        dayWrapper.createDiv({
            cls: "journal-nav-day",
            text: date.format("D"),
        });
        dayWrapper.createDiv({
            cls: "journal-nav-relative",
            text: this.relativeDay(date),
        });
        if (this.addLinks && clickable && this.journal.config.day.enabled) {
            dayWrapper.dataset.date = date.format("YYYY-MM-DD");
            dayWrapper.classList.add("journal-clickable");
            dayWrapper.on("click", ".journal-nav-day-wrapper", (e) => {
                var _a, _b;
                const date = (_b = (_a = e.currentTarget) === null || _a === void 0 ? void 0 : _a.dataset) === null || _b === void 0 ? void 0 : _b.date;
                if (date) {
                    this.journal.day.open(date);
                }
            });
        }
        if (this.journal.config.week.enabled) {
            this.renderWeek(parent, date);
        }
        this.renderMonth(parent, date);
        this.renderYear(parent, date);
    }
    relativeDay(date) {
        const today = this.journal.today;
        return date.calendar(today, {
            lastWeek: "[Last] dddd",
            lastDay: "[Yesterday]",
            sameDay: "[Today]",
            nextDay: "[Tomorrow]",
            nextWeek: "dddd",
            sameElse: function () {
                return "[" + date.from(today) + "]";
            },
        });
    }
}

class CodeBlockNavMonth extends CodeBlockNav {
    constructor(containerEl, journal, date, addLinks = true) {
        super(containerEl, journal, date, addLinks);
        this.granularity = "month";
    }
    isCurrentEnabled() {
        return this.journal.config.month.enabled;
    }
    openDate(date) {
        this.journal.month.open(date);
    }
    renderOne(parent, date, clickable = true) {
        const monthWrapper = parent.createDiv({
            cls: "journal-nav-month-wrapper",
        });
        monthWrapper.createDiv({
            cls: "journal-nav-month",
            text: date.format("MMMM"),
        });
        if (this.addLinks && clickable && this.journal.config.month.enabled) {
            monthWrapper.dataset.date = date.format("YYYY-MM-DD");
            monthWrapper.classList.add("journal-clickable");
            monthWrapper.on("click", ".journal-nav-month-wrapper", (e) => {
                var _a, _b;
                const date = (_b = (_a = e.currentTarget) === null || _a === void 0 ? void 0 : _a.dataset) === null || _b === void 0 ? void 0 : _b.date;
                if (date) {
                    this.journal.month.open(date);
                }
            });
        }
        monthWrapper.createDiv({
            cls: "journal-nav-relative",
            text: this.relativeMonth(date),
        });
        this.renderYear(parent, date);
    }
    relativeMonth(date) {
        const thisMonth = this.journal.today.startOf("month");
        const fromNow = date.diff(thisMonth, "month");
        if (fromNow === 0) {
            return "This month";
        }
        else if (fromNow === -1) {
            return "Last month";
        }
        else if (fromNow === 1) {
            return "Next month";
        }
        if (fromNow < 0) {
            return `${Math.abs(fromNow)} months ago`;
        }
        return `${fromNow} months from now`;
    }
}

class CodeBlockNavQuarter extends CodeBlockNav {
    constructor(containerEl, journal, date, addLinks = true) {
        super(containerEl, journal, date, addLinks);
        this.granularity = "quarter";
    }
    isCurrentEnabled() {
        return this.journal.config.quarter.enabled;
    }
    openDate(date) {
        this.journal.quarter.open(date);
    }
    renderOne(parent, date, clickable = true) {
        const monthWrapper = parent.createDiv({
            cls: "journal-nav-quarter-wrapper",
        });
        monthWrapper.createDiv({
            cls: "journal-nav-quarter",
            text: date.format("[Q]Q"),
        });
        if (this.addLinks && clickable && this.journal.config.month.enabled) {
            monthWrapper.dataset.date = date.format("YYYY-MM-DD");
            monthWrapper.classList.add("journal-clickable");
            monthWrapper.on("click", ".journal-nav-quarter-wrapper", (e) => {
                var _a, _b;
                const date = (_b = (_a = e.currentTarget) === null || _a === void 0 ? void 0 : _a.dataset) === null || _b === void 0 ? void 0 : _b.date;
                if (date) {
                    this.journal.quarter.open(date);
                }
            });
        }
        monthWrapper.createDiv({
            cls: "journal-nav-relative",
            text: this.relativeQuarter(date),
        });
        this.renderYear(parent, date);
    }
    relativeQuarter(date) {
        const thisQuarter = this.journal.today.startOf(this.granularity);
        const fromNow = date.diff(thisQuarter, "quarter");
        if (fromNow === 0) {
            return "This quarter";
        }
        else if (fromNow === -1) {
            return "Last quarter";
        }
        else if (fromNow === 1) {
            return "Next quarter";
        }
        if (fromNow < 0) {
            return `${Math.abs(fromNow)} quarters ago`;
        }
        return `${fromNow} quarters from now`;
    }
}

class CodeBlockNavWeek extends CodeBlockNav {
    constructor(containerEl, journal, date, addLinks = true) {
        super(containerEl, journal, date, addLinks);
        this.granularity = "week";
    }
    isCurrentEnabled() {
        return this.journal.config.week.enabled;
    }
    openDate(date) {
        this.journal.week.open(date);
    }
    renderOne(parent, date, weekClickable = true) {
        const weekWrapper = parent.createDiv({
            cls: "journal-nav-week-wrapper",
        });
        this.renderWeek(weekWrapper, date, weekClickable);
        const relative = weekWrapper.createDiv({
            cls: "journal-nav-relative",
            text: this.relativeWeek(date),
        });
        if (this.addLinks && weekClickable && this.journal.config.week.enabled) {
            relative.dataset.date = date.format("YYYY-MM-DD");
            relative.classList.add("journal-clickable");
            relative.on("click", ".journal-nav-relative", (e) => {
                var _a, _b;
                const date = (_b = (_a = e.currentTarget) === null || _a === void 0 ? void 0 : _a.dataset) === null || _b === void 0 ? void 0 : _b.date;
                if (date) {
                    this.journal.week.open(date);
                }
            });
        }
        this.renderMonth(parent, date);
        this.renderYear(parent, date);
    }
    relativeWeek(date) {
        const thisWeek = this.journal.today.startOf("week");
        const fromNow = date.diff(thisWeek, "week");
        if (fromNow === 0) {
            return "This week";
        }
        else if (fromNow === -1) {
            return "Last week";
        }
        else if (fromNow === 1) {
            return "Next week";
        }
        if (fromNow < 0) {
            return `${Math.abs(fromNow)} weeks ago`;
        }
        return `${fromNow} weeks from now`;
    }
}

class CodeBlockNavYear extends CodeBlockNav {
    constructor(containerEl, journal, date, addLinks = true) {
        super(containerEl, journal, date, addLinks);
        this.granularity = "year";
    }
    isCurrentEnabled() {
        return this.journal.config.year.enabled;
    }
    openDate(date) {
        this.journal.year.open(date);
    }
    renderOne(parent, date, clickable = true) {
        const yearWrapper = parent.createDiv({
            cls: "journal-nav-year-wrapper",
        });
        yearWrapper.createDiv({
            cls: "journal-nav-year",
            text: date.format("YYYY"),
        });
        if (this.addLinks && clickable && this.journal.config.year.enabled) {
            yearWrapper.classList.add("journal-clickable");
            yearWrapper.dataset.date = date.format("YYYY");
            yearWrapper.on("click", ".journal-nav-year-wrapper", (e) => {
                var _a, _b;
                const date = (_b = (_a = e.currentTarget) === null || _a === void 0 ? void 0 : _a.dataset) === null || _b === void 0 ? void 0 : _b.date;
                if (date) {
                    this.journal.year.open(date);
                }
            });
        }
        yearWrapper.createDiv({
            cls: "journal-nav-relative",
            text: this.relativeYear(date),
        });
    }
    relativeYear(date) {
        const thisQuarter = this.journal.today.startOf(this.granularity);
        const fromNow = date.diff(thisQuarter, "year");
        if (fromNow === 0) {
            return "This year";
        }
        else if (fromNow === -1) {
            return "Last year";
        }
        else if (fromNow === 1) {
            return "Next year";
        }
        if (fromNow < 0) {
            return `${Math.abs(fromNow)} years ago`;
        }
        return `${fromNow} years from now`;
    }
}

const navBlocks = {
    day: CodeBlockNavDay,
    week: CodeBlockNavWeek,
    month: CodeBlockNavMonth,
    quarter: CodeBlockNavQuarter,
    year: CodeBlockNavYear,
};

class CalendarCodeBlocksModal extends obsidian.Modal {
    constructor(app, config, calendar, granularity) {
        super(app);
        this.granularity = granularity;
        this.journal = new CalendarJournal(app, config, calendar);
    }
    onOpen() {
        this.titleEl.innerText = "Calendar code blocks";
        this.containerEl.addClass("calendar-code-block-modal");
        this.contentEl.on("click", ".journal-code-block", (e) => {
            navigator.clipboard.writeText(e.target.innerText);
        });
        this.display();
    }
    display() {
        const { contentEl } = this;
        contentEl.empty();
        contentEl.createEl("p", {
            cls: "journal-hint",
            text: "Click on a code block to copy it to your clipboard.",
        });
        const navBlockContainer = contentEl.createDiv({
            cls: "journal-code-block",
        });
        navBlockContainer.createSpan({
            text: "```calendar-nav",
        });
        navBlockContainer.createEl("br");
        navBlockContainer.createSpan({
            text: "```",
        });
        contentEl.createEl("p", {
            text: "Navigation code block helps navigating relative to current note.",
        });
        contentEl.createEl("p", {
            text: `Navigation code block for ${SECTIONS_MAP[this.granularity]} note looks like this:`,
        });
        const navBlockWrapper = contentEl.createDiv();
        const NavBlock = navBlocks[this.granularity];
        new NavBlock(navBlockWrapper, this.journal, this.journal.today.format("YYYY-MM-DD"), false).display();
        contentEl.createEl("div", {
            cls: "journal-divider",
        });
        const blockContainer = contentEl.createDiv({
            cls: "journal-code-block",
        });
        blockContainer.createSpan({
            text: "```calendar-timeline",
        });
        blockContainer.createEl("br");
        blockContainer.createSpan({
            text: "```",
        });
        if (this.granularity === "day") {
            contentEl.createEl("p", {
                text: "For daily notes timeline blocks helps navigating within corresponding week.",
            });
        }
        else {
            contentEl.createEl("p", {
                text: `Timeline code block helps navigating within note's ${this.granularity}.`,
            });
        }
        contentEl.createEl("p", {
            text: `Default timeline for ${SECTIONS_MAP[this.granularity]} note looks like this:`,
        });
        contentEl.createEl("div", {
            cls: "journal-divider",
        });
        const mode = timelineGranularityMapping[this.granularity];
        const Block = timelineModes[mode];
        const wrapper = contentEl.createDiv();
        new Block(wrapper, this.journal, this.journal.today.format("YYYY-MM-DD"), stubMarkdownContext, false).display();
        contentEl.createEl("div", {
            cls: "journal-divider",
        });
        contentEl.createEl("p", {
            text: "You can change default timeline mode by adding mode prop to code block.",
        });
        const blockContainerMode = contentEl.createDiv({
            cls: "journal-code-block",
        });
        blockContainerMode.createSpan({
            text: "```calendar-timeline",
        });
        blockContainerMode.createEl("br");
        blockContainerMode.createSpan({
            text: "mode: week",
        });
        blockContainerMode.createEl("br");
        blockContainerMode.createSpan({
            text: "```",
        });
        contentEl.createEl("p", {
            text: "Supported modes are:",
        });
        const modeList = contentEl.createEl("ul");
        modeList.createEl("li", {
            text: "week",
        });
        modeList.createEl("li", {
            text: "month",
        });
        modeList.createEl("li", {
            text: "quarter",
        });
        modeList.createEl("li", {
            text: "calendar",
        });
    }
}

class TemplateSuggestion extends obsidian.AbstractInputSuggest {
    constructor(app, textInputEl) {
        super(app, textInputEl);
        this.textInputEl = textInputEl;
    }
    getSuggestions(inputStr) {
        const search = inputStr.toLocaleLowerCase();
        if (!search)
            return [];
        const fileAndFolders = this.app.vault.getAllLoadedFiles();
        return fileAndFolders.filter((f) => {
            if (f instanceof obsidian.TFolder)
                return false;
            const path = f.path.toLocaleLowerCase();
            return path.includes(search);
        });
    }
    renderSuggestion(value, el) {
        el.setText(value.path);
    }
    selectSuggestion(value) {
        this.textInputEl.value = value.path;
        this.textInputEl.trigger("input");
        this.close();
    }
}

class SettingsCalendarSectionPage extends SettingsWidget {
    constructor(app, journal, containerEl, config, granularity, calendar) {
        super(app);
        this.journal = journal;
        this.containerEl = containerEl;
        this.config = config;
        this.granularity = granularity;
        this.calendar = calendar;
        this.folderSuggestions = [];
    }
    get dateFormat() {
        return this.config.dateFormat || DEFAULT_DATE_FORMATS_CALENDAR[this.granularity];
    }
    get ribbonIcon() {
        return this.config.ribbon.icon || DEFAULT_RIBBON_ICONS_CALENDAR;
    }
    display() {
        const { containerEl } = this;
        new obsidian.Setting(containerEl)
            .setName(`${capitalize(SECTIONS_MAP[this.granularity])} Notes`)
            .setHeading()
            .addButton((button) => {
            button
                .setClass("journal-clickable")
                .setIcon("chevron-left")
                .setTooltip("Back to journal")
                .onClick(() => {
                this.navigate({ type: "journal", id: this.journal.id });
            });
        });
        if (!this.config.enabled)
            return;
        new obsidian.Setting(containerEl)
            .setName("Open note")
            .setDesc("Select how to open a note when navigating this journal")
            .addDropdown((dropdown) => {
            var _a;
            dropdown
                .addOptions({
                active: "Replacing active note",
                tab: "In new tab",
                split: "Adjusten to active note",
                window: "In popout window",
            })
                .setValue((_a = this.config.openMode) !== null && _a !== void 0 ? _a : "active")
                .onChange((value) => {
                this.config.openMode = value;
                this.save();
            });
        });
        const nameTemplate = new obsidian.Setting(containerEl).setName("Note name template").addText((text) => {
            text
                .setPlaceholder(DEFAULT_NAME_TEMPLATE_CALENDAR)
                .setValue(this.config.nameTemplate)
                .onChange((value) => {
                this.config.nameTemplate = value;
                this.save();
            });
        });
        nameTemplate.descEl.createEl("span", {
            text: "Template used to generate new note name.",
        });
        nameTemplate.descEl.createEl("br");
        this.createVariableReferenceHint(nameTemplate.descEl);
        const dateFormat = new obsidian.Setting(containerEl).setName("Default date format").addMomentFormat((format) => {
            format
                .setPlaceholder(DEFAULT_DATE_FORMATS_CALENDAR[this.granularity])
                .setValue(this.config.dateFormat)
                .onChange((value) => {
                this.config.dateFormat = value;
                dateFormatHint.innerText = this.calendar.today().format(this.dateFormat);
                this.save();
            });
        });
        dateFormat.descEl.createEl("span", {
            text: "Used to format dates if not defined in variable.",
        });
        dateFormat.descEl.createEl("br");
        dateFormat.descEl.createEl("a", {
            text: "Syntax reference.",
            attr: {
                target: "_blank",
            },
            href: "https://momentjs.com/docs/#/displaying/format/",
        });
        dateFormat.descEl.createEl("br");
        dateFormat.descEl.createEl("span", {
            text: "Your current syntax looks like this: ",
        });
        const dateFormatHint = dateFormat.descEl.createEl("b", {
            cls: "u-pop",
        });
        dateFormatHint.innerText = this.calendar.today().format(this.dateFormat);
        const folder = new obsidian.Setting(containerEl).setName("Folder").addText((text) => {
            this.folderSuggestions.push(new FolderSuggestion(this.app, text.inputEl, this.journal.rootFolder));
            text.setValue(this.config.folder).onChange((value) => {
                this.config.folder = value;
                this.save();
            });
        });
        folder.descEl.createEl("span", {
            text: "New notes will be created in this folder.",
        });
        folder.descEl.createEl("br");
        if (this.journal.rootFolder) {
            folder.descEl.createEl("span", {
                text: `It will be relative to the journals' root folder: `,
            });
            folder.descEl.createEl("b", {
                text: this.journal.rootFolder,
                cls: "u-pop",
            });
            folder.descEl.createEl("br");
        }
        this.createVariableReferenceHint(folder.descEl);
        const template = new obsidian.Setting(containerEl).setName("Template").addText((text) => {
            new TemplateSuggestion(this.app, text.inputEl);
            text.setValue(this.config.template).onChange((value) => {
                this.config.template = value;
                this.save();
            });
        });
        template.descEl.createEl("span", {
            text: "Path to note that will be used as template when creating new notes. ",
        });
        template.descEl.createEl("br");
        this.createVariableReferenceHint(template.descEl);
        template.descEl.createEl("br");
        this.createCodeBlockReferenceHint(template.descEl);
        if (canApplyTemplater(this.app, "<% $>")) {
            template.descEl.createEl("br");
            template.descEl.createSpan({
                text: "Templater syntax is supported. Check plugin description for more info.",
            });
        }
        new obsidian.Setting(containerEl)
            .setName("Show in ribbon?")
            .setDesc("Changing ribbon settings requires Obsidian restart to take effect.")
            .addToggle((toggle) => {
            toggle.setValue(this.config.ribbon.show).onChange((value) => {
                this.config.ribbon.show = value;
                this.save(true);
            });
        });
        if (this.config.ribbon.show) {
            let iconPreviewButton = null;
            new obsidian.Setting(containerEl)
                .setName("Ribbon icon")
                .setDesc("Select icon to be show in ribbon.")
                .addButton((button) => {
                iconPreviewButton = button;
                button.setIcon(this.ribbonIcon).setDisabled(true);
            })
                .addText((text) => {
                new IconSuggestion(this.app, text.inputEl);
                text.setValue(this.config.ribbon.icon).onChange((value) => {
                    this.config.ribbon.icon = value;
                    iconPreviewButton === null || iconPreviewButton === void 0 ? void 0 : iconPreviewButton.setIcon(value);
                    this.save();
                });
            });
            new obsidian.Setting(containerEl)
                .setName("Ribbon tooltip")
                .setDesc("Hint shown when hovering icon in ribbon")
                .addText((text) => {
                text
                    .setValue(this.config.ribbon.tooltip)
                    .setPlaceholder(DEFAULT_RIBBON_TOOLTIPS[this.granularity])
                    .onChange((value) => {
                    this.config.ribbon.tooltip = value;
                    this.save();
                });
            });
        }
        new obsidian.Setting(containerEl)
            .setName("Create note on startup")
            .setDesc("Automatically create notes whenever you open this vault.")
            .addToggle((toggle) => {
            var _a;
            toggle.setValue((_a = this.config.createOnStartup) !== null && _a !== void 0 ? _a : false).onChange((value) => {
                this.config.createOnStartup = value;
                this.save();
            });
        });
    }
    updateFolderSuggestions(root) {
        for (const suggestion of this.folderSuggestions) {
            suggestion.root = root;
        }
    }
    createVariableReferenceHint(el) {
        const link = el.createEl("span", {
            cls: "var-ref journal-link",
            text: "Supported variables.",
            href: "#",
        });
        link.on("click", ".var-ref", () => {
            new VariableReferenceModal(this.app, "calendar", this.granularity, this.dateFormat).open();
        });
    }
    createCodeBlockReferenceHint(el) {
        const link = el.createEl("span", {
            cls: "code-ref journal-link",
            text: "Supported code blocks",
        });
        link.on("click", ".code-ref", () => {
            new CalendarCodeBlocksModal(this.app, this.journal, this.calendar, this.granularity).open();
        });
    }
}

class IntervalManager {
    constructor(config, calendar) {
        this.config = config;
        this.calendar = calendar;
        this.intervalTree = new IntervalTree();
        this.keysMap = new Map();
        this.maximumYearIndex = 0;
        if (this.shouldResetYearly) {
            this.calculateMaximumYearIndex();
        }
    }
    get shouldResetYearly() {
        return this.config.numeration_type === "year";
    }
    find(startDate, endDate) {
        return this.intervalTree.search([startDate.toDate().getTime(), endDate.toDate().getTime()]);
    }
    findInterval(date) {
        const intervalDate = date ? this.calendar.date(date) : this.calendar.today();
        const intervalTime = intervalDate.toDate().getTime();
        const list = this.intervalTree.search([intervalTime, intervalTime]);
        if (list.length > 0) {
            return list[0];
        }
        const pastDate = intervalDate.clone().subtract(100, "year").toDate().getTime();
        const pastList = this.intervalTree.search([pastDate, intervalTime]);
        if (pastList.length > 0) {
            return this.calculateIntervalAfterKnown(intervalDate, pastList.at(-1));
        }
        const futureDate = intervalDate.clone().add(100, "year").toDate().getTime();
        const futureList = this.intervalTree.search([intervalTime, futureDate]);
        if (futureList.length > 0) {
            return this.calculateIntervalBeforeKnown(intervalDate, futureList[0]);
        }
        const startInterval = this.getStartInterval();
        if (intervalDate.isBefore(startInterval.startDate, "day")) {
            if (this.config.limitCreation)
                return null;
            return this.calculateIntervalBeforeKnown(intervalDate, startInterval);
        }
        else if (intervalDate.isAfter(startInterval.endDate, "day")) {
            return this.calculateIntervalAfterKnown(intervalDate, startInterval);
        }
        return startInterval;
    }
    findNextInterval(date) {
        const interval = this.findInterval(date);
        if (!interval)
            return null;
        return this.calculateIntervalAfterKnown(interval.endDate.clone().add(1, "day"), interval);
    }
    findPreviousInterval(date) {
        const interval = this.findInterval(date);
        if (!interval)
            return null;
        return this.calculateIntervalBeforeKnown(interval.startDate.clone().subtract(1, "day"), interval);
    }
    add(interval) {
        const dateInterval = [interval.startDate.toDate().getTime(), interval.endDate.toDate().getTime()];
        this.intervalTree.insert(dateInterval, interval);
        this.keysMap.set(this.getIntervalKey(interval), interval);
    }
    findNextNote(endDate) {
        var _a;
        const list = this.intervalTree.search([endDate.toDate().getTime(), Infinity]);
        const note = list.pop();
        return (_a = note === null || note === void 0 ? void 0 : note.path) !== null && _a !== void 0 ? _a : null;
    }
    findPreviousNote(startDate) {
        var _a;
        const list = this.intervalTree.search([0, startDate.toDate().getTime()]);
        const [note] = list;
        return (_a = note === null || note === void 0 ? void 0 : note.path) !== null && _a !== void 0 ? _a : null;
    }
    clearForPath(path) {
        if (!this.intervalTree.size)
            return;
        const toDelete = [];
        for (const [key, entry] of this.intervalTree.iterate(undefined, (value, key) => [key, value])) {
            if ((entry === null || entry === void 0 ? void 0 : entry.path) === path) {
                toDelete.push([key, entry]);
            }
        }
        for (const [key, entry] of toDelete) {
            this.intervalTree.remove(key, entry);
        }
    }
    getIntervalKey(interval) {
        if (this.shouldResetYearly) {
            return `${interval.startDate.toDate().getFullYear()}_${interval.index}`;
        }
        return `${interval.index}`;
    }
    getStartInterval() {
        const startDate = this.calendar.date(this.config.start_date).startOf("day");
        const endDate = this.createEndDate(startDate);
        return {
            startDate,
            endDate,
            index: this.config.start_index,
        };
    }
    createEndDate(startDate) {
        return startDate.clone().add(this.config.duration, this.config.granularity).subtract(1, "day").endOf("day");
    }
    calculateIntervalAfterKnown(date, interval) {
        let current = interval.endDate.clone().add(1, "day");
        let index = interval.index + 1;
        if (this.shouldResetYearly && !current.isSame(interval.startDate, "year")) {
            index = 1;
        }
        while (current.isBefore(date, "day")) {
            const next = current.clone().add(this.config.duration, this.config.granularity);
            if (next.isAfter(date, "day")) {
                break;
            }
            index++;
            if (this.shouldResetYearly && !next.isSame(current, "year")) {
                index = 1;
            }
            current = next;
        }
        switch (this.config.end_type) {
            case "date":
                if (current.isAfter(this.calendar.date(this.config.end_date), "day")) {
                    return null;
                }
                break;
            case "repeats":
                if (index >= this.config.start_index + this.config.repeats) {
                    return null;
                }
        }
        return {
            startDate: current,
            endDate: this.createEndDate(current),
            index,
        };
    }
    calculateIntervalBeforeKnown(date, interval) {
        const current = interval.startDate.clone();
        let index = interval.index;
        while (current.isAfter(date, "day")) {
            current.subtract(this.config.duration, this.config.granularity);
            index--;
            if (this.shouldResetYearly && index === 0) {
                index = this.maximumYearIndex;
            }
        }
        if (this.config.limitCreation && current.isBefore(this.calendar.date(this.config.start_date))) {
            return null;
        }
        return {
            startDate: current,
            endDate: this.createEndDate(current),
            index,
        };
    }
    calculateMaximumYearIndex() {
        const duration = this.config.duration;
        switch (this.config.granularity) {
            case "month":
                this.maximumYearIndex = Math.floor(12 / duration);
                break;
            case "week":
                this.maximumYearIndex = Math.floor(52 / duration);
                break;
            case "day":
                this.maximumYearIndex = Math.floor(365 / duration);
                break;
        }
    }
    *[Symbol.iterator]() {
        if (!this.intervalTree.size)
            return;
        for (const entry of this.intervalTree.iterate()) {
            yield entry;
        }
    }
}

const intervalCommands = {
    "interval-journal:open": "Open current interval",
    "interval-journal:open-next": "Open next interval",
    "interval-journal:open-prev": "Open previous interval",
};
class IntervalJournal {
    constructor(app, config, calendar) {
        this.app = app;
        this.config = config;
        this.calendar = calendar;
        this.type = "interval";
        this.intervals = new IntervalManager(this.config, this.calendar);
    }
    get id() {
        return this.config.id;
    }
    get name() {
        return this.config.name;
    }
    get nameTemplate() {
        return this.config.nameTemplate || DEFAULT_NAME_TEMPLATE_INTERVAL;
    }
    get navNameTemplate() {
        return this.config.navNameTemplate || this.nameTemplate;
    }
    get navDatesTemplate() {
        return this.config.navDatesTemplate || DEFAULT_NAV_DATES_TEMPLATE_INTERVAL;
    }
    get dateFormat() {
        return this.config.dateFormat || DEFAULT_DATE_FORMAT;
    }
    get ribbonIcon() {
        return this.config.ribbon.icon || DEFAULT_RIBBON_ICONS_INTERVAL;
    }
    get ribbonTooltip() {
        return this.config.ribbon.tooltip || `Open current ${this.config.name} note`;
    }
    get endDate() {
        switch (this.config.end_type) {
            case "date":
                return this.config.end_date;
            case "repeats":
                return this.calendar
                    .date(this.config.start_date)
                    .add(this.config.repeats * this.config.duration, this.config.granularity)
                    .format("YYYY-MM-DD");
        }
        return "";
    }
    findNextNote(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.intervals.findNextNote(this.calendar.date(data.end_date).add(1, "day").startOf("day"));
        });
    }
    findPreviousNote(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.intervals.findPreviousNote(this.calendar.date(data.start_date).subtract(1, "day").endOf("day"));
        });
    }
    openPath(path, _frontmatter) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = this.app.vault.getAbstractFileByPath(path);
            if (!file)
                return;
            if (!(file instanceof obsidian.TFile))
                return;
            yield this.openFile(file);
        });
    }
    findInterval(date) {
        return this.intervals.findInterval(date);
    }
    findNextInterval(date) {
        return this.intervals.findNextInterval(date);
    }
    findPreviousInterval(date) {
        return this.intervals.findPreviousInterval(date);
    }
    findIntervalsForPeriod(startDate, endDate) {
        const list = [];
        if (this.config.limitCreation && startDate.isBefore(this.calendar.date(this.config.start_date))) {
            startDate = this.calendar.date(this.config.start_date);
        }
        let interval = this.intervals.findInterval(startDate.format("YYYY-MM-DD"));
        if (!interval)
            return list;
        do {
            list.push(interval);
            interval = this.intervals.findNextInterval(interval.endDate.format("YYYY-MM-DD"));
        } while (interval && interval.startDate.isBefore(endDate));
        return list;
    }
    getIntervalFileName(interval) {
        return replaceTemplateVariables(this.nameTemplate, this.getTemplateContext(interval));
    }
    getIntervalFolderPath(interval) {
        return obsidian.normalizePath(replaceTemplateVariables(this.config.folder, this.getTemplateContext(interval)));
    }
    open(date) {
        return __awaiter(this, void 0, void 0, function* () {
            const interval = this.findInterval(date);
            if (!interval)
                return;
            return yield this.openInterval(interval);
        });
    }
    openNext(date) {
        return __awaiter(this, void 0, void 0, function* () {
            const interval = this.intervals.findNextInterval(date);
            if (!interval)
                return;
            return yield this.openInterval(interval);
        });
    }
    openPrev(date) {
        return __awaiter(this, void 0, void 0, function* () {
            const interval = this.intervals.findPreviousInterval(date);
            if (!interval)
                return;
            return yield this.openInterval(interval);
        });
    }
    autoCreateNotes() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.config.createOnStartup)
                return;
            const interval = this.findInterval();
            if (!interval)
                return;
            yield this.ensureIntervalNote(interval);
        });
    }
    openStartupNote() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.config.openOnStartup)
                return;
            this.open();
        });
    }
    configureRibbonIcons(plugin) {
        if (!this.config.ribbon.show)
            return;
        plugin.addRibbonIcon(this.ribbonIcon, this.ribbonTooltip, () => {
            this.open();
        });
    }
    parseFrontMatter(frontmatter) {
        const start_date = frontmatter[FRONTMATTER_START_DATE_KEY];
        const end_date = frontmatter[FRONTMATTER_END_DATE_KEY];
        if (!obsidian.moment(start_date).isValid() || !obsidian.moment(end_date).isValid()) {
            return null;
        }
        return {
            type: "interval",
            id: this.id,
            start_date,
            end_date,
            index: frontmatter[FRONTMATTER_INDEX_KEY],
        };
    }
    indexNote(frontmatter, path) {
        const startDate = this.calendar.date(frontmatter.start_date, FRONTMATTER_DATE_FORMAT);
        const endDate = this.calendar.date(frontmatter.end_date, FRONTMATTER_DATE_FORMAT).endOf("day");
        this.intervals.add({
            startDate,
            endDate,
            index: frontmatter.index,
            path,
        });
    }
    clearForPath(path) {
        this.intervals.clearForPath(path);
    }
    supportsCommand(id) {
        return id in intervalCommands;
    }
    execCommand(id) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (id) {
                case "interval-journal:open": {
                    yield this.open();
                    break;
                }
                case "interval-journal:open-next": {
                    yield this.openNext();
                    break;
                }
                case "interval-journal:open-prev": {
                    yield this.openPrev();
                    break;
                }
            }
        });
    }
    connectNote(file, interval, options) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (interval.path) {
                if (!options.override)
                    return;
                yield this.disconnectNote(interval.path);
            }
            let path = file.path;
            if (options.rename || options.move) {
                const folderPath = options.move ? this.getIntervalFolderPath(interval) : (_a = file.parent) === null || _a === void 0 ? void 0 : _a.path;
                const filename = options.rename ? this.getIntervalFileName(interval) + ".md" : file.name;
                path = obsidian.normalizePath(folderPath ? `${folderPath}/${filename}` : filename);
                yield ensureFolderExists(this.app, path);
                yield this.app.vault.rename(file, path);
                file = this.app.vault.getAbstractFileByPath(path);
            }
            interval.path = path;
            this.intervals.add(interval);
            yield this.ensureFrontMatter(file, interval);
        });
    }
    disconnectNote(path) {
        this.intervals.clearForPath(path);
        return this.clearFrontMatter(path);
    }
    getNoteName(interval) {
        const templateContext = this.getTemplateContext(interval);
        return replaceTemplateVariables(this.nameTemplate, templateContext);
    }
    getIntervalPath(interval) {
        if (interval.path)
            return interval.path;
        const templateContext = this.getTemplateContext(interval);
        const filename = replaceTemplateVariables(this.nameTemplate, templateContext) + ".md";
        const folderPath = replaceTemplateVariables(this.config.folder, templateContext);
        return obsidian.normalizePath(folderPath ? `${folderPath}/${filename}` : filename);
    }
    ensureIntervalNote(interval) {
        return __awaiter(this, void 0, void 0, function* () {
            const filePath = this.getIntervalPath(interval);
            let file = this.app.vault.getAbstractFileByPath(filePath);
            if (!file) {
                yield ensureFolderExists(this.app, filePath);
                file = yield this.app.vault.create(filePath, "");
                if (!(file instanceof obsidian.TFile))
                    throw new Error("File is not a TFile");
                const content = yield this.getContent(file, this.getTemplateContext(interval, this.getNoteName(interval)));
                if (content)
                    yield this.app.vault.modify(file, content);
                yield this.processFrontMatter(file, interval);
            }
            else {
                if (!(file instanceof obsidian.TFile))
                    throw new Error("File is not a TFile");
                yield this.ensureFrontMatter(file, interval);
            }
            return file;
        });
    }
    ensureFrontMatter(file, interval) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const metadata = this.app.metadataCache.getFileCache(file);
            if (!((_a = metadata === null || metadata === void 0 ? void 0 : metadata.frontmatter) === null || _a === void 0 ? void 0 : _a[FRONTMATTER_ID_KEY]) ||
                metadata.frontmatter[FRONTMATTER_ID_KEY] ||
                metadata.frontmatter[FRONTMATTER_START_DATE_KEY] ||
                metadata.frontmatter[FRONTMATTER_END_DATE_KEY] ||
                metadata.frontmatter[FRONTMATTER_INDEX_KEY]) {
                yield this.processFrontMatter(file, interval);
            }
        });
    }
    processFrontMatter(file, interval) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.app.fileManager.processFrontMatter(file, (frontmatter) => {
                frontmatter[FRONTMATTER_ID_KEY] = this.id;
                frontmatter[FRONTMATTER_START_DATE_KEY] = interval.startDate.format(FRONTMATTER_DATE_FORMAT);
                frontmatter[FRONTMATTER_END_DATE_KEY] = interval.endDate.format(FRONTMATTER_DATE_FORMAT);
                frontmatter[FRONTMATTER_INDEX_KEY] = interval.index;
            });
            this.intervals.add(Object.assign(Object.assign({}, interval), { path: file.path }));
        });
    }
    clearFrontMatter(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = this.app.vault.getAbstractFileByPath(path);
            if (!file)
                return;
            if (!(file instanceof obsidian.TFile))
                return;
            yield this.app.fileManager.processFrontMatter(file, (frontmatter) => {
                delete frontmatter[FRONTMATTER_ID_KEY];
                delete frontmatter[FRONTMATTER_START_DATE_KEY];
                delete frontmatter[FRONTMATTER_END_DATE_KEY];
                delete frontmatter[FRONTMATTER_INDEX_KEY];
            });
        });
    }
    openInterval(interval) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = yield this.ensureIntervalNote(interval);
            yield this.openFile(file);
        });
    }
    openFile(file) {
        return __awaiter(this, void 0, void 0, function* () {
            const mode = this.config.openMode === "active" ? undefined : this.config.openMode;
            const leaf = this.app.workspace.getLeaf(mode);
            yield leaf.openFile(file, { active: true });
        });
    }
    getTemplateContext(interval, note_name) {
        return {
            date: {
                value: interval.startDate,
                defaultFormat: this.dateFormat,
            },
            start_date: {
                value: interval.startDate,
                defaultFormat: this.dateFormat,
            },
            end_date: {
                value: interval.endDate,
                defaultFormat: this.dateFormat,
            },
            index: {
                value: interval.index,
            },
            journal_name: {
                value: this.name,
            },
            note_name: {
                value: note_name !== null && note_name !== void 0 ? note_name : "",
            },
        };
    }
    getContent(note, context) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.config.template) {
                const path = replaceTemplateVariables(this.config.template.endsWith(".md") ? this.config.template : this.config.template + ".md", context);
                const templateFile = this.app.vault.getAbstractFileByPath(path);
                if (templateFile instanceof obsidian.TFile) {
                    const templateContent = yield this.app.vault.cachedRead(templateFile);
                    return tryApplyingTemplater(this.app, templateFile, note, replaceTemplateVariables(templateContent, context));
                }
            }
            return "";
        });
    }
    clearNotes() {
        return __awaiter(this, void 0, void 0, function* () {
            const proomises = [];
            for (const entry of this.intervals) {
                if (!entry.path)
                    continue;
                const file = this.app.vault.getAbstractFileByPath(entry.path);
                if (!file)
                    continue;
                if (!(file instanceof obsidian.TFile))
                    continue;
                proomises.push(new Promise((resolve) => {
                    this.app.fileManager.processFrontMatter(file, (frontmatter) => {
                        delete frontmatter[FRONTMATTER_ID_KEY];
                        delete frontmatter[FRONTMATTER_START_DATE_KEY];
                        delete frontmatter[FRONTMATTER_END_DATE_KEY];
                        delete frontmatter[FRONTMATTER_INDEX_KEY];
                        resolve();
                    });
                }));
            }
            yield Promise.allSettled(proomises);
        });
    }
    deleteNotes() {
        return __awaiter(this, void 0, void 0, function* () {
            const proomises = [];
            for (const entry of this.intervals) {
                if (!entry.path)
                    continue;
                const file = this.app.vault.getAbstractFileByPath(entry.path);
                if (!file)
                    continue;
                proomises.push(this.app.vault.delete(file));
            }
            yield Promise.allSettled(proomises);
        });
    }
}

class CodeBlockIntervalNav extends obsidian.MarkdownRenderChild {
    constructor(containerEl, journal, startDate, addLinks = true) {
        super(containerEl);
        this.journal = journal;
        this.startDate = startDate;
        this.addLinks = addLinks;
    }
    display() {
        this.containerEl.empty();
        const view = this.containerEl.createDiv({
            cls: "interval-nav-view",
        });
        const prevInterval = this.journal.findPreviousInterval(this.startDate);
        const prevBlock = view.createDiv({
            cls: `interval-nav-prev`,
        });
        if (prevInterval) {
            this.renderInterval(prevBlock, prevInterval, this.journal);
        }
        const currentInterval = this.journal.findInterval(this.startDate);
        const current = view.createDiv({
            cls: `interval-nav-current`,
        });
        if (currentInterval)
            this.renderInterval(current, currentInterval, this.journal, false);
        const iconPrev = current.createDiv({
            cls: "interval-nav-icon interval-nav-icon-prev",
        });
        const iconPrevEl = obsidian.getIcon("arrow-left");
        if (iconPrevEl && prevInterval)
            iconPrev.appendChild(iconPrevEl);
        if (prevInterval && this.addLinks) {
            iconPrev.classList.add("journal-clickable");
            iconPrev.dataset.date = prevInterval.startDate.format("YYYY-MM-DD");
            iconPrev.on("click", ".interval-nav-icon-prev", (e) => {
                var _a, _b;
                const date = (_b = (_a = e.currentTarget) === null || _a === void 0 ? void 0 : _a.dataset) === null || _b === void 0 ? void 0 : _b.date;
                if (date) {
                    this.journal.open(date);
                }
            });
        }
        const nextInterval = this.journal.findNextInterval(this.startDate);
        const iconNext = current.createDiv({
            cls: "interval-nav-icon interval-nav-icon-next",
        });
        const iconNextEl = obsidian.getIcon("arrow-right");
        if (iconNextEl && nextInterval)
            iconNext.appendChild(iconNextEl);
        if (nextInterval && this.addLinks) {
            iconNext.classList.add("journal-clickable");
            iconNext.dataset.date = nextInterval.startDate.format("YYYY-MM-DD");
            iconNext.on("click", ".interval-nav-icon-next", (e) => {
                var _a, _b;
                const date = (_b = (_a = e.currentTarget) === null || _a === void 0 ? void 0 : _a.dataset) === null || _b === void 0 ? void 0 : _b.date;
                if (date) {
                    this.journal.open(date);
                }
            });
        }
        const nextBlock = view.createDiv({
            cls: `interval-nav-next`,
        });
        if (nextInterval)
            this.renderInterval(nextBlock, nextInterval, this.journal);
    }
    renderInterval(parent, interval, journal, addLinks = true) {
        const context = journal.getTemplateContext(interval);
        const wrapper = parent.createDiv({
            cls: "interval-wrapper",
        });
        if (this.addLinks && addLinks) {
            wrapper.classList.add("journal-clickable");
            wrapper.on("click", ".interval-wrapper", (e) => {
                var _a, _b;
                const date = (_b = (_a = e.currentTarget) === null || _a === void 0 ? void 0 : _a.dataset) === null || _b === void 0 ? void 0 : _b.date;
                if (date) {
                    journal.open(date);
                }
            });
        }
        wrapper.dataset.date = interval.startDate.format("YYYY-MM-DD");
        const name = replaceTemplateVariables(journal.navNameTemplate, context);
        wrapper.createDiv({
            cls: "interval-name",
            text: name,
        });
        const dates = replaceTemplateVariables(journal.navDatesTemplate, context).replaceAll("|", "\n");
        wrapper.createDiv({
            cls: "interval-dates",
            text: dates,
        });
    }
}

class IntervalCodeBlocksModal extends obsidian.Modal {
    constructor(app, config, calendar) {
        super(app);
        this.calendar = calendar;
        this.journal = new IntervalJournal(app, config, calendar);
    }
    onOpen() {
        this.titleEl.innerText = "Interval code blocks";
        this.containerEl.addClass("calendar-code-block-modal");
        this.contentEl.on("click", ".journal-code-block", (e) => {
            navigator.clipboard.writeText(e.target.innerText);
        });
        this.display();
    }
    display() {
        const { contentEl } = this;
        contentEl.empty();
        contentEl.createEl("p", {
            cls: "journal-hint",
            text: "Click on a code block to copy it to your clipboard.",
        });
        const navBlockContainer = contentEl.createDiv({
            cls: "journal-code-block",
        });
        navBlockContainer.createSpan({
            text: "```interval-nav",
        });
        navBlockContainer.createEl("br");
        navBlockContainer.createSpan({
            text: "```",
        });
        contentEl.createEl("p", {
            text: "Interval navigation code block helps navigating relative to current note.",
        });
        contentEl.createEl("p", {
            text: "For current config it will look like this:",
        });
        const blockWrapper = contentEl.createDiv();
        new CodeBlockIntervalNav(blockWrapper, this.journal, this.calendar.today().format("YYYY-MM-DD"), false).display();
    }
}

const pr = new Intl.PluralRules("en-US", { type: "ordinal" });
const suffixes = new Map([
    ["one", "st"],
    ["two", "nd"],
    ["few", "rd"],
    ["other", "th"],
]);
const formatOrdinals = (n) => {
    const rule = pr.select(n);
    const suffix = suffixes.get(rule);
    return `${n}${suffix}`;
};

class SettingsIntervalPage extends SettingsWidget {
    constructor(app, manager, containerEl, config, calendar) {
        super(app);
        this.manager = manager;
        this.containerEl = containerEl;
        this.config = config;
        this.calendar = calendar;
        if (!this.config.calendar_view) {
            this.config.calendar_view = deepCopy(DEFAULT_CONFIG_INTERVAL.calendar_view);
        }
    }
    get headingText() {
        return `Configuring ${this.config.name}`;
    }
    get dateFormat() {
        return this.config.dateFormat || DEFAULT_DATE_FORMAT;
    }
    get ribbonIcon() {
        return this.config.ribbon.icon || DEFAULT_RIBBON_ICONS_INTERVAL;
    }
    display() {
        const { containerEl } = this;
        const heading = new obsidian.Setting(containerEl)
            .setName(this.headingText)
            .setDesc(`Duration: ${this.config.duration} ${this.config.granularity}, ${formatOrdinals(this.config.start_index)} starts on ${this.config.start_date}, index ${this.config.numeration_type === "increment" ? "increases constantly" : "resets every year"}`)
            .setHeading()
            .addButton((button) => {
            button.setButtonText("Back to list").onClick(() => {
                this.navigate({ type: "home" });
            });
        });
        const badge = heading.nameEl.createEl("span");
        badge.innerText = `ID: ${this.config.id}`;
        badge.classList.add("flair");
        new obsidian.Setting(containerEl).setName("Journal Name").addText((text) => {
            text.setValue(this.config.name).onChange(() => {
                this.config.name = text.getValue();
                heading.setName(this.headingText);
                this.save();
            });
        });
        new obsidian.Setting(containerEl)
            .setName("Limit note creation")
            .setDesc("Will prevent creating new notes before journal start date")
            .addToggle((toggle) => {
            toggle.setValue(this.config.limitCreation).onChange((value) => {
                this.config.limitCreation = value;
                this.save();
            });
        });
        const endSetting = new obsidian.Setting(containerEl)
            .setName("Ends")
            .setDesc("Define when journal should end")
            .addDropdown((dropdown) => {
            var _a;
            dropdown
                .addOptions({
                never: "Never",
                date: "On",
                repeats: "After",
            })
                .setValue((_a = this.config.end_type) !== null && _a !== void 0 ? _a : "never")
                .onChange((value) => {
                this.config.end_type = value;
                this.save();
                this.display();
            });
        });
        if (this.config.end_type === "date") {
            endSetting.addButton((button) => {
                button.setButtonText(this.config.end_date || "Pick date").onClick(() => {
                    new DatePickerModal(this.app, this.manager, (date) => {
                        this.config.end_date = date;
                        this.save();
                        this.display();
                    }, this.config.end_date).open();
                });
            });
        }
        else if (this.config.end_type === "repeats") {
            endSetting.addText((text) => {
                var _a;
                text.inputEl.type = "number";
                text.inputEl.classList.add("journal-small-input");
                text.setValue(String((_a = this.config.repeats) !== null && _a !== void 0 ? _a : 1)).onChange((value) => {
                    if (value) {
                        this.config.repeats = parseInt(value, 10);
                        this.save();
                    }
                });
                endSetting.controlEl.createSpan({ text: "times" });
            });
        }
        new obsidian.Setting(containerEl)
            .setName("Open on Startup")
            .setDesc("Open a note whenever you open this vault?")
            .addToggle((toggle) => {
            toggle.setValue(this.config.openOnStartup).onChange(() => {
                this.config.openOnStartup = toggle.getValue();
                this.save(true);
            });
        });
        new obsidian.Setting(containerEl)
            .setName("Open Note")
            .setDesc("Select how to open a note when navigating this journal")
            .addDropdown((dropdown) => {
            var _a;
            dropdown
                .addOptions({
                active: "Replacing active note",
                tab: "In new tab",
                split: "Adjusten to active note",
                window: "In popout window",
            })
                .setValue((_a = this.config.openMode) !== null && _a !== void 0 ? _a : "active")
                .onChange((value) => {
                this.config.openMode = value;
                this.save();
            });
        });
        const nameTemplate = new obsidian.Setting(containerEl).setName("Note name template").addText((text) => {
            text
                .setPlaceholder(DEFAULT_NAME_TEMPLATE_INTERVAL)
                .setValue(this.config.nameTemplate)
                .onChange((value) => {
                this.config.nameTemplate = value;
                this.save();
            });
        });
        nameTemplate.descEl.createEl("span", {
            text: "Template used to generate new note name.",
        });
        nameTemplate.descEl.createEl("br");
        this.createVariableReferenceHint(nameTemplate.descEl);
        const dateFormat = new obsidian.Setting(containerEl).setName("Default date format").addMomentFormat((format) => {
            format
                .setPlaceholder(DEFAULT_DATE_FORMAT)
                .setValue(this.config.dateFormat)
                .onChange((value) => {
                this.config.dateFormat = value;
                dateFormatHint.innerText = this.calendar.today().format(this.dateFormat);
                this.save();
            });
        });
        dateFormat.descEl.createEl("span", {
            text: "Used to format dates if not defined in variable.",
        });
        dateFormat.descEl.createEl("br");
        dateFormat.descEl.createEl("a", {
            text: "Syntax reference.",
            href: "https://momentjs.com/docs/#/displaying/format/",
        });
        dateFormat.descEl.createEl("br");
        dateFormat.descEl.createEl("span", {
            text: "Your current syntax looks like this: ",
        });
        const dateFormatHint = dateFormat.descEl.createEl("b", {
            cls: "u-pop",
        });
        dateFormatHint.innerText = this.calendar.today().format(this.dateFormat);
        const folder = new obsidian.Setting(containerEl).setName("Folder").addText((text) => {
            new FolderSuggestion(this.app, text.inputEl);
            text.setValue(this.config.folder).onChange((value) => {
                this.config.folder = value;
                this.save();
            });
        });
        folder.descEl.createEl("span", {
            text: "New notes will be created in this folder.",
        });
        folder.descEl.createEl("br");
        this.createVariableReferenceHint(folder.descEl);
        const template = new obsidian.Setting(containerEl).setName("Template").addText((text) => {
            new TemplateSuggestion(this.app, text.inputEl);
            text.setValue(this.config.template).onChange((value) => {
                this.config.template = value;
                this.save();
            });
        });
        template.descEl.createEl("span", {
            text: "Path to note that will be used as template when creating new notes. ",
        });
        template.descEl.createEl("br");
        this.createVariableReferenceHint(template.descEl);
        template.descEl.createEl("br");
        this.createCodeBlockReferenceHint(template.descEl);
        if (canApplyTemplater(this.app, "<% $>")) {
            template.descEl.createEl("br");
            template.descEl.createSpan({
                text: "Templater syntax is supported. Check plugin description for more info.",
            });
        }
        new obsidian.Setting(containerEl)
            .setName("Show in ribbon?")
            .setDesc("Changing ribbon settings requires Obsidian restart to take effect.")
            .addToggle((toggle) => {
            toggle.setValue(this.config.ribbon.show).onChange((value) => {
                this.config.ribbon.show = value;
                this.save(true);
            });
        });
        if (this.config.ribbon.show) {
            let iconPreviewButton = null;
            new obsidian.Setting(containerEl)
                .setName("Ribbon icon")
                .setDesc("Select icon to be show in ribbon.")
                .addButton((button) => {
                iconPreviewButton = button;
                button.setIcon(this.ribbonIcon).setDisabled(true);
            })
                .addText((text) => {
                new IconSuggestion(this.app, text.inputEl);
                text.setValue(this.config.ribbon.icon).onChange((value) => {
                    this.config.ribbon.icon = value;
                    iconPreviewButton === null || iconPreviewButton === void 0 ? void 0 : iconPreviewButton.setIcon(this.ribbonIcon);
                    this.save();
                });
            });
            new obsidian.Setting(containerEl).setName("Ribbon tooltip").addText((text) => {
                text
                    .setValue(this.config.ribbon.tooltip)
                    .setPlaceholder(`Open current ${this.config.name} note`)
                    .onChange((value) => {
                    this.config.ribbon.tooltip = value;
                    this.save();
                });
            });
        }
        new obsidian.Setting(containerEl)
            .setName("Create note on startup")
            .setDesc("Automatically create notes whenever you open this vault.")
            .addToggle((toggle) => {
            var _a;
            toggle.setValue((_a = this.config.createOnStartup) !== null && _a !== void 0 ? _a : false).onChange((value) => {
                this.config.createOnStartup = value;
                this.save();
            });
        });
        const navNameTemplate = new obsidian.Setting(containerEl).setName("Navigation name template").addText((text) => {
            text
                .setPlaceholder(this.config.nameTemplate || DEFAULT_NAME_TEMPLATE_INTERVAL)
                .setValue(this.config.navNameTemplate)
                .onChange((value) => {
                this.config.navNameTemplate = value;
                this.save();
            });
        });
        navNameTemplate.descEl.createEl("span", {
            text: "Template used to render the name in navigation code blocks.",
        });
        navNameTemplate.descEl.createEl("br");
        this.createVariableReferenceHint(navNameTemplate.descEl);
        const navDatesTemplate = new obsidian.Setting(containerEl).setName("Navigation dates template").addText((text) => {
            text
                .setPlaceholder(this.config.navDatesTemplate || DEFAULT_NAV_DATES_TEMPLATE_INTERVAL)
                .setValue(this.config.navDatesTemplate)
                .onChange((value) => {
                this.config.navDatesTemplate = value;
                this.save();
            });
        });
        navDatesTemplate.descEl.createEl("span", {
            text: "Template used to render the dates in navigation code blocks.",
        });
        navDatesTemplate.descEl.createEl("br");
        this.createVariableReferenceHint(navDatesTemplate.descEl);
        navDatesTemplate.descEl.createEl("span", {
            text: " You can also use the pipe symbol for line breaks.",
        });
        new obsidian.Setting(containerEl).setName("Calendar view").setHeading();
        new obsidian.Setting(containerEl).setName("Show order").addDropdown((dropdown) => {
            var _a, _b;
            dropdown
                .addOption("chrono", "Chronological")
                .addOption("reverse", "Reverse chronological")
                .setValue((_b = (_a = this.config.calendar_view) === null || _a === void 0 ? void 0 : _a.order) !== null && _b !== void 0 ? _b : "chrono")
                .onChange((value) => {
                this.config.calendar_view.order = value;
                this.save();
            });
        });
    }
    createVariableReferenceHint(el) {
        const link = el.createEl("span", {
            cls: "var-ref journal-link",
            text: "Supported variables.",
        });
        link.on("click", ".var-ref", () => {
            new VariableReferenceModal(this.app, "interval", "year", this.config.dateFormat).open();
        });
    }
    createCodeBlockReferenceHint(el) {
        const link = el.createEl("span", {
            cls: "code-ref journal-link",
            text: "Supported code blocks",
        });
        link.on("click", ".code-ref", () => {
            new IntervalCodeBlocksModal(this.app, this.config, this.calendar).open();
        });
    }
}

class JournalSettingTab extends obsidian.PluginSettingTab {
    constructor(app, plugin, manager, config) {
        super(app, plugin);
        this.manager = manager;
        this.config = config;
        this.routeState = {
            type: "home",
        };
        plugin.registerEvent(this.app.workspace.on("journal:settings-navigate", (state) => {
            this.routeState = state;
            this.display();
        }));
        plugin.registerEvent(this.app.workspace.on("journal:settings-save", (redraw) => __awaiter(this, void 0, void 0, function* () {
            yield this.config.save();
            if (redraw)
                this.display();
        })));
    }
    display() {
        const { containerEl } = this;
        containerEl.empty();
        switch (this.routeState.type) {
            case "home": {
                new SettingsHomePage(this.app, this.manager, containerEl, this.config).display();
                break;
            }
            case "journal": {
                const journalConfig = this.config.get(this.routeState.id);
                if (!journalConfig) {
                    console.error("Unknown config");
                    this.routeState = { type: "home" };
                    this.display();
                    return;
                }
                switch (journalConfig.type) {
                    case "calendar": {
                        if (this.routeState.section) {
                            new SettingsCalendarSectionPage(this.app, journalConfig, containerEl, journalConfig[this.routeState.section], this.routeState.section, this.manager.calendar).display();
                        }
                        else {
                            new SettingsCalendarPage(this.app, containerEl, journalConfig).display();
                        }
                        break;
                    }
                    case "interval": {
                        new SettingsIntervalPage(this.app, this.manager, containerEl, journalConfig, this.manager.calendar).display();
                        break;
                    }
                }
                break;
            }
            default:
                console.error("not supported", this.routeState);
        }
    }
}

class JournalSuggestModal extends obsidian.SuggestModal {
    constructor(app, journals, cb) {
        super(app);
        this.journals = journals;
        this.cb = cb;
    }
    getSuggestions(query) {
        query = query.toLocaleLowerCase();
        return this.journals.filter((journal) => journal.name.toLocaleLowerCase().contains(query));
    }
    renderSuggestion(value, el) {
        el.setText(value.name);
    }
    onChooseSuggestion(item) {
        this.cb(item);
    }
}

const CUSTOM_LOCALE = "custom-journal-locale";
class CalendarHelper {
    constructor(config) {
        this.config = config;
        if (!obsidian.moment.locales().includes(CUSTOM_LOCALE)) {
            const currentLocale = obsidian.moment.locale();
            obsidian.moment.defineLocale(CUSTOM_LOCALE, extractCurrentlocaleData());
            obsidian.moment.locale(currentLocale);
        }
        this.updateLocale();
    }
    date(date, format) {
        const md = date ? obsidian.moment(date, format) : obsidian.moment();
        if (this.config.firstDayOfWeek !== -1) {
            md.locale(CUSTOM_LOCALE);
        }
        return md;
    }
    today() {
        const md = obsidian.moment();
        if (this.config.firstDayOfWeek !== -1) {
            md.locale(CUSTOM_LOCALE);
        }
        return md.startOf("day");
    }
    updateLocale() {
        var _a;
        const currentLocale = obsidian.moment.locale();
        obsidian.moment.updateLocale(CUSTOM_LOCALE, {
            week: {
                dow: this.config.firstDayOfWeek,
                doy: 7 + this.config.firstDayOfWeek - ((_a = this.config.firstWeekOfYear) !== null && _a !== void 0 ? _a : 1),
            },
        });
        obsidian.moment.locale(currentLocale);
    }
}

class ConnectNoteModal extends obsidian.Modal {
    constructor(app, manager, file) {
        super(app);
        this.manager = manager;
        this.file = file;
        this.journalFrontMatter = null;
        this.journalId = null;
        this.override = false;
        this.rename = false;
        this.move = false;
        this.readFrontMatter();
    }
    readFrontMatter() {
        return __awaiter(this, void 0, void 0, function* () {
            this.journalFrontMatter = yield this.manager.getJournalData(this.file.path);
            if (this.journalFrontMatter) {
                this.display();
            }
        });
    }
    onOpen() {
        this.display();
        this.titleEl.setText("Connect note to a journal");
    }
    clearSelections() {
        this.journalId = null;
        this.calendarType = undefined;
        this.date = undefined;
        this.interval = undefined;
        this.override = false;
        this.rename = false;
        this.move = false;
    }
    display() {
        const { contentEl } = this;
        contentEl.empty();
        if (this.journalFrontMatter) {
            this.renderConnectedNote();
            return;
        }
        new obsidian.Setting(contentEl).setName("Select journal").addDropdown((dropdown) => {
            const journals = Object.entries(this.manager.getAll());
            journals.sort((a, b) => a[1].name.localeCompare(b[1].name));
            const options = {};
            if (journals.length > 1) {
                options[""] = "";
            }
            else {
                this.journalId = journals[0][0];
            }
            for (const [id, journal] of journals) {
                options[id] = journal.name;
            }
            dropdown.addOptions(options);
            if (this.journalId)
                dropdown.setValue(this.journalId);
            dropdown.onChange((value) => {
                this.clearSelections();
                this.journalId = value;
                this.display();
            });
        });
        if (this.journalId) {
            this.renderJournalSettings(this.journalId);
        }
    }
    renderJournalSettings(id) {
        const journal = this.manager.get(id);
        if (!journal)
            return;
        if (journal.type === "calendar") {
            this.renderCalendarJournalSettings(journal);
        }
        else if (journal.type === "interval") {
            this.renderIntervalJournalSettings(journal);
        }
    }
    renderCalendarJournalSettings(journal) {
        var _a, _b, _c;
        const { contentEl } = this;
        new obsidian.Setting(contentEl).setName("Note type").addDropdown((dropdown) => {
            const options = {
                "": "",
            };
            for (const [granularity, name] of Object.entries(SECTIONS_MAP)) {
                if (journal.config[granularity].enabled) {
                    options[granularity] = name;
                }
            }
            if (Object.keys(options).length === 2) {
                delete options[""];
                this.calendarType = Object.keys(options)[0];
            }
            dropdown.addOptions(options);
            if (this.calendarType && journal.config[this.calendarType].enabled) {
                dropdown.setValue(this.calendarType);
            }
            else {
                this.calendarType = undefined;
            }
            dropdown.onChange((value) => {
                this.calendarType = value;
                this.date = undefined;
                this.display();
            });
        });
        const type = this.calendarType;
        if (type) {
            new obsidian.Setting(contentEl).setName("Date").addButton((button) => {
                const buttonText = this.date
                    ? this.manager.calendar.date(this.date).format(journal[type].dateFormat)
                    : "Pick date";
                button.setButtonText(buttonText).onClick(() => {
                    new DatePickerModal(this.app, this.manager, (date) => {
                        this.date = date;
                        this.override = false;
                        this.rename = false;
                        this.move = false;
                        this.display();
                    }, this.date, this.calendarType).open();
                });
            });
        }
        if (this.date && this.calendarType) {
            const section = journal[this.calendarType];
            const rangeStart = section.getRangeStart(this.date);
            const rangeEnd = section.getRangeEnd(this.date);
            const indexed = journal.index.get(rangeStart, this.calendarType);
            if (indexed) {
                const overrideEl = new obsidian.Setting(contentEl).setName("Override").addToggle((toggle) => {
                    toggle.setValue(this.override).onChange((value) => {
                        this.override = value;
                        this.display();
                    });
                });
                overrideEl.descEl.createSpan({
                    text: "Other note ",
                });
                overrideEl.descEl.createEl("b", {
                    cls: "u-pop",
                    text: indexed.path,
                });
                overrideEl.descEl.createSpan({
                    text: " is connected to this date",
                });
            }
            if (!indexed || this.override) {
                const expectedName = section.getDateFilename(rangeStart, rangeEnd);
                if (expectedName !== this.file.name) {
                    const renameEl = new obsidian.Setting(contentEl).setName("Rename").addToggle((toggle) => {
                        toggle.setValue(this.rename).onChange((value) => {
                            this.rename = value;
                        });
                    });
                    renameEl.descEl.createSpan({
                        text: "Note name ",
                    });
                    renameEl.descEl.createEl("b", {
                        cls: "u-pop",
                        text: this.file.name,
                    });
                    renameEl.descEl.createSpan({
                        text: " differs from journal note name config: ",
                    });
                    renameEl.descEl.createEl("b", {
                        cls: "u-pop",
                        text: expectedName,
                    });
                }
                const expectedFolder = section.getDateFolder(rangeStart, rangeEnd) || "/";
                if (expectedFolder !== ((_a = this.file.parent) === null || _a === void 0 ? void 0 : _a.path)) {
                    const moveEl = new obsidian.Setting(contentEl).setName("Move").addToggle((toggle) => {
                        toggle.setValue(this.move).onChange((value) => {
                            this.move = value;
                        });
                    });
                    moveEl.descEl.createSpan({
                        text: "Note folder ",
                    });
                    moveEl.descEl.createEl("b", {
                        cls: "u-pop",
                        text: (_c = (_b = this.file.parent) === null || _b === void 0 ? void 0 : _b.path) !== null && _c !== void 0 ? _c : "/",
                    });
                    moveEl.descEl.createSpan({
                        text: " differs from journal folder path config: ",
                    });
                    moveEl.descEl.createEl("b", {
                        cls: "u-pop",
                        text: expectedFolder,
                    });
                }
                new obsidian.Setting(contentEl).addButton((button) => {
                    button
                        .setButtonText("Connect")
                        .setCta()
                        .onClick(() => __awaiter(this, void 0, void 0, function* () {
                        yield section.connectNote(this.file, rangeStart, rangeEnd, {
                            override: this.override,
                            rename: this.rename,
                            move: this.move,
                        });
                        this.close();
                    }));
                });
            }
        }
    }
    renderIntervalJournalSettings(journal) {
        var _a, _b, _c;
        const { contentEl } = this;
        new obsidian.Setting(contentEl).setName("Interval").addButton((button) => {
            const buttonText = this.interval ? journal.getIntervalFileName(this.interval) : "Pick any date in interval";
            button.setButtonText(buttonText).onClick(() => {
                new DatePickerModal(this.app, this.manager, (date) => {
                    this.interval = journal.findInterval(date) || undefined;
                    this.override = false;
                    this.rename = false;
                    this.move = false;
                    this.display();
                }, this.interval ? this.interval.startDate.format("YYYY-MM-DD") : undefined).open();
            });
        });
        const interval = this.interval;
        if (interval) {
            if (interval.path) {
                const overrideEl = new obsidian.Setting(contentEl).setName("Override").addToggle((toggle) => {
                    toggle.setValue(this.override).onChange((value) => {
                        this.override = value;
                    });
                });
                overrideEl.descEl.createSpan({
                    text: "Other note ",
                });
                overrideEl.descEl.createEl("b", {
                    cls: "u-pop",
                    text: interval.path,
                });
                overrideEl.descEl.createSpan({
                    text: " is connected to this interval",
                });
            }
            if (!interval.path || this.override) {
                const expectedName = journal.getIntervalFileName(interval) + ".md";
                if (expectedName !== this.file.name) {
                    const renameEl = new obsidian.Setting(contentEl).setName("Rename").addToggle((toggle) => {
                        toggle.setValue(this.rename).onChange((value) => {
                            this.rename = value;
                        });
                    });
                    renameEl.descEl.createSpan({
                        text: "Note name ",
                    });
                    renameEl.descEl.createEl("b", {
                        cls: "u-pop",
                        text: this.file.name,
                    });
                    renameEl.descEl.createSpan({
                        text: " differs from journal note name config: ",
                    });
                    renameEl.descEl.createEl("b", {
                        cls: "u-pop",
                        text: expectedName,
                    });
                }
                const expectedFolder = journal.getIntervalFolderPath(interval) || "/";
                if (expectedFolder !== ((_a = this.file.parent) === null || _a === void 0 ? void 0 : _a.path)) {
                    const moveEl = new obsidian.Setting(contentEl).setName("Move").addToggle((toggle) => {
                        toggle.setValue(this.move).onChange((value) => {
                            this.move = value;
                        });
                    });
                    moveEl.descEl.createSpan({
                        text: "Note folder ",
                    });
                    moveEl.descEl.createEl("b", {
                        cls: "u-pop",
                        text: (_c = (_b = this.file.parent) === null || _b === void 0 ? void 0 : _b.path) !== null && _c !== void 0 ? _c : "/",
                    });
                    moveEl.descEl.createSpan({
                        text: " differs from journal folder path config: ",
                    });
                    moveEl.descEl.createEl("b", {
                        cls: "u-pop",
                        text: expectedFolder,
                    });
                }
                new obsidian.Setting(contentEl).addButton((button) => {
                    button
                        .setButtonText("Connect")
                        .setCta()
                        .onClick(() => __awaiter(this, void 0, void 0, function* () {
                        yield journal.connectNote(this.file, interval, {
                            override: this.override,
                            rename: this.rename,
                            move: this.move,
                        });
                        this.close();
                    }));
                });
            }
        }
    }
    renderConnectedNote() {
        const { contentEl } = this;
        const journalData = this.journalFrontMatter;
        if (!journalData)
            return;
        const journal = this.manager.get(journalData.id);
        if (!journal)
            return;
        const title = new obsidian.Setting(contentEl).setName("Note is already connected");
        title.descEl.createSpan({
            text: `Journal: `,
        });
        title.descEl.createEl("b", {
            cls: "u-pop",
            text: journal === null || journal === void 0 ? void 0 : journal.name,
        });
        new obsidian.Setting(contentEl)
            .addButton((button) => {
            button.setButtonText("Cancel").onClick(() => __awaiter(this, void 0, void 0, function* () {
                this.close();
            }));
        })
            .addButton((button) => {
            button
                .setButtonText("Disconnect")
                .setCta()
                .onClick(() => __awaiter(this, void 0, void 0, function* () {
                yield journal.disconnectNote(this.file.path);
                this.journalFrontMatter = null;
                this.display();
            }));
        });
    }
}

class JournalManager extends obsidian.Component {
    constructor(app, plugin, config) {
        super();
        this.app = app;
        this.plugin = plugin;
        this.config = config;
        this.journals = new Map();
        this.fileFrontMatters = new Map();
        this.onRenamed = (file, oldPath) => {
            if (file instanceof obsidian.TFile) {
                this.clearForPath(oldPath);
                this.indexFile(file);
            }
        };
        this.onDeleted = (file) => {
            if (file instanceof obsidian.TFile) {
                this.clearForPath(file.path);
                this.app.workspace.trigger("journal:index-update");
            }
        };
        this.onMetadataChanged = (file) => {
            this.clearForPath(file.path);
            this.indexFile(file);
        };
        this.calendar = new CalendarHelper(this.config.calendar);
        for (const journalConfig of config) {
            switch (journalConfig.type) {
                case "calendar": {
                    const calendar = new CalendarJournal(this.app, journalConfig, this.calendar);
                    this.journals.set(journalConfig.id, calendar);
                    break;
                }
                case "interval": {
                    const interval = new IntervalJournal(this.app, journalConfig, this.calendar);
                    this.journals.set(journalConfig.id, interval);
                    break;
                }
            }
        }
    }
    get(id) {
        return this.journals.get(id);
    }
    getByType(type) {
        const journals = [];
        for (const journal of this.journals.values()) {
            if (journal.type === type) {
                journals.push(journal);
            }
        }
        return journals;
    }
    getAll() {
        return Object.fromEntries(this.journals);
    }
    createCalendarJournal(id, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = Object.assign(Object.assign({}, deepCopy(DEFAULT_CONFIG_CALENDAR)), { id,
                name });
            this.config.add(config);
            yield this.config.save();
            const calendar = new CalendarJournal(this.app, config, this.calendar);
            this.journals.set(id, calendar);
            return id;
        });
    }
    createIntervalJournal(config) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = config.id;
            this.config.add(config);
            yield this.config.save();
            const calendar = new IntervalJournal(this.app, config, this.calendar);
            this.journals.set(id, calendar);
            return id;
        });
    }
    autoCreateNotes() {
        return __awaiter(this, void 0, void 0, function* () {
            for (const journal of this.journals.values()) {
                yield journal.autoCreateNotes();
            }
        });
    }
    openStartupNote() {
        return __awaiter(this, void 0, void 0, function* () {
            for (const journal of this.journals.values()) {
                yield journal.openStartupNote();
            }
        });
    }
    configureCommands() {
        for (const [id, label] of Object.entries(Object.assign(Object.assign({}, intervalCommands), calendarCommands))) {
            this.plugin.addCommand({
                id: `journal:${id}`,
                name: label,
                checkCallback: (checking) => {
                    const journals = this.getJournalsSupportingCommand(id);
                    if (journals.length > 0) {
                        if (!checking) {
                            this.execCommand(id, journals);
                        }
                        return true;
                    }
                    return false;
                },
            });
        }
        this.plugin.addCommand({
            id: "journal:open-next",
            name: "Open next note",
            editorCallback: (editor, ctx) => __awaiter(this, void 0, void 0, function* () {
                const file = ctx.file;
                if (file) {
                    const data = yield this.getJournalData(file.path);
                    if (data) {
                        const journal = this.journals.get(data.id);
                        if (journal) {
                            const notePath = yield journal.findNextNote(data);
                            if (notePath) {
                                yield journal.openPath(notePath, data);
                            }
                            else {
                                new obsidian.Notice("There is no next note after this one.");
                            }
                        }
                        else {
                            new obsidian.Notice("Unknown journal id.");
                        }
                    }
                    else {
                        new obsidian.Notice("This note is not connected to any journal.");
                    }
                }
            }),
        });
        this.plugin.addCommand({
            id: "journal:open-prev",
            name: "Open previous note",
            editorCallback: (editor, ctx) => __awaiter(this, void 0, void 0, function* () {
                const file = ctx.file;
                if (file) {
                    const data = yield this.getJournalData(file.path);
                    if (data) {
                        const journal = this.journals.get(data.id);
                        if (journal) {
                            const notePath = yield journal.findPreviousNote(data);
                            if (notePath) {
                                yield journal.openPath(notePath, data);
                            }
                            else {
                                new obsidian.Notice("There is no previous note before this one.");
                            }
                        }
                        else {
                            new obsidian.Notice("Unknown journal id.");
                        }
                    }
                    else {
                        new obsidian.Notice("This note is not connected to any journal.");
                    }
                }
            }),
        });
        this.plugin.addCommand({
            id: "journal:connect-note",
            name: "Connect note to a journal",
            editorCallback: (editor, ctx) => __awaiter(this, void 0, void 0, function* () {
                const file = ctx.file;
                if (file) {
                    new ConnectNoteModal(this.app, this, file).open();
                }
            }),
        });
        this.plugin.addCommand({
            id: "journal:open-calendar",
            name: "Open calendar",
            callback: () => {
                let [leaf] = this.app.workspace.getLeavesOfType(CALENDAR_VIEW_TYPE);
                if (!leaf) {
                    this.placeCalendarView();
                    leaf = this.app.workspace.getLeavesOfType(CALENDAR_VIEW_TYPE)[0];
                }
                this.app.workspace.revealLeaf(leaf);
            },
        });
    }
    configureRibbonIcons() {
        for (const journal of this.journals.values()) {
            journal.configureRibbonIcons(this.plugin);
        }
    }
    getJournalsSupportingCommand(id) {
        const journals = [];
        for (const journal of this.journals.values()) {
            if (journal.supportsCommand(id)) {
                journals.push(journal);
            }
        }
        journals.sort((a, b) => a.name.localeCompare(b.name));
        return journals;
    }
    execCommand(id, journals) {
        if (journals.length === 1) {
            const [calendar] = journals;
            calendar.execCommand(id);
        }
        else {
            new JournalSuggestModal(this.app, journals, (calendar) => {
                calendar.execCommand(id);
            }).open();
        }
    }
    reindex() {
        return __awaiter(this, void 0, void 0, function* () {
            const files = this.app.vault.getMarkdownFiles();
            yield Promise.allSettled(files.map((file) => this.indexFile(file)));
            this.app.workspace.trigger("journal:index-update");
            this.setupListeners();
        });
    }
    getJournalData(path) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (this.fileFrontMatters.has(path)) {
                return (_a = this.fileFrontMatters.get(path)) !== null && _a !== void 0 ? _a : null;
            }
            const file = this.app.vault.getAbstractFileByPath(path);
            if (file instanceof obsidian.TFile) {
                const metadata = this.app.metadataCache.getFileCache(file);
                if (metadata) {
                    const { frontmatter } = metadata;
                    if (frontmatter && FRONTMATTER_ID_KEY in frontmatter) {
                        const id = frontmatter[FRONTMATTER_ID_KEY];
                        const journal = this.journals.get(id);
                        if (journal) {
                            const data = journal.parseFrontMatter(frontmatter);
                            if (data) {
                                this.fileFrontMatters.set(path, data);
                                return data;
                            }
                        }
                    }
                }
            }
            this.fileFrontMatters.set(path, null);
            return null;
        });
    }
    indexFile(file) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.getJournalData(file.path);
            if (data) {
                const journal = this.journals.get(data.id);
                if (journal) {
                    journal.indexNote(data, file.path);
                    this.app.workspace.trigger("journal:index-update");
                }
            }
        });
    }
    clearForPath(path) {
        this.fileFrontMatters.delete(path);
        for (const journal of this.journals.values()) {
            journal.clearForPath(path);
        }
    }
    setupListeners() {
        this.registerEvent(this.app.vault.on("rename", this.onRenamed, this));
        this.registerEvent(this.app.vault.on("delete", this.onDeleted, this));
        this.registerEvent(this.app.metadataCache.on("changed", this.onMetadataChanged, this));
    }
    placeCalendarView(moving = false) {
        var _a, _b;
        if (this.app.workspace.getLeavesOfType(CALENDAR_VIEW_TYPE).length > 0) {
            if (!moving)
                return;
            this.app.workspace.getLeavesOfType(CALENDAR_VIEW_TYPE).forEach((leaf) => {
                leaf.detach();
            });
        }
        if (this.config.calendarView.leaf === "left") {
            (_a = this.app.workspace.getLeftLeaf(false)) === null || _a === void 0 ? void 0 : _a.setViewState({ type: CALENDAR_VIEW_TYPE });
        }
        else {
            (_b = this.app.workspace.getRightLeaf(false)) === null || _b === void 0 ? void 0 : _b.setViewState({ type: CALENDAR_VIEW_TYPE });
        }
    }
    deleteJournal(id, notesProcessing) {
        return __awaiter(this, void 0, void 0, function* () {
            const journal = this.journals.get(id);
            if (journal) {
                switch (notesProcessing) {
                    case "clear":
                        yield journal.clearNotes();
                        break;
                    case "delete":
                        yield journal.deleteNotes();
                        break;
                }
                this.journals.delete(id);
                this.config.delete(id);
                yield this.config.save();
            }
        });
    }
}

class CodeBlockTimelineProcessor extends obsidian.MarkdownRenderChild {
    constructor(manager, source, el, ctx) {
        super(el);
        this.manager = manager;
        this.source = source;
        this.el = el;
        this.ctx = ctx;
        this.data = null;
        this.init();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            const lines = this.source.split("\n");
            for (const line of lines) {
                const [key, value] = line.split(":");
                if (key.trim() === "mode") {
                    this.mode = value.trim();
                }
            }
            this.data = yield this.manager.getJournalData(this.ctx.sourcePath);
            if (!this.data) {
                setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                    yield this.readData();
                    this.display();
                }), 150);
                return;
            }
            this.display();
        });
    }
    readData() {
        return __awaiter(this, void 0, void 0, function* () {
            this.data = yield this.manager.getJournalData(this.ctx.sourcePath);
        });
    }
    display() {
        return __awaiter(this, void 0, void 0, function* () {
            this.containerEl.empty();
            yield Promise.resolve();
            if (!this.data) {
                this.containerEl.appendText("Note is not connected to a journal.");
                return;
            }
            const journal = this.manager.get(this.data.id);
            if (!journal) {
                this.containerEl.appendText("Note is connected to a deleted journal.");
                return;
            }
            if (!(journal instanceof CalendarJournal)) {
                this.containerEl.appendText("Note is connected to a non-calendar journal.");
                return;
            }
            const container = this.containerEl.createDiv();
            const mode = this.getMode();
            if (!(mode in timelineModes)) {
                this.containerEl.appendText(`Unknown mode: ${mode}. Supported modes are ${Object.keys(timelineModes).join(", ")}.`);
                return;
            }
            const Block = timelineModes[mode];
            const block = new Block(container, journal, this.data.start_date, this.ctx);
            this.ctx.addChild(block);
            block.display();
        });
    }
    getMode() {
        if (this.mode) {
            return this.mode;
        }
        if (!this.data || !("granularity" in this.data)) {
            return "week";
        }
        return timelineGranularityMapping[this.data.granularity];
    }
}

class JournalConfigManager {
    constructor(plugin) {
        this.plugin = plugin;
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            const saved = yield this.plugin.loadData();
            if (saved) {
                this.settings = saved;
                if (!this.settings.calendar_view) {
                    this.settings.calendar_view = deepCopy(DEFAULT_PLUGIN_SETTINGS.calendar_view);
                    yield this.save();
                }
            }
            else {
                this.settings = deepCopy(DEFAULT_PLUGIN_SETTINGS);
                yield this.save();
            }
        });
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.plugin.saveData(this.settings);
        });
    }
    add(config) {
        this.settings.journals[config.id] = config;
    }
    get(id) {
        return this.settings.journals[id];
    }
    delete(id) {
        delete this.settings.journals[id];
    }
    get size() {
        return Object.keys(this.settings.journals).length;
    }
    get calendar() {
        return this.settings.calendar;
    }
    get calendarView() {
        return this.settings.calendar_view;
    }
    *[Symbol.iterator]() {
        for (const config of Object.values(this.settings.journals)) {
            yield config;
        }
    }
}

class CodeBlockNavProcessor extends obsidian.MarkdownRenderChild {
    constructor(manager, source, el, ctx) {
        super(el);
        this.manager = manager;
        this.source = source;
        this.el = el;
        this.ctx = ctx;
        this.data = null;
        this.init();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.readData();
            if (!this.data) {
                setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                    yield this.readData();
                    this.display();
                }), 150);
                return;
            }
            this.display();
        });
    }
    readData() {
        return __awaiter(this, void 0, void 0, function* () {
            this.data = yield this.manager.getJournalData(this.ctx.sourcePath);
        });
    }
    display() {
        return __awaiter(this, void 0, void 0, function* () {
            this.containerEl.empty();
            if (!this.data) {
                this.containerEl.appendText("Note is not connected to a journal.");
                return;
            }
            const journal = this.manager.get(this.data.id);
            if (!journal) {
                this.containerEl.appendText("Note is connected to deleted journal.");
                return;
            }
            if (!(journal instanceof CalendarJournal)) {
                this.containerEl.appendText("Note is connected to non-calendar journal.");
                return;
            }
            if (!("granularity" in this.data)) {
                this.containerEl.appendText("Note is missing granularity definition.");
                return;
            }
            const container = this.containerEl.createDiv();
            const Block = navBlocks[this.data.granularity];
            const block = new Block(container, journal, this.data.start_date);
            this.ctx.addChild(block);
            block.display();
        });
    }
}

class CodeBlockIntervalProcessor extends obsidian.MarkdownRenderChild {
    constructor(manager, source, el, ctx) {
        super(el);
        this.manager = manager;
        this.source = source;
        this.el = el;
        this.ctx = ctx;
        this.data = null;
        this.init();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.readData();
            if (!this.data) {
                setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                    yield this.readData();
                    this.display();
                }), 150);
                return;
            }
            else {
                this.display();
            }
        });
    }
    readData() {
        return __awaiter(this, void 0, void 0, function* () {
            this.data = yield this.manager.getJournalData(this.ctx.sourcePath);
        });
    }
    display() {
        return __awaiter(this, void 0, void 0, function* () {
            this.containerEl.empty();
            if (!this.data) {
                this.containerEl.appendText("Note is not connected to a journal.");
                return;
            }
            const journal = this.manager.get(this.data.id);
            if (!journal) {
                this.containerEl.appendText("Note is connected to a deleted journal.");
                return;
            }
            if (!(journal instanceof IntervalJournal)) {
                this.containerEl.appendText("Note is connected to a non-interval journal.");
                return;
            }
            const nav = new CodeBlockIntervalNav(this.containerEl, journal, this.data.start_date);
            this.ctx.addChild(nav);
            nav.display();
        });
    }
}

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const INDEX_FORMATS = {
    day: "YYYY-MM-DD",
    week: "YYYY-[W]ww",
    month: "YYYY-MM",
    quarter: "YYYY-[Q]Q",
    year: "YYYY",
};
class CalendarViewMonth {
    constructor(containerEl, manager) {
        this.containerEl = containerEl;
        this.manager = manager;
        this.notesIndex = new Map();
        this.changeCurrentDate(this.manager.calendar.today());
        this.manager.plugin.registerEvent(this.manager.app.workspace.on("journal:settings-save", () => __awaiter(this, void 0, void 0, function* () {
            yield this.updateActiveNote();
            this.display();
        })));
        this.manager.plugin.registerEvent(this.manager.app.workspace.on("journal:index-update", () => __awaiter(this, void 0, void 0, function* () {
            this.updateNotesIndex();
            yield this.updateActiveNote();
            this.display();
        })));
        this.manager.plugin.registerEvent(this.manager.app.workspace.on("file-open", () => __awaiter(this, void 0, void 0, function* () {
            yield this.updateActiveNote();
            this.display();
        })));
        this.manager.plugin.registerEvent(this.manager.app.workspace.on("active-leaf-change", () => __awaiter(this, void 0, void 0, function* () {
            yield this.updateActiveNote();
            // delaying render to avoid missed clicks
            yield delay(100);
            this.display();
        })));
        this.manager.app.workspace.onLayoutReady(() => __awaiter(this, void 0, void 0, function* () {
            yield this.updateActiveNote();
            this.display();
        }));
        this.updateActiveNote().then(() => {
            this.display();
        });
    }
    display() {
        this.containerEl.empty();
        const calendarJournals = this.manager.getByType("calendar");
        const active = this.computedActive(calendarJournals);
        const placeWeeks = this.manager.config.calendarView.weeks || "left";
        const calendar = this.manager.calendar;
        const today = calendar.today();
        const start = this.currentDate.clone().startOf("month");
        const end = this.currentDate.clone().endOf("month");
        const startWithWeek = start.clone().startOf("week");
        const endWithWeek = end.clone().endOf("week");
        const toolbar = this.containerEl.createEl("div", {
            cls: "journal-calendar-view-toolbar",
        });
        this.renderToolbar(toolbar);
        //
        const titleRow = this.containerEl.createEl("div", {
            cls: "journal-calendar-view-title-row",
        });
        this.renderTitleRow(titleRow, start, active);
        const view = this.containerEl.createDiv({
            cls: "journal-calendar-view-month",
        });
        const week = start.clone().startOf("week");
        const weekEnd = week.clone().endOf("week");
        if (placeWeeks !== "none") {
            view.classList.add("with-week");
        }
        if (active.week) {
            view.on("click", ".journal-weeknumber", (e) => {
                var _a, _b;
                const date = (_b = (_a = e.target.closest("[data-date]")) === null || _a === void 0 ? void 0 : _a.dataset) === null || _b === void 0 ? void 0 : _b.date;
                if (date) {
                    this.openDate(date, "week", e);
                }
            });
            view.on("contextmenu", ".journal-weeknumber", (e) => {
                var _a, _b;
                const date = (_b = (_a = e.target.closest("[data-date]")) === null || _a === void 0 ? void 0 : _a.dataset) === null || _b === void 0 ? void 0 : _b.date;
                if (date) {
                    this.showDateContextMenu(date, "week", e);
                }
            });
        }
        if (placeWeeks === "left")
            view.createDiv();
        while (week.isSameOrBefore(weekEnd)) {
            view.createDiv({
                cls: "journal-weekday",
                text: week.format("ddd"),
            });
            week.add(1, "day");
        }
        if (placeWeeks === "right")
            view.createDiv();
        if (active.day) {
            view.on("click", ".journal-day", (e) => {
                var _a, _b;
                const date = (_b = (_a = e.target.closest("[data-date]")) === null || _a === void 0 ? void 0 : _a.dataset) === null || _b === void 0 ? void 0 : _b.date;
                if (date) {
                    this.openDate(date, "day", e);
                }
            });
            view.on("contextmenu", ".journal-day", (e) => {
                var _a, _b;
                const date = (_b = (_a = e.target.closest("[data-date]")) === null || _a === void 0 ? void 0 : _a.dataset) === null || _b === void 0 ? void 0 : _b.date;
                if (date) {
                    this.showDateContextMenu(date, "day", e);
                }
            });
        }
        const curr = startWithWeek.clone();
        while (curr.isSameOrBefore(endWithWeek)) {
            if (placeWeeks === "left" && curr.isSame(curr.clone().startOf("week"), "day")) {
                this.renderWeekNumber(view, curr, active.week);
            }
            const cls = ["journal-day"];
            const text = curr.format("D");
            if (curr.isSame(today, "day")) {
                cls.push("journal-is-today");
            }
            if (this.checkIsActiveCalendar(curr, "day")) {
                cls.push("journal-is-active");
            }
            if (!curr.isSame(start, "month")) {
                cls.push("journal-is-not-same-month");
            }
            if (active.day) {
                cls.push("journal-clickable");
            }
            const day = view.createDiv({
                cls,
                text,
            });
            day.dataset.date = curr.format("YYYY-MM-DD");
            if (this.checkHasNote(curr, "day")) {
                this.renderNoteMarker(day);
            }
            if (placeWeeks === "right" && curr.isSame(curr.clone().endOf("week"), "day")) {
                this.renderWeekNumber(view, curr, active.week);
            }
            curr.add(1, "day");
        }
        this.containerEl.createDiv({
            cls: "journal-separator",
        });
        this.renderIntervals(this.containerEl);
    }
    changeCurrentDate(date) {
        this.currentDate = date;
        this.updateNotesIndex();
        this.display();
    }
    updateNotesIndex() {
        var _a;
        this.notesIndex.clear();
        const start = this.currentDate.clone().startOf("month").startOf("week");
        const end = this.currentDate.clone().endOf("month").endOf("week");
        const journals = this.manager.getByType("calendar");
        for (const journal of journals) {
            const notes = journal.index.find(start, end);
            for (const note of notes) {
                const indexKey = this.manager.calendar.date(note.startDate).format(INDEX_FORMATS[note.granularity]);
                if (!this.notesIndex.has(indexKey)) {
                    this.notesIndex.set(indexKey, []);
                }
                (_a = this.notesIndex.get(indexKey)) === null || _a === void 0 ? void 0 : _a.push({
                    journalId: journal.id,
                    granularity: note.granularity,
                    path: note.path,
                });
            }
        }
    }
    updateActiveNote() {
        return __awaiter(this, void 0, void 0, function* () {
            const file = this.manager.app.workspace.getActiveFile();
            if (file) {
                const data = yield this.manager.getJournalData(file.path);
                if (data) {
                    this.activeFile = data;
                    this.currentDate = this.manager.calendar.date(data.start_date);
                }
                else {
                    this.activeFile = null;
                }
            }
            else {
                this.activeFile = null;
            }
        });
    }
    checkHasNote(date, granularity) {
        const indexKey = date.format(INDEX_FORMATS[granularity]);
        return this.notesIndex.has(indexKey);
    }
    checkIsActiveCalendar(date, granularity) {
        if (!this.activeFile)
            return false;
        if (this.activeFile.type !== "calendar")
            return false;
        if (this.activeFile.granularity !== granularity)
            return false;
        return date.isSame(this.activeFile.start_date, granularity);
    }
    checkIsActiveInterval(id, date) {
        if (!this.activeFile)
            return false;
        if (this.activeFile.type !== "interval")
            return false;
        if (this.activeFile.id !== id)
            return false;
        return date.isSame(this.activeFile.start_date, "day");
    }
    openDate(date, garnularity, event) {
        const journals = this.manager.getByType("calendar").filter((j) => j.config[garnularity].enabled);
        journals.sort((a, b) => a.name.localeCompare(b.name));
        if (journals.length > 0) {
            if (journals.length === 1) {
                journals[0][garnularity].open(date);
            }
            else {
                const menu = new obsidian.Menu();
                for (const journal of journals) {
                    menu.addItem((item) => {
                        item.setTitle(journal.name).onClick(() => {
                            journal[garnularity].open(date);
                        });
                    });
                }
                menu.showAtMouseEvent(event);
            }
        }
    }
    showDateContextMenu(dateString, granularity, event) {
        const date = this.manager.calendar.date(dateString);
        const indexKey = date.format(INDEX_FORMATS[granularity]);
        const notes = this.notesIndex.get(indexKey);
        if (!notes)
            return;
        if (notes.length === 1) {
            this.showContextMenuForPath(notes[0].path, event);
        }
        else {
            const menu = new obsidian.Menu();
            for (const note of notes) {
                menu.addItem((item) => {
                    item.setTitle(note.path).onClick(() => {
                        this.showContextMenuForPath(note.path, event);
                    });
                });
            }
            menu.showAtMouseEvent(event);
        }
    }
    showContextMenuForPath(path, event) {
        const file = this.manager.app.vault.getAbstractFileByPath(path);
        if (file) {
            const menu = new obsidian.Menu();
            this.manager.app.workspace.trigger("file-menu", menu, file, "file-explorer-context-menu", null);
            menu.showAtMouseEvent(event);
        }
    }
    computedActive(journals) {
        const active = {
            day: false,
            week: false,
            month: false,
            quarter: false,
            year: false,
        };
        for (const journal of journals) {
            if (!active.day && journal.config.day.enabled) {
                active.day = true;
            }
            if (!active.week && journal.config.week.enabled) {
                active.week = true;
            }
            if (!active.month && journal.config.month.enabled) {
                active.month = true;
            }
            if (!active.quarter && journal.config.quarter.enabled) {
                active.quarter = true;
            }
            if (!active.year && journal.config.year.enabled) {
                active.year = true;
            }
        }
        return active;
    }
    renderTitleIcon(parent, icon, tooltip, callback) {
        const cls = `journal-${icon}`;
        const iconWrapper = parent.createDiv({
            cls: `journal-clickable ${cls}`,
        });
        iconWrapper.on("click", `.${cls}`, callback);
        const iconEl = obsidian.getIcon(icon);
        if (iconEl) {
            iconWrapper.appendChild(iconEl);
            obsidian.setTooltip(iconWrapper, tooltip);
        }
    }
    renderToolbar(toolbar) {
        this.renderTitleIcon(toolbar, "crosshair", "Pick date", () => {
            new DatePickerModal(this.manager.app, this.manager, (date, e) => {
                this.changeCurrentDate(this.manager.calendar.date(date));
                this.openDate(date, "day", e);
            }, this.currentDate.format("YYYY-MM-DD")).open();
        });
        toolbar.createEl("button", {
            cls: "journal-calendar-view-today",
            text: "Today",
        });
        toolbar.on("click", ".journal-calendar-view-today", (e) => {
            this.changeCurrentDate(this.manager.calendar.today());
            this.openDate(this.manager.calendar.today().format("YYYY-MM-DD"), "day", e);
        });
    }
    renderTitleRow(titleRow, start, active) {
        this.renderTitleIcon(titleRow, "chevrons-left", "Previous year", () => {
            this.changeCurrentDate(this.currentDate.subtract(1, "year"));
        });
        this.renderTitleIcon(titleRow, "chevron-left", "Previous month", () => {
            this.changeCurrentDate(this.currentDate.subtract(1, "month"));
        });
        const titleText = titleRow.createDiv({
            cls: "journal-calendar-view-title-text",
        });
        const month = titleText.createDiv({
            cls: "journal-month",
            text: start.format("MMMM"),
        });
        if (active.month) {
            month.classList.add("journal-clickable");
            month.dataset.date = start.format("YYYY-MM");
            if (this.checkIsActiveCalendar(start, "month")) {
                month.classList.add("journal-is-active");
            }
            titleRow.on("click", ".journal-month", (e) => {
                const date = e.target.dataset.date;
                if (date) {
                    this.openDate(date, "month", e);
                }
            });
            titleRow.on("contextmenu", ".journal-month", (e) => {
                const date = e.target.dataset.date;
                if (date) {
                    this.showDateContextMenu(date, "month", e);
                }
            });
            if (this.checkHasNote(start, "month")) {
                this.renderNoteMarker(month);
            }
        }
        if (active.quarter) {
            const quarter = titleText.createDiv({
                cls: "journal-quarter journal-clickable",
                text: start.format("[Q]Q"),
            });
            quarter.dataset.date = start.format("YYYY-MM");
            if (this.checkIsActiveCalendar(start, "quarter")) {
                quarter.classList.add("journal-is-active");
            }
            titleRow.on("click", ".journal-quarter", (e) => {
                const date = e.target.dataset.date;
                if (date) {
                    this.openDate(date, "quarter", e);
                }
            });
            titleRow.on("contextmenu", ".journal-quarter", (e) => {
                const date = e.target.dataset.date;
                if (date) {
                    this.showDateContextMenu(date, "quarter", e);
                }
            });
            if (this.checkHasNote(start, "quarter")) {
                this.renderNoteMarker(quarter);
            }
        }
        const year = titleText.createDiv({
            cls: "journal-year",
            text: start.format("YYYY"),
        });
        if (active.year) {
            year.classList.add("journal-clickable");
            year.dataset.date = start.format("YYYY");
            if (this.checkIsActiveCalendar(start, "year")) {
                year.classList.add("journal-is-active");
            }
            titleRow.on("click", ".journal-year", (e) => {
                const date = e.target.dataset.date;
                if (date) {
                    this.openDate(date, "year", e);
                }
            });
            titleRow.on("contextmenu", ".journal-year", (e) => {
                const date = e.target.dataset.date;
                if (date) {
                    this.showDateContextMenu(date, "year", e);
                }
            });
            if (this.checkHasNote(start, "year")) {
                this.renderNoteMarker(year);
            }
        }
        this.renderTitleIcon(titleRow, "chevron-right", "Next month", () => {
            this.changeCurrentDate(this.currentDate.add(1, "month"));
        });
        this.renderTitleIcon(titleRow, "chevrons-right", "Next year", () => {
            this.changeCurrentDate(this.currentDate.add(1, "year"));
        });
    }
    renderWeekNumber(parent, curr, active) {
        const weekNumber = parent.createDiv({
            cls: "journal-weeknumber",
            text: curr.format("[W]ww"),
        });
        if (active) {
            weekNumber.classList.add("journal-clickable");
        }
        weekNumber.dataset.date = curr.format("YYYY-MM-DD");
        if (this.checkIsActiveCalendar(curr, "week")) {
            weekNumber.classList.add("journal-is-active");
        }
        if (this.checkHasNote(curr, "week")) {
            this.renderNoteMarker(weekNumber);
        }
    }
    renderNoteMarker(parent) {
        parent.createDiv({
            cls: "journal-note-marker",
        });
    }
    renderIntervals(parent) {
        const intervalJournals = this.manager.getByType("interval");
        for (const intervalJournal of intervalJournals) {
            this.renderIntervalJournal(parent, intervalJournal);
        }
    }
    renderIntervalJournal(parent, journal) {
        var _a;
        const block = parent.createDiv({
            cls: "journal-interval-block",
        });
        block.createEl("h5", {
            text: journal.name,
        });
        const start = this.currentDate.clone().startOf("month").startOf("week");
        const end = this.currentDate.clone().endOf("month").endOf("week");
        const notes = journal.intervals.find(start, end);
        const index = {};
        for (const note of notes) {
            const key = note.startDate.format("YYYY-MM-DD");
            index[key] = note;
        }
        block.on("click", ".journal-interval", (e) => {
            var _a, _b;
            const date = (_b = (_a = e.target.closest("[data-date]")) === null || _a === void 0 ? void 0 : _a.dataset) === null || _b === void 0 ? void 0 : _b.date;
            if (date) {
                journal.open(date);
            }
        });
        block.on("contextmenu", ".journal-interval", (e) => {
            var _a, _b;
            const date = (_b = (_a = e.target.closest("[data-date]")) === null || _a === void 0 ? void 0 : _a.dataset) === null || _b === void 0 ? void 0 : _b.date;
            if (date) {
                const note = index[date];
                if (note === null || note === void 0 ? void 0 : note.path) {
                    this.showContextMenuForPath(note.path, e);
                }
            }
        });
        const intervals = journal.findIntervalsForPeriod(start, end);
        if (((_a = journal.config.calendar_view) === null || _a === void 0 ? void 0 : _a.order) === "reverse") {
            intervals.reverse();
        }
        for (const interval of intervals) {
            const intervalEl = block.createDiv({
                cls: "journal-interval journal-clickable",
            });
            intervalEl.dataset.date = interval.startDate.format("YYYY-MM-DD");
            if (this.checkIsActiveInterval(journal.id, interval.startDate)) {
                intervalEl.classList.add("journal-is-active");
            }
            if (interval.startDate.isSameOrBefore(this.manager.calendar.today(), "day") &&
                interval.endDate.isSameOrAfter(this.manager.calendar.today(), "day")) {
                intervalEl.classList.add("journal-is-current-interval");
            }
            const context = journal.getTemplateContext(interval);
            const name = replaceTemplateVariables(journal.navNameTemplate, context);
            const nameEl = intervalEl.createDiv({
                cls: "journal-interval-name",
                text: name,
            });
            if (index[interval.startDate.format("YYYY-MM-DD")]) {
                this.renderNoteMarker(nameEl);
            }
            const dates = replaceTemplateVariables(journal.navDatesTemplate, context).replaceAll("|", " ");
            intervalEl.createDiv({
                cls: "journal-interval-dates",
                text: dates,
            });
        }
    }
}

class CalendarView extends obsidian.ItemView {
    constructor(leaf, manager) {
        super(leaf);
        this.manager = manager;
    }
    getViewType() {
        return CALENDAR_VIEW_TYPE;
    }
    getDisplayText() {
        return "Calendar";
    }
    getIcon() {
        return "calendar-days";
    }
    onOpen() {
        return __awaiter(this, void 0, void 0, function* () {
            this.display();
        });
    }
    display() {
        const container = this.containerEl.children[1];
        container.empty();
        const monthBlock = container.createDiv({
            cls: "journal-calendar-view",
        });
        new CalendarViewMonth(monthBlock, this.manager);
    }
    onClose() {
        return __awaiter(this, void 0, void 0, function* () {
            // noop
        });
    }
}

class JournalPlugin extends obsidian.Plugin {
    onload() {
        return __awaiter(this, void 0, void 0, function* () {
            const appStartup = document.body.querySelector(".progress-bar") !== null;
            this.config = new JournalConfigManager(this);
            yield this.config.load();
            this.manager = new JournalManager(this.app, this, this.config);
            this.addChild(this.manager);
            this.registerView(CALENDAR_VIEW_TYPE, (leaf) => new CalendarView(leaf, this.manager));
            this.addSettingTab(new JournalSettingTab(this.app, this, this.manager, this.config));
            this.manager.configureRibbonIcons();
            this.registerMarkdownCodeBlockProcessor("calendar-timeline", (source, el, ctx) => {
                const processor = new CodeBlockTimelineProcessor(this.manager, source, el, ctx);
                ctx.addChild(processor);
            });
            this.registerMarkdownCodeBlockProcessor("calendar-nav", (source, el, ctx) => {
                const processor = new CodeBlockNavProcessor(this.manager, source, el, ctx);
                ctx.addChild(processor);
            });
            this.registerMarkdownCodeBlockProcessor("interval-nav", (source, el, ctx) => {
                const processor = new CodeBlockIntervalProcessor(this.manager, source, el, ctx);
                ctx.addChild(processor);
            });
            this.app.workspace.onLayoutReady(() => __awaiter(this, void 0, void 0, function* () {
                yield this.manager.reindex();
                this.manager.placeCalendarView();
                this.manager.configureCommands();
                if (appStartup) {
                    yield this.manager.autoCreateNotes();
                    yield this.manager.openStartupNote();
                }
            }));
        });
    }
    onunload() {
        return __awaiter(this, void 0, void 0, function* () {
            this.app.workspace.getLeavesOfType(CALENDAR_VIEW_TYPE).forEach((leaf) => {
                leaf.detach();
            });
        });
    }
}

module.exports = JournalPlugin;
