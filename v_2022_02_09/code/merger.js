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
//To access the method for talking to the server in order to execute
//the PHP based mathods
var server = require("../../../schema/v/code/server.js");
//
//To access uitilites developed in Outlook project and shared by
//other view-based applications, e.g., get_element(id:string)
var outlook = require("./outlook.js");
//
//Let teh merger class be an extension of the baby, so that the merger
//window is tightly integrated with the crud one.
//
//NB. Implementation of the Imerge interface is critical because we it
//is required to implement the constructor methods of the merger 
//merger class defined in PHP
var merger = /** @class */ (function (_super) {
    __extends(merger, _super);
    //
    function merger(imerge, mother) {
        var _this = this;
        //
        //The merger uses the general template
        var url = "/outlook/v/code/general.html";
        //
        //Initialize the baby view
        _this = _super.call(this, mother, url) || this;
        //
        //Initialize the view class
        _this.imerge = imerge;
        return _this;
    }
    Object.defineProperty(merger.prototype, "dbname", {
        //
        //Implementation of the Imerge interface
        get: function () { return this.imerge.dbname; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(merger.prototype, "ename", {
        get: function () { return this.imerge.ename; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(merger.prototype, "members", {
        get: function () { return this.imerge.members; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(merger.prototype, "principal", {
        //
        //The members that drive the merging process
        get: function () { return this.imerge.principal; },
        enumerable: false,
        configurable: true
    });
    ;
    Object.defineProperty(merger.prototype, "minors", {
        get: function () { return this.imerge.minors; },
        enumerable: false,
        configurable: true
    });
    ;
    //
    //The baby merger page has nothing to return
    merger.prototype.get_result = function () { return new Promise(function (resolve) { return resolve(); }); };
    //
    //The baby merger page has no checks to do
    merger.prototype.check = function () { return true; };
    //
    //Paint the general page with merger specific elements
    merger.prototype.show_panels = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    //
                    //Execute the merger process
                    return [4 /*yield*/, this.execute()];
                    case 1:
                        //
                        //Execute the merger process
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //
    //Get the details of the members to merge
    merger.prototype.get_imerge = function () {
        //
        //Get the dbname from the curret window document
        var dbname = this.get_element('dbase').value;
        //
        //Read the reference entity name
        var ename = this.get_element('ename').value;
        ;
        //
        //Read the members sql
        var members = this.get_element('members').value;
        ;
        //
        return { dbname: dbname, ename: ename, members: members };
    };
    //Merge the members of this object
    merger.prototype.execute = function () {
        return __awaiter(this, void 0, void 0, function () {
            var key, msg, players, principal, minors, interventions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        key = {
                            dbname: this.dbname,
                            ename: this.ename,
                            members: this.members
                        };
                        //Stop if the key is alray in the stack
                        if (merger.stack.includes(key)) {
                            msg = "Endless looping for Imerge '" + JSON.stringify(key) + "'";
                            throw new Error(msg);
                        }
                        //
                        //Push the merger key to the stack
                        merger.stack.push(key);
                        return [4 /*yield*/, this.get_players()];
                    case 1:
                        players = _a.sent();
                        //
                        //Proceed only if the players are valid
                        if (players === null) {
                            this.report("Merging is not necessary");
                            return [2 /*return*/];
                        }
                        principal = players.principal, minors = players.minors;
                        //
                        //Save the principal and minors to this object for referencing 
                        //elsewhere.
                        this.imerge.principal = principal;
                        this.imerge.minors = minors;
                        return [4 /*yield*/, this.consolidate()];
                    case 2:
                        interventions = _a.sent();
                        //
                        //Remove the minors
                        return [4 /*yield*/, this.clean_minors(interventions)];
                    case 3:
                        //
                        //Remove the minors
                        _a.sent();
                        //
                        //Remove the merger key from the stack
                        merger.stack.pop();
                        return [2 /*return*/];
                }
            });
        });
    };
    //Delete the minors until there are no integrity errors; then update
    //the principal with the consolidations
    merger.prototype.clean_minors = function (consolidations) {
        return __awaiter(this, void 0, void 0, function () {
            var deletion;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.delete_minors()];
                    case 1:
                        if (!((deletion = _a.sent()) !== 'ok')) return [3 /*break*/, 3];
                        //
                        //Redirect all contributors pointing to the minors to point
                        //to the principal
                        return [4 /*yield*/, this.redirect_minors(deletion)];
                    case 2:
                        //
                        //Redirect all contributors pointing to the minors to point
                        //to the principal
                        _a.sent();
                        return [3 /*break*/, 0];
                    case 3: 
                    //
                    //3. Update the principal
                    return [4 /*yield*/, this.update_principal(consolidations)];
                    case 4:
                        //
                        //3. Update the principal
                        _a.sent();
                        //
                        //4. Report
                        this.report("Merging was successful");
                        return [2 /*return*/];
                }
            });
        });
    };
    //Redirect all contributors pointing to the minors to point
    //to the principal. The given list of pointers must be the dones that
    //caused the previous deltion process to fail, so integrity must have been
    //violated
    merger.prototype.redirect_minors = function (pointers) {
        return __awaiter(this, void 0, void 0, function () {
            var _loop_1, this_1, _i, _a, cross_member;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _loop_1 = function (cross_member) {
                            var selected_pointers, _c, selected_pointers_1, pointer, redirection;
                            return __generator(this, function (_d) {
                                switch (_d.label) {
                                    case 0:
                                        selected_pointers = pointers.filter(function (pointer) { return pointer.is_cross_member = cross_member; });
                                        _c = 0, selected_pointers_1 = selected_pointers;
                                        _d.label = 1;
                                    case 1:
                                        if (!(_c < selected_pointers_1.length)) return [3 /*break*/, 6];
                                        pointer = selected_pointers_1[_c];
                                        redirection = void 0;
                                        _d.label = 2;
                                    case 2: return [4 /*yield*/, this_1.redirect_pointer(pointer)];
                                    case 3:
                                        if (!((redirection = _d.sent()) !== 'ok')) return [3 /*break*/, 5];
                                        //
                                        //Redirection of the current pointer was not successful
                                        //(because of referential integrity violation)
                                        //
                                        //Merge the pointer members and re-try
                                        return [4 /*yield*/, this_1.merge_pointer_members(pointer, redirection)];
                                    case 4:
                                        //
                                        //Redirection of the current pointer was not successful
                                        //(because of referential integrity violation)
                                        //
                                        //Merge the pointer members and re-try
                                        _d.sent();
                                        return [3 /*break*/, 2];
                                    case 5:
                                        _c++;
                                        return [3 /*break*/, 1];
                                    case 6: return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _i = 0, _a = [false, true];
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        cross_member = _a[_i];
                        return [5 /*yield**/, _loop_1(cross_member)];
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
    //Merge the members of the pointer
    merger.prototype.merge_pointer_members = function (pointer, indices) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, indices_1, index, _a, _b, signature, dbname, ename, cname, members, imerge, $merger;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _i = 0, indices_1 = indices;
                        _c.label = 1;
                    case 1:
                        if (!(_i < indices_1.length)) return [3 /*break*/, 6];
                        index = indices_1[_i];
                        _a = 0, _b = index.signatures;
                        _c.label = 2;
                    case 2:
                        if (!(_a < _b.length)) return [3 /*break*/, 5];
                        signature = _b[_a];
                        dbname = pointer.dbname;
                        ename = pointer.ename;
                        cname = pointer.cname;
                        members = "\n                    SELECT\n                        member \n                    FROM\n                        (".concat(index.members, ") as member\n                    WHERE ")
                            //
                            //Trimming was found necessary to remove spurios 
                            //leading and/trailing charatcters
                            + " trim(signature)='".concat(signature, "'\n                ");
                        imerge = { dbname: dbname, ename: ename, cname: cname, members: members };
                        $merger = new merger(imerge, this);
                        //
                        //Do teh merger administration
                        return [4 /*yield*/, $merger.administer()];
                    case 3:
                        //
                        //Do teh merger administration
                        _c.sent();
                        _c.label = 4;
                    case 4:
                        _a++;
                        return [3 /*break*/, 2];
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    //
    //Show the given message in the report panel
    merger.prototype.report = function (msg) {
        //
        alert(msg);
        //
    };
    //Get the consolidation data
    merger.prototype.consolidate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var consolidation, interventions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get_consolidation()];
                    case 1:
                        consolidation = _a.sent();
                        interventions = [];
                        if (!(consolidation.dirty.length != 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.intervene(consolidation.dirty)];
                    case 2:
                        interventions = _a.sent();
                        _a.label = 3;
                    case 3: 
                    //
                    //Consolidate all the member properties to the principal
                    return [2 /*return*/, consolidation.clean.concat(interventions)];
                }
            });
        });
    };
    //
    //Here we allow the user to select correct values from the incoherent values,
    // and process the selected values and send them to the server.
    merger.prototype.intervene = function (conflicts) {
        return __awaiter(this, void 0, void 0, function () {
            var fields, resolution, button;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fields = conflicts.map(function (conflict) {
                            //
                            //Desructure the cnflict
                            var cname = conflict.cname, values = conflict.values;
                            //
                            //Convert the values to matching radio buttons
                            var radios = values.map(function (value) { return "\n                <label>\n                    <input type = 'radio' name='".concat(cname, "' value='").concat(value, "'\n                        onclick = \"merger.current.show_panel('").concat(cname, "_group', false)\"\n                    />\n                    ").concat(value, "\n                </label>\n            "); });
                            //Add the other option
                            radios.push("\n                <label>\n                    <input type = 'radio' name='".concat(cname, "' value='other'\n                      onclick = \"merger.current.show_panel('").concat(cname, "_group', true)\"\n                    />\n                    Other\n                    <div id='").concat(cname, "_group' hidden>\n                        <label>\n                            Specify:<input type = 'text' id='").concat(cname, "'/>\n                        </label>\n                    </div>\n                </label>\n            "));
                            //
                            //Return a field set that matches the column name
                            return "\n            <fieldset>\n                <legend>".concat(cname, "</legend>\n                ").concat(radios.join("\n"), "\n            </fieldset>\n            ");
                        });
                        //  Convert the fields sets to text
                        //
                        //Unhide the conflicts panel
                        this.get_element('resolution').hidden = false;
                        resolution = this.get_element('resolution');
                        //
                        //Write the intervention sql to the pannel
                        resolution.innerHTML = fields.join("\n");
                        button = this.get_element('go');
                        return [4 /*yield*/, new Promise(function (resolve) {
                                button.onclick = function () {
                                    //
                                    //Get the checked values for each conflict
                                    var interventions = conflicts.map(function (conflict) {
                                        var cname = conflict.cname;
                                        var value = _this.get_checked_value(cname);
                                        return { cname: cname, value: value };
                                    });
                                    //
                                    //Check that all the interventions are catered for
                                    for (var _i = 0, interventions_1 = interventions; _i < interventions_1.length; _i++) {
                                        var intervention = interventions_1[_i];
                                        if (intervention.value === null) {
                                            alert("Please resolve value for ".concat(intervention.cname));
                                            return;
                                        }
                                    }
                                    //
                                    //Resolve the promise
                                    resolve(interventions);
                                };
                            })];
                    case 1: 
                    //
                    //Wait/return for the user's response to resolve 
                    //the required promise
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    //Return the named checked value is selected; otherwise null
    merger.prototype.get_checked_value = function (cname) {
        //
        //Get the identified column
        var radio = document.querySelector("input[name='".concat(cname, "']:checked"));
        //
        //Return a null value if a named radion is not set
        if (radio === null)
            return null;
        //
        //Get the value
        var value = radio.value;
        //
        //If the value is other, read the specify field
        if (value === 'other') {
            //
            //Read the other/specify field. It must be set
            var elem = this.get_element(cname);
            //
            value = elem.value;
            //
            if (value === '')
                return null;
        }
        return value;
    };
    merger.prototype.get_players = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, server.exec("merger", [this.imerge], "get_players", [])];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    merger.prototype.get_consolidation = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, server.exec("merger", [this.imerge], "get_consolidation", [])];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    merger.prototype.delete_minors = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, server.exec("merger", [this.imerge], "delete_minors", [])];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    merger.prototype.redirect_pointer = function (pointer) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, server.exec("merger", [this.imerge], "redirect_pointer", [pointer])];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    merger.prototype.update_principal = function (c) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, server.exec("merger", [this.imerge], "update_principal", [c])];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    //
    //The stack for supporting detection of endless merger execution
    merger.stack = [];
    return merger;
}(outlook.baby));
exports["default"] = merger;
