'use strict';

var obsidian = require('obsidian');

/*! *****************************************************************************
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
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function isExcalidraw(app, f) {
    if (f.extension === 'excalidraw' || /.*\.excalidraw\.md$/g.test(f.path)) {
        return true;
    }
    var fileCache = app.metadataCache.getFileCache(f);
    return (!!(fileCache === null || fileCache === void 0 ? void 0 : fileCache.frontmatter) && !!fileCache.frontmatter['excalidraw-plugin']);
}
function isKanban(app, f) {
    var fileCache = app.metadataCache.getFileCache(f);
    return (!!(fileCache === null || fileCache === void 0 ? void 0 : fileCache.frontmatter) && !!fileCache.frontmatter['kanban-plugin']);
}
function isExcluded(app, f) {
    if (isExcalidraw(app, f)) {
        return true;
    }
    if (isKanban(app, f)) {
        return true;
    }
    return false;
}

var stockIllegalSymbols = /[\\/:|#^[\]]/g;
var DEFAULT_SETTINGS = {
    userIllegalSymbols: [],
    ignoredFiles: {},
    ignoreRegex: '',
    useFileOpenHook: true,
    useFileSaveHook: true,
    newHeadingStyle: "Prefix" /* Prefix */,
    replaceStyle: false,
    underlineString: '===',
};
var FilenameHeadingSyncPlugin = /** @class */ (function (_super) {
    __extends(FilenameHeadingSyncPlugin, _super);
    function FilenameHeadingSyncPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isRenameInProgress = false;
        return _this;
    }
    FilenameHeadingSyncPlugin.prototype.onload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadSettings()];
                    case 1:
                        _a.sent();
                        this.registerEvent(this.app.vault.on('rename', function (file, oldPath) {
                            if (_this.settings.useFileSaveHook) {
                                return _this.handleSyncFilenameToHeading(file, oldPath);
                            }
                        }));
                        this.registerEvent(this.app.vault.on('modify', function (file) {
                            if (_this.settings.useFileSaveHook) {
                                return _this.handleSyncHeadingToFile(file);
                            }
                        }));
                        this.registerEvent(this.app.workspace.on('file-open', function (file) {
                            if (_this.settings.useFileOpenHook && file !== null) {
                                return _this.handleSyncFilenameToHeading(file, file.path);
                            }
                        }));
                        this.addSettingTab(new FilenameHeadingSyncSettingTab(this.app, this));
                        this.addCommand({
                            id: 'page-heading-sync-ignore-file',
                            name: 'Ignore current file',
                            checkCallback: function (checking) {
                                var leaf = _this.app.workspace.activeLeaf;
                                if (leaf) {
                                    if (!checking) {
                                        _this.settings.ignoredFiles[_this.app.workspace.getActiveFile().path] = null;
                                        _this.saveSettings();
                                    }
                                    return true;
                                }
                                return false;
                            },
                        });
                        this.addCommand({
                            id: 'sync-filename-to-heading',
                            name: 'Sync Filename to Heading',
                            editorCallback: function (editor, view) {
                                return _this.forceSyncFilenameToHeading(view.file);
                            },
                        });
                        this.addCommand({
                            id: 'sync-heading-to-filename',
                            name: 'Sync Heading to Filename',
                            editorCallback: function (editor, view) {
                                return _this.forceSyncHeadingToFilename(view.file);
                            },
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    FilenameHeadingSyncPlugin.prototype.fileIsIgnored = function (activeFile, path) {
        // check exclusions
        if (isExcluded(this.app, activeFile)) {
            return true;
        }
        // check manual ignore
        if (this.settings.ignoredFiles[path] !== undefined) {
            return true;
        }
        // check regex
        try {
            if (this.settings.ignoreRegex === '') {
                return;
            }
            var reg = new RegExp(this.settings.ignoreRegex);
            return reg.exec(path) !== null;
        }
        catch (_a) { }
        return false;
    };
    /**
     * Renames the file with the first heading found
     *
     * @param      {TAbstractFile}  file    The file
     */
    FilenameHeadingSyncPlugin.prototype.handleSyncHeadingToFile = function (file) {
        if (!(file instanceof obsidian.TFile)) {
            return;
        }
        if (file.extension !== 'md') {
            // just bail
            return;
        }
        // if currently opened file is not the same as the one that fired the event, skip
        // this is to make sure other events don't trigger this plugin
        if (this.app.workspace.getActiveFile() !== file) {
            return;
        }
        // if ignored, just bail
        if (this.fileIsIgnored(file, file.path)) {
            return;
        }
        this.forceSyncHeadingToFilename(file);
    };
    FilenameHeadingSyncPlugin.prototype.forceSyncHeadingToFilename = function (file) {
        var _this = this;
        this.app.vault.read(file).then(function (data) { return __awaiter(_this, void 0, void 0, function () {
            var lines, start, heading, sanitizedHeading, newPath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lines = data.split('\n');
                        start = this.findNoteStart(lines);
                        heading = this.findHeading(lines, start);
                        if (heading === null)
                            return [2 /*return*/]; // no heading found, nothing to do here
                        sanitizedHeading = this.sanitizeHeading(heading.text);
                        if (!(sanitizedHeading.length > 0 &&
                            this.sanitizeHeading(file.basename) !== sanitizedHeading)) return [3 /*break*/, 2];
                        newPath = file.parent.path + "/" + sanitizedHeading + ".md";
                        this.isRenameInProgress = true;
                        return [4 /*yield*/, this.app.fileManager.renameFile(file, newPath)];
                    case 1:
                        _a.sent();
                        this.isRenameInProgress = false;
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); });
    };
    /**
     * Syncs the current filename to the first heading
     * Finds the first heading of the file, then replaces it with the filename
     *
     * @param      {TAbstractFile}  file     The file that fired the event
     * @param      {string}         oldPath  The old path
     */
    FilenameHeadingSyncPlugin.prototype.handleSyncFilenameToHeading = function (file, oldPath) {
        if (this.isRenameInProgress) {
            return;
        }
        if (!(file instanceof obsidian.TFile)) {
            return;
        }
        if (file.extension !== 'md') {
            // just bail
            return;
        }
        // if oldpath is ignored, hook in and update the new filepath to be ignored instead
        if (this.fileIsIgnored(file, oldPath.trim())) {
            // if filename didn't change, just bail, nothing to do here
            if (file.path === oldPath) {
                return;
            }
            // If filepath changed and the file was in the ignore list before,
            // remove it from the list and add the new one instead
            if (this.settings.ignoredFiles[oldPath]) {
                delete this.settings.ignoredFiles[oldPath];
                this.settings.ignoredFiles[file.path] = null;
                this.saveSettings();
            }
            return;
        }
        this.forceSyncFilenameToHeading(file);
    };
    FilenameHeadingSyncPlugin.prototype.forceSyncFilenameToHeading = function (file) {
        var _this = this;
        var sanitizedHeading = this.sanitizeHeading(file.basename);
        this.app.vault.read(file).then(function (data) {
            var lines = data.split('\n');
            var start = _this.findNoteStart(lines);
            var heading = _this.findHeading(lines, start);
            if (heading !== null) {
                if (_this.sanitizeHeading(heading.text) !== sanitizedHeading) {
                    _this.replaceHeading(file, lines, heading.lineNumber, heading.style, sanitizedHeading);
                }
            }
            else
                _this.insertHeading(file, lines, start, sanitizedHeading);
        });
    };
    /**
     * Finds the start of the note file, excluding frontmatter
     *
     * @param {string[]} fileLines array of the file's contents, line by line
     * @returns {number} zero-based index of the starting line of the note
     */
    FilenameHeadingSyncPlugin.prototype.findNoteStart = function (fileLines) {
        // check for frontmatter by checking if first line is a divider ('---')
        if (fileLines[0] === '---') {
            // find end of frontmatter
            // if no end is found, then it isn't really frontmatter and function will end up returning 0
            for (var i = 1; i < fileLines.length; i++) {
                if (fileLines[i] === '---') {
                    // end of frontmatter found, next line is start of note
                    return i + 1;
                }
            }
        }
        return 0;
    };
    /**
     * Finds the first heading of the note file
     *
     * @param {string[]} fileLines array of the file's contents, line by line
     * @param {number} startLine zero-based index of the starting line of the note
     * @returns {LinePointer | null} LinePointer to heading or null if no heading found
     */
    FilenameHeadingSyncPlugin.prototype.findHeading = function (fileLines, startLine) {
        for (var i = startLine; i < fileLines.length; i++) {
            if (fileLines[i].startsWith('# ')) {
                return {
                    lineNumber: i,
                    text: fileLines[i].substring(2),
                    style: "Prefix" /* Prefix */,
                };
            }
            else {
                if (fileLines[i + 1] !== undefined &&
                    fileLines[i + 1].match(/^=+$/) !== null) {
                    return {
                        lineNumber: i,
                        text: fileLines[i],
                        style: "Underline" /* Underline */,
                    };
                }
            }
        }
        return null; // no heading found
    };
    FilenameHeadingSyncPlugin.prototype.regExpEscape = function (str) {
        return String(str).replace(/[\\^$*+?.()|[\]{}]/g, '\\$&');
    };
    FilenameHeadingSyncPlugin.prototype.sanitizeHeading = function (text) {
        var _this = this;
        // stockIllegalSymbols is a regExp object, but userIllegalSymbols is a list of strings and therefore they are handled separately.
        text = text.replace(stockIllegalSymbols, '');
        var userIllegalSymbolsEscaped = this.settings.userIllegalSymbols.map(function (str) { return _this.regExpEscape(str); });
        var userIllegalSymbolsRegExp = new RegExp(userIllegalSymbolsEscaped.join('|'), 'g');
        text = text.replace(userIllegalSymbolsRegExp, '');
        return text.trim();
    };
    /**
     * Insert the `heading` at `lineNumber` in `file`.
     *
     * @param {TFile} file the file to modify
     * @param {string[]} fileLines array of the file's contents, line by line
     * @param {number} lineNumber zero-based index of the line to replace
     * @param {string} text the new text
     */
    FilenameHeadingSyncPlugin.prototype.insertHeading = function (file, fileLines, lineNumber, heading) {
        var newStyle = this.settings.newHeadingStyle;
        switch (newStyle) {
            case "Underline" /* Underline */: {
                this.insertLineInFile(file, fileLines, lineNumber, "" + heading);
                this.insertLineInFile(file, fileLines, lineNumber + 1, this.settings.underlineString);
                break;
            }
            case "Prefix" /* Prefix */: {
                this.insertLineInFile(file, fileLines, lineNumber, "# " + heading);
                break;
            }
        }
    };
    /**
     * Modified `file` by replacing the heading at `lineNumber` with `newHeading`,
     * updating the heading style according the user settings.
     *
     * @param {TFile} file the file to modify
     * @param {string[]} fileLines array of the file's contents, line by line
     * @param {number} lineNumber zero-based index of the line to replace
     * @param {HeadingStyle} oldStyle the style of the original heading
     * @param {string} text the new text
     */
    FilenameHeadingSyncPlugin.prototype.replaceHeading = function (file, fileLines, lineNumber, oldStyle, newHeading) {
        var newStyle = this.settings.newHeadingStyle;
        var replaceStyle = this.settings.replaceStyle;
        // If replacing the style
        if (replaceStyle) {
            switch (newStyle) {
                // For underline style, replace heading line...
                case "Underline" /* Underline */: {
                    this.replaceLineInFile(file, fileLines, lineNumber, "" + newHeading);
                    //..., then add or replace underline.
                    switch (oldStyle) {
                        case "Prefix" /* Prefix */: {
                            this.insertLineInFile(file, fileLines, lineNumber + 1, this.settings.underlineString);
                            break;
                        }
                        case "Underline" /* Underline */: {
                            // Update underline with setting.
                            this.replaceLineInFile(file, fileLines, lineNumber + 1, this.settings.underlineString);
                            break;
                        }
                    }
                    break;
                }
                // For prefix style, replace heading line, and possibly delete underline
                case "Prefix" /* Prefix */: {
                    this.replaceLineInFile(file, fileLines, lineNumber, "# " + newHeading);
                    switch (oldStyle) {
                        case "Prefix" /* Prefix */: {
                            // nop
                            break;
                        }
                        case "Underline" /* Underline */: {
                            this.replaceLineInFile(file, fileLines, lineNumber + 1, '');
                            break;
                        }
                    }
                    break;
                }
            }
        }
        else {
            // If not replacing style, match
            switch (oldStyle) {
                case "Underline" /* Underline */: {
                    this.replaceLineInFile(file, fileLines, lineNumber, "" + newHeading);
                    break;
                }
                case "Prefix" /* Prefix */: {
                    this.replaceLineInFile(file, fileLines, lineNumber, "# " + newHeading);
                    break;
                }
            }
        }
    };
    /**
     * Modifies the file by replacing a particular line with new text.
     *
     * The function will add a newline character at the end of the replaced line.
     *
     * If the `lineNumber` parameter is higher than the index of the last line of the file
     * the function will add a newline character to the current last line and append a new
     * line at the end of the file with the new text (essentially a new last line).
     *
     * @param {TFile} file the file to modify
     * @param {string[]} fileLines array of the file's contents, line by line
     * @param {number} lineNumber zero-based index of the line to replace
     * @param {string} text the new text
     */
    FilenameHeadingSyncPlugin.prototype.replaceLineInFile = function (file, fileLines, lineNumber, text) {
        if (lineNumber >= fileLines.length) {
            fileLines.push(text + '\n');
        }
        else {
            fileLines[lineNumber] = text;
        }
        var data = fileLines.join('\n');
        this.app.vault.modify(file, data);
    };
    /**
     * Modifies the file by inserting a line with specified text.
     *
     * The function will add a newline character at the end of the inserted line.
     *
     * @param {TFile} file the file to modify
     * @param {string[]} fileLines array of the file's contents, line by line
     * @param {number} lineNumber zero-based index of where the line should be inserted
     * @param {string} text the text that the line shall contain
     */
    FilenameHeadingSyncPlugin.prototype.insertLineInFile = function (file, fileLines, lineNumber, text) {
        if (lineNumber >= fileLines.length) {
            fileLines.push(text + '\n');
        }
        else {
            fileLines.splice(lineNumber, 0, text);
        }
        var data = fileLines.join('\n');
        this.app.vault.modify(file, data);
    };
    FilenameHeadingSyncPlugin.prototype.loadSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = this;
                        _c = (_b = Object).assign;
                        _d = [{}, DEFAULT_SETTINGS];
                        return [4 /*yield*/, this.loadData()];
                    case 1:
                        _a.settings = _c.apply(_b, _d.concat([_e.sent()]));
                        return [2 /*return*/];
                }
            });
        });
    };
    FilenameHeadingSyncPlugin.prototype.saveSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.saveData(this.settings)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return FilenameHeadingSyncPlugin;
}(obsidian.Plugin));
var FilenameHeadingSyncSettingTab = /** @class */ (function (_super) {
    __extends(FilenameHeadingSyncSettingTab, _super);
    function FilenameHeadingSyncSettingTab(app, plugin) {
        var _this = _super.call(this, app, plugin) || this;
        _this.plugin = plugin;
        _this.app = app;
        return _this;
    }
    FilenameHeadingSyncSettingTab.prototype.display = function () {
        var _this = this;
        var containerEl = this.containerEl;
        var regexIgnoredFilesDiv;
        var renderRegexIgnoredFiles = function (div) {
            // empty existing div
            div.innerHTML = '';
            if (_this.plugin.settings.ignoreRegex === '') {
                return;
            }
            try {
                var files = _this.app.vault.getFiles();
                var reg_1 = new RegExp(_this.plugin.settings.ignoreRegex);
                files
                    .filter(function (file) { return reg_1.exec(file.path) !== null; })
                    .forEach(function (el) {
                    new obsidian.Setting(div).setDesc(el.path);
                });
            }
            catch (e) {
                return;
            }
        };
        containerEl.empty();
        containerEl.createEl('h2', { text: 'Filename Heading Sync' });
        containerEl.createEl('p', {
            text: 'This plugin will overwrite the first heading found in a file with the filename.',
        });
        containerEl.createEl('p', {
            text: 'If no header is found, will insert a new one at the first line (after frontmatter).',
        });
        new obsidian.Setting(containerEl)
            .setName('Custom Illegal Characters/Strings')
            .setDesc('Type characters/strings separated by a comma. This input is space sensitive.')
            .addText(function (text) {
            return text
                .setPlaceholder('[],#,...')
                .setValue(_this.plugin.settings.userIllegalSymbols.join())
                .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.plugin.settings.userIllegalSymbols = value.split(',');
                            return [4 /*yield*/, this.plugin.saveSettings()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        new obsidian.Setting(containerEl)
            .setName('Ignore Regex Rule')
            .setDesc('Ignore rule in RegEx format. All files listed below will get ignored by this plugin.')
            .addText(function (text) {
            return text
                .setPlaceholder('MyFolder/.*')
                .setValue(_this.plugin.settings.ignoreRegex)
                .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            try {
                                new RegExp(value);
                                this.plugin.settings.ignoreRegex = value;
                            }
                            catch (_b) {
                                this.plugin.settings.ignoreRegex = '';
                            }
                            return [4 /*yield*/, this.plugin.saveSettings()];
                        case 1:
                            _a.sent();
                            renderRegexIgnoredFiles(regexIgnoredFilesDiv);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        new obsidian.Setting(containerEl)
            .setName('Use File Open Hook')
            .setDesc('Whether this plugin should trigger when a file is opened, and not just on save. Disable this when you notice conflicts with other plugins that also act on file open.')
            .addToggle(function (toggle) {
            return toggle
                .setValue(_this.plugin.settings.useFileOpenHook)
                .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.plugin.settings.useFileOpenHook = value;
                            return [4 /*yield*/, this.plugin.saveSettings()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        new obsidian.Setting(containerEl)
            .setName('Use File Save Hook')
            .setDesc('Whether this plugin should trigger when a file is saved. Disable this when you want to trigger sync only manually.')
            .addToggle(function (toggle) {
            return toggle
                .setValue(_this.plugin.settings.useFileSaveHook)
                .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.plugin.settings.useFileSaveHook = value;
                            return [4 /*yield*/, this.plugin.saveSettings()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        new obsidian.Setting(containerEl)
            .setName('New Heading Style')
            .setDesc('Which Markdown heading style to use when creating new headings: Prefix ("# Heading") or Underline ("Heading\\n===").')
            .addDropdown(function (cb) {
            return cb
                .addOption("Prefix" /* Prefix */, 'Prefix')
                .addOption("Underline" /* Underline */, 'Underline')
                .setValue(_this.plugin.settings.newHeadingStyle)
                .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (value === 'Prefix') {
                                this.plugin.settings.newHeadingStyle = "Prefix" /* Prefix */;
                            }
                            if (value === 'Underline') {
                                this.plugin.settings.newHeadingStyle = "Underline" /* Underline */;
                            }
                            return [4 /*yield*/, this.plugin.saveSettings()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        new obsidian.Setting(containerEl)
            .setName('Replace Heading Style')
            .setDesc('Whether this plugin should replace existing heading styles when updating headings.')
            .addToggle(function (toggle) {
            return toggle
                .setValue(_this.plugin.settings.replaceStyle)
                .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.plugin.settings.replaceStyle = value;
                            return [4 /*yield*/, this.plugin.saveSettings()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        new obsidian.Setting(containerEl)
            .setName('Underline String')
            .setDesc('The string to use when insert Underline-style headings; should be some number of "="s.')
            .addText(function (text) {
            return text
                .setPlaceholder('===')
                .setValue(_this.plugin.settings.underlineString)
                .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.plugin.settings.underlineString = value;
                            return [4 /*yield*/, this.plugin.saveSettings()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        containerEl.createEl('h2', { text: 'Ignored Files By Regex' });
        containerEl.createEl('p', {
            text: 'All files matching the above RegEx will get listed here',
        });
        regexIgnoredFilesDiv = containerEl.createDiv('test');
        renderRegexIgnoredFiles(regexIgnoredFilesDiv);
        containerEl.createEl('h2', { text: 'Manually Ignored Files' });
        containerEl.createEl('p', {
            text: 'You can ignore files from this plugin by using the "ignore this file" command',
        });
        var _loop_1 = function (key) {
            var ignoredFilesSettingsObj = new obsidian.Setting(containerEl).setDesc(key);
            ignoredFilesSettingsObj.addButton(function (button) {
                button.setButtonText('Delete').onClick(function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                delete this.plugin.settings.ignoredFiles[key];
                                return [4 /*yield*/, this.plugin.saveSettings()];
                            case 1:
                                _a.sent();
                                this.display();
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
        };
        // go over all ignored files and add them
        for (var key in this.plugin.settings.ignoredFiles) {
            _loop_1(key);
        }
    };
    return FilenameHeadingSyncSettingTab;
}(obsidian.PluginSettingTab));

module.exports = FilenameHeadingSyncPlugin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsImV4Y2x1c2lvbnMudHMiLCJtYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXHJcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgICAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fY3JlYXRlQmluZGluZyA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfSk7XHJcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgb1trMl0gPSBtW2tdO1xyXG59KTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgbykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvLCBwKSkgX19jcmVhdGVCaW5kaW5nKG8sIG0sIHApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG4vKiogQGRlcHJlY2F0ZWQgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG4vKiogQGRlcHJlY2F0ZWQgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXlzKCkge1xyXG4gICAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXHJcbiAgICAgICAgICAgIHJba10gPSBhW2pdO1xyXG4gICAgcmV0dXJuIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5KHRvLCBmcm9tLCBwYWNrKSB7XHJcbiAgICBpZiAocGFjayB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAyKSBmb3IgKHZhciBpID0gMCwgbCA9IGZyb20ubGVuZ3RoLCBhcjsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgIGlmIChhciB8fCAhKGkgaW4gZnJvbSkpIHtcclxuICAgICAgICAgICAgaWYgKCFhcikgYXIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmcm9tLCAwLCBpKTtcclxuICAgICAgICAgICAgYXJbaV0gPSBmcm9tW2ldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0by5jb25jYXQoYXIgfHwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZnJvbSkpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XHJcbn0pIDogZnVuY3Rpb24obywgdikge1xyXG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XHJcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHJlY2VpdmVyLCBzdGF0ZSwga2luZCwgZikge1xyXG4gICAgaWYgKGtpbmQgPT09IFwiYVwiICYmICFmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUHJpdmF0ZSBhY2Nlc3NvciB3YXMgZGVmaW5lZCB3aXRob3V0IGEgZ2V0dGVyXCIpO1xyXG4gICAgaWYgKHR5cGVvZiBzdGF0ZSA9PT0gXCJmdW5jdGlvblwiID8gcmVjZWl2ZXIgIT09IHN0YXRlIHx8ICFmIDogIXN0YXRlLmhhcyhyZWNlaXZlcikpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgcmVhZCBwcml2YXRlIG1lbWJlciBmcm9tIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XHJcbiAgICByZXR1cm4ga2luZCA9PT0gXCJtXCIgPyBmIDoga2luZCA9PT0gXCJhXCIgPyBmLmNhbGwocmVjZWl2ZXIpIDogZiA/IGYudmFsdWUgOiBzdGF0ZS5nZXQocmVjZWl2ZXIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZFNldChyZWNlaXZlciwgc3RhdGUsIHZhbHVlLCBraW5kLCBmKSB7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJtXCIpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIG1ldGhvZCBpcyBub3Qgd3JpdGFibGVcIik7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBzZXR0ZXJcIik7XHJcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCB3cml0ZSBwcml2YXRlIG1lbWJlciB0byBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0XCIpO1xyXG4gICAgcmV0dXJuIChraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlciwgdmFsdWUpIDogZiA/IGYudmFsdWUgPSB2YWx1ZSA6IHN0YXRlLnNldChyZWNlaXZlciwgdmFsdWUpKSwgdmFsdWU7XHJcbn1cclxuIiwiaW1wb3J0IHsgQXBwLCBURmlsZSB9IGZyb20gJ29ic2lkaWFuJztcblxuZXhwb3J0IGZ1bmN0aW9uIGlzRXhjYWxpZHJhdyhhcHA6IEFwcCwgZjogVEZpbGUpIHtcbiAgaWYgKGYuZXh0ZW5zaW9uID09PSAnZXhjYWxpZHJhdycgfHwgLy4qXFwuZXhjYWxpZHJhd1xcLm1kJC9nLnRlc3QoZi5wYXRoKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGNvbnN0IGZpbGVDYWNoZSA9IGFwcC5tZXRhZGF0YUNhY2hlLmdldEZpbGVDYWNoZShmKTtcbiAgcmV0dXJuIChcbiAgICAhIWZpbGVDYWNoZT8uZnJvbnRtYXR0ZXIgJiYgISFmaWxlQ2FjaGUuZnJvbnRtYXR0ZXJbJ2V4Y2FsaWRyYXctcGx1Z2luJ11cbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzS2FuYmFuKGFwcDogQXBwLCBmOiBURmlsZSkge1xuICBjb25zdCBmaWxlQ2FjaGUgPSBhcHAubWV0YWRhdGFDYWNoZS5nZXRGaWxlQ2FjaGUoZik7XG4gIHJldHVybiAoXG4gICAgISFmaWxlQ2FjaGU/LmZyb250bWF0dGVyICYmICEhZmlsZUNhY2hlLmZyb250bWF0dGVyWydrYW5iYW4tcGx1Z2luJ11cbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRXhjbHVkZWQoYXBwOiBBcHAsIGY6IFRGaWxlKSB7XG4gIGlmIChpc0V4Y2FsaWRyYXcoYXBwLCBmKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmIChpc0thbmJhbihhcHAsIGYpKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgXG4gIHJldHVybiBmYWxzZTtcbn1cbiIsImltcG9ydCB7XG4gIEFwcCxcbiAgUGx1Z2luLFxuICBQbHVnaW5TZXR0aW5nVGFiLFxuICBTZXR0aW5nLFxuICBUQWJzdHJhY3RGaWxlLFxuICBURmlsZSxcbiAgRWRpdG9yLFxuICBNYXJrZG93blZpZXcsXG59IGZyb20gJ29ic2lkaWFuJztcbmltcG9ydCB7IGlzRXhjbHVkZWQgfSBmcm9tICcuL2V4Y2x1c2lvbnMnO1xuXG5jb25zdCBzdG9ja0lsbGVnYWxTeW1ib2xzID0gL1tcXFxcLzp8I15bXFxdXS9nO1xuXG4vLyBNdXN0IGJlIFN0cmluZ3MgdW5sZXNzIHNldHRpbmdzIGRpYWxvZyBpcyB1cGRhdGVkLlxuY29uc3QgZW51bSBIZWFkaW5nU3R5bGUge1xuICBQcmVmaXggPSAnUHJlZml4JyxcbiAgVW5kZXJsaW5lID0gJ1VuZGVybGluZScsXG59XG5cbmludGVyZmFjZSBMaW5lUG9pbnRlciB7XG4gIGxpbmVOdW1iZXI6IG51bWJlcjtcbiAgdGV4dDogc3RyaW5nO1xuICBzdHlsZTogSGVhZGluZ1N0eWxlO1xufVxuXG5pbnRlcmZhY2UgRmlsZW5hbWVIZWFkaW5nU3luY1BsdWdpblNldHRpbmdzIHtcbiAgdXNlcklsbGVnYWxTeW1ib2xzOiBzdHJpbmdbXTtcbiAgaWdub3JlUmVnZXg6IHN0cmluZztcbiAgaWdub3JlZEZpbGVzOiB7IFtrZXk6IHN0cmluZ106IG51bGwgfTtcbiAgdXNlRmlsZU9wZW5Ib29rOiBib29sZWFuO1xuICB1c2VGaWxlU2F2ZUhvb2s6IGJvb2xlYW47XG4gIG5ld0hlYWRpbmdTdHlsZTogSGVhZGluZ1N0eWxlO1xuICByZXBsYWNlU3R5bGU6IGJvb2xlYW47XG4gIHVuZGVybGluZVN0cmluZzogc3RyaW5nO1xufVxuXG5jb25zdCBERUZBVUxUX1NFVFRJTkdTOiBGaWxlbmFtZUhlYWRpbmdTeW5jUGx1Z2luU2V0dGluZ3MgPSB7XG4gIHVzZXJJbGxlZ2FsU3ltYm9sczogW10sXG4gIGlnbm9yZWRGaWxlczoge30sXG4gIGlnbm9yZVJlZ2V4OiAnJyxcbiAgdXNlRmlsZU9wZW5Ib29rOiB0cnVlLFxuICB1c2VGaWxlU2F2ZUhvb2s6IHRydWUsXG4gIG5ld0hlYWRpbmdTdHlsZTogSGVhZGluZ1N0eWxlLlByZWZpeCxcbiAgcmVwbGFjZVN0eWxlOiBmYWxzZSxcbiAgdW5kZXJsaW5lU3RyaW5nOiAnPT09Jyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZpbGVuYW1lSGVhZGluZ1N5bmNQbHVnaW4gZXh0ZW5kcyBQbHVnaW4ge1xuICBpc1JlbmFtZUluUHJvZ3Jlc3M6IGJvb2xlYW4gPSBmYWxzZTtcbiAgc2V0dGluZ3M6IEZpbGVuYW1lSGVhZGluZ1N5bmNQbHVnaW5TZXR0aW5ncztcblxuICBhc3luYyBvbmxvYWQoKSB7XG4gICAgYXdhaXQgdGhpcy5sb2FkU2V0dGluZ3MoKTtcblxuICAgIHRoaXMucmVnaXN0ZXJFdmVudChcbiAgICAgIHRoaXMuYXBwLnZhdWx0Lm9uKCdyZW5hbWUnLCAoZmlsZSwgb2xkUGF0aCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy51c2VGaWxlU2F2ZUhvb2spIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5oYW5kbGVTeW5jRmlsZW5hbWVUb0hlYWRpbmcoZmlsZSwgb2xkUGF0aCk7XG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICk7XG4gICAgdGhpcy5yZWdpc3RlckV2ZW50KFxuICAgICAgdGhpcy5hcHAudmF1bHQub24oJ21vZGlmeScsIChmaWxlKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLnVzZUZpbGVTYXZlSG9vaykge1xuICAgICAgICAgIHJldHVybiB0aGlzLmhhbmRsZVN5bmNIZWFkaW5nVG9GaWxlKGZpbGUpO1xuICAgICAgICB9XG4gICAgICB9KSxcbiAgICApO1xuXG4gICAgdGhpcy5yZWdpc3RlckV2ZW50KFxuICAgICAgdGhpcy5hcHAud29ya3NwYWNlLm9uKCdmaWxlLW9wZW4nLCAoZmlsZSkgPT4ge1xuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy51c2VGaWxlT3Blbkhvb2sgJiYgZmlsZSAhPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLmhhbmRsZVN5bmNGaWxlbmFtZVRvSGVhZGluZyhmaWxlLCBmaWxlLnBhdGgpO1xuICAgICAgICB9XG4gICAgICB9KSxcbiAgICApO1xuXG4gICAgdGhpcy5hZGRTZXR0aW5nVGFiKG5ldyBGaWxlbmFtZUhlYWRpbmdTeW5jU2V0dGluZ1RhYih0aGlzLmFwcCwgdGhpcykpO1xuXG4gICAgdGhpcy5hZGRDb21tYW5kKHtcbiAgICAgIGlkOiAncGFnZS1oZWFkaW5nLXN5bmMtaWdub3JlLWZpbGUnLFxuICAgICAgbmFtZTogJ0lnbm9yZSBjdXJyZW50IGZpbGUnLFxuICAgICAgY2hlY2tDYWxsYmFjazogKGNoZWNraW5nOiBib29sZWFuKSA9PiB7XG4gICAgICAgIGxldCBsZWFmID0gdGhpcy5hcHAud29ya3NwYWNlLmFjdGl2ZUxlYWY7XG4gICAgICAgIGlmIChsZWFmKSB7XG4gICAgICAgICAgaWYgKCFjaGVja2luZykge1xuICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy5pZ25vcmVkRmlsZXNbXG4gICAgICAgICAgICAgIHRoaXMuYXBwLndvcmtzcGFjZS5nZXRBY3RpdmVGaWxlKCkucGF0aFxuICAgICAgICAgICAgXSA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgdGhpcy5hZGRDb21tYW5kKHtcbiAgICAgIGlkOiAnc3luYy1maWxlbmFtZS10by1oZWFkaW5nJyxcbiAgICAgIG5hbWU6ICdTeW5jIEZpbGVuYW1lIHRvIEhlYWRpbmcnLFxuICAgICAgZWRpdG9yQ2FsbGJhY2s6IChlZGl0b3I6IEVkaXRvciwgdmlldzogTWFya2Rvd25WaWV3KSA9PlxuICAgICAgICB0aGlzLmZvcmNlU3luY0ZpbGVuYW1lVG9IZWFkaW5nKHZpZXcuZmlsZSksXG4gICAgfSk7XG5cbiAgICB0aGlzLmFkZENvbW1hbmQoe1xuICAgICAgaWQ6ICdzeW5jLWhlYWRpbmctdG8tZmlsZW5hbWUnLFxuICAgICAgbmFtZTogJ1N5bmMgSGVhZGluZyB0byBGaWxlbmFtZScsXG4gICAgICBlZGl0b3JDYWxsYmFjazogKGVkaXRvcjogRWRpdG9yLCB2aWV3OiBNYXJrZG93blZpZXcpID0+XG4gICAgICAgIHRoaXMuZm9yY2VTeW5jSGVhZGluZ1RvRmlsZW5hbWUodmlldy5maWxlKSxcbiAgICB9KTtcbiAgfVxuXG4gIGZpbGVJc0lnbm9yZWQoYWN0aXZlRmlsZTogVEZpbGUsIHBhdGg6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIC8vIGNoZWNrIGV4Y2x1c2lvbnNcbiAgICBpZiAoaXNFeGNsdWRlZCh0aGlzLmFwcCwgYWN0aXZlRmlsZSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIGNoZWNrIG1hbnVhbCBpZ25vcmVcbiAgICBpZiAodGhpcy5zZXR0aW5ncy5pZ25vcmVkRmlsZXNbcGF0aF0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gY2hlY2sgcmVnZXhcbiAgICB0cnkge1xuICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuaWdub3JlUmVnZXggPT09ICcnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcmVnID0gbmV3IFJlZ0V4cCh0aGlzLnNldHRpbmdzLmlnbm9yZVJlZ2V4KTtcbiAgICAgIHJldHVybiByZWcuZXhlYyhwYXRoKSAhPT0gbnVsbDtcbiAgICB9IGNhdGNoIHt9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogUmVuYW1lcyB0aGUgZmlsZSB3aXRoIHRoZSBmaXJzdCBoZWFkaW5nIGZvdW5kXG4gICAqXG4gICAqIEBwYXJhbSAgICAgIHtUQWJzdHJhY3RGaWxlfSAgZmlsZSAgICBUaGUgZmlsZVxuICAgKi9cbiAgaGFuZGxlU3luY0hlYWRpbmdUb0ZpbGUoZmlsZTogVEFic3RyYWN0RmlsZSkge1xuICAgIGlmICghKGZpbGUgaW5zdGFuY2VvZiBURmlsZSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZmlsZS5leHRlbnNpb24gIT09ICdtZCcpIHtcbiAgICAgIC8vIGp1c3QgYmFpbFxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGlmIGN1cnJlbnRseSBvcGVuZWQgZmlsZSBpcyBub3QgdGhlIHNhbWUgYXMgdGhlIG9uZSB0aGF0IGZpcmVkIHRoZSBldmVudCwgc2tpcFxuICAgIC8vIHRoaXMgaXMgdG8gbWFrZSBzdXJlIG90aGVyIGV2ZW50cyBkb24ndCB0cmlnZ2VyIHRoaXMgcGx1Z2luXG4gICAgaWYgKHRoaXMuYXBwLndvcmtzcGFjZS5nZXRBY3RpdmVGaWxlKCkgIT09IGZpbGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBpZiBpZ25vcmVkLCBqdXN0IGJhaWxcbiAgICBpZiAodGhpcy5maWxlSXNJZ25vcmVkKGZpbGUsIGZpbGUucGF0aCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmZvcmNlU3luY0hlYWRpbmdUb0ZpbGVuYW1lKGZpbGUpO1xuICB9XG5cbiAgZm9yY2VTeW5jSGVhZGluZ1RvRmlsZW5hbWUoZmlsZTogVEZpbGUpIHtcbiAgICB0aGlzLmFwcC52YXVsdC5yZWFkKGZpbGUpLnRoZW4oYXN5bmMgKGRhdGEpID0+IHtcbiAgICAgIGNvbnN0IGxpbmVzID0gZGF0YS5zcGxpdCgnXFxuJyk7XG4gICAgICBjb25zdCBzdGFydCA9IHRoaXMuZmluZE5vdGVTdGFydChsaW5lcyk7XG4gICAgICBjb25zdCBoZWFkaW5nID0gdGhpcy5maW5kSGVhZGluZyhsaW5lcywgc3RhcnQpO1xuXG4gICAgICBpZiAoaGVhZGluZyA9PT0gbnVsbCkgcmV0dXJuOyAvLyBubyBoZWFkaW5nIGZvdW5kLCBub3RoaW5nIHRvIGRvIGhlcmVcblxuICAgICAgY29uc3Qgc2FuaXRpemVkSGVhZGluZyA9IHRoaXMuc2FuaXRpemVIZWFkaW5nKGhlYWRpbmcudGV4dCk7XG4gICAgICBpZiAoXG4gICAgICAgIHNhbml0aXplZEhlYWRpbmcubGVuZ3RoID4gMCAmJlxuICAgICAgICB0aGlzLnNhbml0aXplSGVhZGluZyhmaWxlLmJhc2VuYW1lKSAhPT0gc2FuaXRpemVkSGVhZGluZ1xuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IG5ld1BhdGggPSBgJHtmaWxlLnBhcmVudC5wYXRofS8ke3Nhbml0aXplZEhlYWRpbmd9Lm1kYDtcbiAgICAgICAgdGhpcy5pc1JlbmFtZUluUHJvZ3Jlc3MgPSB0cnVlO1xuICAgICAgICBhd2FpdCB0aGlzLmFwcC5maWxlTWFuYWdlci5yZW5hbWVGaWxlKGZpbGUsIG5ld1BhdGgpO1xuICAgICAgICB0aGlzLmlzUmVuYW1lSW5Qcm9ncmVzcyA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFN5bmNzIHRoZSBjdXJyZW50IGZpbGVuYW1lIHRvIHRoZSBmaXJzdCBoZWFkaW5nXG4gICAqIEZpbmRzIHRoZSBmaXJzdCBoZWFkaW5nIG9mIHRoZSBmaWxlLCB0aGVuIHJlcGxhY2VzIGl0IHdpdGggdGhlIGZpbGVuYW1lXG4gICAqXG4gICAqIEBwYXJhbSAgICAgIHtUQWJzdHJhY3RGaWxlfSAgZmlsZSAgICAgVGhlIGZpbGUgdGhhdCBmaXJlZCB0aGUgZXZlbnRcbiAgICogQHBhcmFtICAgICAge3N0cmluZ30gICAgICAgICBvbGRQYXRoICBUaGUgb2xkIHBhdGhcbiAgICovXG4gIGhhbmRsZVN5bmNGaWxlbmFtZVRvSGVhZGluZyhmaWxlOiBUQWJzdHJhY3RGaWxlLCBvbGRQYXRoOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5pc1JlbmFtZUluUHJvZ3Jlc3MpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIShmaWxlIGluc3RhbmNlb2YgVEZpbGUpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGZpbGUuZXh0ZW5zaW9uICE9PSAnbWQnKSB7XG4gICAgICAvLyBqdXN0IGJhaWxcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBpZiBvbGRwYXRoIGlzIGlnbm9yZWQsIGhvb2sgaW4gYW5kIHVwZGF0ZSB0aGUgbmV3IGZpbGVwYXRoIHRvIGJlIGlnbm9yZWQgaW5zdGVhZFxuICAgIGlmICh0aGlzLmZpbGVJc0lnbm9yZWQoZmlsZSwgb2xkUGF0aC50cmltKCkpKSB7XG4gICAgICAvLyBpZiBmaWxlbmFtZSBkaWRuJ3QgY2hhbmdlLCBqdXN0IGJhaWwsIG5vdGhpbmcgdG8gZG8gaGVyZVxuICAgICAgaWYgKGZpbGUucGF0aCA9PT0gb2xkUGF0aCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIElmIGZpbGVwYXRoIGNoYW5nZWQgYW5kIHRoZSBmaWxlIHdhcyBpbiB0aGUgaWdub3JlIGxpc3QgYmVmb3JlLFxuICAgICAgLy8gcmVtb3ZlIGl0IGZyb20gdGhlIGxpc3QgYW5kIGFkZCB0aGUgbmV3IG9uZSBpbnN0ZWFkXG4gICAgICBpZiAodGhpcy5zZXR0aW5ncy5pZ25vcmVkRmlsZXNbb2xkUGF0aF0pIHtcbiAgICAgICAgZGVsZXRlIHRoaXMuc2V0dGluZ3MuaWdub3JlZEZpbGVzW29sZFBhdGhdO1xuICAgICAgICB0aGlzLnNldHRpbmdzLmlnbm9yZWRGaWxlc1tmaWxlLnBhdGhdID0gbnVsbDtcbiAgICAgICAgdGhpcy5zYXZlU2V0dGluZ3MoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmZvcmNlU3luY0ZpbGVuYW1lVG9IZWFkaW5nKGZpbGUpO1xuICB9XG5cbiAgZm9yY2VTeW5jRmlsZW5hbWVUb0hlYWRpbmcoZmlsZTogVEZpbGUpIHtcbiAgICBjb25zdCBzYW5pdGl6ZWRIZWFkaW5nID0gdGhpcy5zYW5pdGl6ZUhlYWRpbmcoZmlsZS5iYXNlbmFtZSk7XG4gICAgdGhpcy5hcHAudmF1bHQucmVhZChmaWxlKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICBjb25zdCBsaW5lcyA9IGRhdGEuc3BsaXQoJ1xcbicpO1xuICAgICAgY29uc3Qgc3RhcnQgPSB0aGlzLmZpbmROb3RlU3RhcnQobGluZXMpO1xuICAgICAgY29uc3QgaGVhZGluZyA9IHRoaXMuZmluZEhlYWRpbmcobGluZXMsIHN0YXJ0KTtcblxuICAgICAgaWYgKGhlYWRpbmcgIT09IG51bGwpIHtcbiAgICAgICAgaWYgKHRoaXMuc2FuaXRpemVIZWFkaW5nKGhlYWRpbmcudGV4dCkgIT09IHNhbml0aXplZEhlYWRpbmcpIHtcbiAgICAgICAgICB0aGlzLnJlcGxhY2VIZWFkaW5nKFxuICAgICAgICAgICAgZmlsZSxcbiAgICAgICAgICAgIGxpbmVzLFxuICAgICAgICAgICAgaGVhZGluZy5saW5lTnVtYmVyLFxuICAgICAgICAgICAgaGVhZGluZy5zdHlsZSxcbiAgICAgICAgICAgIHNhbml0aXplZEhlYWRpbmcsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHRoaXMuaW5zZXJ0SGVhZGluZyhmaWxlLCBsaW5lcywgc3RhcnQsIHNhbml0aXplZEhlYWRpbmcpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmRzIHRoZSBzdGFydCBvZiB0aGUgbm90ZSBmaWxlLCBleGNsdWRpbmcgZnJvbnRtYXR0ZXJcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmdbXX0gZmlsZUxpbmVzIGFycmF5IG9mIHRoZSBmaWxlJ3MgY29udGVudHMsIGxpbmUgYnkgbGluZVxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSB6ZXJvLWJhc2VkIGluZGV4IG9mIHRoZSBzdGFydGluZyBsaW5lIG9mIHRoZSBub3RlXG4gICAqL1xuICBmaW5kTm90ZVN0YXJ0KGZpbGVMaW5lczogc3RyaW5nW10pIHtcbiAgICAvLyBjaGVjayBmb3IgZnJvbnRtYXR0ZXIgYnkgY2hlY2tpbmcgaWYgZmlyc3QgbGluZSBpcyBhIGRpdmlkZXIgKCctLS0nKVxuICAgIGlmIChmaWxlTGluZXNbMF0gPT09ICctLS0nKSB7XG4gICAgICAvLyBmaW5kIGVuZCBvZiBmcm9udG1hdHRlclxuICAgICAgLy8gaWYgbm8gZW5kIGlzIGZvdW5kLCB0aGVuIGl0IGlzbid0IHJlYWxseSBmcm9udG1hdHRlciBhbmQgZnVuY3Rpb24gd2lsbCBlbmQgdXAgcmV0dXJuaW5nIDBcbiAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgZmlsZUxpbmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChmaWxlTGluZXNbaV0gPT09ICctLS0nKSB7XG4gICAgICAgICAgLy8gZW5kIG9mIGZyb250bWF0dGVyIGZvdW5kLCBuZXh0IGxpbmUgaXMgc3RhcnQgb2Ygbm90ZVxuICAgICAgICAgIHJldHVybiBpICsgMTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kcyB0aGUgZmlyc3QgaGVhZGluZyBvZiB0aGUgbm90ZSBmaWxlXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nW119IGZpbGVMaW5lcyBhcnJheSBvZiB0aGUgZmlsZSdzIGNvbnRlbnRzLCBsaW5lIGJ5IGxpbmVcbiAgICogQHBhcmFtIHtudW1iZXJ9IHN0YXJ0TGluZSB6ZXJvLWJhc2VkIGluZGV4IG9mIHRoZSBzdGFydGluZyBsaW5lIG9mIHRoZSBub3RlXG4gICAqIEByZXR1cm5zIHtMaW5lUG9pbnRlciB8IG51bGx9IExpbmVQb2ludGVyIHRvIGhlYWRpbmcgb3IgbnVsbCBpZiBubyBoZWFkaW5nIGZvdW5kXG4gICAqL1xuICBmaW5kSGVhZGluZyhmaWxlTGluZXM6IHN0cmluZ1tdLCBzdGFydExpbmU6IG51bWJlcik6IExpbmVQb2ludGVyIHwgbnVsbCB7XG4gICAgZm9yIChsZXQgaSA9IHN0YXJ0TGluZTsgaSA8IGZpbGVMaW5lcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGZpbGVMaW5lc1tpXS5zdGFydHNXaXRoKCcjICcpKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgbGluZU51bWJlcjogaSxcbiAgICAgICAgICB0ZXh0OiBmaWxlTGluZXNbaV0uc3Vic3RyaW5nKDIpLFxuICAgICAgICAgIHN0eWxlOiBIZWFkaW5nU3R5bGUuUHJlZml4LFxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGZpbGVMaW5lc1tpICsgMV0gIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgIGZpbGVMaW5lc1tpICsgMV0ubWF0Y2goL149KyQvKSAhPT0gbnVsbFxuICAgICAgICApIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbGluZU51bWJlcjogaSxcbiAgICAgICAgICAgIHRleHQ6IGZpbGVMaW5lc1tpXSxcbiAgICAgICAgICAgIHN0eWxlOiBIZWFkaW5nU3R5bGUuVW5kZXJsaW5lLFxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7IC8vIG5vIGhlYWRpbmcgZm91bmRcbiAgfVxuXG4gIHJlZ0V4cEVzY2FwZShzdHI6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIFN0cmluZyhzdHIpLnJlcGxhY2UoL1tcXFxcXiQqKz8uKCl8W1xcXXt9XS9nLCAnXFxcXCQmJyk7XG4gIH1cblxuICBzYW5pdGl6ZUhlYWRpbmcodGV4dDogc3RyaW5nKSB7XG4gICAgLy8gc3RvY2tJbGxlZ2FsU3ltYm9scyBpcyBhIHJlZ0V4cCBvYmplY3QsIGJ1dCB1c2VySWxsZWdhbFN5bWJvbHMgaXMgYSBsaXN0IG9mIHN0cmluZ3MgYW5kIHRoZXJlZm9yZSB0aGV5IGFyZSBoYW5kbGVkIHNlcGFyYXRlbHkuXG4gICAgdGV4dCA9IHRleHQucmVwbGFjZShzdG9ja0lsbGVnYWxTeW1ib2xzLCAnJyk7XG5cbiAgICBjb25zdCB1c2VySWxsZWdhbFN5bWJvbHNFc2NhcGVkID0gdGhpcy5zZXR0aW5ncy51c2VySWxsZWdhbFN5bWJvbHMubWFwKFxuICAgICAgKHN0cikgPT4gdGhpcy5yZWdFeHBFc2NhcGUoc3RyKSxcbiAgICApO1xuICAgIGNvbnN0IHVzZXJJbGxlZ2FsU3ltYm9sc1JlZ0V4cCA9IG5ldyBSZWdFeHAoXG4gICAgICB1c2VySWxsZWdhbFN5bWJvbHNFc2NhcGVkLmpvaW4oJ3wnKSxcbiAgICAgICdnJyxcbiAgICApO1xuICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UodXNlcklsbGVnYWxTeW1ib2xzUmVnRXhwLCAnJyk7XG4gICAgcmV0dXJuIHRleHQudHJpbSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluc2VydCB0aGUgYGhlYWRpbmdgIGF0IGBsaW5lTnVtYmVyYCBpbiBgZmlsZWAuXG4gICAqXG4gICAqIEBwYXJhbSB7VEZpbGV9IGZpbGUgdGhlIGZpbGUgdG8gbW9kaWZ5XG4gICAqIEBwYXJhbSB7c3RyaW5nW119IGZpbGVMaW5lcyBhcnJheSBvZiB0aGUgZmlsZSdzIGNvbnRlbnRzLCBsaW5lIGJ5IGxpbmVcbiAgICogQHBhcmFtIHtudW1iZXJ9IGxpbmVOdW1iZXIgemVyby1iYXNlZCBpbmRleCBvZiB0aGUgbGluZSB0byByZXBsYWNlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IHRoZSBuZXcgdGV4dFxuICAgKi9cbiAgaW5zZXJ0SGVhZGluZyhcbiAgICBmaWxlOiBURmlsZSxcbiAgICBmaWxlTGluZXM6IHN0cmluZ1tdLFxuICAgIGxpbmVOdW1iZXI6IG51bWJlcixcbiAgICBoZWFkaW5nOiBzdHJpbmcsXG4gICkge1xuICAgIGNvbnN0IG5ld1N0eWxlID0gdGhpcy5zZXR0aW5ncy5uZXdIZWFkaW5nU3R5bGU7XG4gICAgc3dpdGNoIChuZXdTdHlsZSkge1xuICAgICAgY2FzZSBIZWFkaW5nU3R5bGUuVW5kZXJsaW5lOiB7XG4gICAgICAgIHRoaXMuaW5zZXJ0TGluZUluRmlsZShmaWxlLCBmaWxlTGluZXMsIGxpbmVOdW1iZXIsIGAke2hlYWRpbmd9YCk7XG5cbiAgICAgICAgdGhpcy5pbnNlcnRMaW5lSW5GaWxlKFxuICAgICAgICAgIGZpbGUsXG4gICAgICAgICAgZmlsZUxpbmVzLFxuICAgICAgICAgIGxpbmVOdW1iZXIgKyAxLFxuICAgICAgICAgIHRoaXMuc2V0dGluZ3MudW5kZXJsaW5lU3RyaW5nLFxuICAgICAgICApO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgSGVhZGluZ1N0eWxlLlByZWZpeDoge1xuICAgICAgICB0aGlzLmluc2VydExpbmVJbkZpbGUoZmlsZSwgZmlsZUxpbmVzLCBsaW5lTnVtYmVyLCBgIyAke2hlYWRpbmd9YCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBNb2RpZmllZCBgZmlsZWAgYnkgcmVwbGFjaW5nIHRoZSBoZWFkaW5nIGF0IGBsaW5lTnVtYmVyYCB3aXRoIGBuZXdIZWFkaW5nYCxcbiAgICogdXBkYXRpbmcgdGhlIGhlYWRpbmcgc3R5bGUgYWNjb3JkaW5nIHRoZSB1c2VyIHNldHRpbmdzLlxuICAgKlxuICAgKiBAcGFyYW0ge1RGaWxlfSBmaWxlIHRoZSBmaWxlIHRvIG1vZGlmeVxuICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBmaWxlTGluZXMgYXJyYXkgb2YgdGhlIGZpbGUncyBjb250ZW50cywgbGluZSBieSBsaW5lXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBsaW5lTnVtYmVyIHplcm8tYmFzZWQgaW5kZXggb2YgdGhlIGxpbmUgdG8gcmVwbGFjZVxuICAgKiBAcGFyYW0ge0hlYWRpbmdTdHlsZX0gb2xkU3R5bGUgdGhlIHN0eWxlIG9mIHRoZSBvcmlnaW5hbCBoZWFkaW5nXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IHRoZSBuZXcgdGV4dFxuICAgKi9cbiAgcmVwbGFjZUhlYWRpbmcoXG4gICAgZmlsZTogVEZpbGUsXG4gICAgZmlsZUxpbmVzOiBzdHJpbmdbXSxcbiAgICBsaW5lTnVtYmVyOiBudW1iZXIsXG4gICAgb2xkU3R5bGU6IEhlYWRpbmdTdHlsZSxcbiAgICBuZXdIZWFkaW5nOiBzdHJpbmcsXG4gICkge1xuICAgIGNvbnN0IG5ld1N0eWxlID0gdGhpcy5zZXR0aW5ncy5uZXdIZWFkaW5nU3R5bGU7XG4gICAgY29uc3QgcmVwbGFjZVN0eWxlID0gdGhpcy5zZXR0aW5ncy5yZXBsYWNlU3R5bGU7XG4gICAgLy8gSWYgcmVwbGFjaW5nIHRoZSBzdHlsZVxuICAgIGlmIChyZXBsYWNlU3R5bGUpIHtcbiAgICAgIHN3aXRjaCAobmV3U3R5bGUpIHtcbiAgICAgICAgLy8gRm9yIHVuZGVybGluZSBzdHlsZSwgcmVwbGFjZSBoZWFkaW5nIGxpbmUuLi5cbiAgICAgICAgY2FzZSBIZWFkaW5nU3R5bGUuVW5kZXJsaW5lOiB7XG4gICAgICAgICAgdGhpcy5yZXBsYWNlTGluZUluRmlsZShmaWxlLCBmaWxlTGluZXMsIGxpbmVOdW1iZXIsIGAke25ld0hlYWRpbmd9YCk7XG4gICAgICAgICAgLy8uLi4sIHRoZW4gYWRkIG9yIHJlcGxhY2UgdW5kZXJsaW5lLlxuICAgICAgICAgIHN3aXRjaCAob2xkU3R5bGUpIHtcbiAgICAgICAgICAgIGNhc2UgSGVhZGluZ1N0eWxlLlByZWZpeDoge1xuICAgICAgICAgICAgICB0aGlzLmluc2VydExpbmVJbkZpbGUoXG4gICAgICAgICAgICAgICAgZmlsZSxcbiAgICAgICAgICAgICAgICBmaWxlTGluZXMsXG4gICAgICAgICAgICAgICAgbGluZU51bWJlciArIDEsXG4gICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy51bmRlcmxpbmVTdHJpbmcsXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSBIZWFkaW5nU3R5bGUuVW5kZXJsaW5lOiB7XG4gICAgICAgICAgICAgIC8vIFVwZGF0ZSB1bmRlcmxpbmUgd2l0aCBzZXR0aW5nLlxuICAgICAgICAgICAgICB0aGlzLnJlcGxhY2VMaW5lSW5GaWxlKFxuICAgICAgICAgICAgICAgIGZpbGUsXG4gICAgICAgICAgICAgICAgZmlsZUxpbmVzLFxuICAgICAgICAgICAgICAgIGxpbmVOdW1iZXIgKyAxLFxuICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MudW5kZXJsaW5lU3RyaW5nLFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgLy8gRm9yIHByZWZpeCBzdHlsZSwgcmVwbGFjZSBoZWFkaW5nIGxpbmUsIGFuZCBwb3NzaWJseSBkZWxldGUgdW5kZXJsaW5lXG4gICAgICAgIGNhc2UgSGVhZGluZ1N0eWxlLlByZWZpeDoge1xuICAgICAgICAgIHRoaXMucmVwbGFjZUxpbmVJbkZpbGUoXG4gICAgICAgICAgICBmaWxlLFxuICAgICAgICAgICAgZmlsZUxpbmVzLFxuICAgICAgICAgICAgbGluZU51bWJlcixcbiAgICAgICAgICAgIGAjICR7bmV3SGVhZGluZ31gLFxuICAgICAgICAgICk7XG4gICAgICAgICAgc3dpdGNoIChvbGRTdHlsZSkge1xuICAgICAgICAgICAgY2FzZSBIZWFkaW5nU3R5bGUuUHJlZml4OiB7XG4gICAgICAgICAgICAgIC8vIG5vcFxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgSGVhZGluZ1N0eWxlLlVuZGVybGluZToge1xuICAgICAgICAgICAgICB0aGlzLnJlcGxhY2VMaW5lSW5GaWxlKGZpbGUsIGZpbGVMaW5lcywgbGluZU51bWJlciArIDEsICcnKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIElmIG5vdCByZXBsYWNpbmcgc3R5bGUsIG1hdGNoXG4gICAgICBzd2l0Y2ggKG9sZFN0eWxlKSB7XG4gICAgICAgIGNhc2UgSGVhZGluZ1N0eWxlLlVuZGVybGluZToge1xuICAgICAgICAgIHRoaXMucmVwbGFjZUxpbmVJbkZpbGUoZmlsZSwgZmlsZUxpbmVzLCBsaW5lTnVtYmVyLCBgJHtuZXdIZWFkaW5nfWApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgSGVhZGluZ1N0eWxlLlByZWZpeDoge1xuICAgICAgICAgIHRoaXMucmVwbGFjZUxpbmVJbkZpbGUoXG4gICAgICAgICAgICBmaWxlLFxuICAgICAgICAgICAgZmlsZUxpbmVzLFxuICAgICAgICAgICAgbGluZU51bWJlcixcbiAgICAgICAgICAgIGAjICR7bmV3SGVhZGluZ31gLFxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTW9kaWZpZXMgdGhlIGZpbGUgYnkgcmVwbGFjaW5nIGEgcGFydGljdWxhciBsaW5lIHdpdGggbmV3IHRleHQuXG4gICAqXG4gICAqIFRoZSBmdW5jdGlvbiB3aWxsIGFkZCBhIG5ld2xpbmUgY2hhcmFjdGVyIGF0IHRoZSBlbmQgb2YgdGhlIHJlcGxhY2VkIGxpbmUuXG4gICAqXG4gICAqIElmIHRoZSBgbGluZU51bWJlcmAgcGFyYW1ldGVyIGlzIGhpZ2hlciB0aGFuIHRoZSBpbmRleCBvZiB0aGUgbGFzdCBsaW5lIG9mIHRoZSBmaWxlXG4gICAqIHRoZSBmdW5jdGlvbiB3aWxsIGFkZCBhIG5ld2xpbmUgY2hhcmFjdGVyIHRvIHRoZSBjdXJyZW50IGxhc3QgbGluZSBhbmQgYXBwZW5kIGEgbmV3XG4gICAqIGxpbmUgYXQgdGhlIGVuZCBvZiB0aGUgZmlsZSB3aXRoIHRoZSBuZXcgdGV4dCAoZXNzZW50aWFsbHkgYSBuZXcgbGFzdCBsaW5lKS5cbiAgICpcbiAgICogQHBhcmFtIHtURmlsZX0gZmlsZSB0aGUgZmlsZSB0byBtb2RpZnlcbiAgICogQHBhcmFtIHtzdHJpbmdbXX0gZmlsZUxpbmVzIGFycmF5IG9mIHRoZSBmaWxlJ3MgY29udGVudHMsIGxpbmUgYnkgbGluZVxuICAgKiBAcGFyYW0ge251bWJlcn0gbGluZU51bWJlciB6ZXJvLWJhc2VkIGluZGV4IG9mIHRoZSBsaW5lIHRvIHJlcGxhY2VcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRleHQgdGhlIG5ldyB0ZXh0XG4gICAqL1xuICByZXBsYWNlTGluZUluRmlsZShcbiAgICBmaWxlOiBURmlsZSxcbiAgICBmaWxlTGluZXM6IHN0cmluZ1tdLFxuICAgIGxpbmVOdW1iZXI6IG51bWJlcixcbiAgICB0ZXh0OiBzdHJpbmcsXG4gICkge1xuICAgIGlmIChsaW5lTnVtYmVyID49IGZpbGVMaW5lcy5sZW5ndGgpIHtcbiAgICAgIGZpbGVMaW5lcy5wdXNoKHRleHQgKyAnXFxuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZpbGVMaW5lc1tsaW5lTnVtYmVyXSA9IHRleHQ7XG4gICAgfVxuICAgIGNvbnN0IGRhdGEgPSBmaWxlTGluZXMuam9pbignXFxuJyk7XG4gICAgdGhpcy5hcHAudmF1bHQubW9kaWZ5KGZpbGUsIGRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1vZGlmaWVzIHRoZSBmaWxlIGJ5IGluc2VydGluZyBhIGxpbmUgd2l0aCBzcGVjaWZpZWQgdGV4dC5cbiAgICpcbiAgICogVGhlIGZ1bmN0aW9uIHdpbGwgYWRkIGEgbmV3bGluZSBjaGFyYWN0ZXIgYXQgdGhlIGVuZCBvZiB0aGUgaW5zZXJ0ZWQgbGluZS5cbiAgICpcbiAgICogQHBhcmFtIHtURmlsZX0gZmlsZSB0aGUgZmlsZSB0byBtb2RpZnlcbiAgICogQHBhcmFtIHtzdHJpbmdbXX0gZmlsZUxpbmVzIGFycmF5IG9mIHRoZSBmaWxlJ3MgY29udGVudHMsIGxpbmUgYnkgbGluZVxuICAgKiBAcGFyYW0ge251bWJlcn0gbGluZU51bWJlciB6ZXJvLWJhc2VkIGluZGV4IG9mIHdoZXJlIHRoZSBsaW5lIHNob3VsZCBiZSBpbnNlcnRlZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dCB0aGUgdGV4dCB0aGF0IHRoZSBsaW5lIHNoYWxsIGNvbnRhaW5cbiAgICovXG4gIGluc2VydExpbmVJbkZpbGUoXG4gICAgZmlsZTogVEZpbGUsXG4gICAgZmlsZUxpbmVzOiBzdHJpbmdbXSxcbiAgICBsaW5lTnVtYmVyOiBudW1iZXIsXG4gICAgdGV4dDogc3RyaW5nLFxuICApIHtcbiAgICBpZiAobGluZU51bWJlciA+PSBmaWxlTGluZXMubGVuZ3RoKSB7XG4gICAgICBmaWxlTGluZXMucHVzaCh0ZXh0ICsgJ1xcbicpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmaWxlTGluZXMuc3BsaWNlKGxpbmVOdW1iZXIsIDAsIHRleHQpO1xuICAgIH1cbiAgICBjb25zdCBkYXRhID0gZmlsZUxpbmVzLmpvaW4oJ1xcbicpO1xuICAgIHRoaXMuYXBwLnZhdWx0Lm1vZGlmeShmaWxlLCBkYXRhKTtcbiAgfVxuXG4gIGFzeW5jIGxvYWRTZXR0aW5ncygpIHtcbiAgICB0aGlzLnNldHRpbmdzID0gT2JqZWN0LmFzc2lnbih7fSwgREVGQVVMVF9TRVRUSU5HUywgYXdhaXQgdGhpcy5sb2FkRGF0YSgpKTtcbiAgfVxuXG4gIGFzeW5jIHNhdmVTZXR0aW5ncygpIHtcbiAgICBhd2FpdCB0aGlzLnNhdmVEYXRhKHRoaXMuc2V0dGluZ3MpO1xuICB9XG59XG5cbmNsYXNzIEZpbGVuYW1lSGVhZGluZ1N5bmNTZXR0aW5nVGFiIGV4dGVuZHMgUGx1Z2luU2V0dGluZ1RhYiB7XG4gIHBsdWdpbjogRmlsZW5hbWVIZWFkaW5nU3luY1BsdWdpbjtcbiAgYXBwOiBBcHA7XG5cbiAgY29uc3RydWN0b3IoYXBwOiBBcHAsIHBsdWdpbjogRmlsZW5hbWVIZWFkaW5nU3luY1BsdWdpbikge1xuICAgIHN1cGVyKGFwcCwgcGx1Z2luKTtcbiAgICB0aGlzLnBsdWdpbiA9IHBsdWdpbjtcbiAgICB0aGlzLmFwcCA9IGFwcDtcbiAgfVxuXG4gIGRpc3BsYXkoKTogdm9pZCB7XG4gICAgbGV0IHsgY29udGFpbmVyRWwgfSA9IHRoaXM7XG4gICAgbGV0IHJlZ2V4SWdub3JlZEZpbGVzRGl2OiBIVE1MRGl2RWxlbWVudDtcblxuICAgIGNvbnN0IHJlbmRlclJlZ2V4SWdub3JlZEZpbGVzID0gKGRpdjogSFRNTEVsZW1lbnQpID0+IHtcbiAgICAgIC8vIGVtcHR5IGV4aXN0aW5nIGRpdlxuICAgICAgZGl2LmlubmVySFRNTCA9ICcnO1xuXG4gICAgICBpZiAodGhpcy5wbHVnaW4uc2V0dGluZ3MuaWdub3JlUmVnZXggPT09ICcnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZmlsZXMgPSB0aGlzLmFwcC52YXVsdC5nZXRGaWxlcygpO1xuICAgICAgICBjb25zdCByZWcgPSBuZXcgUmVnRXhwKHRoaXMucGx1Z2luLnNldHRpbmdzLmlnbm9yZVJlZ2V4KTtcblxuICAgICAgICBmaWxlc1xuICAgICAgICAgIC5maWx0ZXIoKGZpbGUpID0+IHJlZy5leGVjKGZpbGUucGF0aCkgIT09IG51bGwpXG4gICAgICAgICAgLmZvckVhY2goKGVsKSA9PiB7XG4gICAgICAgICAgICBuZXcgU2V0dGluZyhkaXYpLnNldERlc2MoZWwucGF0aCk7XG4gICAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29udGFpbmVyRWwuZW1wdHkoKTtcblxuICAgIGNvbnRhaW5lckVsLmNyZWF0ZUVsKCdoMicsIHsgdGV4dDogJ0ZpbGVuYW1lIEhlYWRpbmcgU3luYycgfSk7XG4gICAgY29udGFpbmVyRWwuY3JlYXRlRWwoJ3AnLCB7XG4gICAgICB0ZXh0OlxuICAgICAgICAnVGhpcyBwbHVnaW4gd2lsbCBvdmVyd3JpdGUgdGhlIGZpcnN0IGhlYWRpbmcgZm91bmQgaW4gYSBmaWxlIHdpdGggdGhlIGZpbGVuYW1lLicsXG4gICAgfSk7XG4gICAgY29udGFpbmVyRWwuY3JlYXRlRWwoJ3AnLCB7XG4gICAgICB0ZXh0OlxuICAgICAgICAnSWYgbm8gaGVhZGVyIGlzIGZvdW5kLCB3aWxsIGluc2VydCBhIG5ldyBvbmUgYXQgdGhlIGZpcnN0IGxpbmUgKGFmdGVyIGZyb250bWF0dGVyKS4nLFxuICAgIH0pO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZSgnQ3VzdG9tIElsbGVnYWwgQ2hhcmFjdGVycy9TdHJpbmdzJylcbiAgICAgIC5zZXREZXNjKFxuICAgICAgICAnVHlwZSBjaGFyYWN0ZXJzL3N0cmluZ3Mgc2VwYXJhdGVkIGJ5IGEgY29tbWEuIFRoaXMgaW5wdXQgaXMgc3BhY2Ugc2Vuc2l0aXZlLicsXG4gICAgICApXG4gICAgICAuYWRkVGV4dCgodGV4dCkgPT5cbiAgICAgICAgdGV4dFxuICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcignW10sIywuLi4nKVxuICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy51c2VySWxsZWdhbFN5bWJvbHMuam9pbigpKVxuICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLnVzZXJJbGxlZ2FsU3ltYm9scyA9IHZhbHVlLnNwbGl0KCcsJyk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICB9KSxcbiAgICAgICk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKCdJZ25vcmUgUmVnZXggUnVsZScpXG4gICAgICAuc2V0RGVzYyhcbiAgICAgICAgJ0lnbm9yZSBydWxlIGluIFJlZ0V4IGZvcm1hdC4gQWxsIGZpbGVzIGxpc3RlZCBiZWxvdyB3aWxsIGdldCBpZ25vcmVkIGJ5IHRoaXMgcGx1Z2luLicsXG4gICAgICApXG4gICAgICAuYWRkVGV4dCgodGV4dCkgPT5cbiAgICAgICAgdGV4dFxuICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcignTXlGb2xkZXIvLionKVxuICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5pZ25vcmVSZWdleClcbiAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBuZXcgUmVnRXhwKHZhbHVlKTtcbiAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuaWdub3JlUmVnZXggPSB2YWx1ZTtcbiAgICAgICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5pZ25vcmVSZWdleCA9ICcnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgIHJlbmRlclJlZ2V4SWdub3JlZEZpbGVzKHJlZ2V4SWdub3JlZEZpbGVzRGl2KTtcbiAgICAgICAgICB9KSxcbiAgICAgICk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKCdVc2UgRmlsZSBPcGVuIEhvb2snKVxuICAgICAgLnNldERlc2MoXG4gICAgICAgICdXaGV0aGVyIHRoaXMgcGx1Z2luIHNob3VsZCB0cmlnZ2VyIHdoZW4gYSBmaWxlIGlzIG9wZW5lZCwgYW5kIG5vdCBqdXN0IG9uIHNhdmUuIERpc2FibGUgdGhpcyB3aGVuIHlvdSBub3RpY2UgY29uZmxpY3RzIHdpdGggb3RoZXIgcGx1Z2lucyB0aGF0IGFsc28gYWN0IG9uIGZpbGUgb3Blbi4nLFxuICAgICAgKVxuICAgICAgLmFkZFRvZ2dsZSgodG9nZ2xlKSA9PlxuICAgICAgICB0b2dnbGVcbiAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MudXNlRmlsZU9wZW5Ib29rKVxuICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLnVzZUZpbGVPcGVuSG9vayA9IHZhbHVlO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgfSksXG4gICAgICApO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZSgnVXNlIEZpbGUgU2F2ZSBIb29rJylcbiAgICAgIC5zZXREZXNjKFxuICAgICAgICAnV2hldGhlciB0aGlzIHBsdWdpbiBzaG91bGQgdHJpZ2dlciB3aGVuIGEgZmlsZSBpcyBzYXZlZC4gRGlzYWJsZSB0aGlzIHdoZW4geW91IHdhbnQgdG8gdHJpZ2dlciBzeW5jIG9ubHkgbWFudWFsbHkuJyxcbiAgICAgIClcbiAgICAgIC5hZGRUb2dnbGUoKHRvZ2dsZSkgPT5cbiAgICAgICAgdG9nZ2xlXG4gICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnVzZUZpbGVTYXZlSG9vaylcbiAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy51c2VGaWxlU2F2ZUhvb2sgPSB2YWx1ZTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgIH0pLFxuICAgICAgKTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoJ05ldyBIZWFkaW5nIFN0eWxlJylcbiAgICAgIC5zZXREZXNjKFxuICAgICAgICAnV2hpY2ggTWFya2Rvd24gaGVhZGluZyBzdHlsZSB0byB1c2Ugd2hlbiBjcmVhdGluZyBuZXcgaGVhZGluZ3M6IFByZWZpeCAoXCIjIEhlYWRpbmdcIikgb3IgVW5kZXJsaW5lIChcIkhlYWRpbmdcXFxcbj09PVwiKS4nLFxuICAgICAgKVxuICAgICAgLmFkZERyb3Bkb3duKChjYikgPT5cbiAgICAgICAgY2JcbiAgICAgICAgICAuYWRkT3B0aW9uKEhlYWRpbmdTdHlsZS5QcmVmaXgsICdQcmVmaXgnKVxuICAgICAgICAgIC5hZGRPcHRpb24oSGVhZGluZ1N0eWxlLlVuZGVybGluZSwgJ1VuZGVybGluZScpXG4gICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLm5ld0hlYWRpbmdTdHlsZSlcbiAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBpZiAodmFsdWUgPT09ICdQcmVmaXgnKSB7XG4gICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLm5ld0hlYWRpbmdTdHlsZSA9IEhlYWRpbmdTdHlsZS5QcmVmaXg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodmFsdWUgPT09ICdVbmRlcmxpbmUnKSB7XG4gICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLm5ld0hlYWRpbmdTdHlsZSA9IEhlYWRpbmdTdHlsZS5VbmRlcmxpbmU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICB9KSxcbiAgICAgICk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKCdSZXBsYWNlIEhlYWRpbmcgU3R5bGUnKVxuICAgICAgLnNldERlc2MoXG4gICAgICAgICdXaGV0aGVyIHRoaXMgcGx1Z2luIHNob3VsZCByZXBsYWNlIGV4aXN0aW5nIGhlYWRpbmcgc3R5bGVzIHdoZW4gdXBkYXRpbmcgaGVhZGluZ3MuJyxcbiAgICAgIClcbiAgICAgIC5hZGRUb2dnbGUoKHRvZ2dsZSkgPT5cbiAgICAgICAgdG9nZ2xlXG4gICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnJlcGxhY2VTdHlsZSlcbiAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5yZXBsYWNlU3R5bGUgPSB2YWx1ZTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgIH0pLFxuICAgICAgKTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoJ1VuZGVybGluZSBTdHJpbmcnKVxuICAgICAgLnNldERlc2MoXG4gICAgICAgICdUaGUgc3RyaW5nIHRvIHVzZSB3aGVuIGluc2VydCBVbmRlcmxpbmUtc3R5bGUgaGVhZGluZ3M7IHNob3VsZCBiZSBzb21lIG51bWJlciBvZiBcIj1cInMuJyxcbiAgICAgIClcbiAgICAgIC5hZGRUZXh0KCh0ZXh0KSA9PlxuICAgICAgICB0ZXh0XG4gICAgICAgICAgLnNldFBsYWNlaG9sZGVyKCc9PT0nKVxuICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy51bmRlcmxpbmVTdHJpbmcpXG4gICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MudW5kZXJsaW5lU3RyaW5nID0gdmFsdWU7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICB9KSxcbiAgICAgICk7XG5cbiAgICBjb250YWluZXJFbC5jcmVhdGVFbCgnaDInLCB7IHRleHQ6ICdJZ25vcmVkIEZpbGVzIEJ5IFJlZ2V4JyB9KTtcbiAgICBjb250YWluZXJFbC5jcmVhdGVFbCgncCcsIHtcbiAgICAgIHRleHQ6ICdBbGwgZmlsZXMgbWF0Y2hpbmcgdGhlIGFib3ZlIFJlZ0V4IHdpbGwgZ2V0IGxpc3RlZCBoZXJlJyxcbiAgICB9KTtcblxuICAgIHJlZ2V4SWdub3JlZEZpbGVzRGl2ID0gY29udGFpbmVyRWwuY3JlYXRlRGl2KCd0ZXN0Jyk7XG4gICAgcmVuZGVyUmVnZXhJZ25vcmVkRmlsZXMocmVnZXhJZ25vcmVkRmlsZXNEaXYpO1xuXG4gICAgY29udGFpbmVyRWwuY3JlYXRlRWwoJ2gyJywgeyB0ZXh0OiAnTWFudWFsbHkgSWdub3JlZCBGaWxlcycgfSk7XG4gICAgY29udGFpbmVyRWwuY3JlYXRlRWwoJ3AnLCB7XG4gICAgICB0ZXh0OlxuICAgICAgICAnWW91IGNhbiBpZ25vcmUgZmlsZXMgZnJvbSB0aGlzIHBsdWdpbiBieSB1c2luZyB0aGUgXCJpZ25vcmUgdGhpcyBmaWxlXCIgY29tbWFuZCcsXG4gICAgfSk7XG5cbiAgICAvLyBnbyBvdmVyIGFsbCBpZ25vcmVkIGZpbGVzIGFuZCBhZGQgdGhlbVxuICAgIGZvciAobGV0IGtleSBpbiB0aGlzLnBsdWdpbi5zZXR0aW5ncy5pZ25vcmVkRmlsZXMpIHtcbiAgICAgIGNvbnN0IGlnbm9yZWRGaWxlc1NldHRpbmdzT2JqID0gbmV3IFNldHRpbmcoY29udGFpbmVyRWwpLnNldERlc2Moa2V5KTtcblxuICAgICAgaWdub3JlZEZpbGVzU2V0dGluZ3NPYmouYWRkQnV0dG9uKChidXR0b24pID0+IHtcbiAgICAgICAgYnV0dG9uLnNldEJ1dHRvblRleHQoJ0RlbGV0ZScpLm9uQ2xpY2soYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGRlbGV0ZSB0aGlzLnBsdWdpbi5zZXR0aW5ncy5pZ25vcmVkRmlsZXNba2V5XTtcbiAgICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICB0aGlzLmRpc3BsYXkoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJURmlsZSIsIlBsdWdpbiIsIlNldHRpbmciLCJQbHVnaW5TZXR0aW5nVGFiIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLGFBQWEsR0FBRyxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDbkMsSUFBSSxhQUFhLEdBQUcsTUFBTSxDQUFDLGNBQWM7QUFDekMsU0FBUyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsWUFBWSxLQUFLLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ3BGLFFBQVEsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQzFHLElBQUksT0FBTyxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQy9CLENBQUMsQ0FBQztBQUNGO0FBQ08sU0FBUyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNoQyxJQUFJLElBQUksT0FBTyxDQUFDLEtBQUssVUFBVSxJQUFJLENBQUMsS0FBSyxJQUFJO0FBQzdDLFFBQVEsTUFBTSxJQUFJLFNBQVMsQ0FBQyxzQkFBc0IsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsK0JBQStCLENBQUMsQ0FBQztBQUNsRyxJQUFJLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDeEIsSUFBSSxTQUFTLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLEVBQUU7QUFDM0MsSUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsS0FBSyxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3pGLENBQUM7QUF1Q0Q7QUFDTyxTQUFTLFNBQVMsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUU7QUFDN0QsSUFBSSxTQUFTLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxPQUFPLEtBQUssWUFBWSxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLFVBQVUsT0FBTyxFQUFFLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUU7QUFDaEgsSUFBSSxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsRUFBRSxVQUFVLE9BQU8sRUFBRSxNQUFNLEVBQUU7QUFDL0QsUUFBUSxTQUFTLFNBQVMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO0FBQ25HLFFBQVEsU0FBUyxRQUFRLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO0FBQ3RHLFFBQVEsU0FBUyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsTUFBTSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQyxFQUFFO0FBQ3RILFFBQVEsSUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLFVBQVUsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQzlFLEtBQUssQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUNEO0FBQ08sU0FBUyxXQUFXLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRTtBQUMzQyxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDckgsSUFBSSxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsT0FBTyxNQUFNLEtBQUssVUFBVSxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsV0FBVyxFQUFFLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUM3SixJQUFJLFNBQVMsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLE9BQU8sVUFBVSxDQUFDLEVBQUUsRUFBRSxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ3RFLElBQUksU0FBUyxJQUFJLENBQUMsRUFBRSxFQUFFO0FBQ3RCLFFBQVEsSUFBSSxDQUFDLEVBQUUsTUFBTSxJQUFJLFNBQVMsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0FBQ3RFLFFBQVEsT0FBTyxDQUFDLEVBQUUsSUFBSTtBQUN0QixZQUFZLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FB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
