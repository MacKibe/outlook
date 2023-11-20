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
exports.products = exports.services = exports.app = void 0;
var server = require("../../../schema/v/code/server.js");
//
//Resolve the schema classes, viz.:database, columns, mutall e.t.c. 
var schema = require("../../../schema/v/code/schema.js");
// 
var outlook = require("./outlook.js");
var crud = require("./crud.js");
var theme = require("./theme.js");
var login = require("./login.js");
//
//The mechanism of linking services providers 
//to their various consumers.
//This app is the home page of the various mutall
//services also called the index.html of the chama,
//tracker, postek e.t.c 
var app = /** @class */ (function (_super) {
    __extends(app, _super);
    //
    //
    function app(
    //
    //The configuration settings for this application
    config) {
        var _this = 
        //
        //The url of an application comes from the current window
        _super.call(this, window.document.URL) || this;
        _this.config = config;
        //
        //Collector for first level login data.
        _this.collector = [];
        //
        //Set this as teh current application
        app.current = _this;
        //
        //Ensure that the globally  acessible application url in the shema
        //class is set to that of this document. This is important to support 
        //registration autoloaders in PHP
        schema.schema.app_url = window.document.URL;
        //
        _this.dbname = _this.config.app_db;
        // 
        _this.subject = config.subject;
        //
        //If the id of an appliction is not given, then use name of application
        //class that extednds this ne.
        _this.id = config.id;
        //
        //Set the application's window.
        _this.win = window;
        // 
        //Compile the products of this application
        _this.products = new products();
        return _this;
    }
    //
    //The user must call this method on a new application object; its main 
    //purpose is to complete those operations of a constructor that require
    //to function synchronously
    app.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var user_str;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //
                        //Open the application window to set the win and title properties.
                        this.open();
                        //
                        //Set the database based on the subject property.
                        return [4 /*yield*/, this.set_dbase()];
                    case 1:
                        //
                        //Set the database based on the subject property.
                        _a.sent();
                        // 
                        //Expand the inbuilt products with all those read from the database that:- 
                        //a) are associated with this application through the execution link 
                        //b) are global, i.e., not associated with specific role or application. 
                        return [4 /*yield*/, this.products.expand()];
                    case 2:
                        // 
                        //Expand the inbuilt products with all those read from the database that:- 
                        //a) are associated with this application through the execution link 
                        //b) are global, i.e., not associated with specific role or application. 
                        _a.sent();
                        //
                        //Set the application panels
                        //
                        //Set the services panel
                        this.panels.set("services", new services(this));
                        //
                        //Set the theme panel
                        this.panels.set("theme", new theme.theme(this.subject, "#content", this));
                        //
                        //Show the theme and the services panel
                        return [4 /*yield*/, this.show_panels()];
                    case 3:
                        //
                        //Show the theme and the services panel
                        _a.sent();
                        //
                        //Populate the subject selector
                        this.populate_selector();
                        // 
                        //Show this application on the address bar and make ensure that
                        //the initial window history state is not null.
                        this.save_view('replaceState');
                        user_str = this.win.localStorage.getItem("user");
                        //
                        //If this user exist use the already existing user to login
                        if (user_str !== null) {
                            this.user = JSON.parse(user_str.trim());
                            this.login(this.user);
                        }
                        //
                        //Populate the subject selector with all the entities of the
                        //application.
                        this.populate_selector();
                        return [2 /*return*/];
                }
            });
        });
    };
    //     
    //Return true/false depending on whether the named entity is linked to 
    //the user database or not 
    app.prototype.get_role_id = function (ename, dbase) {
        // 
        //Get the named entity 
        var entity = dbase.entities[ename];
        // 
        //Get the column names of this entity 
        var cnames = Object.keys(entity.columns);
        // 
        //Select only those columns that are used for linking 
        //this application's database to the mutall_user one.
        var f_cnames = cnames.filter(function (cname) {
            // 
            //Get the named column 
            var col = entity.columns[cname];
            // 
            //Test if this is a foreign key column pointing to the
            //mutall_user's database
            //
            var test = col instanceof schema.foreign
                && col.ref.db_name === "mutall_user"
                && col.ref.table_name === "user";
            // 
            //
            return test;
        });
        // 
        //Only those entities that have columns that pass the test are 
        //considered
        return f_cnames.length > 0;
    };
    //
    //Set the current database 
    app.prototype.set_dbase = function () {
        return __awaiter(this, void 0, void 0, function () {
            var idbase;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, server.exec("database", [this.dbname], "export_structure", [])];
                    case 1:
                        idbase = _a.sent();
                        //
                        //Activate the static and set it to this app
                        this.dbase = new schema.database(idbase);
                        return [2 /*return*/];
                }
            });
        });
    };
    //
    //This method authenticates a new user that wants to access the 
    //services of this application.
    //There are two ways of calling this method, with or without the User
    // Parameter.
    //If there was a previous login, the User must have been provided and saved
    //in the local storage, otherwise, the user details will be provided via
    //a dialog box.
    app.prototype.login = function (User) {
        return __awaiter(this, void 0, void 0, function () {
            var Login, _a, sql, role_ids, ids;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(User === undefined)) return [3 /*break*/, 2];
                        Login = new login.page(this.config.login);
                        //
                        //2.Get the authenticated user from the login popup
                        _a = this;
                        return [4 /*yield*/, Login.administer()];
                    case 1:
                        //
                        //2.Get the authenticated user from the login popup
                        _a.user = (_b.sent());
                        _b.label = 2;
                    case 2:
                        //
                        //Continue only if the user is defined
                        if (this.user === undefined)
                            return [2 /*return*/];
                        sql = 
                        //
                        //1. Specify what we want using a "select" clause 
                        "SELECT "
                            //
                            //...Specify the role id id(and its full name?).
                            + "role.id "
                            //
                            //2. Specify the "from" clause
                            + "FROM "
                            + "subscription "
                            //
                            //These are the joins that trace our route of interest 
                            + "inner join user ON subscription.user= user.user "
                            + "inner join player ON subscription.player= player.player "
                            + "inner join application ON player.application=application.application "
                            + "inner join role on player.role = role.role "
                            //
                            //3. Specify the conditions that we want to apply i.e "where" clause
                            + "WHERE "
                            //
                            //Specify the email condition 
                            + "user.email='".concat(this.user.email, "' ")
                            //
                            //Specify the application condition
                            + "AND application.id='".concat(this.id, "'");
                        return [4 /*yield*/, server.exec("database", ["mutall_users"], "get_sql_data", [sql])
                            // 
                            //Extract the roleid component from the server result
                        ];
                    case 3:
                        ids = _b.sent();
                        // 
                        //Extract the roleid component from the server result
                        this.user.role_ids = ids.map(function (e) { return e.id; });
                        //
                        //The user is a visitor if he has no previous roles 
                        this.user.type = this.user.role_ids.length === 0 ? "visitor" : "regular";
                        if (!(this.user.type === "visitor")) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.register()];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5: 
                    //
                    //Welcome the user to the home page unconditionaly
                    return [4 /*yield*/, this.welcome_user()];
                    case 6:
                        //
                        //Welcome the user to the home page unconditionaly
                        _b.sent();
                        //
                        //Save the user in local storage to allow re-access to this page 
                        //without logging in.
                        window.localStorage.setItem("user", JSON.stringify(this.user));
                        return [2 /*return*/];
                }
            });
        });
    };
    //
    //On successful login, welcome the definite user, i.e., regular or visitor 
    //and not anonymous,  to the homepage by painting the matching message.
    app.prototype.welcome_user = function () {
        return __awaiter(this, void 0, void 0, function () {
            var role_element;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    //
                    //Paint the welcome message for a regular user.
                    return [4 /*yield*/, this.paint_welcome("regular")];
                    case 1:
                        //
                        //Paint the welcome message for a regular user.
                        _a.sent();
                        //
                        //Modify the appropriate tags
                        //
                        //Set user paragraph tags
                        this.get_element("user_email").textContent = this.user.email;
                        this.get_element("app_id").textContent = this.id;
                        this.get_element("app_name").textContent = this.name;
                        role_element = this.get_element("roles");
                        //
                        //Clear the current roles 
                        role_element.innerHTML = "";
                        //
                        //Add all the user roles to the welcome panel. 
                        this.user.role_ids.forEach(function (role_id) {
                            //
                            //Get the role title. Note the role_id as the datatype defind in 
                            //the application parameters, rather than outlook.role.role_id
                            //const title = this.products[<role_id>role_id][0];
                            var title = role_id;
                            //
                            //This is what the role fragment looks like.
                            //<div id="role_tenant">Tenant</div>
                            //
                            //Build the fragment 
                            var html = "<div id=\"role_".concat(role_id, "\">").concat(title, "</div>");
                            var div = _this.document.createElement("div");
                            role_element.appendChild(div);
                            div.outerHTML = html;
                        });
                        //
                        //4.Filter the products to remain with only those customised 
                        //for this role and those that are free
                        //this.products.filter(this.user!);
                        // 
                        //Activate the free products and those that this user is subscribed for
                        return [4 /*yield*/, this.activate_products()];
                    case 2:
                        //
                        //4.Filter the products to remain with only those customised 
                        //for this role and those that are free
                        //this.products.filter(this.user!);
                        // 
                        //Activate the free products and those that this user is subscribed for
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // 
    //Activates all the products that are relevant for this user 
    app.prototype.activate_products = function () {
        return __awaiter(this, void 0, void 0, function () {
            var prod_id, subscribed;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prod_id = new Set();
                        // 
                        //Collect all the free products of this application that are globally 
                        //accessible
                        this.products.forEach(function (Product) {
                            if (
                            //Free products....
                            (Product.cost === undefined
                                || Product.cost === null
                                || Product.cost === 0)
                                //
                                //...that are  global
                                && Product.is_global === 'yes')
                                prod_id.add(Product.id);
                        });
                        return [4 /*yield*/, server.exec("app", [this.id], "available_products", [this.user.email])
                            // 
                            //Add the subscribed
                        ];
                    case 1:
                        subscribed = _a.sent();
                        // 
                        //Add the subscribed
                        subscribed.forEach(function (prod) {
                            prod_id.add(prod.product_id);
                        });
                        // 
                        //Activate this product
                        prod_id.forEach(function (id) { return _this.products.activate(id); });
                        return [2 /*return*/];
                }
            });
        });
    };
    // 
    //Returns shared inbult unindxed products
    app.prototype.get_products_shared = function () {
        var _this = this;
        //  
        //The roles and products of this application.
        return [
            {
                id: "admin",
                title: "Products/Assets/Subscription",
                solutions: [
                    {
                        title: "Package Solutions to Products",
                        id: "crud_resource",
                        listener: ["crud", 'resource', ['review'], '+', "mutall_users"]
                    },
                    {
                        title: "Customise Products",
                        id: "crud_roles",
                        listener: ["crud", 'custom', ['review'], '+', "mutall_users"]
                    },
                    {
                        title: "Product Subscription",
                        id: "crud_assets",
                        listener: ["crud", 'asset', ['review'], '+', "mutall_users"]
                    },
                    {
                        title: "Specialize products",
                        id: "executions",
                        listener: ["crud", 'execution', ['review'], '+', "mutall_users"]
                    }
                ]
            },
            {
                id: "setup",
                title: "Database Administration",
                solutions: [
                    {
                        title: "Relink User System to ".concat(this.dbname),
                        id: "relink_user",
                        listener: ["event", function () { return _this.relink_user(); }]
                    },
                    {
                        title: "Edit any Table",
                        id: "edit_table",
                        listener: ["event", function () { return _this.edit_table(); }]
                    }
                ]
            }
        ];
    };
    //
    //Register the user and return the roles which this user can play
    // in this application.
    app.prototype.register = function () {
        return __awaiter(this, void 0, void 0, function () {
            var inputs, Role, role_ids, login_db_data, html, Report;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        inputs = this.dbase.get_roles();
                        // 
                        //If these roles are undefined alert the user
                        if (inputs === undefined || inputs.length < 0) {
                            alert("No roles found");
                            return [2 /*return*/];
                        }
                        Role = new outlook.choices(this.config.general, inputs, "role_id");
                        return [4 /*yield*/, Role.administer()];
                    case 1:
                        role_ids = _a.sent();
                        //
                        //Test if the user has aborted registration or not         
                        if (role_ids === undefined)
                            throw new schema.mutall_error("User has aborted the (level 1) registration");
                        //
                        //Save the user roles 
                        this.user.role_ids = role_ids;
                        login_db_data = this.get_subscription_data();
                        return [4 /*yield*/, server.exec("questionnaire", [login_db_data], "load_common", ["log.xml"])];
                    case 2:
                        html = _a.sent();
                        if (!(html !== "Ok")) return [3 /*break*/, 4];
                        Report = new outlook.report(app.current, html, this.config.general);
                        return [4 /*yield*/, Report.administer()];
                    case 3:
                        _a.sent();
                        // 
                        //Abort the login process.
                        throw new Error("Registration failed");
                    case 4: 
                    //
                    // The registration was successful so, return the role ids  
                    return [2 /*return*/, this.user.role_ids];
                }
            });
        });
    };
    //
    // Return the data needed for a successful 'first level' registartion, 
    // i.e., the data required for the current visitor to be recognized as a 
    // subscriber of the current application.
    app.prototype.get_subscription_data = function () {
        var _this = this;
        //
        // Prepare an array for holding the registration data.
        var reg = this.collector = [];
        //
        //Collect the user and appication data
        this.collector.push(['mutall_users', 'application', [], 'id', this.id]);
        //
        if (this.user.email === (undefined || null)) {
            throw new schema.mutall_error("You cannot login using without an email");
        }
        this.collector.push(['mutall_users', 'user', [], 'email', this.user.email]);
        //
        //Collect as much subcription data as there are roles
        //subscribed by this the use.
        this.user.role_ids.forEach(function (myrole, i) {
            //
            //Collect all available pointers to the user to enable us link to 
            //the application's specific database.
            _this.collector.push([app.current.dbname, myrole, [i], 'email', _this.user.email]);
            //
            //Indicate that we need -to  save a subscription record
            _this.collector.push(['mutall_users', "subscription", [i], 'is_valid', true]);
            //
            //Indicate that we need to save a player 
            _this.collector.push(['mutall_users', 'player', [i], 'is_valid', true]);
            //
            //COllect the user roles in this application
            _this.collector.push(['mutall_users', 'role', [i], 'id', myrole]);
        });
        //
        // Return the completer required array.
        return reg;
    };
    // 
    //This method is defined here but will gravitate to its proper 
    //home in future 
    app.prototype.new_crud = function (mother, subject, Xverbs) {
        return new crud.page(mother, subject, Xverbs);
    };
    // 
    //This is the generalised crud listener 
    app.prototype.crud = function (subject, Xverbs) {
        return __awaiter(this, void 0, void 0, function () {
            var baby, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        baby = app.current.new_crud(app.current, subject, Xverbs);
                        return [4 /*yield*/, baby.administer()];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //
    //Paint the welcome message for users on the home page.
    app.prototype.paint_welcome = function (usertype) {
        return __awaiter(this, void 0, void 0, function () {
            var url, Template, win;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        /**
                         * If the usertype is visitor invite the user to login
                         */
                        if (usertype === "visitor") {
                            this.welcome_visitor();
                            return [2 /*return*/];
                        }
                        url = this.config.welcome;
                        Template = new outlook.template(url);
                        return [4 /*yield*/, Template.open()];
                    case 1:
                        win = _a.sent();
                        //
                        //Carnibalise the welcome template
                        //
                        //Paint the application homepage with the welcome message.
                        Template.copy(usertype, [this, 'welcome']);
                        //
                        //Close the tenplate (view)
                        win.close();
                        return [2 /*return*/];
                }
            });
        });
    };
    // 
    //Welcoming the visitor means inviting him to login and 
    //deactivating all the services that could have been active
    app.prototype.welcome_visitor = function () {
        //
        //Invite the user to login 
        this.get_element("welcome").innerHTML =
            " Please <button onclick=\"app.current.login()\">login</button> to access \n                various services";
        // 
        //Deactivate any active service 
        Array.from(this.document.querySelectorAll(".a"))
            .forEach(function (el) {
            el.classList.remove("a");
            el.removeAttribute("onclick");
        });
    };
    //
    //Log the user out of this application.
    app.prototype.logout = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                //
                //Use firebase to close its logout system
                //await firebase.auth().signOut();
                // 
                // 
                //Clear the entire local storage for this (debugging) version
                this.win.localStorage.clear();
                //
                //Remove the user from the local storege
                //this.win.localStorage.removeItem("user");
                //
                //Restore default home page by replacing the regular
                //user's welcome message with the visitor's one.
                this.paint_welcome("visitor");
                return [2 /*return*/];
            });
        });
    };
    //
    //2. Change the subject of this application
    app.prototype.change_subject = function (selector) {
        return __awaiter(this, void 0, void 0, function () {
            var dbname, ename, subject, Theme;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dbname = this.config.app_db;
                        ename = selector.value;
                        subject = [ename, dbname];
                        Theme = this.panels.get("theme");
                        //
                        //Change the theme's subject
                        Theme.subject = subject;
                        //
                        //Clear the existing content in the table
                        this.document.querySelector('thead').innerHTML = '';
                        this.document.querySelector('tbody').innerHTML = '';
                        //
                        //2.2 Repaint the theme panel
                        Theme.view.top = 0;
                        Theme.view.bottom = 0;
                        return [4 /*yield*/, Theme.continue_paint()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //
    //1. Populate the selector with table names from current database
    app.prototype.populate_selector = function () {
        //
        //1.Get the current database: It must EXIST by THIS TIME
        var dbase = this.dbase;
        if (dbase === undefined)
            throw new Error("No current db found");
        //
        //2.Get the subject selector
        var selector = this.get_element("selection");
        //
        //3.Loop through all the entities of the database
        //using a for-in statement
        for (var ename in dbase.entities) {
            //
            //3.1 Create a selector option
            var option = this.document.createElement('option');
            //
            //  Add the name that is returned when you select
            option.value = ename;
            //
            //3.2 Populate the option
            option.textContent = ename;
            //
            //Set the option as selected if it matches the current subject
            if (ename === this.subject[0])
                option.selected = true;
            // 
            //3.3 Add the option to the subject selector
            selector.appendChild(option);
        }
    };
    //
    //Establish the links between the user database and application database
    //e.g In tracker we link developers, CEO's, staff to the users 
    //and organization to the business.
    app.prototype.relink_user = function () {
        return __awaiter(this, void 0, void 0, function () {
            var links, ok;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        links = this.collect_broken_replicas();
                        //
                        //Continue only if there are broken links.
                        if (links.length === 0) {
                            alert("The links are well linked");
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, server.exec("tracker", [], "relink_user", [links])];
                    case 1:
                        ok = _a.sent();
                        //
                        //If not ok, alert the user the process has failed.
                        if (!ok) {
                            alert("Process failed");
                        }
                        else {
                            alert('Replicas relinked successfully');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    //
    //Yield both roles and business replicas that are broken.
    app.prototype.collect_broken_replicas = function () {
        //
        //Start with an empty array.
        var result = [];
        //
        //Get the role replicas.
        var role = this.dbase.get_roles();
        //
        //Collect the role replicas.
        var replicas = role.map(function (role) { return { ename: role.key, cname: "user" }; });
        //
        //Collect the business replicas.
        var ename = this.get_business_ename();
        //
        //Merge the role and business replicas.
        replicas.push({ ename: ename, cname: "business" });
        //
        //For each, merge ...
        for (var _i = 0, replicas_1 = replicas; _i < replicas_1.length; _i++) {
            var replica = replicas_1[_i];
            //
            //Get the application entity.
            var entity = this.dbase.entities[replica.ename];
            //
            //Get the application column.
            var column = entity.columns[replica.cname];
            //
            //Test if the user column is an attribute and yield it.
            if (column instanceof schema.attribute)
                result.push();
        }
        ;
        //
        return result;
    };
    //
    //Retrieve the entity that represents the business in this application.
    app.prototype.get_business_ename = function () {
        //
        //Get all entities in the database.
        var entities = Object.values(this.dbase.entities);
        //
        //Select only the entities that have a business column.
        var businesses = entities.filter(function (entity) {
            //
            //Get all columns of this entity.
            var cnames = Object.keys(entity.columns);
            //
            //Test if one of the columns is business.
            return cnames.includes("business");
        });
        //
        //Get the length of the businesses found.
        var count = businesses.length;
        //
        //If there's no entity linked to the business, 
        //then this model is incomplete.
        if (count === 0)
            throw new schema.mutall_error("Business table missing; incomplete model");
        //
        //If there's more than one table with a business link then bring this to
        //the user's attention.
        if (count > 1)
            throw new schema.mutall_error("We don't expect more than one business.\n            Found ".concat(JSON.stringify(businesses)));
        //
        //Return the only entity linked to business.
        return businesses[0].name;
    };
    //
    //Edit any table in the current system. This feature is available to the
    //superuser
    app.prototype.edit_table = function () {
        return __awaiter(this, void 0, void 0, function () {
            var dbase, enames, pairs, Choice, selected, subject, verbs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dbase = this.dbase;
                        enames = Object.keys(dbase.entities);
                        pairs = enames.map(function (ename) { return ({ key: ename, value: ename }); });
                        Choice = new outlook.choices(this.config.general, pairs, "table", null, "#content", "single");
                        return [4 /*yield*/, Choice.administer()];
                    case 1:
                        selected = _a.sent();
                        //
                        //4. Test whether the selection was aborted or not
                        if (selected === undefined)
                            return [2 /*return*/];
                        subject = [selected[0], this.dbname];
                        verbs = ['create', 'review', 'update', 'delete'];
                        this.crud(subject, verbs);
                        return [2 /*return*/];
                }
            });
        });
    };
    return app;
}(outlook.view));
exports.app = app;
//
//The welcome panel of an app
var services = /** @class */ (function (_super) {
    __extends(services, _super);
    // 
    // 
    function services(base, Products) {
        if (Products === void 0) { Products = null; }
        var _this = _super.call(this, "#services", base) || this;
        _this.products = Products;
        return _this;
    }
    //
    //Use the products to complete the painting of the services panel
    services.prototype.continue_paint = function () {
        return __awaiter(this, void 0, void 0, function () {
            var panel, prods;
            var _this = this;
            return __generator(this, function (_a) {
                panel = this.get_element("services");
                prods = this.products === null
                    //
                    // Use the products defined at the root application level
                    ? this.base.products
                    //
                    // Use the products defined at the local application level
                    : this.products;
                // 
                //
                //Step through the products to paint each one of them.
                prods.forEach(function (product) {
                    //
                    //Paint the product and return a field set 
                    var fs = _this.paint_products(panel, product);
                    // 
                    //Loop through the solutions of this product appending them 
                    //as children of the field set
                    Object.keys(product.solutions).forEach(function (id) {
                        // 
                        //Get the solution to paint
                        var solution = product.solutions[id];
                        // 
                        //Paint the solution
                        _this.paint_solution(fs, solution);
                    });
                });
                return [2 /*return*/];
            });
        });
    };
    //
    //Paint the given product and return to a field set.
    services.prototype.paint_products = function (
    // 
    //The panel element where to paint the products 
    panel, 
    //
    //The product being painted
    product) {
        //
        //1. Create a fieldset Element.
        var fs = document.createElement("fieldset");
        //
        //Set the id to be the same as that of the role
        fs.id = product.id;
        //
        //2. Set the fieldset's legend
        //
        //Create the legend
        var legend = document.createElement("legend");
        //
        //Set its content to the title of the role
        legend.textContent = product.title;
        legend.classList.add("redo-legend");
        legend.classList.add("reset-this");
        //
        //
        //Link the legend to the fieldset.
        fs.appendChild(legend);
        fs.classList.add("redo-fieldset");
        fs.classList.add("reset-this");
        //
        //Add the field set to the panel to complete the painting
        panel.appendChild(fs);
        // 
        //Return the fieldset Element.
        return fs;
    };
    // 
    // 
    //Paint the solution
    services.prototype.paint_solution = function (
    // 
    //The fieldset tag where we paint this solution. 
    fs, 
    // 
    //The solutions of the object currently being painted
    solution) {
        //
        //
        //Return if this product has empty solutions
        if (solution === undefined)
            return;
        // 
        // Destructure the solution to get the title; its the first component of 
        // the solution tuple
        var title = solution.title, id = solution.id;
        //
        //1. Convert the service into a (hidden by default) html element.
        var innertext = "<div "
            //
            //A solution withn a product is identified by the soultion id, 
            //i.e., ename.
            + "class='".concat(id, "' \n          >\n              ").concat(title, "\n          </div>");
        //
        //Create the DOM service element.
        var element = document.createElement("div");
        //
        //fill it with the inner html.
        element.innerHTML = innertext;
        //
        //2. Attach the element to the fieldset.
        fs.appendChild(element);
    };
    return services;
}(outlook.panel));
exports.services = services;
//
//Models a colllection of the products as a map. It extends a map 
//so that it can be indexed by a role id.
var products = /** @class */ (function (_super) {
    __extends(products, _super);
    //
    function products() {
        var _this = 
        //
        //Initialize the parent map
        _super.call(this) || this;
        //
        //Collect products shared between all applications
        var uproducts = app.current.get_products_shared();
        //
        //Collect products that are specific to those application
        //and add them to the shared ones
        var all_uproducts = uproducts.concat(app.current.get_products_specific());
        //
        //Use the products to initialize this products map
        for (var _i = 0, all_uproducts_1 = all_uproducts; _i < all_uproducts_1.length; _i++) {
            var uproduct = all_uproducts_1[_i];
            //
            //Convert the (solution) undexed product to an indexed one
            var product = {
                id: uproduct.id,
                title: uproduct.title,
                solutions: {},
                is_global: 'yes'
            };
            //
            //Propulate the indexed solutions
            for (var _a = 0, _b = uproduct.solutions; _a < _b.length; _a++) {
                var solution = _b[_a];
                product.solutions[solution.id] = solution;
            }
            //
            //Use the product id to index the solution indexed product
            _this.set(uproduct.id, product);
        }
        return _this;
    }
    // 
    //Retrieve more products from the users database to create a more expanded
    //collection of all the products that are available for a particular 
    //application.
    products.prototype.expand = function () {
        return __awaiter(this, void 0, void 0, function () {
            var new_products;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, server.exec("app", [app.current.id], "get_products", [])];
                    case 1:
                        new_products = _a.sent();
                        // 
                        //Add the retrived products to this class object
                        new_products.forEach(function (Iproduct) {
                            _this.add_product(Iproduct);
                        });
                        // 
                        //Update these products with the customization information.
                        this.update();
                        return [2 /*return*/];
                }
            });
        });
    };
    // 
    //Compiles a product from an iproduct and add it into this collection
    products.prototype.add_product = function (Iproduct) {
        // 
        //The structure of the iproduct
        //{id,title,cost,solution_id,solution_title,listener}
        //
        //Create an outlook solution of structure 
        //{id, title, listener}
        var sol;
        //
        //To create a dbase solution we need a title and listener
        var title = Iproduct.solution_title;
        // 
        //Get the string function declaration.
        var listener = ["string", Iproduct.listener];
        //
        //Formulate the solution
        //{id, title,listener}
        sol = { id: Iproduct.solution_id, title: title, listener: listener };
        // 
        //Get the product where to append this solution. 
        var Product;
        //
        //Get the product from the existing products
        if (this.has(Iproduct.id)) {
            Product = this.get(Iproduct.id);
        }
        // 
        //Product does not exist Create a product with empty solutions 
        else {
            Product = {
                title: Iproduct.title,
                id: Iproduct.id,
                solutions: {},
                is_global: Iproduct.is_global
            };
            // 
            //Add this product to the collection
            this.set(Iproduct.id, Product);
        }
        // 
        //Add the cost of this product 
        Product.cost = Iproduct.cost === null ? null : parseInt(String(Iproduct.cost));
        // 
        //Add the solution
        Product.solutions[Iproduct.solution_id] = sol;
    };
    // 
    //Hides all the products that are not customised for the given user
    products.prototype.filter = function (user) {
        // 
        //Get all the global products_id
        var prod_ids = new Set();
        this.forEach(function (Product) {
            var _a;
            if (Product.customed === undefined
                || Product.customed === null
                || ((_a = Product.customed) === null || _a === void 0 ? void 0 : _a.size) === 0)
                prod_ids.add(Product.id);
        });
        // 
        //Add to the product id the products customed for this roles
        this.forEach(function (Product) {
            var _a;
            if (Product.customed !== undefined) {
                // 
                //Test if any of this user's roles exist in the customed array
                (_a = user.role_ids) === null || _a === void 0 ? void 0 : _a.forEach(function (role_id) {
                    var _a;
                    if ((_a = Product.customed) === null || _a === void 0 ? void 0 : _a.has(role_id))
                        prod_ids.add(Product.id);
                });
            }
        });
        // 
        //Hide all the products whose ids are neither customed to this roles
        //nor free
        this.forEach(function (Product) {
            if (!prod_ids.has(Product.id)) {
                //
                //Get the product's field set
                var fs = app.current.get_element(Product.id);
                // 
                //Hide this product
                fs.hidden = true;
            }
        });
    };
    // 
    //Update these products with the customised roles
    products.prototype.update = function () {
        return __awaiter(this, void 0, void 0, function () {
            var updates;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, server.exec("app", [app.current.id], "customed_products", [])];
                    case 1:
                        updates = _a.sent();
                        // 
                        //Loop through the updates and update the affected
                        updates.forEach(function (update) {
                            if (_this.has(update.product_id)) {
                                var product = _this.get(update.product_id);
                                product.customed = new Set();
                                product.customed.add(update.role_id);
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    // 
    //Activate the product with the given id 
    products.prototype.activate = function (product_id) {
        // 
        //If no product exists with the given in id throw an error 
        if (!(this.has(product_id))) {
            throw new Error("The product with id ".concat(product_id, " was not found"));
        }
        // 
        //Get the product to be activated 
        var product = this.get(product_id);
        //
        //Get the product's field set
        var fs = app.current.get_element(product_id);
        // 
        //Get the solution to update
        Object.keys(product.solutions).forEach(function (id) {
            // 
            //Get the solution to activate 
            var sol = product === null || product === void 0 ? void 0 : product.solutions[id];
            //
            //Get the solution element.
            var solution_element = fs.querySelector(".".concat(id));
            // 
            //Set the listener based on the type which the first parameter of the listener
            switch (sol.listener[0]) {
                // 
                //The post defined element have their events as strings
                case "string":
                    solution_element.setAttribute("onclick", "".concat(sol.listener[1]));
                    break;
                // 
                //Crud listener calls the crud method
                case "crud":
                    //
                    //Get the solution's listener
                    var _a = sol.listener, cat = _a[0], ename = _a[1], verbs_1 = _a[2], xor = _a[3], dbname = _a[4];
                    // 
                    //Compile the subject of the crud table
                    var subject_1 = [ename, dbname === undefined ? app.current.dbname : dbname];
                    //
                    //
                    //convert the implied into explicit verbs 
                    // 
                    var Xverbs_1;
                    //
                    //Returns true if a verb1 is included in the list of availble
                    //verbs
                    var found_1 = function (verb1) {
                        return verbs_1.some(function (verb2) { return verb1 === verb2; });
                    };
                    //
                    //Get the explicit verbs. Its either the current selected (+) verbs 
                    //or the list of all verbs excluding(-) the selected ones
                    Xverbs_1 = xor === '+' ? verbs_1 : outlook.assets.all_verbs.filter(function (verb) { return !found_1(verb); });
                    //
                    //Set the listener on the solution element   
                    solution_element.onclick = function () { return app.current.crud(subject_1, Xverbs_1); };
                    break;
                //
                //The predefined listeners are set directly
                case "event":
                    solution_element.onclick = function () { return sol.listener[1](); };
                    break;
                // 
                default: throw new Error("Listener of type ".concat(sol.listener[0], " is not known"));
            }
            //
            //Mark it as active
            solution_element.classList.add('a');
        });
    };
    return products;
}(Map));
exports.products = products;
