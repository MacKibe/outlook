"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
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
};
exports.__esModule = true;
exports.user = exports.content = exports.report = exports.choices = exports.assets = exports.popup = exports.template = exports.baby = exports.quiz = exports.panel = exports.view = void 0;
//
//Resolve the schema classes, viz.:database, columns, mutall e.t.c. 
var schema = require("../../../schema/v/code/schema.js");
//This is the panel that the users will see generally. It is the root of 
//all  outlook pages. Application is a view. A page, which extends 
//a view is used for data collection. A view is not. A view may
//be carnibalised to feed another view; such views are called templates
var view = /** @class */ (function () {
    //
    function view(
    //
    //The address  of the page. Some popup pages don`t have 
    //a url that`s why it`s optional.
    url) {
        this.url = url;
        // 
        //The popoup window size and location specification.
        this.specs = null;
        //
        //A view has a document that is (typically) set when the url of a window 
        //is opened. 
        this.win__ = null;
        //
        //For debugging
        this.id = 'view';
        //
        //The children nodes of the root document element of this view
        //o support restoring of this page in response to the on pop state event.
        this.child_nodes = [];
        // 
        //Initialize the named panels
        this.panels = new Map();
        // 
        //Register this view identified by the last entry in the lookup table for views.
        // 
        //The view's key is the count of the number of keys in the lookup.
        this.key = view.lookup.size;
        view.lookup.set(this.key, this);
    }
    Object.defineProperty(view.prototype, "win", {
        // 
        //These are getter and setter to access the protected win variable  
        get: function () { return this.win__; },
        set: function (win) { this.win__ = win; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(view.prototype, "document", {
        //
        //The document of a view is that of its the window
        get: function () {
            return this.win.document;
        },
        enumerable: false,
        configurable: true
    });
    //Restore the children nodes of this view.  
    view.prototype.restore_view = function (key) {
        //
        //For debugging purposes....
        console.log("restore, ".concat(this.id, ", ").concat(this.key));
        //
        //Get the view of the given key
        var View = view.lookup.get(key);
        //
        //It's an error if the view has not been cached
        if (View === undefined)
            throw new schema.mutall_error("This key ".concat(key, "\n             has no matching view"));
        //
        //Get the root document element. 
        var root = View.document.documentElement;
        //
        //Clean the root before restoring it -- just in case the view
        //is attached to an old window;
        Array.from(root.childNodes).forEach(function (node) { return root.removeChild(node); });
        //
        //Attach every child node of this view to the root document
        this.child_nodes.forEach(function (node) { return root.appendChild(node); });
        // 
        //Restore the current view, so that click listeners of this view
        //that rely that static property can work. In general this does noting;
        //in particular this sets property crud.page.current to this view
        this.restore_current();
    };
    //
    //Clean this value by removing all characters that can 
    //cause json parsing to fail, e.g., new lineshite spaces and line 
    //breaks
    view.clean = function (text) {
        return text
            .replace(/\\n/g, "\\n")
            .replace(/\\'/g, "\\'")
            .replace(/\\"/g, '\\"')
            .replace(/\\&/g, "\\&")
            .replace(/\\r/g, "\\r")
            .replace(/\\t/g, "\\t")
            .replace(/\\b/g, "\\b");
    };
    //
    // 
    //Restore the current view, so that click listeners of this view
    //that rely that statuic variable can work. In general this does noting;
    //in particular this sets property c.page.current to this view
    view.prototype.restore_current = function () { };
    //
    //Save the children of th rot document element of this view to the local
    //propety using the 'how' method
    view.prototype.save_view = function (how) {
        var _this = this;
        //
        //Get the root document element
        var root = this.document.documentElement;
        //
        //Save the child nodes
        this.child_nodes = Array.from(root.childNodes);
        // 
        //Set the onpop state listener to support the push or replace
        //state action that follows. Note that this handler is et just before 
        //the the action that it is designed to serve
        this.win.onpopstate = function (evt) { return _this.onpopstate(evt); };
        //
        //Push or replace the state
        this.win.history[how](this.key, "", 
        //
        //Show the view's id, identification key and current history 
        //lenghth (for debugging purposes)
        "?id=".concat(this.id, "&key=").concat(this.key, "&len=").concat(this.win.history.length));
    };
    //
    //Returns the values of the currently selected inputs 
    //from a list of named ones 
    view.prototype.get_choices = function (name) {
        //
        //Collect the named radio/checked inputs
        var radios = Array.from(this.document.querySelectorAll("[name=\"".concat(name, "\"]")));
        //
        //Filter the checked inputs and return their values buttons 
        return radios.filter(function (r) { return r.checked; })
            .map(function (r) { return r.value; });
    };
    //Update the the window's title, so that the correct key can show in 
    //the browser (for onpopstate bebugging purpos)
    view.prototype.set_title = function () {
        //
        //Get the (old) title element; the page must have one
        var title = this.document.querySelector('title');
        if (title == null)
            throw new schema.mutall_error("No title found for page ".concat(this.url));
        //
        //Add the key component
        title.textContent = "".concat(this.id, "/").concat(this.key);
    };
    //
    //TO ENABLE Lawrence USE THIS METHOD OF CREATING WITHOUT HAVING TO CREATE THE IO.
    //PMuraya:  added this utility here to enable us create elements anytime anywhere
    //Create a new element from  the given tagname and attributes 
    //we assume that the element has no children in this version.
    view.prototype.create_element = function (
    //
    //The parent of the element to be created
    anchor, 
    //
    //The elements tag name
    tagname, 
    //
    //The attributes of the element
    attributes) {
        //
        //Create the element holder based on the td's owner documet
        var element = anchor.ownerDocument.createElement(tagname);
        //
        //Attach this element to the anchor 
        anchor.appendChild(element);
        //
        //Loop through all the keys to add the atributes
        for (var key in attributes) {
            var value = attributes[key];
            // 
            // JSX does not allow class as a valid name
            if (key === "className") {
                // 
                //Take care of mutiple class values
                var classes = value.split(" ");
                classes.forEach(function (c) { return element.classList.add(c); });
            }
            else if (key === "textContent") {
                element.textContent = value;
            }
            else if (key.startsWith("on") && typeof attributes[key] === "function") {
                element.addEventListener(key.substring(2), value);
            }
            else {
                // <input disable />      { disable: true }
                if (typeof value === "boolean" && value) {
                    element.setAttribute(key, "");
                }
                else {
                    //
                    // <input type="text" />  { type: "text"}
                    element.setAttribute(key, value);
                }
            }
        }
        return element;
    };
    //
    //Return the identified element 
    view.prototype.get_element = function (id) {
        //
        //Get the identified element from the current browser context.
        var element = this.document.querySelector("#".concat(id));
        //
        //Check the element for a null value
        if (element === null) {
            var msg = "The element identified by #".concat(id, " not found");
            alert(msg);
            throw new Error(msg);
        }
        return element;
    };
    //Show or hide a window panel
    view.prototype.show_panel = function (id, show) {
        //
        //Get the identified element
        var elem = this.get_element(id);
        //
        //Hide the element if the show is not true
        elem.hidden = !show;
    };
    //Open a window, by default, reurns the current window and sets the
    //title
    view.prototype.open = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                //
                this.win = window;
                //
                //Set the accurate application title
                this.set_title();
                //
                return [2 /*return*/, this.win];
            });
        });
    };
    //
    //Handle the on pop state listener by saving the current state and 
    //restoring the view matching the event's history state
    view.prototype.onpopstate = function (evt) {
        // 
        //Ignore all state that has no components to restore. Typically
        //this is the initial statae placed automatically on the history 
        //stack when this application loaded initially. NB:We have made provisions
        //that the initial state will be replaced with the that of the 
        //applicaton, so, it's an error to get the null state
        if (evt.state === null)
            throw new schema.mutall_error('Null state is not expected');
        // 
        //Get the saved view's key
        var key = evt.state;
        // 
        //Use the key to get the view being restored. 
        var new_view = view.lookup.get(key);
        //
        //It is an error if the key has no matching view.
        if (new_view === undefined)
            throw new schema.mutall_error("This key \n            ".concat(key, " has no view"));
        // 
        //Restore the components of the new view
        new_view.restore_view(key);
    };
    // 
    //The default way a view shows its content is 
    //by looping through all its panels and painting 
    //them. Pages without panels can override this method 
    //to paint their content.
    view.prototype.show_panels = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, panel_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(this.panels !== undefined)) return [3 /*break*/, 4];
                        _i = 0, _a = this.panels.values();
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        panel_1 = _a[_i];
                        return [4 /*yield*/, panel_1.paint()];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // 
    //Lookup storage for all views created by this application.
    view.lookup = new Map();
    return view;
}());
exports.view = view;
//
//A panel is a targeted setction of a view. It can be painted 
//independently
var panel = /** @class */ (function (_super) {
    __extends(panel, _super);
    //
    function panel(
    //
    //The CSS to describe the targeted element on the base page
    css, 
    //
    //The base view on that is the home of the panel
    base) {
        var _this = 
        //The ur is that of the base
        _super.call(this, base.url) || this;
        _this.css = css;
        _this.base = base;
        return _this;
    }
    //
    //Start painting the panel
    panel.prototype.paint = function () {
        return __awaiter(this, void 0, void 0, function () {
            var targets;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        targets = Array.from(this.document.querySelectorAll(this.css));
                        //
                        //There must be a target    
                        if (targets.length == 0)
                            throw new schema.mutall_error("No target found with CSS ".concat(this.css));
                        //
                        //Multiple targets is a sign of sn error
                        if (targets.length > 1)
                            throw new schema.mutall_error("Multiple targets found with CSS ".concat(this.css));
                        //
                        //The target must be a html element
                        if (!(targets[0] instanceof HTMLElement))
                            throw new schema.mutall_error("\n        The element targeted by CSS ".concat(this.css, " must be an html element"));
                        //
                        //Set teh html element and continue painting the panel
                        this.target = targets[0];
                        //
                        //Continue to pain the tger    
                        return [4 /*yield*/, this.continue_paint()];
                    case 1:
                        //
                        //Continue to pain the tger    
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(panel.prototype, "win", {
        //
        //The window of a panel is the same as that of its base view, 
        //so a panel does not need to be opened
        get: function () {
            return this.base.win;
        },
        enumerable: false,
        configurable: true
    });
    return panel;
}(view));
exports.panel = panel;
//
//A page extends a view in that it is used for obtaining 
//data from a user. Baby and popup pages are extendsions of a view
var quiz = /** @class */ (function (_super) {
    __extends(quiz, _super);
    //
    function quiz(url) {
        return _super.call(this, url) || this;
    }
    Object.defineProperty(quiz.prototype, "document", {
        //
        //Get the document of this window using a getter
        get: function () {
            return this.win.document;
        },
        enumerable: false,
        configurable: true
    });
    //
    //This is the process which makes the page visible, waits for 
    //user to respond and returns the expected response, if not aborted. NB. The 
    //return data type is parametric
    quiz.prototype.show = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, result;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        // 
                        //Initialize the win property by opening a window 
                        _a = this;
                        return [4 /*yield*/, this.open()];
                    case 1:
                        // 
                        //Initialize the win property by opening a window 
                        _a.win = _b.sent();
                        // 
                        //Paint the various panels of this page in the default 
                        //way of looping over the panels. A page without the panels can 
                        //overide this method with its own.
                        return [4 /*yield*/, this.show_panels()];
                    case 2:
                        // 
                        //Paint the various panels of this page in the default 
                        //way of looping over the panels. A page without the panels can 
                        //overide this method with its own.
                        _b.sent();
                        return [4 /*yield*/, new Promise(function (resolve) {
                                //
                                //Collect the result on clicking the Ok/go button.
                                var okay = _this.get_element("go");
                                okay.onclick = function () { return __awaiter(_this, void 0, void 0, function () {
                                    var _a;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0:
                                                //
                                                //Check the user unputs for error. If there
                                                //any, do not continue the process
                                                if (!this.check())
                                                    return [2 /*return*/];
                                                //
                                                //Get the primary key and its  friendly name 
                                                _a = resolve;
                                                return [4 /*yield*/, this.get_result()];
                                            case 1:
                                                //
                                                //Get the primary key and its  friendly name 
                                                _a.apply(void 0, [_b.sent()]);
                                                return [2 /*return*/];
                                        }
                                    });
                                }); };
                                // 
                                //Discard the result on Cancel (by returning an undefined value).
                                var cancel = _this.get_element("cancel");
                                cancel.onclick = function () { return __awaiter(_this, void 0, void 0, function () {
                                    var r;
                                    return __generator(this, function (_a) {
                                        resolve(r);
                                        return [2 /*return*/];
                                    });
                                }); };
                            })];
                    case 3:
                        result = _b.sent();
                        //
                        //Wait for the user to inintiate the flow back to the base page
                        return [4 /*yield*/, this.close_quiz()];
                    case 4:
                        //
                        //Wait for the user to inintiate the flow back to the base page
                        _b.sent();
                        //
                        //Return the promised result.
                        return [2 /*return*/, result];
                }
            });
        });
    };
    return quiz;
}(view));
exports.quiz = quiz;
//
//The baby class models pages that share the same window as their mother.
//In contrast a popup does not(share the same window as the mother)
var baby = /** @class */ (function (_super) {
    __extends(baby, _super);
    //
    function baby(mother, url) {
        var _this = _super.call(this, url) || this;
        _this.mother = mother;
        return _this;
    }
    Object.defineProperty(baby.prototype, "win", {
        //The window of the mother is that same as that of the bay
        get: function () {
            return this.mother.win;
        },
        //
        //
        set: function (w) { this.mother.win = w; },
        enumerable: false,
        configurable: true
    });
    //
    //Administering a crud page is managing all the operations from 
    //the  moment a page gets vsisble to when a result is retrned
    baby.prototype.administer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var Template, win, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Template = new template(this.url);
                        return [4 /*yield*/, Template.open()];
                    case 1:
                        win = _a.sent();
                        //
                        //Replace the entire current document with that of the template
                        this.document.documentElement.innerHTML = win.document.documentElement.innerHTML;
                        //
                        //Close the baby template
                        win.close();
                        //
                        //Ensure that the page title is set correctly
                        this.set_title();
                        //
                        //Save this initial version of this baby view
                        this.save_view("pushState");
                        return [4 /*yield*/, this.show()];
                    case 2:
                        result = _a.sent();
                        // 
                        return [2 /*return*/, result];
                }
            });
        });
    };
    //
    //The opening of a baby returns the same window as that of the mother
    baby.prototype.open = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                //
                //Return the window of the mother (not the temporary one)
                this.win = this.mother.win;
                //
                //Update the the window's title, so that the correct key can show in 
                //the browser (for onpopstate debugging purpos)
                this.set_title();
                //
                return [2 /*return*/, this.win];
            });
        });
    };
    //Close a baby page by invoking the back button; in contrast a popup does 
    //it by executing the window close method.
    baby.prototype.close_quiz = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve) {
                            // 
                            //Wire the event listener before evoking the on pop state usng
                            //the history back button.
                            _this.win.onpopstate = function (evt) {
                                //
                                //Restore the on pop state event
                                _this.onpopstate(evt);
                                //
                                //Stop the waiting
                                resolve();
                            };
                            //
                            //Use the back button to evoke the on pop state
                            _this.win.history.back();
                        })];
                    case 1: 
                    // 
                    //Wait for the mother window to be restored.
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return baby;
}(quiz));
exports.baby = baby;
//A template is a popup window used for canibalising to feed another window.
//The way you open it is smilar to  popup. Its flagship method is the copy
var template = /** @class */ (function (_super) {
    __extends(template, _super);
    function template(url) {
        return _super.call(this, url) || this;
    }
    //Open a window, by default, reurns the current window and sets the
    //title
    template.prototype.open = function () {
        return __awaiter(this, void 0, void 0, function () {
            var win;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        win = window.open(this.url);
                        //
                        //Wait for the page to load 
                        return [4 /*yield*/, new Promise(function (resolve) { return win.onload = resolve; })];
                    case 1:
                        //
                        //Wait for the page to load 
                        _a.sent();
                        //
                        //Retrieve the root html of the new documet
                        this.win = win;
                        //
                        return [2 /*return*/, this.win];
                }
            });
        });
    };
    //
    //Transfer the html content from this view to the specified
    //destination and return a html element from the destination view. 
    template.prototype.copy = function (src, dest) {
        //
        //Destructure the destination specification
        var Page = dest[0], dest_id = dest[1];
        //
        //1 Get the destination element.
        var dest_element = Page.get_element(dest_id);
        //
        //2 Get the source element.
        var src_element = this.get_element(src);
        //
        //3. Transfer the html from the source to the destination. 
        dest_element.innerHTML = src_element.innerHTML;
        //
        //Return the destination painter for chaining
        return dest_element;
    };
    return template;
}(view));
exports.template = template;
//This class represents the view|popup page that the user sees for collecting
//inputs
var popup = /** @class */ (function (_super) {
    __extends(popup, _super);
    //
    function popup(url, 
    // 
    //The popoup window size and location specification.
    specs) {
        if (specs === void 0) { specs = null; }
        var _this = _super.call(this, url) || this;
        _this.specs = specs;
        return _this;
    }
    //
    //Open a pop window returns a brand new window with specified dimensions.
    popup.prototype.open = function () {
        return __awaiter(this, void 0, void 0, function () {
            var specs, win, complete_win;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        specs = this.specs === null ? this.get_specs() : this.specs;
                        win = window.open(this.url, "", specs);
                        return [4 /*yield*/, new Promise(function (resolve) { return win.onload = function () { return resolve(win); }; })];
                    case 1:
                        complete_win = _a.sent();
                        //
                        this.win = complete_win;
                        //
                        //Update the the window's title, so that the correct key can show in 
                        //the browser (for onpopstate bebugging purpos)
                        this.set_title();
                        //
                        //Return the complete window
                        return [2 /*return*/, complete_win];
                }
            });
        });
    };
    //
    //Get the specifications that can center the page as a modal popup
    //Overide this method if you want different layout
    popup.prototype.get_specs = function () {
        //
        //Specify the pop up window dimensions.
        //width
        var w = 500;
        //height
        var h = 500;
        //
        //Specify the pop up window position
        var left = screen.width / 2 - w / 2;
        var top = screen.height / 2 - h / 2;
        //
        //Compile the window specifictaions
        return "width=".concat(w, ", height=").concat(h, ", top=").concat(top, ", left=").concat(left);
    };
    //
    //Displays the page waits for the user to interact with it 
    //and return a response. Note that this process does not 
    //make eny referemces to a mother because it has none
    popup.prototype.administer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.show()];
                    case 1:
                        result = _a.sent();
                        // 
                        return [2 /*return*/, result];
                }
            });
        });
    };
    //
    //Close this popup window 
    popup.prototype.close_quiz = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve) {
                            // 
                            //Add the event listener BEFORE CLOSING THIS WINDOW
                            _this.win.onbeforeunload = function () { return resolve(); };
                            // 
                            //Close the  popup window.
                            _this.win.close();
                        })];
                    case 1: 
                    // 
                    //Wait for the window to unload
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return popup;
}(quiz));
exports.popup = popup;
//
//
//Namespace for handling the roles a user plays in an application
var assets;
(function (assets) {
    //Verbs for crud operations
    assets.all_verbs = ['create', 'review', 'update', 'delete'];
    ;
})(assets = exports.assets || (exports.assets = {}));
//
//This is a generalised popup for making selections from multiple choices  
//The choices are provided as a list of key/value pairs and the output is 
//a list keys.  
var choices = /** @class */ (function (_super) {
    __extends(choices, _super);
    //
    function choices(
    //
    //The html file to use for the popup
    filename, 
    // 
    //The key value pairs that are to be painted as checkboxes
    //when we show the panels. 
    inputs, 
    // 
    //This is a short code that is used
    //as an identifier for this general popup
    id, 
    // 
    //The popoup window size and location specification.
    specs, 
    // 
    //The css that retrieves the element on this page where 
    //the content of this page is to be painted. If this css 
    //is not set the content will be painted at the body by default 
    css, 
    //
    //Indicate whether multiple or single choices are expected
    type) {
        if (specs === void 0) { specs = null; }
        if (css === void 0) { css = '#content'; }
        if (type === void 0) { type = 'multiple'; }
        var _this = _super.call(this, filename, specs) || this;
        _this.inputs = inputs;
        _this.id = id;
        _this.specs = specs;
        _this.css = css;
        _this.type = type;
        return _this;
    }
    //
    //Check that the user has selected  at least one of the choices
    choices.prototype.check = function () {
        //
        //Extract the marked/checked choices from the input checkboxes
        var result = this.get_choices(this.id);
        //
        //Cast this result into the desired output
        this.output = result;
        //
        //The ouput is ok if the choices are not empty.
        var ok = this.output.length > 0;
        if (!ok) {
            alert("Please select at least one ".concat(this.id));
            return false;
        }
        //
        return true;
    };
    //
    //Retrive the choices that the user has filled from the form
    choices.prototype.get_result = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.output];
            });
        });
    };
    //
    //Overide the show panels method by painting the css referenced element or 
    //body of this window with the inputs that were used to create this page 
    choices.prototype.show_panels = function () {
        return __awaiter(this, void 0, void 0, function () {
            var panel;
            var _this = this;
            return __generator(this, function (_a) {
                panel = this.document.querySelector(this.css);
                if (panel === null)
                    throw new schema.mutall_error("No hook element found for the choices");
                //
                //Attach the choices as the children of the panel
                this.inputs.forEach(function (option) {
                    //
                    //Destructure the choice item 
                    var key = option.key, value = option.value;
                    //
                    // Use radio buttons for single choices and checkbox for multiple 
                    // choices
                    var type = _this.type === 'single' ? "radio" : "checkbox";
                    //
                    // Compile the HTML option
                    var html = "\n                <label>\n                 <input type='".concat(type, "' value= '").concat(key, "' name=\"").concat(_this.id, "\" >: \n                 ").concat(value, "\n                </label>");
                    //
                    //Attach the label to the pannel 
                    var label = _this.document.createElement("temp");
                    panel.appendChild(label);
                    label.outerHTML = html;
                });
                return [2 /*return*/];
            });
        });
    };
    return choices;
}(popup));
exports.choices = choices;
// 
//This is a view displayed as a baby but not used for collecting data 
//It is used in the same way that we use an alert and utilises the general
//html.
var report = /** @class */ (function (_super) {
    __extends(report, _super);
    // 
    //
    function report(
    // 
    //This popup parent page.
    mother, 
    // 
    //The html text to report.
    html, 
    //
    //The html file to use
    filename) {
        var _this = 
        // 
        //The general html is a simple page designed to support advertising as 
        //the user interacts with this application.
        _super.call(this, mother, filename) || this;
        _this.html = html;
        return _this;
    }
    // 
    //Reporting does not require checks and has no results to return because 
    // it is not used for data entry.
    report.prototype.check = function () { return true; };
    report.prototype.get_result = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    // 
    //Display the report 
    report.prototype.show_panels = function () {
        return __awaiter(this, void 0, void 0, function () {
            var content;
            return __generator(this, function (_a) {
                content = this.get_element('content');
                // 
                //Show the html in the content panel. 
                content.innerHTML = this.html;
                //
                //Hide the go button from the general html since it is not useful in the 
                //the reporting
                this.get_element("go").hidden = true;
                return [2 /*return*/];
            });
        });
    };
    return report;
}(baby));
exports.report = report;
var content = /** @class */ (function (_super) {
    __extends(content, _super);
    function content(html, base) {
        var _this = _super.call(this, "body", base) || this;
        _this.html = html;
        return _this;
    }
    content.prototype.continue_paint = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // 
                //Get the target element 
                this.target.innerHTML = this.html;
                return [2 /*return*/];
            });
        });
    };
    return content;
}(panel));
exports.content = content;
//Represents a person/individual that is providing
//or consuming a services we are developing. 
var user = /** @class */ (function () {
    //
    //The minimum requirement for authentication is a username and 
    //password
    function user(email) {
        if (email === void 0) { email = null; }
        //
        this.email = email;
    }
    //A user is a visitor if the email is not defined
    //otherwise his a regular user.
    user.prototype.is_visitor = function () {
        if (this.email === undefined)
            return true;
        else
            return false;
    };
    return user;
}());
exports.user = user;
