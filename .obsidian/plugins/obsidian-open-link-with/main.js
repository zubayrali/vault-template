'use strict';

var obsidian = require('obsidian');
var child_process = require('child_process');
var fs = require('fs');
var path = require('path');
var os = require('os');

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n["default"] = e;
    return Object.freeze(n);
}

var path__namespace = /*#__PURE__*/_interopNamespace(path);

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

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

var Rule;
(function (Rule) {
    class _Rule {
        constructor(items, value) {
            this.items = items;
            this.value = value;
        }
    }
    Rule._Rule = _Rule;
    class Empty extends _Rule {
        constructor(value) {
            super([], value);
        }
    }
    Rule.Empty = Empty;
    class Exact extends _Rule {
    }
    Rule.Exact = Exact;
    class Contains extends _Rule {
    }
    Rule.Contains = Contains;
    class NotExact extends _Rule {
    }
    Rule.NotExact = NotExact;
    class NotContains extends _Rule {
    }
    Rule.NotContains = NotContains;
})(Rule || (Rule = {}));
var Platform;
(function (Platform) {
    Platform["Unknown"] = "unknown";
    Platform["Linux"] = "linux";
    Platform["Mac"] = "mac";
    Platform["Win"] = "win";
})(Platform || (Platform = {}));
var Modifier;
(function (Modifier) {
    Modifier["Alt"] = "alt";
    Modifier["Ctrl"] = "ctrl";
    Modifier["Meta"] = "meta";
    Modifier["Shift"] = "shift";
})(Modifier || (Modifier = {}));
var MouseButton;
(function (MouseButton) {
    MouseButton[MouseButton["Main"] = 0] = "Main";
    MouseButton[MouseButton["Auxiliary"] = 1] = "Auxiliary";
    MouseButton[MouseButton["Secondary"] = 2] = "Secondary";
    MouseButton[MouseButton["Fourth"] = 3] = "Fourth";
    MouseButton[MouseButton["Fifth"] = 4] = "Fifth";
})(MouseButton || (MouseButton = {}));
var ViewMode;
(function (ViewMode) {
    ViewMode[ViewMode["LAST"] = 0] = "LAST";
    ViewMode[ViewMode["NEW"] = 1] = "NEW";
})(ViewMode || (ViewMode = {}));

class RulesChecker {
    constructor(_rules = []) {
        this._rules = _rules;
    }
    addRule(rule) {
        this._rules.push(rule);
    }
    check(input, options = {}) {
        var _a;
        const matched = [];
        for (const rule of this._rules) {
            if (((_a = options === null || options === void 0 ? void 0 : options.breakOnFirstSuccess) !== null && _a !== void 0 ? _a : false) &&
                matched.length > 0) {
                break;
            }
            const { items } = rule;
            if (rule instanceof Rule.Exact || rule instanceof Rule.NotExact) {
                let ok = false;
                if (items.length === input.length) {
                    ok = items.every((item) => input.contains(item));
                }
                if (rule instanceof Rule.Exact ? ok : !ok) {
                    matched.push(rule.value);
                }
            }
            else if (rule instanceof Rule.Contains ||
                rule instanceof Rule.NotContains) {
                let ok = false;
                if (items.length <= input.length) {
                    ok = items.every((item) => input.contains(item));
                }
                if (rule instanceof Rule.Contains ? ok : !ok) {
                    matched.push(rule.value);
                }
            }
            else if (rule instanceof Rule.Empty) {
                if (input.length === 0) {
                    matched.push(rule.value);
                }
            }
            else {
                throw new TypeError(`invalid rule type: ${rule.constructor.name}`);
            }
        }
        return matched;
    }
}
class WindowUtils {
    constructor(_plugin) {
        this._plugin = _plugin;
        this._windows = {};
    }
    initWindow(win) {
        win.mid = genRandomStr(8);
        return win;
    }
    registerWindow(win) {
        if (typeof win.mid === 'undefined') {
            win = this.initWindow(win);
            if (this._plugin.settings.enableLog) {
                log('info', 'window registered', { mid: win.mid, window: win });
            }
            this._windows[win.mid] = win;
        }
    }
    unregisterWindow(win) {
        if (typeof win.mid !== 'undefined') {
            delete this._windows[win.mid];
            log('info', 'window unregistered', { mid: win.mid, window: win });
            win.mid = undefined;
        }
    }
    getRecords() {
        return this._windows;
    }
    getWindow(mid) {
        return this._windows[mid];
    }
}
const getPlatform = () => {
    const platform = window.navigator.platform;
    switch (platform.slice(0, 3)) {
        case 'Mac':
            return Platform.Mac;
        case 'Win':
            return Platform.Win;
        default:
            return Platform.Linux;
    }
};
const getModifiersFromMouseEvt = (evt) => {
    const { altKey, ctrlKey, metaKey, shiftKey } = evt;
    const mods = [];
    if (altKey) {
        mods.push(Modifier.Alt);
    }
    if (ctrlKey) {
        mods.push(Modifier.Ctrl);
    }
    if (metaKey) {
        mods.push(Modifier.Meta);
    }
    if (shiftKey) {
        mods.push(Modifier.Shift);
    }
    return mods;
};
const genRandomChar = (radix) => {
    return Math.floor(Math.random() * radix)
        .toString(radix)
        .toLocaleUpperCase();
};
const genRandomStr = (len) => {
    const id = [];
    for (const _ of ' '.repeat(len)) {
        id.push(genRandomChar(36));
    }
    return id.join('');
};
const getValidHttpURL = (url) => {
    if (typeof url === 'undefined') {
        return null;
    }
    else if (url instanceof URL) {
        return ['http:', 'https:'].indexOf(url.protocol) != -1
            ? url.toString()
            : null;
    }
    else {
        try {
            return getValidHttpURL(new URL(url));
        }
        catch (TypeError) {
            return null;
        }
    }
};
const getValidModifiers = (platform) => {
    if (platform === Platform.Unknown) {
        return ['none'];
    }
    else {
        return ['none', 'ctrl', 'meta', 'alt', 'shift'];
    }
};
const log = (level, title, message) => {
    let logger;
    if (level === 'warn') {
        logger = console.warn;
    }
    else if (level === 'error') {
        logger = console.error;
    }
    else {
        logger = console.info;
    }
    logger(`[open-link-with] ${title}`, message);
};

const checkClickable = (el) => {
    const res = {
        is_clickable: false,
        url: null,
        paneType: undefined,
        modifier_rules: [],
    };
    const CTRL = obsidian.Platform.isMacOS ? Modifier.Meta : Modifier.Ctrl;
    const ALT = Modifier.Alt;
    const SHIFT = Modifier.Shift;
    //  - links in read mode
    if (el.classList.contains('external-link')) {
        res.is_clickable = true;
        res.url = el.getAttribute('href');
        res.modifier_rules = [
            new Rule.Exact([CTRL], 'tab'),
            new Rule.Exact([CTRL, ALT], 'split'),
            new Rule.Exact([CTRL, SHIFT], 'tab'),
            new Rule.Exact([CTRL, ALT, SHIFT], 'window'),
            new Rule.Contains([], undefined), // fallback
        ];
    }
    //  -
    if (el.classList.contains('clickable-icon')) ;
    //  - links in live preview mode
    if (el.classList.contains('cm-underline')) {
        res.is_clickable = null;
        // res.url = // determined by `window._builtInOpen`
        res.modifier_rules = [
            new Rule.Empty(undefined),
            new Rule.Exact([CTRL], 'tab'),
            new Rule.Exact([CTRL, ALT], 'split'),
            new Rule.Exact([CTRL, SHIFT], 'tab'),
            new Rule.Exact([CTRL, ALT, SHIFT], 'window'),
        ];
    }
    //  - links in edit mode
    if (el.classList.contains('cm-url')) {
        res.is_clickable = null;
        // res.url = // determined by `window._builtInOpen`
        res.modifier_rules = [
            new Rule.Exact([CTRL], undefined),
            new Rule.Exact([CTRL, ALT], 'split'),
            new Rule.Exact([CTRL, SHIFT], 'tab'),
            new Rule.Exact([CTRL, ALT, SHIFT], 'window'),
        ];
    }
    // - links in community plugins' readme
    if (res.is_clickable === false && el.tagName === 'A') {
        let p = el;
        while (p.tagName !== 'BODY') {
            if (p.classList.contains('internal-link')) {
                break;
            }
            else if (p.classList.contains('community-modal-info')) {
                res.is_clickable = true;
                res.url = el.getAttribute('href');
                res.paneType =
                    el.getAttribute('target') === '_blank'
                        ? 'window'
                        : res.paneType;
                break;
            }
            p = p.parentElement;
        }
    }
    return res;
};
class LocalDocClickHandler {
    constructor(clickUilts) {
        this.clickUilts = clickUilts;
        this._enabled = false;
        this._handleAuxClick = false;
    }
    get enabled() {
        return this._enabled;
    }
    set enabled(val) {
        this._enabled = val;
    }
    get handleAuxClick() {
        return this._handleAuxClick;
    }
    set handleAuxClick(val) {
        this._handleAuxClick = val;
    }
    call(evt) {
        const win = evt.doc.win;
        if (typeof win.mid !== 'undefined' && this._enabled) {
            this._handler(evt);
        }
    }
    _handler(evt) {
        const el = evt.target;
        const win = evt.doc.win;
        const modifiers = getModifiersFromMouseEvt(evt);
        const clickable = checkClickable(el);
        let fire = true;
        let url = clickable.url;
        if (win.oolwPendingUrls.length > 0) {
            // win.oolwPendingUrls for getting correct urls from default open API
            url = win.oolwPendingUrls.pop();
        }
        else {
            // for urls could be invalid (inner links)
            if (url !== null && !getValidHttpURL(url)) {
                fire = false;
                win._builtInOpen(url);
            }
        }
        if (clickable.is_clickable === false && url === null) {
            return false;
        }
        let { paneType } = clickable;
        if (url === null) {
            fire = false;
        }
        if (clickable.modifier_rules.length > 0) {
            const checker = new RulesChecker(clickable.modifier_rules);
            const matched = checker.check(modifiers, {
                breakOnFirstSuccess: true,
            });
            if (matched.length == 0) {
                if (clickable.is_clickable) ;
                else {
                    fire = false;
                }
            }
            else if (matched[0] === false) {
                fire = false;
            }
            else if (typeof matched[0] === 'undefined') {
                paneType = undefined;
            }
            else {
                paneType = matched[0];
            }
        }
        // apply on middle click only
        if (this.handleAuxClick && evt.button === 2) {
            fire = false;
        }
        evt.preventDefault();
        if (this.clickUilts._plugin.settings.enableLog) {
            log('info', 'click event (LocalDocClickHandler)', {
                is_aux: this.handleAuxClick,
                clickable,
                url,
                modifiers,
                btn: evt.button,
            });
        }
        if (!fire) {
            return false;
        }
        const dummy = evt.doc.createElement('a');
        const cid = genRandomStr(4);
        dummy.setAttribute('href', url);
        dummy.setAttribute('oolw-pane-type', paneType || '');
        dummy.setAttribute('oolw-cid', cid);
        dummy.addClass('oolw-external-link-dummy');
        evt.doc.body.appendChild(dummy);
        //
        const e_cp = new MouseEvent(evt.type, evt);
        dummy.dispatchEvent(e_cp);
        dummy.remove();
    }
}
class ClickUtils {
    constructor(_plugin, _windowUtils) {
        this._plugin = _plugin;
        this._windowUtils = _windowUtils;
        this._localHandlers = {};
    }
    initDocClickHandler(win) {
        if (!this._localHandlers.hasOwnProperty(win.mid)) {
            const clickHandler = new LocalDocClickHandler(this);
            clickHandler.enabled = true;
            const auxclickHandler = new LocalDocClickHandler(this);
            auxclickHandler.enabled = true;
            auxclickHandler.handleAuxClick = true;
            //
            win.document.addEventListener('click', clickHandler.call.bind(clickHandler));
            win.document.addEventListener('auxclick', auxclickHandler.call.bind(auxclickHandler));
            //
            this._localHandlers[win.mid] = {
                click: clickHandler,
                auxclick: auxclickHandler,
            };
        }
    }
    removeDocClickHandler(win) {
        if (this._localHandlers.hasOwnProperty(win.mid)) {
            const handlers = this._localHandlers[win.mid];
            handlers.click.enabled = false;
            handlers.auxclick.enabled = false;
            win.document.removeEventListener('click', handlers.click.call.bind(handlers.click));
            win.document.removeEventListener('auxclick', handlers.auxclick.call.bind(handlers.auxclick));
            delete this._localHandlers[win.mid];
        }
    }
    overrideDefaultWindowOpen(win, enabled = true) {
        if (enabled && typeof win._builtInOpen === 'undefined') {
            win._builtInOpen = win.open;
            win.oolwCIDs = [];
            win.oolwPendingUrls = [];
            win.open = (url, target, feature) => {
                if (this._plugin.settings.enableLog) {
                    log('info', 'Obsidian.window._builtInOpen', {
                        url,
                        target,
                        feature,
                    });
                }
                const validUrl = getValidHttpURL(url);
                if (validUrl === null) {
                    return win._builtInOpen(url, target, feature);
                }
                else {
                    win.oolwPendingUrls.push(validUrl);
                    return win;
                }
            };
        }
        else if (!enabled && typeof win._builtInOpen !== 'undefined') {
            win.open = win._builtInOpen;
            delete win._builtInOpen;
            delete win.oolwCIDs;
            delete win.oolwPendingUrls;
        }
    }
}

const BROWSER_SYSTEM = {
    val: '_system',
    display: 'system-default',
};
const BROWSER_GLOBAL = {
    val: '_global',
    display: 'global',
};
const BROWSER_IN_APP = {
    val: '_in_app',
    display: 'in-app view (always new split)',
};
const BROWSER_IN_APP_LAST = {
    val: '_in_app_last',
    display: 'in-app view',
};
const _isExecutableExist = (fp) => __awaiter(void 0, void 0, void 0, function* () {
    return fs.existsSync(fp);
});
const _isExecutableAvailable = (exec) => __awaiter(void 0, void 0, void 0, function* () {
    return child_process.spawnSync('which', [exec]).status === 0;
});
const PRESET_BROWSERS = {
    safari: {
        darwin: {
            sysCmd: 'open',
            sysArgs: ['-a'],
            cmd: 'safari',
            optional: {},
            isAvailable: (b) => __awaiter(void 0, void 0, void 0, function* () {
                return true;
            }),
        },
    },
    firefox: {
        darwin: {
            cmd: path__namespace.join('/Applications', 'Firefox.app', 'Contents', 'MacOS', 'firefox'),
            optional: {
                private: {
                    args: ['--private-window'],
                },
            },
            isAvailable: (b) => __awaiter(void 0, void 0, void 0, function* () { return _isExecutableExist(b.cmd); }),
        },
        linux: {
            cmd: 'firefox',
            optional: {
                private: {
                    args: ['--private-window'],
                },
            },
            isAvailable: (b) => __awaiter(void 0, void 0, void 0, function* () { return _isExecutableAvailable(b.cmd); }),
        },
        win32: {
            cmd: path__namespace.join('c:', 'Program Files', 'Mozilla Firefox', 'firefox.exe'),
            optional: {
                private: {
                    args: ['--private-window'],
                },
            },
            isAvailable: (b) => __awaiter(void 0, void 0, void 0, function* () { return _isExecutableExist(b.cmd); }),
        },
    },
    chrome: {
        darwin: {
            cmd: path__namespace.join('/Applications', 'Google Chrome.app', 'Contents', 'MacOS', 'Google Chrome'),
            optional: {
                private: {
                    args: ['-incognito'],
                },
            },
            isAvailable: (b) => __awaiter(void 0, void 0, void 0, function* () { return _isExecutableExist(b.cmd); }),
        },
        linux: {
            cmd: 'google-chrome',
            optional: {
                private: {
                    args: ['-incognito'],
                },
            },
            isAvailable: (b) => __awaiter(void 0, void 0, void 0, function* () { return _isExecutableAvailable(b.cmd); }),
        },
        win32: {
            cmd: path__namespace.join('c:', 'Program Files (x86)', 'Google', 'Chrome', 'Application', 'chrome.exe'),
            optional: {
                private: {
                    args: ['-incognito'],
                },
            },
            isAvailable: (b) => __awaiter(void 0, void 0, void 0, function* () { return _isExecutableExist(b.cmd); }),
        },
    },
    chromium: {
        darwin: {
            cmd: path__namespace.join('/Applications', 'Chromium.app', 'Contents', 'MacOS', 'Chromium'),
            optional: {
                private: {
                    args: ['-incognito'],
                },
            },
            isAvailable: (b) => __awaiter(void 0, void 0, void 0, function* () { return _isExecutableExist(b.cmd); }),
        },
        linux: {
            cmd: 'chromium-browser',
            optional: {
                private: {
                    args: ['-incognito'],
                },
            },
            isAvailable: (b) => __awaiter(void 0, void 0, void 0, function* () { return _isExecutableAvailable(b.cmd); }),
        },
    },
    edge: {
        darwin: {
            cmd: path__namespace.join('/Applications', 'Microsoft Edge.app', 'Contents', 'MacOS', 'Microsoft Edge'),
            optional: {
                private: {
                    args: ['-inprivate'],
                },
            },
            isAvailable: (b) => __awaiter(void 0, void 0, void 0, function* () { return _isExecutableExist(b.cmd); }),
        },
        win32: {
            cmd: path__namespace.join('c:', 'Program Files (x86)', 'Microsoft', 'Edge', 'Application', 'msedge.exe'),
            optional: {
                private: {
                    args: ['-inprivate'],
                },
            },
            isAvailable: (b) => __awaiter(void 0, void 0, void 0, function* () { return _isExecutableExist(b.cmd); }),
        },
    },
    brave: {
        darwin: {
            cmd: path__namespace.join('/Applications', 'Brave Browser.app', 'Contents', 'MacOS', 'Brave Browser'),
            optional: {
                private: {
                    args: ['-incognito'],
                },
            },
            isAvailable: (b) => __awaiter(void 0, void 0, void 0, function* () { return _isExecutableExist(b.cmd); }),
        },
        linux: {
            cmd: 'brave-browser',
            optional: {
                private: {
                    args: ['-incognito'],
                },
            },
            isAvailable: (b) => __awaiter(void 0, void 0, void 0, function* () { return _isExecutableAvailable(b.cmd); }),
        },
        win32: {
            cmd: path__namespace.join('c:', 'Program Files', 'BraveSoftware', 'Brave-Browser', 'Application', 'brave.exe'),
            optional: {
                private: {
                    args: ['-incognito'],
                },
            },
            isAvailable: (b) => __awaiter(void 0, void 0, void 0, function* () { return _isExecutableExist(b.cmd); }),
        },
    },
    waterfox: {
        darwin: {
            cmd: path__namespace.join('/Applications', 'Waterfox.app', 'Contents', 'MacOS', 'Waterfox'),
            optional: {
                private: {
                    args: ['-private-window'],
                },
            },
            isAvailable: (b) => __awaiter(void 0, void 0, void 0, function* () { return _isExecutableExist(b.cmd); }),
        },
        linux: {
            cmd: 'waterfox',
            optional: {
                private: {
                    args: ['-private-window'],
                },
            },
            isAvailable: (b) => __awaiter(void 0, void 0, void 0, function* () { return _isExecutableAvailable(b.cmd); }),
        },
        win32: {
            cmd: path__namespace.join('c:', 'Program Files', 'Waterfox', 'waterfox.exe'),
            optional: {
                private: {
                    args: ['-private-window'],
                },
            },
            isAvailable: (b) => __awaiter(void 0, void 0, void 0, function* () { return _isExecutableExist(b.cmd); }),
        },
    },
};
const MODIFIER_TEXT_FALLBACK = {
    none: 'None',
    meta: 'Meta',
    alt: 'Alt',
    ctrl: 'Ctrl',
    shift: 'Shift',
};
const MODIFIER_TEXT = {
    mac: {
        meta: 'Cmd⌘',
        alt: 'Option⌥',
        ctrl: 'Control⌃',
        shift: 'Shift⇧',
    },
    win: {
        meta: 'Windows',
    },
};

const openWith = (url, cmd, options = {}) => __awaiter(void 0, void 0, void 0, function* () {
    const _spawn = (args) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((res) => {
            var _a, _b;
            const _args = [...args];
            const reg = RegExp(/^[^"|'](.+)(?<!\\)(\ ){1}/);
            const match = reg.exec(_args[0]);
            if (match !== null) {
                // TODO: may have potential issues
                _args[0] = `"${_args[0]}"`;
            }
            reg.exec(_args[0]);
            if ((_a = options === null || options === void 0 ? void 0 : options.enableLog) !== null && _a !== void 0 ? _a : false) {
                log('info', 'opening', _args.join(' '));
            }
            const child = child_process.spawn(_args[0], args.slice(1), {
                stdio: 'ignore',
                shell: true,
            });
            child.on('exit', (code) => {
                res(code);
            });
            setTimeout(() => {
                res(0);
            }, (_b = options === null || options === void 0 ? void 0 : options.timeout) !== null && _b !== void 0 ? _b : 250);
        });
    });
    const target = '$TARGET_URL';
    let match = false;
    const _cmd = cmd.map((arg) => {
        const idx = arg.indexOf(target);
        if (idx !== -1) {
            match = true;
            return (arg.slice(0, idx) +
                encodeURIComponent(url) +
                arg.slice(idx + target.length));
        }
        else {
            return arg;
        }
    });
    if (!match) {
        _cmd.push(url);
    }
    return yield _spawn(_cmd);
});

class Browser {
    constructor(name, defaultCMD) {
        this.name = name;
        this.getExecCommands = (platform) => {
            var _a, _b;
            const res = {};
            let bp = this.profiles[platform];
            for (const pvt of [0, 1]) {
                const cmds = [];
                let bpBase;
                if (pvt) {
                    if (!((_a = bp === null || bp === void 0 ? void 0 : bp.optional) === null || _a === void 0 ? void 0 : _a.private)) {
                        continue;
                    }
                    bpBase = Object.assign(Object.assign({}, bp), ((_b = bp.optional.private) !== null && _b !== void 0 ? _b : {}));
                }
                else {
                    bpBase = bp;
                }
                if (bpBase.sysCmd) {
                    cmds.push(bpBase.sysCmd);
                }
                if (bpBase.sysArgs) {
                    bpBase.sysArgs.forEach((arg) => cmds.push(arg));
                }
                cmds.push(bpBase.cmd);
                if (bpBase.args) {
                    bpBase.args.forEach((arg) => cmds.push(arg));
                }
                if (pvt) {
                    res.private = cmds;
                }
                else {
                    res.main = cmds;
                }
            }
            return res;
        };
        this.name = name;
        this.profiles = defaultCMD;
    }
}
const getPresetBrowsers = () => {
    const presets = [];
    for (const name of Object.keys(PRESET_BROWSERS)) {
        presets.push(new Browser(name, PRESET_BROWSERS[name]));
    }
    return presets;
};
class ProfileMgr {
    constructor() {
        this.loadValidPresetBrowsers = () => __awaiter(this, void 0, void 0, function* () {
            this._preset_browser = [];
            const presets = getPresetBrowsers();
            const os$1 = os.platform();
            presets.forEach((browser) => __awaiter(this, void 0, void 0, function* () {
                const { profiles, name } = browser;
                let app = profiles[os$1];
                if (typeof app !== 'undefined' &&
                    app.isAvailable &&
                    (yield app.isAvailable(app))) {
                    this._preset_browser.push(browser);
                }
            }));
        });
        this.getBrowsers = () => {
            return [...this._preset_browser, ...this._browsers];
        };
        this.getBrowsersCMD = (custom) => {
            const res = {};
            this.getBrowsers().forEach((browser) => {
                const cmds = browser.getExecCommands(os.platform());
                res[browser.name] = cmds.main;
                if (typeof cmds.private !== 'undefined') {
                    res[browser.name + '-private'] = cmds.private;
                }
            });
            return Object.assign(Object.assign({}, res), custom);
        };
        this._browsers = [];
    }
}

class InAppView extends obsidian.ItemView {
    constructor(leaf, url) {
        super(leaf);
        this.url = url;
        this.icon = 'link';
        this.title = new URL(url).host;
        // TODO: remove this after tab title issue is fixed
        this.leaf.setPinned(true);
        setTimeout(() => {
            this.leaf.setPinned(false);
        }, 10);
    }
    onOpen() {
        return __awaiter(this, void 0, void 0, function* () {
            const frame_styles = [
                'height: 100%',
                'width: 100%',
                'background-color: white', // for pages with no background
            ];
            this.frame = document.createElement('iframe');
            this.frame.setAttr('style', frame_styles.join('; '));
            this.frame.setAttr('src', this.url);
            this.containerEl.children[1].appendChild(this.frame);
        });
    }
    getDisplayText() {
        return this.title;
    }
    getViewType() {
        return 'OOLW::InAppView';
    }
}
class ViewMgr {
    constructor(plugin) {
        this.plugin = plugin;
    }
    _getLeafId(leaf) {
        var _a;
        return (_a = leaf['id']) !== null && _a !== void 0 ? _a : '';
    }
    _validRecords() {
        var _a;
        const records = (_a = this.plugin.settings.inAppViewRec) !== null && _a !== void 0 ? _a : [];
        const validRec = [];
        try {
            for (const rec of records) {
                if (this.plugin.app.workspace.getLeafById(rec.leafId) !== null) {
                    validRec.push(rec);
                }
            }
        }
        catch (err) {
            if (this.plugin.settings.enableLog) {
                log('error', 'failed to restore views', `${err}`);
            }
        }
        return validRec;
    }
    createView(url, mode, options = {}) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const getNewLeafId = () => {
                const newLeaf = typeof options.paneType === 'undefined'
                    ? false
                    : options.paneType;
                const leaf = this.plugin.app.workspace.getLeaf(newLeaf === false ? 'tab' : newLeaf // TODO: missing navigation; using tab for now
                );
                return this._getLeafId(leaf);
            };
            let id = undefined;
            // TODO: more robust open behaviors
            if (typeof options.paneType !== 'undefined' || mode === ViewMode.NEW) {
                id = getNewLeafId();
            }
            else {
                const viewRec = this._validRecords();
                let rec = (_a = viewRec.find(({ mode }) => mode === ViewMode.LAST)) !== null && _a !== void 0 ? _a : viewRec.find(({ mode }) => mode === ViewMode.NEW);
                id = (_b = rec === null || rec === void 0 ? void 0 : rec.leafId) !== null && _b !== void 0 ? _b : getNewLeafId();
            }
            return yield this.updateView(id, url, mode, options === null || options === void 0 ? void 0 : options.focus);
        });
    }
    updateView(leafId, url, mode, focus = true) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const leaf = this.plugin.app.workspace.getLeafById(leafId);
            if (leaf === null) {
                return null;
            }
            else {
                const view = new InAppView(leaf, url);
                yield leaf.open(view);
                const rec = this.plugin.settings.inAppViewRec.find((rec) => rec.leafId === leafId);
                if (typeof rec !== 'undefined') {
                    rec.url = url;
                    // TODO:
                    rec.mode = (_a = rec.mode) !== null && _a !== void 0 ? _a : mode;
                }
                else {
                    this.plugin.settings.inAppViewRec.unshift({
                        leafId,
                        url,
                        mode,
                    });
                }
                yield this.plugin.saveSettings();
                // this.plugin.app.workspace.setActiveLeaf(leaf, { focus }) // TODO: option `focus` is not working (cliVer == 1.1.9)
                if (focus) {
                    this.plugin.app.workspace.setActiveLeaf(leaf);
                }
                return leafId;
            }
        });
    }
    restoreView() {
        return __awaiter(this, void 0, void 0, function* () {
            const viewRec = this._validRecords();
            const restored = [];
            for (const rec of viewRec) {
                if ((yield this.updateView(rec.leafId, rec.url, rec.mode, false)) !== null) {
                    restored.push(rec);
                }
            }
            this.plugin.settings.inAppViewRec = restored;
            yield this.plugin.saveSettings();
        });
    }
}

const DEFAULT_SETTINGS = {
    selected: BROWSER_SYSTEM.val,
    custom: {},
    modifierBindings: [],
    enableLog: false,
    timeout: 500,
    inAppViewRec: [],
};
class OpenLinkPlugin extends obsidian.Plugin {
    onload() {
        return __awaiter(this, void 0, void 0, function* () {
            this._viewmgr = new ViewMgr(this);
            yield this.loadSettings();
            this.profiles = new ProfileMgr();
            yield this.profiles.loadValidPresetBrowsers();
            const extLinkClick = (evt, validClassName, options = {}) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                const win = activeWindow;
                const el = evt.target;
                if (!el.classList.contains(validClassName)) {
                    return;
                }
                const oolwCID = el.getAttribute('oolw-cid');
                if (typeof oolwCID !== 'undefined') {
                    if (win.oolwCIDs.contains(oolwCID)) {
                        return; // FIXME: prevent double click
                    }
                    else {
                        win.oolwCIDs.push(oolwCID);
                        setTimeout(() => {
                            win.oolwCIDs.remove(oolwCID);
                        }, 10);
                    }
                }
                const { button, altKey, ctrlKey, metaKey, shiftKey } = evt;
                let modifier = 'none';
                if (altKey) {
                    modifier = 'alt';
                }
                else if (ctrlKey) {
                    modifier = 'ctrl';
                }
                else if (metaKey) {
                    modifier = 'meta';
                }
                else if (shiftKey) {
                    modifier = 'shift';
                }
                // const modifiers = getModifiersFromMouseEvt(evt)
                const url = el.getAttr('href');
                const matchedMB = this.settings.modifierBindings.find((mb) => {
                    if (mb.auxClickOnly && button != MouseButton.Auxiliary) {
                        return false;
                    }
                    else {
                        return mb.modifier === modifier;
                    }
                });
                const profileName = (_a = matchedMB === null || matchedMB === void 0 ? void 0 : matchedMB.browser) !== null && _a !== void 0 ? _a : this.settings.selected;
                const paneType = el.getAttr('target') === '_blank'
                    ? 'window' // higher priority
                    : el.getAttr('oolw-pane-type') || undefined;
                const cmd = this._getOpenCMD(profileName);
                if (this.settings.enableLog) {
                    log('info', 'click event (extLinkClick)', {
                        click: {
                            button,
                            altKey,
                            ctrlKey,
                            metaKey,
                            shiftKey,
                        },
                        el,
                        modifier,
                        mouseEvent: evt,
                        win: evt.doc.win,
                        mid: evt.doc.win.mid,
                        url,
                        profileName,
                        paneType,
                        cmd,
                        matchedBinding: matchedMB,
                    });
                }
                // right click trigger (windows only)
                if (typeof options.allowedButton != 'undefined' &&
                    button != options.allowedButton) {
                    return;
                }
                // in-app view
                if (profileName === BROWSER_IN_APP.val) {
                    evt.preventDefault();
                    this._viewmgr.createView(url, ViewMode.NEW, {
                        focus: matchedMB === null || matchedMB === void 0 ? void 0 : matchedMB.focusOnView,
                        paneType,
                    });
                    return;
                }
                if (profileName === BROWSER_IN_APP_LAST.val) {
                    evt.preventDefault();
                    this._viewmgr.createView(url, ViewMode.LAST, {
                        focus: matchedMB === null || matchedMB === void 0 ? void 0 : matchedMB.focusOnView,
                        paneType,
                    });
                    return;
                }
                if (typeof cmd !== 'undefined') {
                    evt.preventDefault();
                    const code = yield openWith(url, cmd, {
                        enableLog: this.settings.enableLog,
                        timeout: this.settings.timeout,
                    });
                    if (code !== 0) {
                        if (this.settings.enableLog) {
                            log('error', 'failed to open', `'spawn' exited with code ${code} when ` +
                                `trying to open an external link with ${profileName}.`);
                        }
                        win._builtInOpen(url);
                    }
                }
                else {
                    win._builtInOpen(url);
                }
            });
            //
            this.addSettingTab(new SettingTab(this.app, this));
            //
            this._windowUtils = new WindowUtils(this);
            this._clickUtils = new ClickUtils(this, this._windowUtils);
            const initWindow = (win) => {
                this._windowUtils.registerWindow(win);
                this._clickUtils.overrideDefaultWindowOpen(win, true);
                this._clickUtils.initDocClickHandler(win);
                this.registerDomEvent(win, 'click', (evt) => {
                    return extLinkClick(evt, 'oolw-external-link-dummy', {
                        allowedButton: MouseButton.Main,
                    });
                });
                this.registerDomEvent(win, 'auxclick', (evt) => {
                    return extLinkClick(evt, 'oolw-external-link-dummy', {
                        allowedButton: MouseButton.Auxiliary,
                    });
                });
            };
            initWindow(activeWindow);
            this.app.workspace.on('window-open', (ww, win) => {
                initWindow(win);
            });
            this.app.workspace.on('window-close', (ww, win) => {
                this._oolwUnloadWindow(win);
            });
            //
            this.app.workspace.onLayoutReady(() => __awaiter(this, void 0, void 0, function* () {
                yield this._viewmgr.restoreView();
                if (this.settings.enableLog) {
                    log('info', 'restored views', this.settings.inAppViewRec);
                }
            }));
        });
    }
    onunload() {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof this._windowUtils !== 'undefined') {
                Object.keys(this._windowUtils.getRecords()).forEach((mid) => {
                    this._oolwUnloadWindowByMID(mid);
                });
                delete this._clickUtils;
                delete this._windowUtils;
            }
        });
    }
    loadSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            this.settings = Object.assign({}, DEFAULT_SETTINGS, yield this.loadData());
        });
    }
    saveSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.settings.enableLog) {
                log('info', 'saving settings', this.settings);
            }
            yield this.saveData(this.settings);
        });
    }
    _getOpenCMD(val) {
        if (val === BROWSER_SYSTEM.val) {
            return undefined;
        }
        if (val === BROWSER_GLOBAL.val) {
            val = this.settings.selected;
        }
        return this.profiles.getBrowsersCMD(this.settings.custom)[val];
    }
    _oolwUnloadWindow(win) {
        if (typeof this._clickUtils !== 'undefined') {
            this._clickUtils.removeDocClickHandler(win);
            this._clickUtils.overrideDefaultWindowOpen(win, false);
        }
        if (typeof this._windowUtils !== 'undefined') {
            this._windowUtils.unregisterWindow(win);
        }
    }
    _oolwUnloadWindowByMID(mid) {
        if (typeof this._windowUtils !== 'undefined') {
            const win = this._windowUtils.getWindow(mid);
            if (typeof win !== 'undefined') {
                this._oolwUnloadWindow(win);
            }
        }
    }
}
class PanicModal extends obsidian.Modal {
    constructor(app, message) {
        super(app);
        this.message = message;
        this.message = message;
    }
    onOpen() {
        let { contentEl } = this;
        contentEl.setText(this.message);
    }
    onClose() {
        let { contentEl } = this;
        contentEl.empty();
    }
}
class SettingTab extends obsidian.PluginSettingTab {
    constructor(app, plugin) {
        super(app, plugin);
        this.plugin = plugin;
        this.plugin = plugin;
        this._profileChangeHandler = obsidian.debounce((val) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const profiles = JSON.parse(val);
                this.plugin.settings.custom = profiles;
                yield this.plugin.saveSettings();
                this._render();
            }
            catch (e) {
                this.panic((_b = (_a = e.message) !== null && _a !== void 0 ? _a : e.toString()) !== null && _b !== void 0 ? _b : 'some error occurred in open-link-with');
            }
        }), 1500, true);
        this._timeoutChangeHandler = obsidian.debounce((val) => __awaiter(this, void 0, void 0, function* () {
            const timeout = parseInt(val);
            if (Number.isNaN(timeout)) {
                this.panic('Value of timeout should be interger.');
            }
            else {
                this.plugin.settings.timeout = timeout;
                yield this.plugin.saveSettings();
                this._render();
            }
        }), 1500, true);
    }
    panic(msg) {
        new PanicModal(this.app, msg).open();
    }
    _render() {
        let { containerEl } = this;
        containerEl.empty();
        new obsidian.Setting(containerEl)
            .setName('Browser')
            .setDesc('Open external link with selected browser.')
            .addDropdown((dd) => {
            const browsers = [
                BROWSER_SYSTEM,
                BROWSER_IN_APP_LAST,
                BROWSER_IN_APP,
                ...Object.keys(this.plugin.profiles.getBrowsersCMD(this.plugin.settings.custom)).map((b) => {
                    return { val: b };
                }),
            ];
            let current = browsers.findIndex(({ val }) => val === this.plugin.settings.selected);
            if (current !== -1) {
                browsers.unshift(browsers.splice(current, 1)[0]);
            }
            browsers.forEach((b) => { var _a; return dd.addOption(b.val, (_a = b.display) !== null && _a !== void 0 ? _a : b.val); });
            dd.onChange((p) => __awaiter(this, void 0, void 0, function* () {
                this.plugin.settings.selected = p;
                yield this.plugin.saveSettings();
            }));
        });
        new obsidian.Setting(containerEl)
            .setName('Customization')
            .setDesc('Customization profiles in JSON.')
            .addTextArea((text) => text
            .setPlaceholder('{}')
            .setValue(JSON.stringify(this.plugin.settings.custom, null, 4))
            .onChange(this._profileChangeHandler));
        const mbSetting = new obsidian.Setting(containerEl)
            .setName('Modifier Bindings')
            .setDesc('Matching from top to bottom')
            .addButton((btn) => {
            btn.setButtonText('New');
            btn.onClick((_) => __awaiter(this, void 0, void 0, function* () {
                this.plugin.settings.modifierBindings.unshift({
                    id: genRandomStr(6),
                    platform: Platform.Unknown,
                    modifier: 'none',
                    focusOnView: true,
                    auxClickOnly: false,
                });
                yield this.plugin.saveSettings();
                this._render();
            }));
        });
        const mbSettingEl = mbSetting.settingEl;
        mbSettingEl.setAttr('style', 'flex-wrap:wrap');
        const bindings = this.plugin.settings.modifierBindings;
        bindings.forEach((mb) => {
            const ctr = document.createElement('div');
            ctr.setAttr('style', 'flex-basis:100%;height:auto;margin-top:18px');
            const mini = document.createElement('div');
            const kb = new obsidian.Setting(mini);
            kb.addDropdown((dd) => {
                var _a;
                const browsers = [
                    BROWSER_GLOBAL,
                    BROWSER_IN_APP_LAST,
                    BROWSER_IN_APP,
                    ...Object.keys(this.plugin.profiles.getBrowsersCMD(this.plugin.settings.custom)).map((b) => {
                        return { val: b };
                    }),
                    BROWSER_SYSTEM,
                ];
                browsers.forEach((b) => {
                    var _a;
                    dd.addOption(b.val, (_a = b.display) !== null && _a !== void 0 ? _a : b.val);
                });
                dd.setValue((_a = mb.browser) !== null && _a !== void 0 ? _a : BROWSER_GLOBAL.val);
                dd.onChange((browser) => __awaiter(this, void 0, void 0, function* () {
                    if (browser === BROWSER_GLOBAL.val) {
                        browser = undefined;
                    }
                    this.plugin.settings.modifierBindings.find((m) => m.id === mb.id).browser = browser;
                    yield this.plugin.saveSettings();
                    this._render();
                }));
            });
            kb.addToggle((toggle) => {
                toggle.toggleEl.setAttribute('id', 'oolw-aux-click-toggle');
                toggle.setValue(mb.auxClickOnly);
                toggle.setTooltip('Triggers on middle mouse button click only');
                toggle.onChange((val) => __awaiter(this, void 0, void 0, function* () {
                    this.plugin.settings.modifierBindings.find((m) => m.id === mb.id).auxClickOnly = val;
                    yield this.plugin.saveSettings();
                }));
            });
            kb.addToggle((toggle) => {
                toggle.toggleEl.setAttribute('id', 'oolw-view-focus-toggle');
                if (mb.browser === BROWSER_IN_APP.val ||
                    mb.browser === BROWSER_IN_APP_LAST.val) {
                    toggle.setDisabled(false);
                    toggle.setValue(mb.focusOnView);
                }
                else {
                    toggle.toggleEl.setAttribute('style', 'opacity:0.2');
                    toggle.setDisabled(true);
                    toggle.setValue(false);
                }
                toggle.setTooltip('Focus on view after opening/updating (in-app browser only)');
                toggle.onChange((val) => __awaiter(this, void 0, void 0, function* () {
                    this.plugin.settings.modifierBindings.find((m) => m.id === mb.id).focusOnView = val;
                    yield this.plugin.saveSettings();
                }));
            });
            kb.addDropdown((dd) => {
                const platform = getPlatform();
                getValidModifiers(platform).forEach((m) => {
                    dd.addOption(m, Object.assign(Object.assign({}, MODIFIER_TEXT_FALLBACK), MODIFIER_TEXT[platform])[m]);
                });
                dd.setValue(mb.modifier);
                dd.onChange((modifier) => __awaiter(this, void 0, void 0, function* () {
                    this.plugin.settings.modifierBindings.find((m) => m.id === mb.id).modifier = modifier;
                    yield this.plugin.saveSettings();
                }));
            });
            kb.addButton((btn) => {
                btn.setButtonText('Remove');
                btn.setClass('mod-warning');
                btn.onClick((_) => __awaiter(this, void 0, void 0, function* () {
                    const idx = this.plugin.settings.modifierBindings.findIndex((m) => m.id === mb.id);
                    this.plugin.settings.modifierBindings.splice(idx, 1);
                    yield this.plugin.saveSettings();
                    this._render();
                }));
            });
            kb.controlEl.setAttr('style', 'justify-content: space-between !important;');
            mbSettingEl.appendChild(ctr);
            ctr.appendChild(kb.controlEl);
        });
        new obsidian.Setting(containerEl)
            .setName('Logs')
            .setDesc('Display logs in console (open developer tools to view).')
            .addToggle((toggle) => {
            toggle.setValue(this.plugin.settings.enableLog);
            toggle.onChange((val) => __awaiter(this, void 0, void 0, function* () {
                this.plugin.settings.enableLog = val;
                yield this.plugin.saveSettings();
                this._render();
            }));
        });
        new obsidian.Setting(containerEl)
            .setName('Timeout')
            .addText((text) => text
            .setPlaceholder('500')
            .setValue(this.plugin.settings.timeout.toString())
            .onChange(this._timeoutChangeHandler));
    }
    display() {
        this._render();
    }
}

module.exports = OpenLinkPlugin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsiLi4vbm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIi4uL3NyYy90eXBlcy50cyIsIi4uL3NyYy91dGlscy50cyIsIi4uL3NyYy9jbGljay50cyIsIi4uL3NyYy9jb25zdGFudC50cyIsIi4uL3NyYy9vcGVuLnRzIiwiLi4vc3JjL3Byb2ZpbGUudHMiLCIuLi9zcmMvdmlldy50cyIsIi4uL3NyYy9tYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpudWxsLCJuYW1lcyI6WyJNUiIsIlBsYXRmb3JtIiwiZXhpc3RzU3luYyIsInNwYXduU3luYyIsInBhdGgiLCJzcGF3biIsIm9zIiwicGxhdGZvcm0iLCJJdGVtVmlldyIsIlBsdWdpbiIsIk1vZGFsIiwiUGx1Z2luU2V0dGluZ1RhYiIsImRlYm91bmNlIiwiU2V0dGluZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFvR0E7QUFDTyxTQUFTLFNBQVMsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUU7QUFDN0QsSUFBSSxTQUFTLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxPQUFPLEtBQUssWUFBWSxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLFVBQVUsT0FBTyxFQUFFLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUU7QUFDaEgsSUFBSSxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsRUFBRSxVQUFVLE9BQU8sRUFBRSxNQUFNLEVBQUU7QUFDL0QsUUFBUSxTQUFTLFNBQVMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFD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
