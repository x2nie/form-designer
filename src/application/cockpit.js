import { Component, xml } from "@odoo/owl";

export class Cockpit extends Component {

    generateTree(){
        const js = component2json(this.env.designer.root)
        // console.log(js);
        // console.log(JSON.stringify(js));
        console.log(JSON.parse(JSON.stringify(js)) )
        // debugger
    }

}
    // static template = 'FormDesigner'
Cockpit.template = xml`
<div class="cockpit" style="">
   Cockpit here
    <button t-on-click="generateTree">Tree ! </button>
</div>
  
`;

function component2json(component){
    if(!component) return null;

    const obj = {
        object: component.name, 
        class: component.constructor.name,
        properties: component.properties,
        children: []
    }
    for (const [key, compNode] of Object.entries(component.__owl__.children)) {
        obj.children.push(component2json(compNode.component))
    }

    return obj
}