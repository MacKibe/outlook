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
exports.provider = exports.page = void 0;
var outlook_js_1 = require("./outlook.js");
//
//Resolve the schema classes, viz.:database, columns, mutall e.t.c. 
var schema = require("../../../schema/v/code/schema.js");
//
//Resolve the server method for backend communication
var server = require("../../../schema/v/code/server.js");
//
//This is a page used for authenticating users so 
//that they can be allowed to access the application 
//services. The popup takes in a provider and returns a user
var page = /** @class */ (function (_super) {
    __extends(page, _super);
    //
    function page(url) {
        //
        //Use the config file to get the login url
        //super(app.current.config!.login);
        return _super.call(this, url) || this;
    }
    //Return the logged in user
    page.prototype.get_result = function () {
        return __awaiter(this, void 0, void 0, function () {
            var User;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //
                        //Check whether the input are valid or not
                        //
                        //Get the provider
                        this.provider = this.retrieve();
                        return [4 /*yield*/, this.provider.authenticate()];
                    case 1:
                        User = _a.sent();
                        //
                        //Compile the login response
                        return [2 /*return*/, User];
                }
            });
        });
    };
    //
    //Retrieves a provider
    page.prototype.retrieve = function () {
        //
        //Retrieve the checked provider id
        var values = this.get_choices('provider_id');
        //
        //Check the values for validity
        if (values.length !== 1) {
            throw new schema.mutall_error("Please select one provider");
        }
        var provider_id = values[0];
        // 
        //Retrieve the checked operation id 
        values = this.get_choices('operation_id');
        //
        //Check the values for validity
        if (values.length !== 1) {
            throw new schema.mutall_error("Please select one Operation");
        }
        var operation_id = values[0];
        //
        //1. Define the provider
        var Provider;
        //
        switch (provider_id) {
            case "outlook":
                //
                //Retrieve the credentials
                var email = this.get_element('email').value;
                //     
                var password = this.get_element('password').value;
                //    
                Provider = new outlook(email, password, operation_id);
                break;
            default:
                throw new schema.mutall_error("The selected provider is not yet developed");
        }
        //
        return Provider;
    };
    //Check if we have the correct data before we close, i.e., if the
    //provider is outlook. See if there are inputs in 
    //the input fields.
    page.prototype.check = function () {
        var _this = this;
        //
        //1. Proceed only if the provider is outlook.
        if (!(this.provider instanceof outlook))
            return true;
        //
        //Define a fuction for identifiyng and notifying empty values
        var is_valid = function (id) {
            //
            var elem = _this.get_element(id);
            //
            var is_empty = ((elem.value === null) || elem.value.length === 0);
            //
            //Notify (on the login page) if empty
            if (is_empty) {
                //
                //Get the notification tag; its next to the id
                var notify = elem.nextElementSibling;
                notify.textContent = "Empty ".concat(id, " is not allowed;");
            }
            return !is_empty;
        };
        //
        //2. Check if e-mail is empty, then flag it as an error if it is empty.
        var email_is_valid = is_valid('email');
        //
        //3. Check if password is empty, then flag it as an error if it is 
        //empty.
        var password_is_valid = is_valid('password');
        //
        //Return true if both the email and password are valid 
        return email_is_valid && password_is_valid;
    };
    return page;
}(outlook_js_1.popup));
exports.page = page;
//
//This class represents authentication service providers
// eg. google,facebook,github
var provider = /** @class */ (function () {
    //
    //Initialize the provider using the name. 
    function provider(name, operation) {
        this.name = name;
        this.operation_id = operation;
    }
    return provider;
}());
exports.provider = provider;
// This class represents the authentication services provided by google.
var google = /** @class */ (function () {
    function google(operation) {
        //super('google',operation);
    }
    return google;
}());
//
//Represents our custom login provided firebase
var outlook = /** @class */ (function (_super) {
    __extends(outlook, _super);
    function outlook(email, password, operation) {
        var _this = _super.call(this, 'outlook', operation) || this;
        _this.email = email;
        _this.password = password;
        return _this;
    }
    //
    //This is our custom made signing method using php hashing. 
    outlook.prototype.authenticate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ok;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.operation_id === "register")) return [3 /*break*/, 2];
                        //
                        //Registration 
                        //
                        //Create the user account
                        return [4 /*yield*/, server.exec("database", ["mutall_users"], "register", [this.email, this.password])];
                    case 1:
                        //
                        //Registration 
                        //
                        //Create the user account
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, server.exec("database", ["mutall_users"], "authenticate", [this.email, this.password])];
                    case 3:
                        ok = _a.sent();
                        //
                        //If the login is not successful throw an exception
                        if (!ok)
                            throw new schema.mutall_error("Invalid login credentials");
                        _a.label = 4;
                    case 4: 
                    //
                    return [2 /*return*/, new outlook_js_1.user(this.email)];
                }
            });
        });
    };
    return outlook;
}(provider));
// 
//Solomon was and lawrence have to develop this class
//because facebook requires special setup.
var facebook = /** @class */ (function () {
    // 
    // 
    function facebook(operation) {
        // 
        // 
        //super('facebook',operation);
    }
    return facebook;
}());
