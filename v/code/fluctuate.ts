import { view } from "./../../../outlook/v/code/view.js"
//
import { mutall_error } from "./../../../schema/v/code/schema.js"
//
//Cascaded Style Sheet selector as the basis of an element's dna.
type css = string;

//The dna of a family modelled as a css structure
type dna = {elder?:css, siblings?:css};

//The fluctuate class supports the expansion and collapsing of input page
//sections to hide and show details as the user requires them. It is designed
//to give users a better data entry experienc than the alternative practice, 
//This class is not a view derivative, but it has one that is useful
//for that purpose via delegation.
export class fluctuate{
    //
    constructor(public view:view) {}
    
    //On loading the form, initialize it so that it looks the way the user would
    //expect it, e.g., visibile summaries and hiden details
    async onload(){
        //
        //Add the onclick listener to all the radio-buttons in the mother page
         this.view.document
         .querySelectorAll('input[type="radio"]')
         .forEach(
            radio=>(radio as HTMLElement).onclick=()=>this.onclick(radio as HTMLInputElement)
        );
        //
        //Show summaries and hide details where necessary
        this.summarise_fields();
    }

    //Show summaries and hide details, where necessary
    summarise_fields(){
        //
        //Collect all the fields to be summarised
        const list:NodeList =  this.view.document.querySelectorAll('[data-field]');
        //
        //Convert the nodelist to an array of field elements
        const fields = Array.from(list) as Array<HTMLElement>;
        //
        //Summarised all of the fields that are no selected
        fields.forEach(field=>this.summarise_mother(field));
    }    
    
    //To summarise a field, see the example below, is to hide the elements 
    //classified 'SIBLING' and to make visibible those marked 'ELDER', in the
    //context using radio buttons to make choices. The field must be named
    //the same as the radio button
    /*
    <div data-field=$dfname>

        <fieldset>
            <label class="ELDER"> 
                <input type="radio" name=$dfname>
            </label>
            <p class="SIBBLING">hjbhbhjbhjbhbh</p>
            <input class="SIBLING" type="text">
            <div class="SIBLING">...</div>
        <fieldset>
    </div>
    */
    private summarise_mother(mother:HTMLElement):void{
        //
        //Get the (mother) field name. It is used for formulating the dnas for 
        //both the elder and its siblings
        const dfname:string|undefined = mother.dataset.field;
        //
        //Gathering will not be effected if the (mother) field is not named. 
        if (dfname===undefined) 
            throw new mutall_error('An undetified (mother) field (using data-field attribute) cannot be "collapsed"', mother);
        //
        //Get the dna shared by all children (of the mother field), a.k.a., siblings,  
        //that need to be gathered (perhaps for some special occasion).
        const family_dna:string = `input[type="radio"][name="${dfname}"]`;
        //
        //Combine the dnas of the all the family members. N.B. the dna of the
        //the elder is extends that of the family
        const dna:dna = {elder:family_dna+':checked', siblings:family_dna};
        //
        //Separate the elder child from its siblings (via dna analysis)
        const {elder, siblings} = this.separate_children(mother, dna);
        //
        //If the elder is summarise it
        if (elder) this.summarise_child(elder, family_dna, false);
        //
        //Hide the siblings
        siblings.forEach(sibling=>this.summarise_child(sibling, family_dna, true));        
    }
    
    //To summarise a child is to ...
    private summarise_child(child: HTMLElement, family_dna:css, hide: boolean): void {
        //
        //The dna of the elder child is that of the familiy; there is nothing
        //special about the children
        const dna:dna = { elder: family_dna};
        //
        //Separate elder from child siblings
        const { elder, siblings } = this.separate_children(child, dna);
        //
        //Show the elder child if valid
        if (elder) elder.hidden = false;
        //
        //Show or hide the siblings, depending on the request
        siblings.forEach(sibling => sibling.hidden = hide);
    }

    //
    //Update the display of a form after a button has been clicked on. Ref is the 
    //radio button.
    onclick(ref: HTMLInputElement): void {
        //
        //Get the data-field, i.e., the element that envelops the ref element
        //It is reffered to as the mother 
        const mother: HTMLElement | null = ref.closest("*[data-field]");
        //
        //If the mother field is not found then this is a badly designed form 
        //and stop to inform the user
        if (!mother) 
            throw new mutall_error("No data-field closest to the current reference element found", ref);
        //
        //Define the family dna
        const family_dna:css =  `input[type="radio"][name="${ref.name}"]`;
        //
        //Define the dna for the elder child and its siblings in terms of the 
        //family's dna
        const dna:dna = { siblings: family_dna, elder: family_dna+":checked"};
        //
        //From all the mother's children separate the elder from its siblings
        const { elder, siblings } = this.separate_children(mother, dna);
        //
        //Let the elder stand out, with all its children. The hidong os false
        if (elder) this.summarise_child(elder, family_dna, false);
        //
        //Hide the children of the sibblings. The hiding is true
        siblings.forEach(sibling => this.summarise_child(sibling, family_dna, true));
    }

    //Separate the elder child from the siblings
    private separate_children(
        mother: HTMLElement,
        dna: dna
    ): {
        elder:HTMLElement|undefined, 
        siblings: Array<HTMLElement>
    } {

        //Get all the children of the mother
        const children = Array.from(mother.children) as Array<HTMLElement>;
        //
        //Get the elder child, whether defined or not
        const elder:HTMLElement|undefined = this.get_elder(mother, children, dna);
        //
        //Get the all siblings of the elder. 
        const all_siblings: Array<HTMLElement> = this.get_siblings(mother, children, dna);
        //
        //The desired result should ensure that the elder is not part of the 
        //siblings
        const siblings = all_siblings.filter(child=>child!==elder);
        //
        //Return the result
        return { elder, siblings};
    }

    //Get the elder child from the given children
    private get_elder(mother: Element, children: Array<HTMLElement>, dna: dna): HTMLElement|undefined {
        //
        //Get the elder's  dna (css) 
        const css: css|undefined = dna.elder;
        //
        //An elder is undefined if its corresponding css is also undefined
        if (!css) return undefined;
        //
        //Get all the organs, i.e., input element,  identified by the elder css
        const organs: Array<HTMLElement> = Array.from(mother.querySelectorAll(css));
        //
        //Only one elder or none is expected
        const len = organs.length;
        //
        //here is no elder. Return as such
        if (len === 0) return undefined;
        //
        //There cannot be multiple elders
        if (len > 1) throw new mutall_error(`This css '${css}' produces '${len}' elders`, organs);
        //
        //Get the only organ that represents the elder
        const organ: Element = organs[0]
        //
        //An elder is a child that contains this organ. it must be one and only one.
        //
        //Get the children that have the organ
        const elders: Array<HTMLElement> = children.filter(child => child.contains(organ));
        //
        //There must be one.
        if (elders.length == 0)
            throw new mutall_error(`Invalid form. No child qualifies to be an elder defined by css '${css}'`);
        //
        //It can only be one
        if (elders.length > 1)
            throw new mutall_error(`Invalid form. Found ${elders.length} elders for css '${css}'`, elders);
        //
        //Retuurn the on;y elder
        return elders[0];
    }

    //Get the siblings of an elder
    private get_siblings(mother: Element, children: Array<HTMLElement>, dna: dna): Array<HTMLElement> {
        //
        //The form is invalid if both the elder and siblings' dnas are missing
        if (!dna.elder && !dna.siblings) throw new mutall_error(`Invalid form. At least the elder or sibling (css) dna must be availale`);
        //
        //Get the dna of the siblings
        const css:css|undefined = dna.siblings;
        //
        //If the siblings' css does not exist then the siblings are all the 
        //mother's chilren
        if (!css) return children;
        //
        //...otherwise isolate th siblings from the children
        //
        //Get all the organs identified by the css
        const organs: Array<HTMLElement> = Array.from(mother.querySelectorAll(css));
        //
        //A sibling is a child that contains any of these organs.
        const siblings: Array<HTMLElement> = children.filter(child => this.contains(child, organs));
        //
        //Return the siblings
        return siblings;
    }

    //Tests if a child contains one and only one organ
    private contains(child: Element, organs: Array<HTMLElement>): boolean {
        //
        //Select all organs of the child
        const child_organs = organs.filter(organ => child.contains(organ));
        //
        //Containement is determined by the number of organs
        const count: number = child_organs.length;
        //
        //There is no containment
        if (count === 0) return false;
        //
        //This is valid containment
        if (count === 1) return true;
        //
        //The containment is not valid if a child has more than 1 organ
        throw new mutall_error(`Invalid form. A child contains ${count} organs`, child);
    }
    
}