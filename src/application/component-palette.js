import { Component, useEnv, useState, xml } from "@odoo/owl";
import './component-palette.scss'

const ITEMS = [
    'TMenu', 'TPopup', 'TLabel', 'TEdit', 'TMemo', 
    'TButton', 'TCheckbox', 'TRadio', 'TListbox', 'TCombobox',
    'TScrollbox', 'TGroupbox', 'TRadioGroup', 'TPanel'
]

export default class ComponentPalette extends Component {
    static template = 'ComponentPalette'
    setup(){
        // this.env = useEnv()
        // this.state = useState(this.env.designer)
        // this.state = reactive(this.env.designer)
        // this.state = this.env.designer
        this.env = useEnv()
        this.state = useState(this.env.designer)
        this.state.shown_component
    }

    // generateTree(){
    //     const js = component2json(this.state.root)
    //     // console.log(js);
    //     // console.log(JSON.stringify(js));
    //     console.log(JSON.parse(JSON.stringify(js)) )
    //     // debugger
    // }
    switchComponent(ev){
        const compName = ev.target.getAttribute('data-component')
        console.log('change to:', compName)
        if(compName.startsWith('T')){
            this.state.activeComponent = compName
        } else {
            this.state.activeComponent = null
        }
    }

    get compItems() {return ITEMS}
}