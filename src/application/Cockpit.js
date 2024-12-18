import { Component, reactive, useEnv, useState, xml } from "@odoo/owl";
import ComponentPalette from "./component-palette";

export class Cockpit extends Component {
    static components = { ComponentPalette}
    setup(){
        // this.env = useEnv()
        // this.state = useState(this.env.designer)
        // this.state = reactive(this.env.designer)
        // this.state = this.env.designer
        this.env = useEnv()
        this.state = useState(this.env.designer)
    }

    generateTree(){
        const js = component2json(this.state.root)
        // console.log(js);
        // console.log(JSON.stringify(js));
        console.log(JSON.parse(JSON.stringify(js)) )
        // debugger
    }
    switchComponent(ev){
        const compName = ev.target.getAttribute('data-component')
        console.log('change to:', compName)
        if(compName.startsWith('T')){
            this.state.pickedComponent = compName
        } else {
            this.state.pickedComponent = null
        }
    }

}
    // static template = 'FormDesigner'
Cockpit.template = xml`
<div class="cockpit" style="">
   <!-- Cockpit here <b t-out="state.pickedComponent"/> -->
   <ComponentPalette/>
   <!-- 
    <button t-on-click="generateTree">Tree ! </button>
    <button t-on-click="switchComponent" data-component="Arrow" t-att-class="{active: state.pickedComponent==null}">Arrow </button>
    <button t-on-click="switchComponent" data-component="TButton" t-att-class="{active: state.pickedComponent=='TButton'}">TButton </button>
    <button t-on-click="switchComponent" data-component="TPanel" t-att-class="{active: state.pickedComponent=='TPanel'}">TPanel </button>
    --> 
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