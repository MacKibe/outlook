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
exports.primary = exports.checkbox = exports.textarea = exports.file = exports.input = exports.foreign = exports.readonly = exports.url = exports.select = exports.io = void 0;
//
//Resolve the schema classes, viz.:database, columns, mutall e.t.c. 
var schema = require("../../../schema/v/code/schema.js");
var crud = require("./crud.js");
//
//Added to allow access to a view
//import * as outlook from "./outlook.js";
// 
//Resolve the tree methods needed for browser
var tree = require("./tree.js");
// 
//Resolve the server functionality
var server = require("../../../schema/v/code/server.js");
//
/*
 * Sample from stack overflow of how to get Typescript types from
 * array of strings
    export const AVAILABLE_STUFF = <const> ['something', 'else'];
    export type Stuff = typeof AVAILABLE_STUFF[number];
 */
//Types of io based on the input element
var input_types = ["date", "text", "number", "file", "image", "email"];
//
//Other Non-input types
var other_types = ["read_only", "checkbox", "primary", "foreign",
    "textarea", "url", "select"];
//
//Modeling the io for ofloading related methods from theme page  
var io = /** @class */ (function () {
    //
    function io(
    //
    //The parent element of this io, e.g., the td of a tabular layout.
    anchor) {
        this.anchor = anchor;
        // 
        //Set the ouput span element
        this.output = this.create_element(anchor, "span", { className: "normal" });
    }
    Object.defineProperty(io.prototype, "document", {
        // 
        //Returns the document to which the anchor is attached;
        get: function () {
            return this.anchor.ownerDocument;
        },
        enumerable: false,
        configurable: true
    });
    // 
    //A helper function for creating and showing labeled inputs element.
    io.prototype.show_label = function (
    // 
    //The header text of the label 
    text) {
        //
        //Child elements of the label
        var elements = [];
        for (
        //
        //Child elements of the label
        var _i = 1; 
        //
        //Child elements of the label
        _i < arguments.length; 
        //
        //Child elements of the label
        _i++) {
            //
            //Child elements of the label
            elements[_i - 1] = arguments[_i];
        }
        // 
        //Create the label and attach it to the anchor.
        var Label = this.document.createElement("label");
        this.anchor.appendChild(Label);
        // 
        //Create a text node if necessary and attach it to the label.
        var header = text instanceof HTMLElement
            ? text : this.document.createTextNode(text);
        Label.appendChild(header);
        // 
        //Attach the labeled elements 
        elements.forEach(function (element) { return Label.appendChild(element); });
        //
        return Label;
    };
    Object.defineProperty(io.prototype, "value", {
        //
        //Setting and geting io values relies on the input's value 
        get: function () {
            return this.input_value;
        },
        set: function (v) {
            this.input_value = v;
            this.update_outputs();
        },
        enumerable: false,
        configurable: true
    });
    // 
    //Show this io's elements in the desired order 
    io.prototype.show = function () { };
    //
    //Create a new element from  the given tagname and attributes 
    //we assume that the element has no children in this version.
    io.prototype.create_element = function (
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
        //Greate the element holder based on the td's owner documet
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
    //Restore the html properties of this io. 
    io.prototype.restore = function () {
        //
        //Restore every dom property on this io
        for (var name_1 in this) {
            //
            //Get the old element
            var old_element = this[name_1];
            //
            //Skip non-hmtl properties
            if (!(old_element instanceof HTMLElement))
                continue;
            //
            //Get the id associated with the named property
            var id = old_element.getAttribute('data-id');
            //
            //All the elements partipating in an io must be identfied
            if (id === undefined || id === null)
                throw new schema.mutall_error("This property ".concat(name_1, " points to an unidentified element"));
            //
            //Retrieve new element from the current document that matches
            //the old version. NB: The Any type for the elment, to allow us 
            //re-asign this element in step .....2 below
            var new_element = this.document.querySelector("[data-id='".concat(id, "']"));
            //
            //The identified element must exist
            if (new_element === null)
                throw new schema.mutall_error("No element found with data-id ".concat(id));
            //
            //Update the named property on this panel........2
            this[name_1] = new_element;
        }
    };
    //
    //Default image sizes (in pixels) as they are being displayed
    // on a crud page 
    io.default_height = 75;
    io.default_width = 75;
    return io;
}());
exports.io = io;
// 
//This io class models a single choice selector from an enumerated list that is
//obtained from column type definition. 
var select = /** @class */ (function (_super) {
    __extends(select, _super);
    // 
    function select(anchor, 
    // 
    //The source of our selector choices 
    col) {
        var _this = _super.call(this, anchor) || this;
        _this.col = col;
        // 
        //Set the input select element 
        _this.input = _this.create_element(anchor, "select", {
            className: "edit",
            //
            //Think of a better home for mark_as_edited(evt). 
            //(Perhaps the scroll panel)
            onchange: function (evt) { return crud.page.mark_as_edited(evt); }
        });
        //
        //Get the choices from the column attribute.
        var choices = _this.get_choices(col.type);
        // 
        //Add the choices to the selector 
        choices.forEach(function (choice) { return _this.create_element(_this.input, "option", { value: choice, textContent: choice, id: choice }); });
        return _this;
    }
    //
    //Extract the choices found in a column type.
    //The choices have a format similar to:- "enum(a, b, c, d)" and we are 
    //interested in the forreign array ["a","b","c","d"]
    select.prototype.get_choices = function (choices) {
        //
        //Remove the enum prefix the leading bracket.
        var str1 = choices.substring(5);
        //
        //Remove the last bracket.
        var str2 = str1.substring(0, str1.length - 1);
        //
        //Use the comma to split the remaining string into an array.
        return str2.split(",");
    };
    Object.defineProperty(select.prototype, "input_value", {
        //
        //The value of a select io is the value of the selected option 
        get: function () { return this.input.value; },
        set: function (i) {
            //
            //Get the option about to be set.
            this.input.value = String(i);
            //
            //
            this.value_str = String(i);
        },
        enumerable: false,
        configurable: true
    });
    // 
    //The displayed output of a select is the text content 
    //of the selected option
    select.prototype.update_outputs = function () {
        // 
        //Transfer the input value to the output.
        this.output.textContent = this.value_str;
    };
    return select;
}(io));
exports.select = select;
// 
//This io class models an anchor tag.
var url = /** @class */ (function (_super) {
    __extends(url, _super);
    // 
    // 
    function url(anchor) {
        var _this = 
        // 
        _super.call(this, anchor) || this;
        // 
        //
        _this.output = _this.create_element(anchor, "a", { className: "normal" });
        // 
        //Create a the url label 
        var url_label = _this.create_element(anchor, "label", { className: "edit", textContent: "Url Address: " });
        // 
        //Attach the url input tag to the label
        _this.href = _this.create_element(url_label, "input", {
            type: "url",
            onchange: function (evt) { return crud.page.mark_as_edited(evt); }
        });
        // 
        //Create a text label
        var text_label = _this.create_element(anchor, "label", {
            className: "edit", textContent: "Url Text: "
        });
        // 
        //Add this text tag to the the label
        _this.text = _this.create_element(text_label, "input", {
            type: "text",
            //
            //Add a listener to to mark this text element as edited.
            onchange: function (evt) { return crud.page.mark_as_edited(evt); }
        });
        return _this;
    }
    Object.defineProperty(url.prototype, "input_value", {
        // 
        //The value of a url is a string of url/text tupple
        get: function () {
            // 
            //Return a null if the address is empty...
            var rtn = this.href.value === "" ? null
                //
                //... otherwise return  url/text values as a stringified
                //tupple.
                : JSON.stringify([this.href.value, this.text.value]);
            return rtn;
        },
        // 
        //Setting the value as a url involves a parsing the value if it 
        //is not a null and initializing the url and text inputs.
        set: function (i) {
            //
            //Convert the value  to a js object which has the following 
            //format '["address", "text"]'(taking care of a null value)
            var _a = i === null
                ? [null, null]
                // 
                //The value of a url must be of type string otherwise 
                //there is a mixup datatype
                : JSON.parse(i.trim()), address = _a[0], text = _a[1];
            //
            //Set the inputs 
            this.href.value = address;
            this.text.value = text;
        },
        enumerable: false,
        configurable: true
    });
    // 
    //Updating the url involves transfering values from the
    //input tags to the anchor tags.
    url.prototype.update_outputs = function () {
        this.output.href = this.href.value;
        this.output.textContent = this.text.value;
    };
    return url;
}(io));
exports.url = url;
//
//Read only class represents an io that is designed not  
//to be edited by the user directly, e.g., KIMOTHO'S 
//real estate, time_stamps, etc.
var readonly = /** @class */ (function (_super) {
    __extends(readonly, _super);
    // 
    function readonly(anchor) {
        var _this = _super.call(this, anchor) || this;
        // 
        //Read only cells will be specialy formated 
        _this.output = _this.create_element(anchor, "span", { className: "read_only" });
        return _this;
    }
    Object.defineProperty(readonly.prototype, "input_value", {
        // 
        //
        get: function () { return this.output.textContent; },
        set: function (i) { this.output.textContent = i; },
        enumerable: false,
        configurable: true
    });
    // 
    //The read only values do not change.
    readonly.prototype.update_outputs = function () { };
    return readonly;
}(io));
exports.readonly = readonly;
//The forein key io class
var foreign = /** @class */ (function (_super) {
    __extends(foreign, _super);
    //
    function foreign(anchor) {
        var _this = _super.call(this, anchor) || this;
        //
        //Show the friendly name. Note, the friendly class is needed
        //to allow us to associate this element withi the button property
        _this.friendly = _this.create_element(anchor, "span", { className: "normal friendly" });
        //
        //Select a foreign key.
        //Note the class name button to allow us rstore this spcfic button
        //later
        _this.button = _this.create_element(anchor, "input", {
            type: "button", className: "edit button",
            onchange: function (evt) { return crud.page.mark_as_edited(evt); }
        });
        //
        //For editing purposes, lets be as precise as 
        //we can; its the foreign key field we want.
        //Stop bubbling up to prevent the tr from being re-selected.
        _this.button.setAttribute("onclick", "crud.page.current.edit_fk(this)");
        return _this;
    }
    Object.defineProperty(foreign.prototype, "input_value", {
        /*
        //Restoring a foreign bey io is about ensuring that its friendly
        //and button properties matches the given td
        public restore(){
            //
            //Consider re-writing each element resore as a paremetrized
            //method to avoild repeating self. e.g.,
            //io.couple<x,y>(classname:x, element:y, td)
            //
            //Identify the element to restore using the matching class
            //name
            const classname = 'friendly';
            //
            //Retrieve from td the element with te named class ame
            const element = td.querySelector(`.${classname}`);
            //
            //The friendly must be a span tag
            if (element instanceof HTMLSpanElement){
                //
                //Update teh namd property on this page
                this[classname] = element;
            }else{
                throw new schema.mutall_error(`The ${classname} must be a '${typeof this[classname]}' tag`)
            }
            //
            //Restore the button using the matching class name
            const button = td.querySelector('.button');
            //
            //The friendly must be a teh same type as this view's button
            if (button instanceof HTMLInputElement){
                this.button = button;
            }else{
                throw new schema.mutall_error('The foreign key button must be a span tag');
            }
        }*/
        //
        //Setting and getting input values
        get: function () { return this.button.getAttribute("pk"); },
        set: function (i) {
            //
            //Destructure the foreign key value if it is a string. 
            if (typeof i === "string") {
                var _a = JSON.parse(i.trim()), pk = _a[0], friend = _a[1];
                // 
                //Verify that the primary key is defined
                if (pk === undefined || friend === undefined) {
                    throw new schema.mutall_error("THe foreign key value '".concat(i, "' is not correctly formatted"));
                }
                // 
                //Set the button's
                this.button.value = friend;
                this.button.setAttribute("pk", pk);
            }
        },
        enumerable: false,
        configurable: true
    });
    //
    //Transfer the primary key and its friend from the input button to tthe
    //friendly span tag
    foreign.prototype.update_outputs = function () {
        var pk = this.button.getAttribute("pk");
        var friend = this.button.value;
        // 
        //The friendly name is valid only when there is a primary key.
        this.friendly.textContent = pk === null ? "" : "".concat(pk, "-").concat(friend);
    };
    return foreign;
}(io));
exports.foreign = foreign;
//The class of ios based on the simple input tag. 
var input = /** @class */ (function (_super) {
    __extends(input, _super);
    //
    function input(
    //
    //The type of the inpute, e.g., text, number, date, etc.
    input_type, 
    //
    //The anchor of this element, e.g., td for tabulular layout
    anchor, 
    //
    //The value of the if available during construction
    value) {
        var _this = 
        //
        //The 'element input type' of an 'input io' is the same as that
        //of the input tag
        _super.call(this, anchor) || this;
        _this.input_type = input_type;
        //
        //Compile the input tag
        _this.input = _this.create_element(anchor, "input", {
            type: input_type,
            className: "edit",
            onchange: function (evt) { return crud.page.mark_as_edited(evt); }
        });
        return _this;
    }
    Object.defineProperty(input.prototype, "input_value", {
        //
        //Setting and getting input values
        get: function () { return this.input.value; },
        set: function (v) {
            //
            //Convert the input value to string.
            var str = v === null ? "" : String(v);
            //
            //If the input is a date then extract the date component in the 
            //YYYY-MM-DD format.
            if (this.input_type === "date")
                str = str.substring(0, 10);
            //
            //Assign the string to the input value. 
            this.input.value = str;
        },
        enumerable: false,
        configurable: true
    });
    //
    //Updating of input based io is by default, simply copying the data from
    //the an input value tag to a span tag
    input.prototype.update_outputs = function () {
        this.output.textContent = this.input.value;
    };
    return input;
}(io));
exports.input = input;
// 
//This io models for capturing local/remote file paths 
var file = /** @class */ (function (_super) {
    __extends(file, _super);
    // 
    function file(anchor, 
    // 
    //What does the file represent a name or an image
    type) {
        var _this = 
        // 
        //Ensure the input is of type=text 
        _super.call(this, "text", anchor) || this;
        _this.type = type;
        // 
        //Select the remote or local storage to browse for a file/image
        _this.source_selector = _this.create_element(anchor, "select", {
            className: "edit",
            //Show either the remote server or the local client as the 
            //source of the image. 
            onchange: function (evt) { return _this.toggle_source(evt); }
        });
        // 
        //Add the select options 
        _this.create_element(_this.source_selector, "option", { value: "local", textContent: "Browse local" });
        _this.create_element(_this.source_selector, "option", { value: "remote", textContent: "Browse remote" });
        //
        // 
        //This is a local file or image selector. 
        _this.file_selector = _this.create_element(anchor, "input", {
            //
            //For debugging purposes, hardwire this to a file rather than
            //the type variable, because the image input type does not 
            //behave as expected.
            type: "file",
            className: "edit local",
            value: "Click to select a file to upload"
        });
        // 
        //The home for the click listerner that allows us to browse the server 
        //remotely 
        _this.explore = _this.create_element(anchor, "input", {
            className: "edit local",
            type: "button",
            value: "Browse server folder",
            //
            //Paparazzi, please save the folder/files path structure here
            //after you are done.
            onclick: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.browse(String(this.value))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            }); }); }
        });
        //
        //Upload this file after checking that the user has all the inputs.
        //i.e., the file name and its remote path.
        _this.upload = _this.create_element(anchor, "input", {
            className: "edit local",
            type: "button",
            value: "Upload",
            onclick: function (evt) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.upload_file(evt)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            }); }); }
        });
        //
        //The tag for holding the image source if the type is an image.
        if (type === "image") {
            _this.image = _this.create_element(anchor, "img", {
                height: io.default_height,
                width: io.default_width
            });
        }
        return _this;
    }
    // 
    //Overide the show method to allow us to rearrange the input output 
    //elements of a file;
    file.prototype.show = function () {
        // 
        //Show the output elements which i.e the filename and image
        this.anchor.appendChild(this.output);
        if (this.image !== undefined)
            this.anchor.appendChild(this.image);
        // 
        //Show the source selector
        this.show_label("Select source: ", this.source_selector);
        // 
        //Show the file selector
        //<Label>select image/file<input type="file"></label>
        this.show_label("Select file: ", this.file_selector);
        // 
        //Show the file/folder input and the server browser button
        // '
        //Create the header for that label
        this.input_header = this.document.createElement("span");
        this.show_label(this.input_header, this.input, this.explore);
        //
        //Reattach the upload button to force it to the last position
        this.anchor.appendChild(this.upload);
    };
    //
    //This is an event listener that paints the current page 
    //to allow the user to select an image/file
    //from either the remote server or the local client 
    file.prototype.toggle_source = function (evt) {
        //
        //Target element must match the source selector.
        if (evt.target !== this.source_selector)
            throw new Error("The source selector must be the same as the event target");
        //
        //Get the selected (and unselected) options.
        var selected = this.source_selector.value;
        var unselected = selected === "local" ? "remote" : "local";
        //
        //Get the link element; it must exist.
        var link = this.document.querySelector("#theme_css");
        if (link === null)
            throw new Error("Element #theme_css not found");
        //
        //Get the CSS stylesheet referenced by the link element; it must exist.
        var sheet = link.sheet;
        if (sheet === null)
            throw new Error("CSS stylesheet not found");
        //
        //Show the selected options, i.e., set hide to false.
        this.update_stylesheet(sheet, selected, false);
        //
        //Hide the unselected options, i.e., set hide to true.
        this.update_stylesheet(sheet, unselected, true);
        // 
        //Update the input header label to either a file or folder depending 
        //on the selected source.
        this.input_header.textContent =
            "Select ".concat(selected === "remote" ? "file" : "folder");
    };
    //
    //Update the stylesheet so that the given selection is either 
    //hidden or displayed; if hidden the display property of the 
    //matching CSS rule is set to none, otherwise it's removed.
    file.prototype.update_stylesheet = function (sheet, selection, hide) {
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
    //This is called by the event listener for initiating the browsing of 
    //files/folders on the remote server.
    file.prototype.browse = function (
    //
    //Displaying the initial look of the browser
    initial) {
        return __awaiter(this, void 0, void 0, function () {
            var target, Inode, url, path;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        target = this.source_selector.value === "local"
                            ? "folder" : "file";
                        return [4 /*yield*/, server.ifetch("node", "export", [initial, target])];
                    case 1:
                        Inode = _a.sent();
                        url = "browser.php";
                        return [4 /*yield*/, (new tree.browser(target, url, Inode, initial))
                                .administer()];
                    case 2:
                        path = _a.sent();
                        //
                        //Only update the td if the selection was successful
                        if (path == undefined)
                            return [2 /*return*/];
                        //
                        //Store the $target into the appropriate input tag guided by the 
                        //given button
                        this.input.value = path;
                        // 
                        //Update the image tag.
                        if (this.type === "image")
                            this.image.src = path;
                        //
                        //Mark the parent td  as edited 
                        crud.page.mark_as_edited(this.input);
                        return [2 /*return*/];
                }
            });
        });
    };
    //
    //This is a button`s onclick that sends the selected file to the server
    //at the given folder destination, using the server.post method
    file.prototype.upload_file = function (evt) {
        return __awaiter(this, void 0, void 0, function () {
            var file, folder, _a, ok, result, html;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        file = this.file_selector.files[0];
                        //
                        //Ensure that the file is selected
                        if (file === undefined)
                            throw new crud.crud_error('Please select a file');
                        folder = this.input.value;
                        return [4 /*yield*/, server.post_file(file, folder)];
                    case 1:
                        _a = _b.sent(), ok = _a.ok, result = _a.result, html = _a.html;
                        //
                        //Flag the td inwhich the button is located as edited.
                        if (ok) {
                            crud.page.mark_as_edited(this.input);
                            // 
                            //Update the input tag 
                            //
                            //The full path of a local selection is the entered folder 
                            //plus the image/file name
                            this.input.value += "/" + file.name;
                        }
                        //
                        //Report any errors plus any buffered messages. 
                        else
                            throw new crud.crud_error(html + result);
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(file.prototype, "input_value", {
        // 
        //Overide the setting of the input vakue so as to extend the 
        //changing of the image source.
        set: function (i) {
            _super.prototype.input_value = i;
            if (this.type === "image") {
                //
                //Set the image to the defalt when it is null
                this.image.src = i === null
                    ? "/pictures/default.jpeg"
                    : String(i);
            }
        },
        enumerable: false,
        configurable: true
    });
    return file;
}(input));
exports.file = file;
// 
//This is class text area is an extension of a simple input that allows
//us to capture large amount of text. 
var textarea = /** @class */ (function (_super) {
    __extends(textarea, _super);
    //
    function textarea(anchor) {
        var _this = _super.call(this, "text", anchor) || this;
        //
        //Set the native textarea element.
        _this.textarea = _this.create_element(anchor, "textarea", {
            hidden: true,
            onblur: function (evt) { return _this.update_textarea_input(evt); }
        });
        // 
        //Add the click event listener that  
        _this.input.onclick = function (evt) { return _this.edit_textarea(evt); };
        return _this;
    }
    //
    //This is an onblur event listener of the textarea,
    //that updates the editted value to that of the input. 
    //In order to trigger the input`s onchange.
    textarea.prototype.update_textarea_input = function (evt) {
        // 
        //Get the textarea element that triggers this event.
        var textarea = evt.target;
        //
        //Transfer the textarea content to the input value 
        //
        //Commit the changes.
        this.input.value =
            textarea.textContent === null ? "" : textarea.textContent;
        //
        //mark the cell as edited
        crud.page.mark_as_edited(this.input);
        // 
        //Hide the textarea and show the input tag
        textarea.hidden = true;
        this.input.hidden = false;
        //
        console.log('Firing');
    };
    //
    //This an onclick event listener of the input element that activates 
    //the textarea, for the user to start editting
    textarea.prototype.edit_textarea = function (_evt) {
        //
        //Transfer the input value to the textarea text content 
        this.textarea.textContent = this.input.value;
        //
        //Hide the input 
        this.input.hidden = true;
        //
        //Unhide the text area 
        this.textarea.hidden = false;
    };
    return textarea;
}(input));
exports.textarea = textarea;
//
//The checkbox io is charecterised by 3 checkboxes. One for output, 2 for inputs
var checkbox = /** @class */ (function (_super) {
    __extends(checkbox, _super);
    //
    function checkbox(anchor) {
        var _this = _super.call(this, anchor) || this;
        //
        //The nomal mode for this io is the same as the edit.
        //The difference is that the output element is disabled
        _this.output = _this.create_element(anchor, "input", {
            type: "checkbox",
            disabled: true,
            className: "normal"
        });
        // 
        //THis checkbox is used for differentiating null from boolean 
        //values
        _this.input = _this.create_element(anchor, "input", {
            type: "checkbox",
            //
            //This checkbox is used for recording non-null values
            className: "edit value",
            //    
            //Mark the parent td as edited if the nput checkbox is cliked on
            onclick: function (evt) { return crud.page.mark_as_edited(evt); }
        });
        var label = _this.create_element(anchor, "label", { textContent: "NUll?: ", className: "edit" });
        //
        //Seting the io taking care of the  null data entry 
        _this.nullify = _this.create_element(label, "input", {
            type: "checkbox", className: "nullable",
            //
            //Hide the input checkbox if the nullify  is checked and mark
            //the parent td as edited
            onclick: function (evt) { return _this.input.hidden = _this.nullify.checked; },
            onchange: function (evt) { return crud.page.mark_as_edited(evt); }
        });
        return _this;
    }
    // 
    //The check boxes have no particula
    checkbox.prototype.show = function () { };
    Object.defineProperty(checkbox.prototype, "input_value", {
        //
        //The value of a check box is the checked status of the input.
        get: function () {
            return this.input.checked ? 1 : 0;
        },
        //
        //The value of a checkbox is a boolean or null.
        set: function (i) {
            if (i === null) {
                this.nullify.checked = true;
            }
            else {
                this.nullify.checked = false;
                this.input.checked = i == 1;
            }
        },
        enumerable: false,
        configurable: true
    });
    //
    //Update outputs from inputs.
    checkbox.prototype.update_outputs = function () {
        //If nullify is on...
        if (this.nullify.checked) {
            //
            //...then hide the outut...
            this.output.hidden = true;
        }
        else {
            //
            //...otherwise show the ouput with the same check status
            // as the input
            this.output.hidden = false;
            this.output.checked = this.input.checked;
        }
    };
    return checkbox;
}(io));
exports.checkbox = checkbox;
//The primary key io has 2 components: the value and a checkbox
//to support multi-record selection
var primary = /** @class */ (function (_super) {
    __extends(primary, _super);
    //
    function primary(anchor) {
        var _this = _super.call(this, anchor) || this;
        //
        //The primary key doubles up as a multi selector
        _this.multi_selector = _this.create_element(anchor, "input", {
            type: 'checkbox',
            //
            //This is useful for showin/hiding the selector
            className: "multi_select",
            //
            //This is used for data retrieval, e.g.,
            //querySelecttorAll("input[name='multi_selector]:checked")
            name: "multi_select"
        });
        //
        //Tag where to report runtime errors that arise from a saving the record
        // (with this primary key) to the server
        _this.errors = _this.create_element(anchor, "span", 
        //
        //This is to distinguish this span for errors. as well as hiddinging 
        //it initially.
        { className: "errors", hidden: true });
        //
        //This will be activates to let the user see the error message.
        _this.see_error_btn = _this.create_element(anchor, "button", {
            //
            //Helps us to know which button it is
            className: "error_btn error",
            hidden: true,
            onclick: function (evt) { return _this.see_error(evt); }
        });
        //
        //Mark the span where we shall place the primary key
        _this.output.classList.add("pk");
        //
        //Ensure that the primary key is visible whether in normal 
        //or edit mode
        _this.output.classList.remove("normal");
        return _this;
    }
    //
    //This is a error button event listener for toggling the user
    //error message after writing data to the database.
    primary.prototype.see_error = function (evt) {
        //
        //Toggle the class to hide and unhide the error message.
        this.errors.hidden = !this.errors.hidden;
        //
        //Change the text content of the button to either 
        //see error or close error.
        evt.target.textContent =
            this.errors.hidden ? "see error" : "close error";
    };
    Object.defineProperty(primary.prototype, "input_value", {
        //
        //The value of the primary key autonumber is the content of the output tag
        get: function () {
            // 
            //An empty primary key will be passed as a null
            var value = this.output.textContent === ""
                ? null
                : this.output.textContent;
            return value;
        },
        //
        //Set the input value of a primary key given the basic string value.
        set: function (i) {
            //
            //Destructure the primary key value if it is a string. 
            if (typeof i === "string") {
                // 
                //The input must be a string of this shape, [10,"friendlyname"].
                var _a = JSON.parse(i.trim()), pk = _a[0], friend = _a[1];
                // 
                //Verify that both the primary key and the friendlly components are defined.
                if (pk === undefined || friend === undefined) {
                    throw new schema.mutall_error("The foreign key value '".concat(i, "' is not correctly formatted"));
                }
                //
                //Save the friendly component as an attribute
                this.output.setAttribute('friend', friend);
                //
                //Show the pk in the output content.
                this.output.textContent = pk;
            }
        },
        enumerable: false,
        configurable: true
    });
    //
    //Update outputs from inputs does nothing because the input
    //is the same as the output.
    primary.prototype.update_outputs = function () { };
    return primary;
}(io));
exports.primary = primary;
