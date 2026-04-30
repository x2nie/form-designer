import { Component, useEnv, useRef, useState, xml } from "@odoo/owl";
import './property-editor.scss'

const ITEMS = [
    'TMenu', 'TPopup', 'TLabel', 'TEdit', 'TMemo', 
    'TButton', 'TCheckbox', 'TRadio', 'TListbox', 'TCombobox',
    'TScrollbox', 'TGroupbox', 'TRadioGroup', 'TPanel'
]

// inspiration: https://www.w3schools.com/howto/howto_js_treeview.asp

export default class PropertyEditor extends Component {
    // static template = 'ComponentPalette'
    setup(){
        // this.env = useEnv()
        // this.state = useState(this.env.designer)
        // this.state = reactive(this.env.designer)
        // this.state = this.env.designer
        // this.env = useEnv()
        // this.state = useState(this.env.designer)
        // this.state.shown_component
        this.root = useRef('root');
    }

    // generateTree(){
    //     const js = component2json(this.state.root)
    //     // console.log(js);
    //     // console.log(JSON.stringify(js));
    //     console.log(JSON.parse(JSON.stringify(js)) )
    //     // debugger
    // }
    toggleCaret(ev){
        const el = ev.target;
        if(el.classList.contains('caret')){
            el.parentElement.querySelector(".nested").classList.toggle("active");
            el.classList.toggle('caret-down');
        }
        // debugger
        // const compName = ev.target.getAttribute('data-component')
        // console.log('change to:', compName)
        // if(compName.startsWith('T')){
        //     this.state.pickedComponent = compName
        // } else {
        //     this.state.pickedComponent = null
        // }
    }

    get compItems() {return ITEMS}
}

PropertyEditor.template = xml`
<ul id="myUL" t-on-click="toggleCaret" t-ref="root">
  <li><span class="caret">Beverages</span>
    <ul class="nested">
      <li>Water</li>
      <li>Coffee</li>
      <li><span class="caret">Tea</span>
        <ul class="nested">
          <li>Black Tea</li>
          <li>White Tea</li>
          <li><span class="caret">Green Tea</span>
            <ul class="nested">
              <li>Sencha</li>
              <li>Gyokuro</li>
              <li>Matcha</li>
              <li>Pi Lo Chun</li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </li>
</ul>
`