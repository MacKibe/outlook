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
exports.theme = void 0;
var outlook = require("./outlook.js");
//
//Allows methods on this page to talk to the server
var server = require("../../../schema/v/code/server.js");
//
//Resolve the schema classes, viz.:database, columns, mutall e.t.c. 
var schema = require("../../../schema/v/code/schema.js");
//
var io = require("./io.js");
// 
//
var app = require("./app.js");
//
//These are pages based on a particular subject as its theme 
var theme = /** @class */ (function (_super) {
    __extends(theme, _super);
    //
    function theme(
    //
    //The database and entity name that is displayed in this 
    //theme panel.
    subject, 
    // 
    //The css for retrieving the html element where to display 
    //the theme's subject record.
    css, 
    // 
    //The view page that is the home of this panel 
    base, 
    // 
    //An optional selection of the first record 
    selection) {
        var _this = _super.call(this, css, base) || this;
        _this.css = css;
        _this.base = base;
        _this.selection = selection;
        /**
         * The scrolling variables
         */
        //
        //The offset of the records that are visible in the page 
        //both top and bottom i.e within scrolling without loading 
        //more data in the purple part of our boundary diagram
        _this.view = { top: 0, bottom: 0 };
        // 
        //This is the limit number of records that can be retrieved and 
        //constrained by the extreme boundery the blue part of the 
        //blue region of our map
        _this.joint = { top: 0, bottom: 0 };
        //
        //Track the original sql for supporting the review service.
        _this.original_sql = null;
        //
        //Display mode to be used in controlling the usage of the scrolling keys.
        _this.display_mode = "normal";
        _this.subject = subject === null ? app.app.current.subject : subject;
        return _this;
    }
    Object.defineProperty(theme.prototype, "extreme", {
        //
        //This is the offset that indicates the last retrievable record 
        //i.e., the green part of our scroll diagram.
        get: function () {
            return { top: 0, bottom: this.max_records };
        },
        enumerable: false,
        configurable: true
    });
    //
    //Paint the content panel with editable records of the subject
    theme.prototype.continue_paint = function () {
        return __awaiter(this, void 0, void 0, function () {
            var metadata, idbase, col_names, sql, max_record, thead, pk;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, server.exec(
                        //
                        //The editor class is an sql object that was originaly designed 
                        //to return rich content for driving the crud page.
                        "editor", 
                        //
                        //Constructor args of an editor class are ename and dbname 
                        //packed into a subject array in that order.
                        this.subject, 
                        //
                        //Method called to retrieve editor metadata on the editor class.
                        "describe", 
                        //
                        //There are no method parameters
                        [])];
                    case 1:
                        metadata = _a.sent();
                        idbase = metadata[0], col_names = metadata[1], sql = metadata[2], max_record = metadata[3];
                        //
                        //Set the metadata properties
                        this.sql = sql;
                        this.col_names = col_names;
                        this.max_records = parseInt(max_record);
                        //
                        //Activate the static php database.
                        this.dbase = new schema.database(idbase);
                        //
                        //Initialize the crud style for managing the hide/show feature 
                        //of columns
                        this.initialize_styles(col_names);
                        thead = this.document.querySelector("thead");
                        //
                        //Show the header
                        this.show_header(thead);
                        if (this.selection !== undefined)
                            pk = this.selection.pk;
                        return [4 /*yield*/, this.goto(pk)];
                    case 2:
                        _a.sent();
                        //
                        //Select the matching row and scroll it into view.
                        this.select_nth_row(pk);
                        return [2 /*return*/];
                }
            });
        });
    };
    //
    //Initialize the crud style for managing the hide/show feature 
    //of columns
    theme.prototype.initialize_styles = function (col_names) {
        //
        //Get the columns style sheet
        var sheet = this.get_element("columns").sheet;
        //
        //loop through all the columns and set the styling for each column
        col_names.forEach(function (_col, index) {
            //
            //Change  the index to a 1-based
            var index1 = index + 1;
            //
            //Create the rule for supporting styling of a header and its matching
            //fields the same way.
            //e.g When hiding th:nth-child(2), td:nth-child(2){ display:none}
            var rule = "th:nth-child(".concat(index1, "), td:nth-child(").concat(index1, "){}");
            //
            //Insert the rule to the style sheet.
            sheet.insertRule(rule, index);
        });
    };
    //
    //Construct the header row and append it to the thead.
    theme.prototype.show_header = function (thead) {
        var _this = this;
        //
        //Header should look like this
        //The primary key column will also serve as the multi line selector
        //<tr>
        //  <th id="todo" onclick="select_column(this)">Todo</th>
        //        ...
        //</tr>
        //Construct the th and attach it to the thead.
        var tr = document.createElement("tr");
        thead.appendChild(tr);
        //
        //2. Loop through all the columns to create the table headers
        //matching the example above.
        this.col_names.forEach(function (col_name) {
            //
            //Create the th element using this panel's document and attach to 
            //the current tr.
            var th = _this.document.createElement("th");
            tr.appendChild(th);
            //
            //Add the id attribute to the th using the column name.
            th.id = "'".concat(col_name, "'");
            //
            //Add the column name as the text content of the th.
            th.textContent = col_name;
            //
            //Add the column th column selector listener.
            th.onclick = function (evt) { return _this.select_column(evt); };
        });
    };
    //
    //Mark the current column as selected.
    theme.prototype.select_column = function (evt) {
        //
        //0. Get the target th. NB:HTMLTableHeaderCellElment has been deprecated
        var th = evt instanceof HTMLTableCellElement
            ? evt : evt.target;
        //
        //1. Get the stylesheet named column from the current document.
        var stylesheet = this.get_element("columns").sheet;
        if (stylesheet === null)
            throw new schema.mutall_error("Stylesheet 'column' not known");
        //
        //2. De-highlight any column that is currently selected.
        //2.1 Get the currently selected column (there may be none).
        var selected_column = this.target.querySelector(".TH");
        //
        //2.2 If there's one ...
        if (selected_column !== null) {
            //
            //2.2.1 Get its index.
            var index = selected_column.cellIndex;
            //
            //2.2.2 Use the index to remove the background color from the
            //matching rule. NB: There are as many CSS rules as there are columns.
            //a. Get the rule that matches the index.
            var rule = stylesheet.cssRules[index];
            //
            //b. Remove the background-color property.
            rule.style.removeProperty("background-color");
        }
        //
        //3. Select the given th, in the current standard version, i.e.,  
        //using the TH class selector.
        theme.select(th);
        //
        //4. Highlight the td cells below the th.
        //
        //a. Get the index of the th index to be selected.
        var index2 = th.cellIndex;
        //
        //b. Use the index to get the CSS rule from the column stylesheet.
        var rule2 = stylesheet.cssRules[index2];
        //
        //c. Set the background color of the rule to lightgreen.
        rule2.style.setProperty("background-color", "lightgreen");
    };
    //
    //Load the table rows and adjust the  boundaries depending
    //on the outcome type.
    theme.prototype.execute_outcome = function (outcome, request) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, adjust, fresh, tbody;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = outcome.type;
                        switch (_a) {
                            case "nothing": return [3 /*break*/, 1];
                            case "adjust": return [3 /*break*/, 2];
                            case "fresh": return [3 /*break*/, 4];
                            case "out_of_range": return [3 /*break*/, 6];
                        }
                        return [3 /*break*/, 7];
                    case 1: 
                    //this.scroll_into_view(request,"center")
                    return [3 /*break*/, 8];
                    case 2:
                        adjust = outcome;
                        //
                        //Load the body from the offset and in the outcome direction.
                        return [4 /*yield*/, this.load_body(adjust.start_from, adjust.dir)];
                    case 3:
                        //
                        //Load the body from the offset and in the outcome direction.
                        _b.sent();
                        //
                        //Now adjust the view direction to the outcome value.
                        this.view[adjust.dir] = adjust.adjusted_view;
                        //this.scroll_into_view(request,"start")
                        return [3 /*break*/, 8];
                    case 4:
                        fresh = outcome;
                        tbody = this.document.querySelector("tbody");
                        // 
                        //There must be a table on this page.
                        if (tbody === null)
                            throw new schema.mutall_error("tbody not found");
                        // 
                        //Empty the table body.
                        tbody.innerHTML = "";
                        // 
                        //Reset the view boundaries to {0,0} before 
                        //loading a fresh page.
                        this.view = { top: 0, bottom: 0 };
                        //
                        //Load the new page starting from the view top, 
                        //in the forward direction.
                        return [4 /*yield*/, this.load_body(fresh.view_top, "bottom")];
                    case 5:
                        //
                        //Load the new page starting from the view top, 
                        //in the forward direction.
                        _b.sent();
                        //
                        //Reset the boundaries after loading a fresh 
                        //page.
                        this.view.top = fresh.view_top;
                        this.view.bottom = fresh.view_bottom;
                        return [3 /*break*/, 8];
                    case 6:
                        //
                        //Show the request if it is not 0
                        if (request !== 0)
                            alert("Request is out of range bacause it fails this test \n                        ".concat(this.extreme.top, " <=").concat(request, " < ").concat(this.extreme.bottom));
                        return [3 /*break*/, 8];
                    case 7: throw new schema.mutall_error("The outcome of type \n                       ".concat(outcome.type, " is not known"));
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    //
    //Populate our table body with new rows 
    //starting from the given offset and direction.
    theme.prototype.load_body = function (offset /*:int*/, dir /*:mytop | bottom*/) {
        return __awaiter(this, void 0, void 0, function () {
            var h, constrained_limit, result, tbody;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //
                        //Range-GUARD:Ensure that offset is outside of the view for loading to be valid.
                        if (this.within_view(offset))
                            throw new schema.mutall_error("The requested offset ".concat(offset, " \n                is already in view \n                ").concat(this.view.top, " -- ").concat(this.view.bottom, ", \n                so a new load is not valid."));
                        h = Math.abs(this.view[dir] - this.extreme[dir]);
                        constrained_limit = h < app.app.current.config.limit ? h : app.app.current.config.limit;
                        return [4 /*yield*/, this.query(offset, constrained_limit)];
                    case 1:
                        result = _a.sent();
                        tbody = document.querySelector("tbody");
                        //
                        //Loop through the results loading each tr 
                        //based on the dir
                        result.forEach(function (fuel, i) {
                            //
                            //The index where this tr should  be inserted 
                            //into the tbody
                            var index = dir === "top"
                                //
                                //Counting from the top
                                ? i
                                //
                                //Counting from the bottom
                                : _this.view.bottom - _this.view.top + i;
                            //
                            //Insert row.
                            var tr = tbody.insertRow(index);
                            // 
                            //Use the fuel to populate the tr
                            _this.load_tr_element(tr, fuel);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    //
    //This is a scroll event listener to retrive the previous or next 
    //page of data depending in the position of the scroll button.
    theme.prototype.myscroll = function () {
        //
        //Let tbody be the scrollable element
        //const tbody = document.querySelector("tbody")!;
        // 
        //For now the scrollable element is the content 
        var tbody = this.get_element("content");
        //
        //Get the scroll top as a rounded integer (not truncated)
        //to ensure that the scroll height and the client height are 
        //always equal to or greater than the scroll height when we are at 
        //the bottom of the scroll. 
        var scrollTop = Math.round(tbody.scrollTop);
        //
        //Decide whether to retrieve new records or not
        if (scrollTop < 3) {
            //
            //Retrieve records that are above the top view boundary 
            //This is equivalent to clicking the previous button
            this.retrieve_records("top");
        }
        else if (scrollTop + tbody.clientHeight >= tbody.scrollHeight) {
            //
            //Retrieve records that are below the bottom view boundary
            //This is equivalent to clicking the next button 
            this.retrieve_records("bottom");
        }
        else {
            //
            //Ignore the scrolling
        }
    };
    //
    //This is an event listener that retrieves limit number of 
    //records from the server depending on the given direction.
    //The retrieved records are in the blue area of our scroll map.
    theme.prototype.retrieve_records = function (dir) {
        return __awaiter(this, void 0, void 0, function () {
            var offset;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //
                        //If the direction is away from the top view boundary, 
                        //the offset becomes joint 
                        if (dir === "top") {
                            //
                            //The offset is the joint top boundary if we are scrolling upwards.
                            offset = this.get_joint("top");
                        }
                        //
                        else {
                            //
                            //The offset is the bottom view boundary if we are 
                            //scrolling downwards.
                            offset = this.view.bottom;
                        }
                        //
                        //Retrieve and display $limit rows of data starting from the 
                        //given offset/request subject to the available data.
                        return [4 /*yield*/, this.goto(offset)];
                    case 1:
                        //
                        //Retrieve and display $limit rows of data starting from the 
                        //given offset/request subject to the available data.
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //
    //Test if offset is within joint boundaries
    theme.prototype.within_joint = function (request) {
        //
        //We are within the joint boundaries if...
        var condition = 
        //
        //.. offset is between the top and 
        //bottom joint boundaries.
        request >= this.get_joint("top")
            && request < this.get_joint("bottom");
        return condition;
    };
    // 
    //Test if offset is within extremes and return true otherwise false.
    theme.prototype.within_extreme = function (request) {
        //
        //extreme top condition should always 
        //be set otherwise you get a runtime error.
        //if extreme top is undefined throw an error.
        return request >= this.extreme.top
            && request < this.extreme.bottom;
    };
    //
    //Test if offset is within view boundaries
    theme.prototype.within_view = function (req) {
        //
        //We are within  view if...
        return true //true is for appeasing the IDE.
            //
            //...the top view is set...
            && this.view.top !== null
            //
            //...and the offset is between the top 
            //and bottom view boundaries.
            && req >= this.view.top
            && req < this.view.bottom;
    };
    //
    //Return the joint boundary given the direction The top joint boundary
    // is a maximum of limit records from the top view boundary. The 
    // bottom joint boundary is a maiximum of limit records from the 
    // view[bottom]. see the scroll map 
    // http://206.189.207.206/pictures/outlook/scroll_2020_10_10.ppt
    theme.prototype.get_joint = function (dir /*top|bottom*/) {
        //
        //
        var raw_boundary = 
        //
        //The referenced view boundary
        this.view[dir]
            //
            //The maximum range
            + app.app.current.config.limit
                //
                //Accounts for the direction 
                * (dir === "top" ? -1 : +1);
        //
        //Return a constrained boundary
        return this.within_extreme(raw_boundary)
            ? raw_boundary : this.extreme[dir];
    };
    //
    //
    //Fetch the real data from the database as an array of table rows.
    theme.prototype.query = function (offset, limit) {
        return __awaiter(this, void 0, void 0, function () {
            var ename, complete_sql;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ename = "`".concat(this.subject[0], "`");
                        complete_sql = 
                        //
                        //Paginate results.
                        this.sql + " LIMIT ".concat(limit, " OFFSET ").concat(offset);
                        return [4 /*yield*/, server.exec("database", 
                            //
                            //dbase class constructor arguments
                            [this.subject[1]], 
                            //
                            "get_sql_data", 
                            //
                            //The sql stmt to run
                            [complete_sql])];
                    case 1: 
                    //
                    //Use the sql to query the database and get results as array of row objects.
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    //
    //Convert the row object obtained from the server to a tr element.
    //It's public because it's called by create (in crud), to create a blank row.
    theme.prototype.load_tr_element = function (
    //
    //Tee table row to load data to. 
    tr, 
    //
    //The row of data to load to the tr. There may be none for newly
    //created rows
    row) {
        var _a;
        var _this = this;
        //
        //Convert the row object into key-value pairs where the
        //key is the column name. Take care of those cases where row 
        //is undefined, e.g., new rows.
        var pairs = row === undefined
            ? this.col_names.map(function (cname) { return [cname, null]; })
            : Object.entries(row);
        //
        //Enrich the tr with the id, pk and the friendly attributes
        // 
        //Prepare to collect the primary key and the friendly components
        //value
        var pk, friend;
        //
        //
        //Use empty value strings for pk and friend when there is no value
        if (row === undefined) {
            pk = "";
            friend = "";
        }
        else {
            //Get the primary key column; It is indexed using this theme's
            // subject name.
            var column = row[this.subject[0]];
            //
            //The primary key column is a tupple of two values: the autonumber 
            //and the friendly components packed as a single string.
            //e.g., '[1, "kamau/developer"]'
            //Prepare to convert the string value to an object  and 
            //destructure it into its primary key and friendly component
            _a = JSON.parse(column), pk = _a[0], friend = _a[1];
            //
            //Make the pk a valid id by preffixing it with letter r
            tr.id = "r".concat(pk);
        }
        //
        //Append the id and the primary key attributes to the tr
        tr.setAttribute("pk", pk);
        tr.setAttribute("friend", friend);
        //
        //Make the tr focusable to allow it to receive keystrokes for 
        //scrolling purposes.
        tr.setAttribute("tabindex", "0");
        //
        //Listen for the key movement.
        tr.onkeydown = function (evt) { return _this.keydown(evt); };
        tr.onclick = function () { return theme.select(tr); };
        //
        //Loop through all the pairs outputting each one
        //of them as a td. 
        pairs.forEach(function (_a) {
            var key = _a[0], value = _a[1];
            //
            //Create a td and append it to the row.
            var td = document.createElement("td");
            tr.appendChild(td);
            //
            //Set the click event listener of the td
            td.onclick = function () { return theme.select(td); };
            //
            //Set the column name to be associated with this td
            td.setAttribute('data-cname', key);
            //
            //Set the td's "value"
            //
            //Get the td's io
            var Io = _this.get_io(td);
            //
            //
            Io.show();
            //
            //Set the io's value
            Io.value = value;
        });
    };
    //
    //Listening to keystrokes for scrolling purposes.
    theme.prototype.keydown = function (evt) {
        //
        //Test if we are in the scroll mode or not.
        //If we are not, do nothing, i.e., return.
        if (this.display_mode === "edit")
            return;
        //
        //Continue to process the keystrokes for scrolling.
        //
        //1. Prevent the default behaviour.
        evt.preventDefault();
        //
        //Get the key outcome; may have to move between rows, pages or do nothing.
        var outcome = this.get_key_outcome(evt.keyCode);
        //
        //Discontinue this process if we are at the view extremes.
        if (outcome === "do_nothing")
            return;
        //
        //2. Execute the requested movement.
        switch (outcome.move) {
            //
            //2.1 Scroll to the requested row.
            case "row":
                this.scroll_row(outcome);
                break;
            //
            //2.2 Scroll full client page (Up or Down).
            //case "page": this.scroll_page(outcome); break;
            //
            //2.3 Scroll to either the first or last row of the current dataset.
            //case "table": this.scroll_table(outcome); break;
        }
    };
    // 
    //Scrolls page number of records in a given direction.
    theme.prototype.scroll_page = function (dir) {
        // 
        //Get the selected tr if any
        var tr = this.document.querySelector(".TR");
        //
        //Something must be wrong if no tr is selected because you could not have
        //gotten to this stage.
        if (tr === null) {
            //
            alert("Please select a tr");
            throw new Error("No tr is currently selected");
        }
        //
        //Get the tr to be scrollled into view.
        var scroll_tr = this.get_page_tr(tr, dir);
        //
        // Scroll the given tr to either top or bottom
        var block = dir === "up" ? "end" : "start";
        //
        //Scroll the row into view...
        scroll_tr.scrollIntoView({ block: block });
        // 
        //and select it 
        theme.select(scroll_tr);
    };
    //
    //Return the tr to either be the first or the last in the view depending
    //on the scroll direction
    theme.prototype.get_page_tr = function (tr, dir) {
        //
        //This is the new tr element
        var scroll_tr;
        // 
        //If the tr element is in view i.e., not at the top or bottom then it 
        //does not change
        if (this.inview(tr))
            return tr;
        //
        //The tr is at the bottom or at the top of the client window so it is 
        //outside of the range, we need to get a fresh one which is as far away
        //as the height of the client window depending on the direction.
        //
        //1. Get the direction factor i.e. +1 or -1
        var factor = dir === "up" ? -1 : +1;
        //
        //The number of pixels to scroll by
        var amount = this.target.clientHeight * factor;
        //
        //Scroll by this amount in the y direction
        this.target.scrollBy(0, amount);
        //
        //Get the new tr by counting from the current tr in the factor direction
        //until we get out of view. Return the row at which we get out of view.
        //
        //Get the current table's body
        var tbody = tr.parentElement;
        //
        //Step through all the table rows until you get out of the view.
        //Note that the current i=0 and the next one i=1 are outside of the view
        //by definition, hence the initial setting of i=2.
        for (var i = 2;; i++) {
            //
            //Get the tr at the next i'th position
            scroll_tr = tbody.rows[tr.rowIndex + i * factor];
            //
            //Test if the new row is still valid; we may be on the edge of the 
            //view
            if (scroll_tr === undefined) {
                //
                //Retrieve more data if necessary; if not, return the original
                //tr which effectively does nothing.INVESTIGATE IF SCROLLING
                //BY A CERTAIN AMOUNT INVOKES THE SCROLL EVENT.
                throw new Error("Please investigate this scrolling error");
                break;
            }
            //
            //When the tr is valid, check whether it is inside or outside of the
            //client window view
            //
            //If its not within view, then we must have arrived at the tr we 
            //required
            if (!this.inview(scroll_tr))
                return scroll_tr;
        }
    };
    //
    //Test if the given tr is in view or not. A tr is in view if it is between 
    //the top and the bottom boundaries of the client window
    theme.prototype.inview = function (tr) {
        //
        //Get the top boundary of client window.
        var top_boundary = this.target.scrollTop;
        //
        //Get the bottom boundary of client window.
        var bottom_boundary = this.target.scrollTop + this.target.clientHeight;
        //
        // Get the tr's top edge
        var top_edge = tr.offsetTop;
        //
        //Get the tr's bottom edge
        var bottom_edge = top_edge + tr.offsetHeight;
        //
        //If the given tr is within view we do nothing; it is within view if:
        //      if its top edge is below the top boundary and
        //      its bottom edge is above the bottom boundary
        if (top_edge > top_boundary && bottom_edge < bottom_boundary)
            return true;
        return false;
    };
    //
    //Returns one out of 6 outcomes of pressing a scrolling key including 
    //doing nothing when we are at the extreme boundaries of a view.
    theme.prototype.get_key_outcome = function (key_code) {
        //
        //Get the table that contains the new row; it must exist.
        var table = this.target.querySelector("table");
        if (table === null)
            throw new Error("Table not found");
        //
        //Initialize the up/down movement. It is set to a null to allow us test.
        var dir = null;
        //
        //Initialize the nature of scrolling, i.e., is it between rows, pages 
        //or to the extremes of the dataset.
        var move;
        //
        //The tr to be selected.
        var tr = null;
        //
        switch (key_code) {
            //
            //When the keypressed is arrowDown, set the direction to down 
            //and continue to the next key.
            case 40: dir = "down";
            //
            //When the keypressed is arrowUp, set the direction to up if it's
            //not yet set.
            case 38:
                if (dir === null)
                    dir = "up";
                //
                //1. Get the tr element to scroll into view.
                tr = this.get_next_element(dir);
                // 
                //Prepare to get more data for the top scroll
                if (tr === null && dir === "up") {
                    // 
                    //Retrieve more data from the database 
                    this.retrieve_records("top");
                    // 
                    //Try to retrieve the tr again.
                    tr = this.get_next_element(dir);
                }
                //
                //Set the general movement to be between rows.
                move = "row";
                //
                break;
            //
            //When the keypressed is pageUp, set the direction to up 
            //and continue to the next key.
            case 33: dir = "up";
            //
            //When the keypressed is PageDown, set the direction to down 
            //and continue to the next key.
            case 34:
                if (dir === null)
                    dir = "down";
                //
                //Set the movement to between page. 
                move = "page";
                break;
            //
            //When the keypressed is Home, set the direction to up 
            //and continue to the next key.
            case 36:
                dir = "up";
                tr = 0;
                //
                //The movement is to the extremes of the dataset.
                move = "table";
                //
                break;
            //
            //When the keypressed is End, set the direction to down.
            case 35:
                dir = "down";
                tr = this.max_records;
                //
                //The movement is to the extremes of the dataset.
                move = "table";
                //
                break;
            //
            //If a user presses any other key, then return a 'do nothing'.
            default: return "do_nothing";
        }
        //
        //If there's no new row to scroll to, decide if you want to get more 
        //data or not. For this version, simply return.
        if (tr === null && move !== "page")
            return "do_nothing";
        //
        //Compile the outcome for row movement (up | down).
        return { move: move, dir: dir, tr: tr };
    };
    //
    //Select the next/previous row sibling and scroll it into view
    //if necessary. The input keyoutcome is an object with 3 properties, e.g.,
    //{move, dir, tr}. 
    theme.prototype.scroll_row = function (outcome) {
        //
        //Ensure that the tr of the outcome is a HTMLTableRowElement.
        if (!(outcome.tr instanceof HTMLTableRowElement))
            throw new Error("Tr must be a HTMLElement");
        //
        //1. Mark the outcome tr as selected.
        theme.select(outcome.tr);
        //
        //3. Get the action to take. It is either:-
        switch (this.get_action(outcome.tr)) {
            //..
            //3.1 Do nothing.
            case "do_nothing": break;
            //
            //3.2 Scroll into view and place the tr at the top.
            case "top":
                outcome.tr.scrollIntoView(true);
                break;
            //
            //3.3 Scroll into view and place the tr at the botom.
            case "bottom":
                outcome.tr.scrollIntoView(false);
                break;
        }
    };
    //
    //Return the next element to become current depending on the direction.
    theme.prototype.get_next_element = function (dir) {
        //
        //1. Get the current tr element. 
        var tr = this.document.querySelector('.TR');
        //
        //2. If the direction is up, return the
        //previous sibling otherwise 
        var row_index = dir === "up" ? tr.rowIndex - 1 : tr.rowIndex + 1;
        if (row_index < 1)
            return null;
        //
        //Get the table that contains the new row; it must exist.
        var table = this.target.querySelector("table");
        if (table === null)
            throw new Error("Table not found");
        //
        //Return the row at the required index; there may be none.
        return table.rows[row_index];
    };
    //
    //Return the proper scrolling action to take depending on if
    //we are within or outside the view. 
    theme.prototype.get_action = function (tr) {
        //
        //Get the top boundary of client window.
        var top_boundary = this.target.scrollTop;
        //
        //Get the bottom boundary of client window.
        var bottom_boundary = this.target.scrollTop + this.target.clientHeight;
        //
        // Get the tr's top edge
        var top_edge = tr.offsetTop;
        //
        //Get the tr's bottom edge
        var bottom_edge = top_edge + tr.offsetHeight;
        //
        //If the given tr is within view we do nothing; it is within view if:
        //      if its top edge is below the top boundary and
        //      its bottom edge is above the bottom boundary
        if (top_edge >= top_boundary && bottom_edge < bottom_boundary)
            return "do_nothing";
        //
        //If the tr is semi-visible from the top, then we will align its top edge
        //with the top boundary. This is the case if the top edge is greater than
        //the top boundary
        if (top_edge < top_boundary)
            return "top";
        //
        //If the tr is semi-visible from the bottom, then we will align the bottom
        //edge with the bottom boundary. This is the case when the bottom edge is
        //greater than the bottom boundary.
        if (bottom_edge > bottom_boundary)
            return "bottom";
        //
        //If you find yourself here, something has gone wrong.
        throw new Error("Something is wrong, check your action logic.");
    };
    //
    //Return the io structure associated with the given td
    theme.prototype.get_io = function (td) {
        // 
        //Get the position of this td 
        var rowIndex = td.parentElement.rowIndex;
        var cellIndex = td.cellIndex;
        //
        //Destructure the subject to get the entity name; its the 
        //first component. 
        var ename = this.subject[0];
        // 
        //Get the column name that matches this td. 
        var col_name = this.col_names[cellIndex];
        //
        //Get the actual column from the underlying database.
        var col = this.dbase.entities[ename].columns[col_name];
        //
        //Create and return the io for this column.
        var Io = this.create_io(td, col);
        // 
        //Save the io to aid in data retrieval.
        //NB: Remember to stringify the position
        theme.ios.set(String([this.key, rowIndex, cellIndex]), Io);
        // 
        return Io;
    };
    //
    //Creating an io from the given anchor and column. In future, 
    //consider redefining this as a schema.column methods, rather
    //than a standalone method.
    theme.prototype.create_io = function (
    // 
    //The parent of the input/output elements of this io. 
    anchor, 
    // 
    //The column associated with this io. 
    col) {
        //
        //Read only collumns will be tagged as such.
        if (col.read_only !== undefined && col.read_only)
            return new io.readonly(anchor);
        //
        //Atted to the foreign and primary key columns
        if (col instanceof schema.primary)
            return new io.primary(anchor);
        if (col instanceof schema.foreign)
            return new io.foreign(anchor);
        //
        //Attend the attributes
        //
        //A column is a checkbox if...
        if (
        //
        //... its name prefixed by 'is_'....
        col.name.startsWith('is_')
            // 
            //...or its datatype is a tinyint 
            || col.data_type === "tinyint")
            return new io.checkbox(anchor);
        //
        //If the field length is 1 character, then assume it is a checkbox
        if (col.length === 1)
            return new io.checkbox(anchor);
        //
        //If the length is more than 100 characters, then assume it is a textarea
        if (col.length > 100)
            return new io.textarea(anchor);
        //
        //If the column name is 'description', then its a text area
        if (col.name === 'description')
            new io.textarea(anchor);
        //
        //Time datatypes will be returned as date.
        if (["timestamp", "date", "time"]
            .find(function (dtype) { return dtype === col.data_type; }))
            return new io.input("date", anchor);
        //
        //The datatypes bearing the following names should be presented as images
        // 
        //Images and files are assumed  to be already saved on the 
        //remote serve.
        if (["logo", "picture", "profile", "image", "photo"]
            .find(function (cname) { return cname === col.name; }))
            return new io.file(anchor, "image");
        //
        if (col.name === ("filename" || "file"))
            return new io.file(anchor, "file");
        //
        //URL
        //A column is a url if...
        if (
        // 
        //... its name matches one of the following ...
        ["website", "url", "webpage"].find(function (cname) { return cname === col.name; })
            // 
            //...or it's taged as url using the comment.
            || col.url !== undefined)
            return new io.url(anchor);
        //
        //SELECT 
        //The io type is select if the select propety is set at the column level
        //(in the column's comment). 
        //Select requires column to access the multiple choices.
        if (col.select !== undefined)
            return new io.select(anchor, col);
        //
        //String datatypes will be returned as normal text, otherwise as numbers.
        if (["varchar", "text"]
            .find(function (dtype) { return dtype === col.data_type; }))
            return new io.input("text", anchor);
        if (["float", "double", "int", "decimal", "serial", "bit", "mediumInt", "real"]
            .find(function (dtype) { return dtype === col.data_type; }))
            return new io.input("number", anchor);
        // 
        //The default io type is read only 
        return new io.readonly(anchor);
    };
    //
    //Select the row whose primary key is the given one.
    //and makes sure that it is in the view 
    theme.prototype.select_nth_row = function (pk) {
        // 
        //Row selection is valid only when the pk is set
        if (pk === undefined)
            return;
        //
        //1. Get the row identified by the primary key. 
        var tr = document.querySelector("#r".concat(pk));
        //
        //Ensure that a row with this pk exists
        if (tr === null) {
            alert("No tr found with row id ".concat(pk));
            return;
        }
        //
        //2. Select the row.
        theme.select(tr);
        //
        //3.Bring the selected row to the center of the view.
        tr.scrollIntoView({ block: "center", inline: "center" });
    };
    //
    //
    theme.prototype.scroll_into_view = function (request, position) {
        // 
        //Get the row index 
        var rowIndex = request - this.view.top;
        // 
        //Use the index to retrieve the row 
        var table = this.get_element("table_crud");
        var tr = table.rows[rowIndex];
        //
        //Ensure that a row with this pk exists
        if (tr === null) {
            alert("No tr found with rowIndex ".concat(rowIndex));
            return;
        }
        //
        //Bring the selected row to the top of the view.
        tr.scrollIntoView({ block: position, inline: "center" });
    };
    //
    //Ensure that the given tag is the only selected one 
    //of the same type
    theme.select = function (tag) {
        //
        //Get the tagname 
        var tagname = tag.tagName;
        //
        //1. Declassifying all the elements classified with 
        //this tagname.
        var all = document.querySelectorAll(".".concat(tagname));
        Array.from(all).forEach(function (element) {
            return element.classList.remove(tagname);
        });
        //
        //3.Classify this element 
        tag.classList.add(tagname);
    };
    //
    //
    //Retrieve and display $limit rows of data starting from the 
    //given offset/request, subject to the available data.
    theme.prototype.goto = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var goto_element, value, outcome /*:"nothing"|"adjust"|"fresh"*/;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (request === undefined) {
                            // 
                            //Check whether a request is specified in the goto element 
                            if ((goto_element = document.querySelector('#goto')) !== null) {
                                value = goto_element.value;
                                //
                                //Get the users request as an integer
                                request = parseInt(value);
                            }
                            else {
                                //
                                //Set it to 0
                                request = 0;
                            }
                        }
                        //
                        //It is an error if the request is above the top extreme boundary.
                        if (request < this.extreme.top)
                            throw new schema.mutall_error("Goto: A request ".concat(request, "\n             must be positive"));
                        outcome = this.get_outcome(request);
                        //
                        //Load the table rows and use the scrolling outcome to update the 
                        //boundaries
                        return [4 /*yield*/, this.execute_outcome(outcome, request)];
                    case 1:
                        //
                        //Load the table rows and use the scrolling outcome to update the 
                        //boundaries
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //
    //Determine which scrolling outcome we need depending on the requested offset.
    theme.prototype.get_outcome = function (request) {
        //
        //NOTHING: If the request is within view, do 
        //nothing.i.e., no loading of new rows or adjusting 
        //current view boundaries.
        if (this.within_view(request))
            return { type: "nothing" };
        //
        //ADJUST: If request is within the joint boundaries, 
        //load a fresh copy and adjust either the top or bottom
        //boundaries depending on the request direction.
        if (this.within_joint(request)) {
            //
            //The direction is top if the 
            //request is above the top boundary.
            var dir = request < this.view.top
                ? "top" : "bottom";
            //
            //The top or bottom boundaries 
            //should be adjusted to this value.
            var adjusted_view = this.get_joint(dir);
            //
            //Adjust the top boundary
            var start_from = dir === "top"
                ? this.get_joint(dir) : this.view[dir];
            //
            //Return the view boundary adjustment outcome.
            return { type: "adjust", dir: dir, start_from: start_from, adjusted_view: adjusted_view };
        }
        //
        //FRESH: If the request is within extremes, 
        //load a fresh outcome, i.e., clear current tbody, 
        //load new rows and adjust the views.
        if (this.within_extreme(request)) {
            //
            //Constrain  the request to the extreme top.
            var view_top = request < this.extreme.top
                ? this.extreme.top : request;
            //
            //The bottom is always $limit number of rows
            //from the top, on a fresh page.
            var y = view_top + app.app.current.config.limit;
            //
            //Constrain the bottom to the extreme bottom. 
            var view_bottom = y > this.extreme.bottom
                ? this.extreme.bottom : y;
            return { type: "fresh", view_top: view_top, view_bottom: view_bottom };
        }
        //
        //OUT OF RANGE: The request is out of range.
        return { type: "out_of_range", request: request };
    };
    //
    //Restore the ios asociated with the tds on the theme panel. This is
    //necessary bceuase the old ios are no londer assocuate with the current
    //document wgos documetElement has changed.
    theme.prototype.restore_ios = function () {
        var _this = this;
        //
        //Collect all the tds on this page as an array
        var tds = Array.from(this.document.querySelectorAll('td'));
        //
        //For each td, restore its io.
        tds.forEach(function (td) {
            //
            //Cast the td to table cell element
            var td_element = td;
            //
            //Get the td's row and column positions
            var rowIndex = td_element.parentElement.rowIndex;
            var cellIndex = td_element.cellIndex;
            //
            //Compile the io's key key that matches this td
            var key = String([_this.key, rowIndex, cellIndex]);
            //
            //Use the static io list to get the io that matches this td
            var io = theme.ios.get(key);
            //
            //Its an error if the io is not found
            if (io === undefined)
                throw new schema.mutall_error("io wth key ".concat(key, " is not found"));
            //
            //Each io has its own way of restoring itself to ensure that
            //its properties are coupld to teh given td element
            io.restore();
        });
    };
    // 
    //Saves io instances that created this theme table saved as a map 
    //indexed by their position in a thematic panel
    theme.ios = new Map();
    return theme;
}(outlook.panel));
exports.theme = theme;
