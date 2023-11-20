//
import * as library from "../../../library/v/code/library.js";
//
//Resolve the schema classes, viz.:database, columns, mutall e.t.c. 
import * as schema from "../../../library/v/code/schema.js";
import outlook_config from "./config.js";
//
//These are the components of the subject.

//The ename and dbname are defined in the library.d.ts,
//so we dont need to re-define them here.
export type subject=[library.ename, library.dbname];

//This is what the users will see generally. It is the root of 
//all  outlook pages. Application is a view. A page, which extends 
//a view is used for data collection. A view is not. A view may
//be carnibalised to feed another view; such view are called templates
export class view {
    // 
    //The popoup window size and location specification.
    public specs: string | null = null;
    // 
    //This is used for indexing a view object to support implementation of the 
    //static current property whis isset when this view is pushed to the window state.
    public key: number;
    // 
    //Lookup storage for all views created by this application.
    static lookup: Map<number, view> = new Map()
    // 
    //The window active view where the events are wired.????????????
    static current: view;
    //
    //A view has a window that is (often) set when the url of a window 
    //is opened. 
    protected win__: Window|null=null;
    // 
    //These are getter and setter to access the protected win variable  
    get win() { return <Window>this.win__!; }
    set win(win: Window) { this.win__ = win;}
    //
    //The document of a view is that of its the window
    get document() {
        return this.win!.document;
    }
    //A view has named panels that the user must ensue that they 
    //are set before a show.
    public panels :Map<string, panel>;
    //
    //For debugging
    public id='view';
    //
    //The children nodes of the root document element of this view
    //o support restoring of this page in response to the on pop state event.
    public child_nodes:Array<ChildNode>=[]; 
    //
    constructor(
        // 
        //The local configuration settings for this view
        public config:outlook_config,
        //
        //The address  of the page. Some popup pages don`t have 
        //a url that`s why it`s optional.
        public url?: string
    ) {
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
    
    //Restore the children nodes of this view.  
    public restore_view(key: number): void{
        //
        //For debugging purposes....
        console.log(`restore, ${this.id}, ${this.key}`);
        //
        //Get the view of the given key
        const View = view.lookup.get(key);
        //
        //It's an error if the view has not been cached
        if (View===undefined) throw new schema.mutall_error(`This key ${key}
             has no matching view`);
        //
        //Get the root document element. 
        const root = View.document.documentElement;
        //
        //Clean the root before restoring it -- just in case the view
        //is attached to an old window;
        Array.from(root.childNodes).forEach(node => root.removeChild(node));
        //
        //Attach every child node of this view to the root document
        this.child_nodes.forEach(node => root.appendChild(node));
        // 
        //Restore the current view, so that click listeners of this view
        //that rely that static property can work. In general this does noting;
        //in particular this sets property crud.page.current to this view
        this.restore_current();
    }

    //
    //Clean this value by removing all characters that can 
    //cause json parsing to fail, e.g., new lineshite spaces and line 
    //breaks
    static clean(text:string):string{
        return text
            .replace(/\\n/g, "\\n")
            .replace(/\\'/g, "\\'")
            .replace(/\\"/g, '\\"')
            .replace(/\\&/g, "\\&")
            .replace(/\\r/g, "\\r")
            .replace(/\\t/g, "\\t")
            .replace(/\\b/g, "\\b");
    }
    //
    // 
    //Restore the current view, so that click listeners of this view
    //that rely that statuic variable can work. In general this does noting;
    //in particular this sets property c.page.current to this view
    restore_current(){}
    //
    //Save the children of th rot document element of this view to the local
    //propety using the 'how' method
    public save_view(how:"pushState"|"replaceState"):void{
        //
        //Get the root document element
        const root = this.document.documentElement;
        //
        //Save the child nodes
        this.child_nodes = Array.from(root.childNodes);
        // 
        //Set the onpop state listener to support the push or replace
        //state action that follows. Note that this handler is et just before 
        //the the action that it is designed to serve
        this.win.onpopstate = (evt)=>this.onpopstate(evt);
        //
        //Push or replace the state
        this.win.history[how](
            this.key,
            "",
            //
            //Show the view's id, identification key and current history 
            //lenghth (for debugging purposes)
            `?id=${this.id}&key=${this.key}&len=${this.win.history.length}`
        );
    }
    //
    //Returns the values of the currently selected inputs 
    //from a list of named ones 
    public get_choices(name:string):Array<string>{
        //
        //Collect the named radio/checked inputs
        const radios = Array.from(this.document.querySelectorAll(`[name="${name}"]`));
        //
        //Filter the checked inputs and return their values buttons 
        return radios.filter(r => (<HTMLInputElement> r).checked)
              .map(r =>(<HTMLInputElement> r).value);
    }

    
    //Update the the window's title, so that the correct key can show in 
    //the browser (for onpopstate bebugging purpos)
    protected set_title(){
        //
        //Get the (old) title element; the page must have one
        const title = this.document.querySelector('title');
        if (title == null) 
           throw new schema.mutall_error(`No title found for page ${this.url}`);
        //
        //Add the key component
        title.textContent = `${this.id}/${this.key}`;       
     }    
    //
    //Return the identified element 
    get_element(id: string): HTMLElement {
        //
        //Get the identified element from the current browser context.
        const element: HTMLElement | null =
            this.document!.querySelector(`#${id}`);
        //
        //Check the element for a null value
        if (element === null) {
            const msg = `The element identified by #${id} not found`;
            alert(msg);
            throw new Error(msg);
        }
        return element;
    }
    
    //Open a window, by default, reurns the current window and sets the
    //title
    public async open():Promise<Window> {
        //
        this.win = <Window>window;
        //
        //Set the accurate application title
        this.set_title();
        //
        return this.win;
    }
    
    //
    //Handle the on pop state listener by saving the current state and 
    //restoring the view matching the event's history state
    public onpopstate(evt:PopStateEvent){
        // 
        //Ignore all state that has no components to restore. Typically
        //this is the initial statae placed automatically on the history 
        //stack when this application loaded initially. NB:We have made provisions
        //that the initial state will be replaced with the that of the 
        //applicaton, so, it's an error to get the null state
        if (evt.state === null) throw new schema.mutall_error('Null state is not expected');
        // 
        //Get the saved view's key
        const key = <number>evt.state;
        // 
        //Use the key to get the view being restored. 
        const new_view = view.lookup.get(key);
        //
        //It is an error if the key has no matching view.
        if (new_view === undefined) throw new schema.mutall_error(`This key 
            ${key} has no view`);        
        // 
        //Restore the components of the new view
        new_view.restore_view(key);
    }
    // 
    //The default way a quize shows its content is 
    //by looping through allm its panels and painting 
    //them. pages without panels can override this method 
    //to paint their content.
    public async show_panels(): Promise<void>{
        //
        //Paint the panels on top of the template, if they are  set
         if (this.panels!==undefined)
         //
         //The for loop is used so that the panels can throw 
         //exception and stop when this happens  
            for (const panel of this.panels.values()){
                await panel.paint();
            }       
    }
}
//
//A panel is a targeted setction of a view. It can be painted 
//independently
export abstract class panel extends view{
    //
    //The panels target element is set when the panel is painteg
    public target?:HTMLElement;
    //
    constructor(
        //
        //The CSS to describe the targeted element on the base page
        public css:string,
        //
        //The base view on that is the home of the panel
        public base:view  
    ){
        //The ur is that of the base
        super(base.config,base.url);
    }
    //
    //Start painting the panel
    async paint():Promise<void>{
        //
        //Get the targeted element. It must be only one
        const targets = Array.from(
            this.document.querySelectorAll(this.css));
        //
        //There must be a target    
        if (targets.length==0) throw new schema.mutall_error(
            `No target found with CSS ${this.css}`);
        //
        //Multiple targets is a sign of sn error
        if (targets.length>1) throw new schema.mutall_error(
            `Multiple targets found with CSS ${this.css}`);
        //
        //The target must be a html element
        if (!(targets[0] instanceof HTMLElement)) throw new schema.mutall_error(`
        The element targeted by CSS ${this.css} must be an html element`)        
        //
        //Set teh html element and continue painting the panel
        this.target = targets[0];        
        //
        //Continue to pain the tger    
        await this.continue_paint();        
    }
    //
    //Continue paining the target -- depending on its nature. 
    //This method cannot be called directly, Hence the privacy
    public abstract continue_paint():Promise<void>;
    //
    //The window of a panel is the same as that of its base view, 
    //so a panel does not need to be opened
    get win(){
        return this.base.win;
    }
}
//
//A page extends a view in that it is used for obtaining 
//data from a user. Baby and popup pages are extendsions of a view
export abstract class quiz<o> extends view {
    // 
    //These are the results collected by this quiz. 
    public result:o|undefined
    //
    //Get the document of this window using a getter
    get document() {
        return this.win!.document;
    }
    //
    constructor(config:outlook_config, url?: string) {super(config, url);}

    //To administer a page is to  managing all the operations from 
    //the  moment a page gets visisble to when a result is closed
    //If the process waits for the user to respond. If successful
    //a response is returned, otherwise it is undefined. Baby and
    //popup pages implement thos methods differently.
    abstract administer():Promise<response|undefined>;
    //
    //This is the process which makes the page visible waits for 
    //user to respond and returns the expected response, if not aborted. 
    public async show(): Promise<o | undefined> {
        // 
        //Initialize the win property by opening a window 
        this.win = await this.open();
        // 
        //Paint the various panels of this page.In the default 
        //way of looping over the panels of this page. A page 
        //without the panels can overide this method with 
        //its own.
        await this.show_panels();
        //
        //Wait for the user to ok or cacel this quiz
        let result = await new Promise<o | undefined>(resolve => {
            //
            //Collect the result on clicking the Ok/go button.
            const okay = <HTMLButtonElement>this.get_element("go");
            okay.onclick = async () => {
                //
                //Check the user unputs for error. If there
                //any, do not continue the process
                if (!this.check()) return;
                //
                //Grt the primary key and its  friendly name 
                resolve(await this.get_result());
            };
            // 
            //Discard the result on Cancel.
            const cancel = <HTMLButtonElement>this.get_element("cancel");
            cancel.onclick =  async () => {
                let r: o | undefined;
                resolve(r);
            };
        });
        //
        //Wait for the user to inintiate the flow back to the base page
        await this.close_quiz();
        //
        //Return the promised result.
        return result;
    }
    
    //The following abstract methods support the show process
    //
    //Check that the inputs are valid
    abstract check():boolean;
    //
    //Collect the response associated with this page
    abstract get_result():Promise<o>;
    //
    //Wait for the user to close the quiz page. Close is such a common
    //verb that it is very dificult to find by searching; hence  close_quiz
    abstract close_quiz():Promise<void>;  
}

//The baby clas models pages that share the same windo as their mother.
//In contrast a popup does not
export abstract class baby<o> extends quiz<o>{
    //
    constructor(public mother:view, url?:url){
        super(mother.config,url);
    }

    //The window of the mother is that same as that of the bay
    get win(){
        return this.mother.win;
    }
    //
    //
    set win(w: Window) {this.mother.win= w;}

    //
    //Administering a crud page is managing all the operations from 
    //the  moment a page gets vsisble to when a result is retrned
    async administer():Promise<o|undefined>{
        //
        //Get the baby template
        const Template = new template(this.config,this.url!);
        //
        //On the template
        const win = await Template.open();
        //
        //Replace the entire current documet with that of the template
        this.document.documentElement.innerHTML = win.document.documentElement.innerHTML; 
        //
        //Close the baby template
        win.close();
        //
        //Ensure the pag'e title is set correctly
        this.set_title();
        //
        //Save this initial version of this baby view
        this.save_view("pushState");
        //
        //Make the logical page visible.
        const result:o|undefined = await this.show();        
        // 
        return result;
    }
    //
    //The opening of a baby returns the same window as that of the mother
    public async open():Promise<Window>  {
        //
        //Return the window of the mother (not the temporary one)
        this.win = this.mother.win!;
        //
        //Update the the window's title, so that the correct key can show in 
        //the browser (for onpopstate debugging purpos)
        this.set_title();
        //
        return this.win;
    }
    
    //Close a baby page by invoking the back button; in contrast a popup does 
    //it by executing the window close method.
    async close_quiz():Promise<void>{
        // 
        //Wait for the mother window to be restored.
        return await new Promise(resolve => {
            // 
            //Wire the event listener before evoking the on pop state usng
            //the history back button.
            this.win!.onpopstate = (evt) => {
                //
                //Restore the on pop state event
                this.onpopstate(evt);
                //
                //Stop the waiting
                resolve();
            };
            //
            //Use the back button to evoke the on pop state
            this.win!.history.back();
        });
    }
 
}

//A template is a popup window used for canibalising to feed another window.
//The way you open it is smilar to  popup. Its flagship method is the copy
export class template extends view{
    
    constructor(config:outlook_config,url:string){
        super(config,url)
    }
    
    //Open a window, by default, reurns the current window and sets the
    //title
    public async open():Promise<Window> {
        //
        //Open the page to let the server interprete the html 
        //page for us. The window is temporary 
        const win = window.open(this.url)!;
        //
        //Wait for the page to load 
        await new Promise(resolve => win.onload = resolve);
        //
        //Retrieve the root html of the new documet
        this.win = win;
        //
        return this.win;
    }
    //
    //Transfer the html content from this view to the specified
    //destination and return a html element from the destination view. 
    copy(src: string, dest: [view, string]): HTMLElement {
        //
        //Destructure the destination specification
        const [Page, dest_id] = dest;
        //
        //1 Get the destination element.
        const dest_element: HTMLElement = Page.get_element(dest_id);
        //
        //2 Get the source element.
        const src_element: HTMLElement = this.get_element(src);
        //
        //3. Transfer the html from the source to the destination. 
        dest_element.innerHTML = src_element.innerHTML;
        //
        //Return the destination painter for chaining
        return dest_element;
    }
    
}

//This class represents the view|popu page that the user sees
export abstract class popup<o> extends quiz<o>{
    //
    constructor(
        config:outlook_config,
        url: string,
        // 
        //The popoup window size and location specification.
        public specs: string|null = null
    ) { super(config,url); }
    
    //
    //Open a pop window returns a brand new window with specified dimensions.
    public async open():Promise<Window> {
        //
        //Use the window size and location specification if available.
        const specs = this.specs === null ? this.get_specs() : this.specs;
        //
        //Open the page to let the server interprete the html 
        //page for us.  
        const win = window.open(this.url,"", specs)!;
        //
        //A window becomes forms complete when you wait for it to
        //load
        const complete_win = await new Promise<Window>(
            resolve=>win.onload = ()=>resolve(win)
        );        
        //
        this.win = complete_win;
        //
        //Update the the window's title, so that the correct key can show in 
        //the browser (for onpopstate bebugging purpos)
        this.set_title();
        //
        //Return the complete window
        return complete_win;
    }
    
    //
    //Get the specifications that can center the page as a modal popup
    //Overide this method if you want different layout
    public get_specs():string{
        //
        //Specify the pop up window dimensions.
        //width
        const w = 500;
        //height
        const h = 500;
        //
        //Specify the pop up window position
        const left = screen.width / 2 - w / 2;
        const top = screen.height / 2 - h / 2;
        //
        //Compile the window specifictaions
        return  `width=${w}, height=${h}, top=${top}, left=${left}`; 
    }
      
    //
    //Displays the page waits for the user to interact with it 
    //and return a response. Note that this process does not 
    //make eny referemces to a mother because it has none
    async administer():Promise<o|undefined>{
        //
        //Make the logical page visible and wait for the user to
        //succesfully capture some data or abort the process.
        //If aborted the result is undefined.
        const result:o|undefined = await this.show();        
        // 
        return result;
    }
    //
    //Close this popup window 
    async close_quiz(): Promise<void> {
        // 
        //Wait for the window to unload
        return await new Promise(resolve => {
            // 
            //Add the event listener BEFORE CLOSING THIS WINDOW
            this.win!.onbeforeunload = () => resolve();
            // 
            //Close the  popup window.
            this.win!.close();
        });
    }
}
//)
// A string that represents urls for retrieving html files and templates.
export type url = string;
//
//Text that can be painted in on a page
export type html = string;
// 
//The response you get using aa popup or an ordinary page 
export interface response { }
//
//
//Namespace for handling the roles a user plays in an application
export namespace assets {
    //
    //Title is a descriptive piece of text
    type title = string;
    //
    //Role id and entity ames at the application level are simply strings
    export type role_id = string;
    export type ename = string;
    
    //Verbs for crud operations
    export const all_verbs = ['create', 'review', 'update', 'delete'] as const;
    //
    //All possible operations that a user can to to an entity 
    //type verb = 'create'|'review'|'update'|'delete';
    export type verb = typeof all_verbs[number];
    //
    //
    type xor = "-" | "+";
    // 
    //A listener is either a...
    export type listener =
        // 
        //...call to the inbuilt crud function...
        ["crud", ename, Array<verb>, xor, library.dbname?]
        // 
        //...or a user defined function implemented directly in this code...
        | ["pre_defined", (...n: any) => void]
        // 
        //...or a user defined function specified as a string to be attached
        //to an element using the set attribute
        | [ "post_defined", string];
    // 
    //A solution is a listener to some executable code. 
    export interface solution {
        id: string,
        title: string,
        listener:listener
    }
    // 
    //This is a collection of solutions indexed by an id. 
    export type solutions = {[solution_id:string]:solution}
    // 
    //A product is a set of named solutions
    export interface product{
        id: string,
        title:title,
        solutions: solutions,
        is_subscribed ?:boolean,
        customed ?:Set<string>|null,
        cost ?:number|null
    }
    
    //
    //The products are indexed by a product id of type string
    export type products = { [product_id:string]: product};
}
//
//This is a general structure for handling  key value pair situations. 
export type key_value<i>= {key:i, value:string}
//
//This is a generalised popup for making selections from multiple choices  
//The choices are provided as a list of key/value pairs and the output is 
//a list keys.  
export class choices<i> extends popup<Array<i>>  {
    //
    //These are the selected choices they are set during the check method 
    //and returned at the get result. This property is private since its 
    //value is only supposed to be retrieved using the get result method.
    private output?:Array<i>;
    //
    constructor(
        config:outlook_config,
        // 
        //The key value pairs that are to be painted as checkboxes
        //when we show the panels. 
        public inputs: Array<key_value<i>>,
        // 
        //This is a short code that is used
        //as an identifier for this general popuo
        public id: string, 
        // 
        //The popoup window size and location specification.
        public specs: string|null=null,
        // 
        //The css that retrieves the element on this page where 
        //the content of this page is to be painted. If this css 
        //is not set the content will be painted at the body by default 
        public css?: string|null        
    ) {
        super(config, config.general, specs);
    }
    //
    //Check that the user has selected  at least one of the choices
    check(): boolean {
         //
        //Extract the marked/checked choices from the input checkboxes
        const result = <unknown> this.get_choices(this.id);
        //
        //Cast this result into the desired output
        this.output = <Array<i>>result;
        //
        //The ouput is ok if the choices are not empty.
        const ok = this.output.length > 0;
        if (!ok) {
            alert(`Please select at least one ${this.id}`);
            return false
        }
        //
        return true;
    }
    //
    //Retrive the choices that the user has filled from the form
    async get_result(): Promise<Array<i>>{ 
        return this.output!;
    }
    //
    //Overide the show panels method by painting the css referenced element or 
    //body of this window with the inputs that were used to create this page 
    async show_panels(){
        //
        //Get the element where this page should paint its content, 
        //this is at the css referenced element if given or the body.
        const panel = this.css !== undefined
            ? this.document.querySelector(this.css!)
            : this.document.querySelector("#content")!;
        //
        //Attach the choices as the children of the panel
        this.inputs.forEach(option => {
            //
            //Destructure the choice item 
            const { key, value} = option;
            //
            const html = `
                <label>
                 <input type= "checkbox" value= '${key}' name="${this.id}" >: 
                 ${value}
                </label>`;
            //
            //Attach the label to the pannel 
            const label = this.document.createElement("temp");
            (<HTMLElement>panel).appendChild(label);
            label.outerHTML = html;
        });
    }
}

// 
//This is a view displayed as a baby but not used for collecting data 
//It is used in the same way that we use an alert and utilises the general
//html.
export class report extends baby<void>{
    // 
    //
    constructor(
        // 
        //This popup parent page.
        mother: view,
        // 
        //The html to report.
        public html: string
    ) {
        // 
        //The general html is a simple page designed to support advertising as 
        //the user interacts with this application.
        super(mother, mother.config.general);
    } 
    // 
    //Reporting does not require checks and has no results to return because 
    // it is not used for data entry.
    check(): boolean { return true; }
    async get_result(): Promise<void>{ } 
    // 
    //Display the report 
   async show_panels(){
        // 
        //Get the access to the content panel and attach the html
        const content = this.get_element('content');
        // 
        //Show the html in the content panel. 
       content.innerHTML = this.html;
       //
       //Hide the go button from the general html since it is not useful in the 
       //the reporting
       this.get_element("go").hidden=true;
    }
}

export class content extends panel{
    constructor(public html:string, base:view) {
        super("body", base)
    }
    async continue_paint(): Promise<void>{
        // 
        //Get the target element 
        this.target!.innerHTML = this.html;
    }
}

//Represents a person/individual that is providing
//or consuming a services we are developing. 
export class user {
    // 
    //The provider supplied data 
    public email: string|null;
    // 
    //The type of this user.
    //A user is a visitor if he has never been registered before
    //otherwise regular. This property is set on app.login
    public type?: "regular" | "visitor";
    //
    //Optional provider supplied data
    public first_name?:string|null;
    public full_name?:string|null;
    public picture?:string|null;
    //
    //These are the roles that this user plays in the application that he`s
    //logged in.
    public role_ids?: Array<string>;
    // 
    //The products that this user is assigned to.
    public products?:assets.products
    //
    //The minimum requirement for authentication is a username and 
    //password
    constructor(email:string|null=null) {
        //
        this.email=email;
    }
    
    //A user is a visitor if the email is not defined
    //otherwise his a regular user.
    is_visitor(): boolean {
        if (this.email === undefined) return true;
        else return false;
    }

}
