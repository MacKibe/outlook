import * as outlook from "./outlook.js";
//
//Allows methods on this page to talk to the server
import * as server from "../../../library/v/code/server.js";
// 
//This is the problem we have of solving that.
import * as library from "../../../library/v/code/library.js";
//
//Resolve the schema classes, viz.:database, columns, mutall e.t.c. 
import * as schema from "../../../library/v/code/schema.js";
//
import * as io from "./io.js";
// 
//
import {app} from './app.js';

//
//This interface helps us to control the data we retrieve from the server
//to support scrolling
interface outcome {
    type: "nothing" | "adjust" | "fresh" | "out_of_range";
}
//
//We don`t need to retrieve new records from the server since the request
//can be met with the available data...ie.,desired offset is 
//within view boundaries
interface nothing extends outcome {}
//
//We require to adjust the top/bottom view boundaries to accomodate 
//the scroll request
interface adjust extends outcome {
    //
    //Indicator of which boundary we are adjusting i.e.,top/bottom
    dir: direction,
    //
    //This is the offset from where to retrieve the data
    start_from: offset,
    //
    //The amount by which to adjust the top/bottom boundaries
    adjusted_view: number
}
//
//This ouitcome arises when the request is:-
//- within extremes, 
//- and outside the joint boundaries
//In that case, we need to load a fresh set of table rows i.e., 
// -clear current tbody, 
// -load new rows 
// -and adjust the views.
interface fresh extends outcome {
    //
    //This value constrains the top boundary of the fresh view.
    view_top: offset,
    //
    //This value constrains the bottom boundary of the same view.
    view_bottom: number
}
//
//This outcome arises from a request that is outside/beyond  the 
//extreme boundaries
interface out_of_range extends outcome {
    //
    //Illegal request.(Used in formulating the error message)
    request: offset
}
//
//This a positive number i.e., above 0 that is less than 
//the maximum number of records in the subject. It is important for 
//paginating crud.
type offset = number;
//
//This represents the td from which we initiated the administration.
//It is also used for passing back edited td
export type crud_selection = {
    //
    //The td position where the original primary key came from 
    position: library.position,
    //
    //The primary key auto number represented as a string
    //because we are mostly using it as such  
    pk? : library.pk,
    //
    //The long friendly name associated with a primary key and used 
    //for labelling fk edit buttons    
    friendly? : string
}
// 
//A theme view boundary has two extremes, the top and the bottom 
export interface boundary{
    // 
    //The top extreme is an offset number that represents the upper limit 
    //of this boundery.
    top: number,
    // 
    //The bottom extreme is an offset that represents lower limit 
    //of this boundery
    bottom:number
}
// 
//Boundary markers    
export type direction = "top" | "bottom";

//
//These are pages based on a particular subject as its theme 
export class theme extends outlook.panel {
    /** 
     * THE SQL (view in our class schema class model) METADATA 
     * OF THE QUERY USED TO RETRIEVE DATA PAINTED IN THE CONTENT 
     * PANEL INCLUDE....
     */
    // 
    //1...The sql used to extract information painted in this 
    //in the content section of this theme
    sql?: string
    // 
    //2...The column names involved in the above named sql
    col_names?: Array<library.cname>;
    // 
    //3...The maximum possible records that are available to paint
    //the content pannel. they are required in adjusting the boundaries
    max_records?: number;
    // 
    //Saves io instances that created this theme table saved as a map 
    //indexed by their position in a thematic oanel
    static ios: Map<string, io.io> = new Map();
    //
    //4....The database where this subject entity is housed 
    dbase?: schema.database;
    /** 
     * The scrolling variables
     */
    //
    //The offset of the records that are visible in the page 
    //both top and bottom i.e within scrolling without loading 
    //more data in the purple part of our boundary diagram
    view: boundary={top:0, bottom:0};
    // 
    //This is the limit number of records that can be retrieved and 
    //constrained by the extreme boundery the blue part of the 
    //blue region of our map
    joint:boundary={top:0, bottom:0};
    //
    //This is the offset that indicates the last retrievable record 
    //i.e., the green part of our scroll diagram.
    get extreme():boundary{
        return {top: 0, bottom: this.max_records!};
    }
    //
    //
    //The database and entity name that is displayed in this 
    //theme panel.
    public subject: outlook.subject;
    //
    constructor(
        //
        //The database and entity name that is displayed in this 
        //theme panel.
        subject: outlook.subject|null,
        // 
        //The css for retrieving the html element where to display 
        //the theme's subject record.
        public css: string,
        // 
        //The view page that is the home of this panel 
        public base: outlook.view,
        // 
        //An optional selection of the first record 
        public selection?: crud_selection
        
    ) {
        super(css, base);
        this.subject = subject === null ? app.current.subject:subject;
    }
     
    //Paint the content panel with editable records of the subject
    public async continue_paint() {
        //
        //Get the editor description.
        const metadata = await server.exec(
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
            []
        );
        //
        //Destructure the metadata
        const [idbase, col_names, sql, max_record] = metadata;
        //
        //Set the metadata properties
        this.sql = sql; this.col_names = col_names; 
        this.max_records = parseInt(max_record);
        //
        //Activate the static php database.
        this.dbase = new schema.database(idbase);
        //
        //Initialize the crud style for managing the hide/show feature 
        //of columns
        this.initialize_styles(col_names);
        //
        //Assuming that we are in a document where the table header 
        //is already available...
        const thead = this.document.querySelector("thead")!;
        //
        //Show the header
        this.show_header(thead);
        //
        //Retrieve and display $limit number of rows of data starting from the 
        //given offset/request.
        let pk: library.pk | undefined;
        if (this.selection !== undefined) pk = this.selection.pk;
        await this.goto(pk);
        //
        //Select the matching row and scroll it into view.
        this.select_nth_row(pk);

    }
    //
    //Initialize the crud style for managing the hide/show feature 
    //of columns
    protected initialize_styles(col_names: Array<string>) {
        //
        //Get the columns style sheet
        const sheet: CSSStyleSheet = (<HTMLStyleElement>this.get_element("columns")).sheet!;
        //
        //loop through all the columns and set the styling for each column
        col_names.forEach((_col, index) => {
            //
            //Change  the index to a 1-based
            const index1 = index + 1;
            //
            //Create the rule for supporting styling of a header and its matching
            //fields the same way.
            //e.g When hiding th:nth-child(2), td:nth-child(2){ display:none}
            const rule = `th:nth-child(${index1}), td:nth-child(${index1}){}`;
            //
            //Insert the rule to the style sheet.
            sheet.insertRule(rule);
        });

    }
    //
    //Construct the header row and append it to the thead.
    protected show_header(thead: HTMLElement) {
        //
        //Header should look like this
        //The primary key column will also serve as the multi line selector
        //<tr>
        //  <th id="todo" onclick="select_column(this)">Todo</th>
        //        ...
        //</tr>
        //Construct the th and attach it to the thead.
        const tr = document.createElement("tr");
        thead.appendChild(tr);
        //
        //2. Loop through each to create the header columns matching the example
        this.col_names!.forEach(col_name => {
            //
            //Create a dummy th
            const th = document.createElement("th");
            //
            //Create text for the th
            const text =
                `<th 
                    id="${col_name}" 
                    onclick="select_column(this)"
                >${col_name}</th>`;
            //
            //Add the header columns to thead row.
            tr.appendChild(th);
            //
            th.outerHTML = text;
        });

    }
    //
    //Load the table rows and adjust the  boundaries depending
    //on the outcome type.
    private async execute_outcome(outcome: outcome, request: offset) {
        //
        switch (outcome.type) {
            //
            //The request is within view so no loading
            //and no view boundary adjustment.
            case "nothing":
                //this.scroll_into_view(request,"center")
                break;
            //
            //We need to adjust the relevant view 
            //boundary to the given value          
            case "adjust":
                //
                //This must be an 
                const adjust = <adjust>outcome;
                //
                //Load the body from the offset and in the outcome direction.
                await this.load_body(adjust.start_from, adjust.dir);
                //
                //Now adjust the view direction to the outcome value.
                this.view[adjust.dir] = adjust.adjusted_view;
                //this.scroll_into_view(request,"start")
                break;
            case "fresh":
                //
                //Cast the outcome to a fresh view
                const fresh = <fresh>outcome;
                //
                //Clear the table body and reset the view 
                //boundaries
                // 
                //Get the table body.
                const tbody =this.document.querySelector("tbody");
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
                this.view={top:0,bottom:0};
                //
                //Load the new page starting from the view top, 
                //in the forward direction.
                await this.load_body(fresh.view_top, "bottom");
                //
                //Reset the boundaries after loading a fresh 
                //page.
                this.view.top = fresh.view_top;
                this.view.bottom = fresh.view_bottom;
                break;
            case "out_of_range":
                alert(
                    `Request is out of range bacause it fails this test 
                    ${this.extreme.top} <=${request} < ${this.extreme.bottom}`
                );
                break;

            default:
                throw new schema.mutall_error(`The outcome of type 
                       ${outcome.type} is not known`);
        }
    }
    //
    //Populate our table body with new rows 
    //starting from the given offset and direction.
    protected async load_body(offset: offset/*:int*/, dir: direction/*:mytop | bottom*/) {
        //
        //Range-GUARD:Ensure that offset is outside of the view for loading to be valid.
        if (this.within_view(offset))
            throw new schema.mutall_error(
                `The requested offset ${offset} 
                is already in view 
                ${this.view.top} -- ${this.view.bottom}, 
                so a new load is not valid.`
            );
        //
        //Calculate a constrained limit to prevent negative offsets.
        //
        //Get the height from extreme[top] to view[top] boundaries.
        const h = Math.abs(this.view![dir] - this.extreme![dir]);
        //
        //Use h to constrain the limit
        const constrained_limit = h < this.config.limit ? h : this.config.limit;
        //
        //Query the database 
        const result: library.Ifuel = await this.query(offset, constrained_limit);
        //
        //   
        //Display the results on the table`s body.
        //
        //Get the tbody for appending records 
        const tbody = document.querySelector("tbody")!;
        //
        //Loop through the results loading each tr 
        //based on the dir
        result.forEach((fuel, i) => {
            //
            //The index where this tr should  be inserted 
            //into the tbody
            const index = dir ==="top"
                //
                //Counting from the top
                ? i
                //
                //Counting from the bottom
                : this.view.bottom - this.view.top+ i;
            //
            //Insert row.
            const tr = tbody.insertRow(index);
            // 
            //Use the fuel to populate the tr
            this.load_tr_element(tr,fuel);
        });
    }
    //
    //This is a scroll event listener to retrive the previous or next 
    //page of data depending in the position of the scroll button.
    public myscroll() {
        //
        //Let tbody be the scrollable element
        //const tbody = document.querySelector("tbody")!;
        // 
        //For now the scrollable element is the content 
        const tbody = this.get_element("content");
        //
        //Get the scroll top as a rounded integer (not truncated)
        //to ensure that the scroll height and the client height are 
        //always equal to or greater than the scroll height when we are at 
        //the bottom of the scroll. 
        const scrollTop = Math.round(tbody.scrollTop);
        //
        //Decide whether to retrieve new records or not
        if (scrollTop < 3) {
            //
            //Retrieve records that are above the top view boundary 
            //This is equivalent to clicking the previous button
            this.retrieve_records("top");
        }else if (scrollTop + tbody.clientHeight>= tbody.scrollHeight) {
            //
            //Retrieve records that are below the bottom view boundary
            //This is equivalent to clicking the next button 
            this.retrieve_records("bottom");
        }else{
            //
            //Ignore the scrolling
        }
    }
    //
    //This is an event listener that retrieves limit number of 
    //records from the server depending on the given direction.
    //The retrieved records are in the blue area of our scroll map.
    async retrieve_records(dir: direction) {
        //
        //Set the offset value depending on the direction of scrolling.
        let offset;
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
        await this.goto(offset);
    }
    //
    //Test if offset is within joint boundaries
    private within_joint(request: offset): boolean {
        //
        //We are within the joint boundaries if...
        const condition =
            //
            //.. offset is between the top and 
            //bottom joint boundaries.
            request >= this.get_joint("top")
            && request < this.get_joint("bottom");
        return condition;
    }
    // 
    //Test if offset is within extremes and return true otherwise false.
    private within_extreme(request: offset): boolean {
        //
        //extreme top condition should always 
        //be set otherwise you get a runtime error.
        //if extreme top is undefined throw an error.
        return request >= this.extreme.top
            && request < this.extreme.bottom;
    }
    //
    //Test if offset is within view boundaries
    private within_view(req: offset): boolean {
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
    }
    //
    //Return the joint boundary given the direction The top joint boundary
    // is a maximum of limit records from the top view boundary. The 
    // bottom joint boundary is a maiximum of limit records from the 
    // view[bottom]. see the scroll map 
    // http://206.189.207.206/pictures/outlook/scroll_2020_10_10.ppt
    private get_joint(dir: direction/*top|bottom*/): offset {
        //
        //
        let raw_boundary =
            //
            //The referenced view boundary
            this.view[dir]
            //
            //The maximum range
            + this.config.limit
            //
            //Accounts for the direction 
            * (dir === "top" ? -1 : +1);
        //
        //Return a constrained boundary
        return this.within_extreme(raw_boundary)
            ? raw_boundary : this.extreme[dir];
    }
    //
    //
    //Fetch the real data from the database as an array of table rows.
    private async query(offset: offset, limit: number): Promise<library.Ifuel>{
        // 
        //The entity name that drives this query comes from the subject of this 
        //application
        const ename = `\`${this.subject[0]}\``;
        //
        //Complete the sql using the offset and the limit.
        const complete_sql =
            //
            //Main sql
            this.sql
            //
            //Sort by ascending primary key 
            + ` ORDER BY  ${ename}.${ename}  Asc`
            //
            //Paginate results.
            + ` LIMIT ${limit} OFFSET ${offset}`;
        //
        //Use the sql to query the database and get results as array of row objects.
        return  await server.exec(
            "database",
            //
            //dbase class constructor arguments
            [this.subject[1]],
            //
            "get_sql_data",
            //
            //The sql stmt to run
            [complete_sql]
        );
        
    }
    //
    //Convert the row object obtained from the server to a tr element.
    public load_tr_element(
        //
        //THe table row to load data. 
        tr:HTMLTableRowElement,
        //
        //The row of data to load to the tr.
        row?: {[index:string]:library.basic_value}
    ):void {
        //
        //Convert the row object into key-value pairs where the
        //key is the column name. Take care of those cases where row 
        //is undefined, e.g., new rows.
        const pairs: Array<[string, library.basic_value]> = row === undefined
            ? this.col_names!.map(cname => [cname, null])
            : Object.entries(row);
        //
        //Enrich the tr with the id, pk and the friend attributes
        // 
        //The first of the input data is the primary key.
        const column = pairs[0];
        //
        //The primary key is a tupple of two values: the autonumber 
        //and the friendly components packed as a single string.
        //e.g., '[1, "kamau/developer"]'
        const value_str = column[1];
        // 
        //Prepare to collect the primary key and the friendly components
        //value
        let pk: string, friend: string;
        // 
        //Take care when the string value is null
        if (value_str !== null) {
            //
            //Prepare to convert the string value to an object
            //
            //Clean this value by removing all characters that can 
            //cause json parsing to fail, e.g., new lineshite spaces and line 
            //breaks
            let clean_value = outlook.view.clean(<string> value_str);
           //Destructure the string value and remove trailing or leading
            //whitespace.
            [pk, friend] = JSON.parse(clean_value);
            //
            //Make the pk a valid id by preffixing it with letter r
            tr.id = `r${pk}`;
        }
        // 
        //Use empty value strings for pk and friend when there is no value
        else { pk = ""; friend = ""; }
        //
        //Append the id and the primary key attributes to the tr
        tr.setAttribute("pk", pk);
        tr.setAttribute("friend", friend);
        tr.onclick = () => theme.select(tr);
        //
        //Loop through all the pairs outputting each one
        //of them as a td. 
        pairs.forEach(([key, value]) => {
            //
            //Create a td and append it to the row.
            const td = document.createElement("td");
            tr.appendChild(td);
            //
            //Set the click event listener of the td
            td.onclick =()=> theme.select(td);
            //
            //Set the column name to be associated with this td
            td.setAttribute('data-cname', key);
            //
            //Set the td's "value"
            //
            //Get the td's io
            const Io = this.get_io(td);
            //
            //Set the io's value
            Io.value = value;
        });
    }
    //
    //Return the io structure associated with the given td
    get_io(td: HTMLTableCellElement): io.io {
        // 
        //Get the position of this td 
        const rowIndex = (<HTMLTableRowElement>td.parentElement).rowIndex;
        const cellIndex = td.cellIndex;
        //
        //Destructure the subject to get the entity name; its the 
        //first component. 
        const[ename] = this.subject;
        // 
        //Get the column name that matches this td. 
        const col_name = this.col_names![cellIndex];
        //
        //Get the actual column from the underlying database.
        const col = this.dbase!.entities[ename].columns[col_name];
        //
        //Create and return the io for this column.
        const Io = io.create_io(td, col);
        // 
        //Save the io to aid in data retrieval.
        //NB: Remember to stringify the position
        theme.ios.set(String([this.key,rowIndex,cellIndex]), Io);
        // 
        return Io;
    }
    
    //
    //Select the row whose primary key is the given one.
    //and makes sure that it is in the view 
    protected select_nth_row(pk?: library.pk) {
        // 
        //Row selection is valid only when the pk is set
        if (pk === undefined) return;
        //
        //1. Get the row identified by the primary key. 
        const tr = <HTMLElement>document.querySelector(`#r${pk}`);
        //
        //Ensure that a row with this pk exists
        if (tr === null) {
            alert(`No tr found with row id ${pk}`);
            return;
        }
        //
        //2. Select the row.
        theme.select(tr);
        //
        //3.Bring the selected row to the center of the view.
        tr.scrollIntoView({ block: "center", inline: "center" });
    }
    //
    //
    private scroll_into_view(request:offset,position:"start"|"center"):void {
        // 
        //Get the row index 
        const rowIndex: offset = request - this.view.top;
        // 
        //Use the index to retrieve the row 
        const table =<HTMLTableElement> this.get_element("table_crud"); 
        const tr = table.rows[rowIndex];
        //
        //Ensure that a row with this pk exists
        if (tr === null) {
            alert(`No tr found with rowIndex ${rowIndex}`);
            return;
        }
        
        //
        //Bring the selected row to the top of the view.
        tr.scrollIntoView({ block: position, inline: "center" });
    }

    //
    //Ensure that the given tag is the only selected one 
    //of the same type
    static select(tag:HTMLElement):void {
        //
        //Get the tagname 
        const tagname = tag.tagName;
        //
        //1. Declassifying all the elements classified with 
        //this tagname.
        const all = document.querySelectorAll(`.${tagname}`);
        Array.from(all).forEach(element =>
            element.classList.remove(tagname)
        );
        //
        //3.Classify this element 
        tag.classList.add(tagname);
    }
    
       
    //
    //
    //Retrieve and display $limit rows of data starting from the 
    //given offset/request, subject to the available data.
    async goto(request?: offset) {
        //
        //Get the requested record offset if it is not specified
        let goto_element;
        if (request === undefined) {
            // 
            //Check whether a request is specified in the goto element 
            if((goto_element=document.querySelector('#goto'))!==null){
                //
               //
               //Get the offset from the user from the user
               //
               //Get the goto input element
               const value = (<HTMLInputElement> goto_element).value;
               //
               //Get the users request as an integer
               request = parseInt(value);   
            }
            else{
                //
                //Set it to 0
                request = 0;
            }            
        }
        //
        //It is an error if the request is above the top extreme boundary.
        if (request < this.extreme.top)
            throw new schema.mutall_error(`Goto: A request ${request}
             must be positive`);
        //
        //Determine what kind of scroll is required for the current situation. 
        const outcome /*:"nothing"|"adjust"|"fresh"*/ = this.get_outcome(request);
        //
        //Load the table rows and use the scrolling outcome to update the 
        //boundaries
        await this.execute_outcome(outcome, request);
    }
    
    //
    //Determine which scrolling outcome we need depending on the requested offset.
    private get_outcome(request: offset): outcome {
        //
        //NOTHING: If the request is within view, do 
        //nothing.i.e., no loading of new rows or adjusting 
        //current view boundaries.
        if (this.within_view(request))
            return <nothing> {type: "nothing"};
        //
        //ADJUST: If request is within the joint boundaries, 
        //load a fresh copy and adjust either the top or bottom
        //boundaries depending on the request direction.
        if (this.within_joint(request)) {
            //
            //The direction is top if the 
            //request is above the top boundary.
            const dir = request < this.view.top
                ?"top" : "bottom";
            //
            //The top or bottom boundaries 
            //should be adjusted to this value.
            const adjusted_view = this.get_joint(dir);
            //
            //Adjust the top boundary
            const start_from = dir === "top"
                ? this.get_joint(dir) : this.view[dir];
            //
            //Return the view boundary adjustment outcome.
            return <adjust> {type: "adjust", dir, start_from, adjusted_view};
        }
        //
        //FRESH: If the request is within extremes, 
        //load a fresh outcome, i.e., clear current tbody, 
        //load new rows and adjust the views.
        if (this.within_extreme(request)) {
            //
            //Constrain  the request to the extreme top.
            const view_top = request < this.extreme.top
                ? this.extreme.top : request;
            //
            //The bottom is always $limit number of rows
            //from the top, on a fresh page.
            const y = view_top + app.current.config!.limit;
            //
            //Constrain the bottom to the extreme bottom. 
            const view_bottom = y > this.extreme.bottom
                ? this.extreme.bottom: y;

            return <fresh> {type: "fresh", view_top, view_bottom};
        }
        //
        //OUT OF RANGE: The request is out of range.
        return <out_of_range> {type: "out_of_range", request};
    }
   
    //
    //Restore the ios asociated with the tds on the theme panel. This is
    //necessary bceuase the old ios are no londer assocuate with the current
    //document wgos documetElement has changed.
    public restore_ios(){
        //
        //Collect all the tds on this page as an array
        const tds = Array.from(this.document.querySelectorAll('td')); 
        //
        //For each td, restore its io.
        tds.forEach(td=>{
            //
            //Cast the td to table cell element
            const td_element = <HTMLTableCellElement>td;
            //
            //Get the td's row and column positions
            const rowIndex = (<HTMLTableRowElement>td_element.parentElement).rowIndex;
            const cellIndex = td_element.cellIndex;
            //
            //Compile the io's key key that matches this td
            const key = String([this.key, rowIndex, cellIndex]);
            //
            //Use the static io list to get the io that matches this td
            const io = theme.ios.get(key);
            //
            //Its an error if the io is not found
            if (io===undefined) throw new schema.mutall_error(`io wth key ${key} is not found`);
            //
            //Each io has its own way of restoring itself to ensure that
            //its properties are coupld to teh given td element
            io.restore();
        });     
    }
        
}
