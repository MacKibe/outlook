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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.crud_error = exports.tr = exports.page = void 0;
//
//
var outlook = require("./outlook.js");
//
//Allows methods on this page to talk to the server
var server = require("../../../schema/v/code/server.js");
//
//Resolve the schema classes, viz.:database, columns, mutall e.t.c. 
var schema = require("../../../schema/v/code/schema.js");
//
//Import the theme class
var theme = require("./theme.js");
//
//There is only one class in this file:merger; its the default export 
var merger_js_1 = require("../../../outlook/v/code/merger.js");
// 
var app_js_1 = require("./app.js");
//
//A crud page is a baby whose mother is, e.g., the application page,
//another crud page etc.
var page = /** @class */ (function (_super) {
    __extends(page, _super);
    // 
    function page(
    //
    //The page that shares the same window as this crud page
    mother, 
    //
    //This is the entity name associated with the 
    //records being administered.
    subject, 
    //
    //These are th permissible operations on the crud page 
    verbs, 
    //
    //This td represents the primary key and its position from where 
    //the administration was initiated.
    //
    //A crud selection is a piece of data that helps to determine
    //the offset of the displayed records.It contains:- 
    //a) the primary key which is useful for this purpose  assuming 
    //that the data is sorted by that key, not  filtered in any way
    //and no deletions have occured.
    //b) the position that is used for updating the original td
    //using the crud result.
    selection) {
        var _this = 
        //
        _super.call(this, mother, app_js_1.app.current.config.crud) || this;
        _this.mother = mother;
        _this.subject = subject;
        _this.selection = selection;
        //
        //For debugging purposes
        _this.id = 'crud';
        //
        //Save the verbs if they are not empty otherwise save all the 
        //posible casses
        _this.verbs = verbs === (null || undefined)
            ? ["create", "review", "update", "delete"]
            : verbs;
        //
        //Save this as the current crud page for use in expressing event
        //listeners on the crud page. 
        page.current = _this;
        //
        //Set the theme panel so that it will be shown when this page is 
        //administered.
        var Theme = new theme.theme(subject, "#content", _this, _this.selection);
        _this.panels.set("theme", Theme);
        return _this;
    }
    //
    //Allow a user to filter and order records in a theme panel.
    page.prototype.review = function () {
        return __awaiter(this, void 0, void 0, function () {
            var Theme, condition, clause, where, ename, sort, sql, count;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Theme = this.theme;
                        condition = this.get_element('filter').value;
                        clause = this.get_element("sort").value;
                        where = condition === "" ? "" : "where ".concat(condition);
                        ename = this.subject[0];
                        sort = clause === ""
                            //
                            //By default, the sorting order is by ascending primary keys of the
                            //subject.
                            ? " order by  ".concat(ename, ".").concat(ename, "  Asc")
                            //
                            //Otherwise the user overrides the default value.
                            : " order by ".concat(clause);
                        if (Theme.original_sql === null) {
                            //
                            // ...then use the current theme sql.
                            sql = Theme.sql;
                            //
                            // ... and update the original version.
                            Theme.original_sql = Theme.sql;
                        }
                        else {
                            //
                            //Otherwise use the original sql.
                            sql = Theme.original_sql;
                        }
                        //
                        //C. Update the current sql.
                        //
                        //Add the condition and the sort clauses to the original_sql.
                        Theme.sql = "".concat(sql, " ").concat(where, " ").concat(sort, " ");
                        return [4 /*yield*/, server.exec("database", [Theme.dbase.name], "get_sql_data", ["select count(*) as max_record from (".concat(Theme.sql, ") as x")])];
                    case 1:
                        count = _a.sent();
                        //
                        //Set the max records property.
                        Theme.max_records = count[0]["max_record"];
                        //
                        //4.2. Clear table body.
                        this.document.querySelector('tbody').innerHTML = "";
                        //
                        //4.3. Reset the views.
                        Theme.view.top = 0;
                        Theme.view.bottom = 0;
                        //
                        //4.4. Go to the first record.
                        Theme.goto(0);
                        return [2 /*return*/];
                }
            });
        });
    };
    // 
    //Restore the current view, so that click listeners of this view
    //that rely that static variable can work. In general this does nothing;
    //in particular this sets property crud.page.current to this view
    page.prototype.restore_current = function () { page.current = this; };
    //There are no known checks for validating crud operations 
    page.prototype.check = function () { return true; };
    // 
    //Return from this crud page the current selection. Our original touhgt was 
    //tthat from a crud page you could return, e.g., what records were deletd, 
    //which ones were modified and the last selectded one. For this version, 
    //we return only the last selected one.
    page.prototype.get_result = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tr, selection, position, pk_selection, pk, friendly;
            return __generator(this, function (_a) {
                tr = this.document.querySelector(".TR");
                // 
                //If there  is no selected tr then the selection is set to null... 
                if (tr !== null) {
                    position = this.selection.position;
                    pk_selection = tr.getAttribute("pk");
                    //
                    //If the pk_selection is not a string then something must have gone 
                    //wrong; for instance, perhaps the last save was not successful 
                    if (typeof pk_selection !== "string") {
                        throw new schema.mutall_error("The primary key for a selected tr not found");
                    }
                    pk = parseInt(pk_selection);
                    friendly = tr.getAttribute("friend");
                    if (friendly === null) {
                        throw new schema.mutall_error("The friendly component of tr ".concat(pk, " is not found"));
                    }
                    // 
                    //Compile a valid selection
                    selection = { position: position, pk: pk, friendly: friendly };
                }
                //
                //Prepare to return a null selection
                else {
                    selection = null;
                }
                //
                //Compile and return the final crud result without the updates, the additions 
                //and the deletions. They will be considered for future versions
                return [2 /*return*/, { selection: selection }];
            });
        });
    };
    //
    //Modify the foreign key field that matches the given button. The function 
    //is asynchronous because it waits for the user to select a new entry 
    //from the foreign key table's crud page.
    page.prototype.edit_fk = function (button) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, subject, verbs, selection, baby, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        //
                        //Stop the current tr from being clicked on.
                        this.win.event.stopPropagation();
                        _a = this.get_admin_parameters(button), subject = _a.subject, verbs = _a.verbs, selection = _a.selection;
                        baby = this.new_crud(this, subject, verbs, selection);
                        return [4 /*yield*/, baby.administer()];
                    case 1:
                        result = _b.sent();
                        // 
                        //Use the crud result to update this mother page, if it is defined 
                        this.update_fk(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    //
    //Create the logical crud page .This stub is to allow us to override
    //the normal crud page with our application specific version for
    //various reasons including implementation of quality control
    //features. See the crud constructor for further details
    page.prototype.new_crud = function (mother, subject, verbs, selection) {
        return new page(mother, subject, verbs, selection);
    };
    //
    //Get the subject verbs and the primary keys of the current theme
    page.prototype.get_admin_parameters = function (button) {
        //
        //Retrieve the buttons primary key
        var value = button.getAttribute("pk");
        //
        //The primary key must be either a number or undefined.
        var pk;
        if (typeof value === "string") {
            pk = parseInt(value);
        }
        //
        //Retrieve the buttons position
        var td_element = button.parentElement;
        var cellIndex = td_element.cellIndex;
        var rowIndex = td_element.parentElement.rowIndex;
        var position = [rowIndex, cellIndex];
        // 
        //Retrieve the button's friendly component 
        var friendly = button.value;
        // 
        //Compile a td from this button
        var selection = { position: position, pk: pk, friendly: friendly };
        //
        //For this version we assume the user as a service provider 
        //with unlimited crud access to his data 
        var verbs = ["create", "update", "review", "delete"];
        //
        //Get the theme pannel of this crud page 
        var Theme = this.panels.get("theme");
        //
        //Get the column name that matches this button       
        var colname = Theme.col_names[button.parentElement.cellIndex];
        //
        //Get the entity and the database name of this crud page.
        var ename = this.subject[0];
        //
        //Get the actual database column
        var col = Theme.dbase.entities[ename].columns[colname];
        //
        //Formulate the referenced subject 
        var subject = [col.ref.table_name, col.ref.db_name];
        //
        //Return the admin parameters
        return { subject: subject, verbs: verbs, selection: selection };
    };
    //
    //Returns the td that houses the given element. 
    page.get_td = function (element) {
        // 
        //There must be a td element in the hierarchy
        if (element === null)
            throw new schema.mutall_error("No td element found in the hierarchy");
        // 
        //Test if the element is a td and return if it is
        if (element instanceof HTMLTableCellElement)
            return element;
        // 
        //Get the parent element
        var parent = element.parentElement;
        // 
        //Return the td of the parent
        return page.get_td(parent);
    };
    //
    //This is an onchange event listener that highlights
    //this field, i.e., td, to indicate that it will be
    //considered for saving.
    page.mark_as_edited = function (evt) {
        //
        //initialize the element.
        var element;
        // 
        //If the element is wat was passed as a parameter continue
        if (evt instanceof HTMLElement) {
            element = evt;
        }
        // 
        //Check if the event target is a html element to avoid the error on 
        //event element.
        else if (evt.target instanceof HTMLElement) {
            element = evt.target;
        }
        // 
        //This event was not caused by a html element 
        else {
            return;
        }
        //
        // 
        //Do nothing if the element is null 
        if (element === null)
            return;
        //
        //Stop any bubblig up
        window.event.stopPropagation();
        //
        //Get the td that houses the element and mark it as edited.
        var td = page.get_td(element);
        td.classList.add("edited");
        //
        //Get the first cell of the row (that contains this td) and 
        //mark it as edited.
        var pri = td.parentElement.children[0];
        pri.classList.add("edited");
        // 
        //Update the output of this io
        var pos = [page.current.theme.key, td.parentElement.rowIndex, td.cellIndex];
        //
        //get the td' io
        var io = theme.theme.ios.get(String(pos));
        //
        //Do the transfer to update inputs
        io.update_outputs();
    };
    //
    //Use the return crud result, typicaly primary key and its friendly name
    //to update this mother page.
    page.prototype.update_fk = function (result) {
        // 
        //No update is required when crud is aborted
        if (result === undefined)
            return;
        //
        //Update the tr. The update is valid if the user clicked on 
        //the crud's back button to get here, rather the window's 
        //history back button.
        //
        //Destructure the crud result
        var selection = result.selection;
        //
        //Prepare for a null selection
        var position, pk, friendly;
        //
        if (selection !== null) {
            // 
            //Assigninig valid selections 
            //
            //Destructure the selection. We do not know why this is not working
            // ( { position, pk, friendly } )= selection;
            position = selection.position;
            friendly = selection.friendly;
            pk = selection.pk;
        }
        else {
            // 
            //For the case of a null selection nullify the foreign key value
            position = this.selection.position;
        }
        //
        //Destructure the position
        var rowIndex = position[0], colIndex = position[1];
        //.
        //Get the td field being edited
        var table = this.document.querySelector("table");
        //
        //Get the tr st the row index
        var tr = table.rows[rowIndex];
        //
        //Get the td at the columnl index 
        var td = tr.cells[colIndex];
        //
        //Get the button to be changed
        var input = td.querySelector('input');
        //
        //Update the input button with the new changes
        if (pk !== undefined && friendly !== undefined) {
            input.setAttribute("pk", "".concat(pk));
            input.value = friendly;
        }
        // 
        //Mark all the neccesary tds that are affected by this change as 
        //edited.
        //NB THE FIRST TD IN A ROW IS IMPORTANT FOR UPDATING THE CRUD PAGE
        page.mark_as_edited(input);
        //
        //If this is a hierarchical situation update the mother with 
        //updates additions and delete    
    };
    Object.defineProperty(page, "current", {
        //
        //This is the last crud page opened.
        get: function () {
            //
            //Get the lenght of the stack and it must be greater than 0 
            //if not throw an error 
            var length = page.stack.length;
            if (length === 0) {
                throw new Error("There is no current crud page");
            }
            //
            //Get and return the crud page at top of the stack 
            return page.stack[length - 1];
        },
        //
        //
        set: function (x) {
            page.stack.push(x);
        },
        enumerable: false,
        configurable: true
    });
    //
    //A button event listener that adds an empty row above
    //the current selection.
    page.prototype.create_row = function () {
        //
        //Get the selected tr.
        var tr_selected = this.document.querySelector(".TR");
        //
        //1. Create Element tr above the selected tr if any.
        //
        //1.1. Get the table body.
        var tbody = this.document.querySelector("tbody");
        //
        //1.2. Get the row index to append to; it is this
        //selected row if any otherwise its the first row.
        var rowIndex = tr_selected === null
            ? 0
            : tr_selected.rowIndex;
        //
        //1.3. Insert the row into the table body.
        var tr = tbody.insertRow(rowIndex);
        //
        //2. Create a new tr with no row data
        this.theme.load_tr_element(tr);
    };
    //
    //This is a listener for collecting and saving the affected tds
    //, i.e., both new records and existing old tds, to the database.
    // This is the U component of the CRUD operations.
    page.prototype.update_database = function () {
        return __awaiter(this, void 0, void 0, function () {
            var questions, Imala;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        questions = __spreadArray([], this.collect_questions(), true);
                        return [4 /*yield*/, server.exec(
                            //
                            //Use the new large table load method; the data is laid out in a 
                            //questionnaire format
                            "questionnaire", 
                            //
                            //Data in the Iquestionnare format, specifically, collection of labels 
                            [questions], 
                            //
                            //Use the load method -- the one specificlly tailor made for CRUD
                            "load_user_inputs", 
                            //
                            //Use the default xml and html log files 
                            [])];
                    case 1:
                        Imala = _a.sent();
                        //
                        //
                        //Use the $result to report on the crud page to show the status 
                        //of the save.  
                        this.report(Imala);
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(page.prototype, "theme", {
        // 
        //To avoid repeating ourselves define the theme of this crud page
        get: function () {
            return this.panels.get("theme");
        },
        enumerable: false,
        configurable: true
    });
    //
    //Collect all the edited $inputs, i.e., data and its position, and return 
    //each one of them as label layout
    page.prototype.collect_questions = function () {
        var tds, _i, tds_1, td, td_element, cname, tr_1, rowindex, alias, cellIndex, _a, ename, dbname, Io, exp, label;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tds = Array.from(this.document.querySelectorAll("td.edited"));
                    _i = 0, tds_1 = tds;
                    _b.label = 1;
                case 1:
                    if (!(_i < tds_1.length)) return [3 /*break*/, 4];
                    td = tds_1[_i];
                    td_element = td;
                    cname = this.theme.col_names[td_element.cellIndex];
                    tr_1 = (td_element.parentNode);
                    rowindex = tr_1.rowIndex;
                    alias = [rowindex];
                    cellIndex = td_element.cellIndex;
                    _a = this.subject, ename = _a[0], dbname = _a[1];
                    Io = theme.theme.ios.get(String(
                    //
                    //This is the index of any td in this theme
                    [this.theme.key, rowindex, cellIndex]));
                    //
                    //Use the td's io to get get its value (expression)
                    //
                    //Ensure that the io exists
                    if (Io === undefined)
                        throw new Error("Cannot get the io that created this td");
                    exp = Io.input_value;
                    label = [dbname, ename, alias, cname, exp];
                    //
                    //Yield the explicit label
                    return [4 /*yield*/, label];
                case 2:
                    //
                    //Yield the explicit label
                    _b.sent();
                    _b.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    };
    //
    //This is an onblur event listener of the textarea,
    //that updates the editted value to that of the input. 
    //In order to trigger the input`s onchange.
    page.prototype.update_textarea_input = function (textarea) {
        //
        //The input is a child of the parent of the textarea
        var input = textarea.parentElement.querySelector("input");
        //
        //Transfer the textarea content to the input value 
        //
        //Ignore the transfer if there are no changes.
        if (textarea.textContent === null
            || input.value === textarea.textContent)
            return;
        //
        //Commit the changes.
        input.value = textarea.textContent;
        //
        //mark the cell as edited
        input.parentElement.classList.add('edited');
    };
    //
    //This an onclick event listener of the input element that activates 
    //the textarea, for the user to start editting
    page.prototype.edit_textarea = function (input) {
        //
        //Get the text area which is a child of the parent of the input 
        var textarea = input.parentElement.querySelector("textarea");
        //
        //Transfer the input value to the textarea text content 
        textarea.textContent = input.value;
        //
        //Hide the input 
        input.hidden = true;
        //
        //Unhide the text area 
        textarea.removeAttribute("hidden");
    };
    //Remove the curret record from both the screen and 
    //the database.
    page.prototype["delete"] = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, ename, dbname, tr, pk, ename_str, sql, records;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.subject, ename = _a[0], dbname = _a[1];
                        tr = this.document.querySelector(".TR");
                        if (tr === null) {
                            alert("Please select a row to delete");
                            return [2 /*return*/];
                        }
                        pk = tr.getAttribute("pk");
                        ename_str = "`".concat(ename, "`");
                        sql = "Delete  from ".concat(ename_str, "  where ").concat(ename_str, "\n        .").concat(ename_str, "='").concat(pk, "'");
                        return [4 /*yield*/, server.exec("database", [dbname], "query", [sql])];
                    case 1:
                        records = _b.sent();
                        //
                        //Check if the delete was successful or not.
                        if (records !== 1) {
                            throw new schema.mutall_error("The following query was not successful:\n             ".concat(sql));
                        }
                        //
                        //5. Repaint homepage content to reflect changes, i.e., remove the 
                        //row from the table.
                        tr.parentNode.removeChild(tr);
                        return [2 /*return*/];
                }
            });
        });
    };
    //
    //This method opens a popup, shows the columns that 
    //are already hidden and lets the user select the ones 
    //to be made visible 
    page.prototype.unhide = function () {
        return __awaiter(this, void 0, void 0, function () {
            var element, sheet, Theme, colnames, pairs, specs, Popup, choices;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        element = this.get_element("columns");
                        sheet = element.sheet;
                        Theme = this.panels.get("theme");
                        colnames = Theme.col_names;
                        pairs = this.get_hidden_columns(sheet, colnames, Theme);
                        specs = this.get_popup_window_specs();
                        Popup = new outlook.choices(app_js_1.app.current.config.general, pairs, "hidden_column", specs);
                        return [4 /*yield*/, Popup.administer()];
                    case 1:
                        choices = _a.sent();
                        // 
                        //Unhide the selected columns.
                        choices.forEach(function (cname) {
                            // 
                            //Get the index of this column name from the current theme. 
                            var i = colnames.indexOf(cname);
                            //
                            //Get the declaration of the i'th rule 
                            var declaration = sheet.cssRules[i].style;
                            //
                            //remove the display none property
                            declaration.removeProperty("display");
                            declaration.removeProperty("background-color");
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    //
    //Get the popup choices as key/value pairs of columns to unhide.
    page.prototype.get_hidden_columns = function (sheet, cnames, Theme) {
        // 
        //Filter all the hidden columns
        var fcnames = cnames.filter(function (cname) {
            // 
            //Get the index of this cname
            var i = cnames.indexOf(cname);
            //
            //Get the i'th rule declaration.
            var declaration = sheet.cssRules[i].style;
            //
            //Get the display property.
            var display = declaration.getPropertyValue("display");
            //
            //If the property is found return true
            return display !== "";
        });
        // 
        //Get the theme's entity name from the subject 
        var ename = Theme.subject[0];
        // 
        //Get the entites columns 
        var columns = Theme.dbase.entities[ename].columns;
        // 
        //Map the filtered column names to key value pairs 
        return fcnames.map(function (cname) {
            //
            //Get the matching column 
            var col = columns[cname];
            // 
            //The value of a column is its title if it's available.  
            var value = col.title === undefined ? cname : col.title;
            // 
            return { key: cname, value: value };
        });
    };
    //
    //This will hide the selected column by controlling the styling 
    page.prototype.hide = function () {
        //
        //1. Get the index of the selected th element
        var index = this.document.querySelector(".TH").cellIndex;
        //
        //2.Retrieve the rule declaration associated with this index
        //    
        //2.1 Retrieve the style tag.
        var style_sheet = this.get_element('columns').sheet;
        //
        //2.1 Retrieve the rule declaration with this index, using a css styling rule
        var declaration = style_sheet.cssRules[index].style;
        //
        //2.2 Change the display property to none
        declaration.setProperty("display", "none");
    };
    //Merge the currently checked records
    page.prototype.merge = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, ename, dbname, nodelist, keys, dbname_str, ename_str, members, imerger, Merger, principal;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.subject, ename = _a[0], dbname = _a[1];
                        nodelist = this.document.querySelectorAll("input[name='multi_select']:checked");
                        keys = (Array.from(nodelist)).map(function (element) { return element.value; });
                        //
                        //There must be at least 2 keys to merge
                        if (keys.length < 2) {
                            alert("There must be at least 2 records to merge. Found ".concat(keys.length));
                            return [2 /*return*/];
                        }
                        dbname_str = "`" + dbname + "`";
                        ename_str = "`" + ename + "`";
                        members = "select\n                ".concat(dbname_str, ".").concat(ename_str, ".").concat(ename_str, " as member \n            from \n                ").concat(dbname_str, ".").concat(ename_str, "\n            where \n                ").concat(dbname_str, ".").concat(ename_str, ".").concat(ename_str, " in (").concat(keys.join(', '), ")");
                        imerger = { ename: ename, dbname: dbname, members: members };
                        Merger = new baby_merger(imerger, this);
                        //
                        //Open the baby window to complete the constructor 
                        //methods that are asynchronous
                        return [4 /*yield*/, Merger.open()];
                    case 1:
                        //
                        //Open the baby window to complete the constructor 
                        //methods that are asynchronous
                        _b.sent();
                        return [4 /*yield*/, Merger.administer()];
                    case 2:
                        principal = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //
    //Toggles the checkbox at the primary td allowing user to do multiple 
    //tr selection. 
    page.prototype.multi_select = function (btn) {
        //
        //Determine whether we are displaying or hiding the multiselector options
        var display = btn.classList.contains("multiselect");
        //    
        //Retrieve the css styling.
        var style_sheet = this.get_element('theme_css').sheet;
        //
        //Hide or show the multiselect option.
        this.update_stylesheet(style_sheet, "multi_select", display);
        //
        //Toggle the multiselector class
        btn.classList.toggle("multiselect");
    };
    //
    //Update the stylesheet so that the given selection is either 
    //hidden or displayed; if hidden the display property of the 
    //matching CSS rule is set to none, otherwise it's removed.
    page.prototype.update_stylesheet = function (sheet, selection, hide) {
        //
        //Use the selection to find the relevant rule.
        //
        //Convert the rule list (in the stylesheet) to an array.
        var rules = Array.from(sheet.cssRules);
        //
        //Find the index of the rule that matches the selection.
        var index = rules.findIndex(function (rule1) { return rule1.selectorText === ".".concat(selection); });
        if (index === -1)
            throw new Error("Rule .".concat(selection, " not found"));
        //
        //Use the index to get the rule.
        var rule = rules[index];
        //
        //Add or remove the display property.
        if (hide)
            rule.style.setProperty("display", "none");
        else
            rule.style.removeProperty("display");
    };
    //
    //This is a toggle switch that puts the page in edit or normal mode. You know you 
    //are in the edit mode because of Joyce's cursor. When re-pressed, it 
    //switches to normal mode
    page.prototype.edit_click = function () {
        //
        //Put the body in edit or normal mode
        this.toggle_edit_normal();
        //
        //Scroll to the curently selected row, if any
        var tr = document.querySelector('.TR');
        //
        //scroll the tr into the center of the view, both vertically and 
        //horizontally
        if (tr !== null)
            tr.scrollIntoView({ block: 'center', inline: 'center' });
    };
    //
    //Toggle the state of this page's body section between the edit and normal
    //modes by changing styling, rather than the actual body 
    page.prototype.toggle_edit_normal = function () {
        //
        //Get the edit style tag. The crud page must have one
        var style = document.querySelector('#edit_style');
        //
        //Toggle between the edit class and no edit (i.e., normal) modes 
        style.classList.toggle('edit');
        //
        //Select the mode to switch off. For instance, switch off edit if the style
        //is classified as edit
        var mode = style.classList.contains('edit') ? 'edit' : 'normal';
        //
        //Switch off the selected mode
        style.textContent = ".".concat(mode, "{display:none;}");
        //
        //Set the display mode of the theme page. It's the opposite of what we
        //are switching off.
        this.theme.display_mode = mode === "edit" ? "normal" : "edit";
    };
    // 
    //Get the popup's window size and location.
    page.prototype.get_popup_window_specs = function () {
        //we dont seem to understand what window innerwidth and 
        //innerheight are. 
        //const winh= window.innerhHeight;
        //const winw= window.innerhWidth;
        //
        //We expected the following values for window height
        //$width on kimotho`s machine.
        var winh = 900;
        var winw = 1600;
        //
        //Specify the window location and size.
        var height = 1 / 3 * winh;
        //
        var top_pos = 1 / 2 * winh - 1 / 2 * height;
        //
        var width = 1 / 3 * winw;
        var left = 1 / 2 * winw - 1 / 2 * width;
        //
        //The specifications of the pop up.
        return "width=".concat(width, ",top=").concat(top_pos, ",height=").concat(height, ",left=").concat(left);
    };
    //
    //This method makes the error button visible and puts the error in its 
    //(the button's) span tag which allows the user to view the Imala report.
    //It also updates the primary key field with a "friend", when it is not 
    //erroneous
    page.prototype.report = function (mala) {
        var _this = this;
        //
        //If there are syntax errors, report them; there cannot be other
        //types of errors, so, abort the process after the report.
        if (mala.class_name === "syntax") {
            //
            //Convert the errors to a string.
            var errors = mala.errors.join("\n");
            //
            //Display the errors.
            alert("".concat(mala.errors.length, " syntax errors:\n ").concat(errors));
            //
            //Abort the reporting, as there cannot be other types of errors.
            return;
        }
        //
        //If there are runtime errors through the result array to report them
        //The elements of the array have the following structure:-
        //['error', ans]|['pk', ans, friend]
        //where 
        //  ans ={class_name:'scalar', value, position?, operation?}
        //and 
        //  position = [rowIndex, colIndex?],
        //  operation = "insert" 
        mala.result.forEach(function (_a) {
            var Iexp = _a[0], position = _a[1];
            //
            //Get the position.
            var rowIndex = position[0], cellIndex = position[1];
            //
            //Get the affected tr.
            var tr = _this
                .document
                .querySelector("table")
                .rows[rowIndex];
            //
            //Get the affected td.
            var td = tr.cells[cellIndex];
            //
            //Get the error button at that given position
            var error_btn = td.querySelector(".error_btn");
            //
            //Get the span for the error messages
            var errors = td.querySelector(".errors");
            //
            //If the writting was successful we update the primary key attributes 
            //and remove highlights of the edited tds
            if (Iexp.type === "pk") {
                //
                //Get the span for the pk.
                var pk_span = td.querySelector(".pk");
                //
                //Update the primary key.
                pk_span.textContent = String(eval(Iexp.value));
                //
                //Update the friend.
                pk_span.setAttribute("friend", "".concat(Iexp.friend));
                //
                //Remove the highlight for all siblings of this tr 
                Array.from(tr.querySelectorAll("td.edited"))
                    .forEach(function (td2) { return td2.classList.remove("edited"); });
                //
                //Clear the error button by emptying and hiding it
                error_btn.hidden = true;
                error_btn.textContent = "";
                //
                //Clear the error messages and hide the containing span
                errors.textContent = "";
                errors.hidden = true;
                //
                return;
            }
            //The returned expression is an error.
            //
            //Highlight the whole row to mark it as an error.
            tr.classList.add("report");
            //
            //unhide the error button.
            error_btn.hidden = false;
            //
            //Get the span and paint its text content.
            errors.textContent = Iexp.value;
        });
    };
    //
    //
    //This is the stack of all the current crud pages in the order inwhich 
    //they were created the most recent is at the top (LIFO).
    page.stack = [];
    return page;
}(outlook.baby));
exports.page = page;
/*
 * This is a page support merge operations within outlook and when
 * administered returns a primary key of the principal member that received
 * all the consolidatiion data, i.e., the result of the merge operation
 */
var baby_merger = /** @class */ (function (_super) {
    __extends(baby_merger, _super);
    // 
    function baby_merger(imerge, mother) {
        var _this = 
        //
        //Initialize the baby view
        _super.call(this, mother, app_js_1.app.current.config.general) || this;
        _this.imerge = imerge;
        return _this;
    }
    //
    //The baby merger returns the primary key of the principal
    //memberreturn
    baby_merger.prototype.get_result = function () {
        //
        //Get the principal that received all the consolidations
        var principal = this.imerge.principal;
        //
        //Convert the principal to a number (to conform with the required
        //output
        var result = Number(principal);
        //
        return new Promise(function (resolve) { return resolve(result); });
    };
    //
    //The baby merger page has no checks to do
    baby_merger.prototype.check = function () { return true; };
    //
    //Paint the general page with merger specific elements
    baby_merger.prototype.show_panels = function () {
        return __awaiter(this, void 0, void 0, function () {
            var Merger;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Merger = new merger_js_1["default"](this.imerge, this);
                        //
                        //Open the Merger view to complete the asynchronous initializations
                        return [4 /*yield*/, Merger.open()];
                    case 1:
                        //
                        //Open the Merger view to complete the asynchronous initializations
                        _a.sent();
                        //
                        //Execute the merger process
                        return [4 /*yield*/, Merger.execute()];
                    case 2:
                        //
                        //Execute the merger process
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return baby_merger;
}(outlook.baby));
//
//Modelling the tr as the basic unit for CRUD operations. The cud.page
//manages the same CRUD operatins for bulk operations, i.e., 
//creating, reviewing, updating and deleting multiple records at once
var tr = /** @class */ (function () {
    // 
    function tr(
    //
    //The entity and database name associated with this 
    //tr
    crud, 
    //
    //The primary key of this tr
    pk) {
        this.crud = crud;
        this.pk = pk;
    }
    Object.defineProperty(tr, "current", {
        get: function () {
            // 
            //Check whether there is a currrent selection alert
            //user and throw exception if  none 
            if (tr.current__ === undefined) {
                throw new schema.mutall_error("Please select a tr");
            }
            return this.current__;
        },
        // 
        set: function (tr) {
            this.current__ = tr;
        },
        enumerable: false,
        configurable: true
    });
    // 
    //Pool of previously selected records 
    tr.map = new Map();
    return tr;
}());
exports.tr = tr;
//
//Override the normal error logging with an alert.
var crud_error = /** @class */ (function (_super) {
    __extends(crud_error, _super);
    function crud_error(msg) {
        var _this = this;
        //
        //Compile an error message that redirects the user
        //to the console
        var msg2 = "".concat(msg, ".<br> See Console.log for details.");
        //
        //Update the error tag, assuming we are in the crud page.
        document.querySelector("#error").innerHTML = msg2;
        //
        //Log to the view variable to the console. 
        //Throw the default exception 
        _this = _super.call(this, msg2) || this;
        return _this;
    }
    return crud_error;
}(Error));
exports.crud_error = crud_error;
