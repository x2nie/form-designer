import { Component, useEnv, useRef, useState, onMounted, reactive, xml, useEffect } from "@odoo/owl";
import { component2json } from "./utils";
import './property-editor.scss'

const ITEMS = [
    'TMenu', 'TPopup', 'TLabel', 'TEdit', 'TMemo', 
    'TButton', 'TCheckbox', 'TRadio', 'TListbox', 'TCombobox',
    'TScrollbox', 'TGroupbox', 'TRadioGroup', 'TPanel'
]

/* ======================
   TREE NODE COMPONENT
====================== */

class TreeNode extends Component {
  static components = { TreeNode };
  static props = ["node", "level", "isLast"];

  setup() {
    this.state = useState({ open: true });
    this.contentRef = useRef("content");

    this.designer = useState(this.env.designer)
    // onMounted(() => {
    //   this.updateHeight();
    // });

    // useEffect(
    //     () => {
    //         this.updateHeight()
    //     },
    //     () => [this.props.node.children]
    // )
  }

  select(){
      console.log(this.props.node.object)
      this.designer.pickedId = this.props.node.object;
  }

  get active() {
    return this.designer.pickedId === this.props.node.object;
  }

  toggle() {
    this.state.open = !this.state.open;
    this.updateHeight();
  }

  updateHeight() {
    const el = this.contentRef.el;
    if (!el) return;

    if (this.state.open) {
        
      el.style.height = el.scrollHeight + "px";
      el.style.opacity = 1;
      setTimeout(() => {el.style.height = '';}, 500);
    } else {
      el.style.height = el.scrollHeight + "px";
      setTimeout(() => {
          el.style.height = "0px";
          el.style.opacity = 0;        
      }, 50);
    }
  }

  get hasChildren() {
    return this.props.node.children?.length > 0;
  }
}


TreeNode.template = xml`
<div class="tree-node">

  <!-- garis vertikal -->
  <div class="lines">
    <t t-foreach="props.level || []" t-as="l" t-key="l">
      <span class="line"></span>
    </t>
  </div>

  <div class="node-label" >
    <span class="toggle" t-on-click="toggle">
      <t t-if="hasChildren">
        <t t-esc="state.open ? '⊟' : '⊞'"/>
      </t>
    </span>

    <div class="box" t-att-class="{'active': active}" t-on-click="select">
      <b><t t-esc="props.node.object"/></b>
      (<t t-esc="props.node.class"/>)
    </div>
  </div>

  <div class="content" t-ref="content">

    <t t-if="hasChildren">
      <t t-foreach="props.node.children" t-as="child" t-key="child.object">
        <TreeNode 
          node="child" 
          level="(props.level || []).concat([1])"
          isLast="child === props.node.children[props.node.children.length - 1]"
        />
      </t>
    </t>

  </div>
</div>
`;


export default class PropertyEditor extends Component {
    static components = {TreeNode};
    // static template = 'ComponentPalette'
    setup(){
        this.env = useEnv()
        // this.state = useState(this.env.designer)
        // this.state = reactive(this.env.designer)
        // this.state = this.env.designer
        // this.env = useEnv()
        // this.state = useState({ root: this.env.designer.root }) // !error
        // this.state = useState(reactive(this.env.designer))
        // this.state = reactive(useState(this.env.designer))
        this.state = useState(this.env.designer);
        // this.state.shown_component
        this.root = useRef('root');
        // console.log(this.data)
    }
    get data(){
        return this.state.seed
        // return component2json(this.state.root)
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
<div class="property-editor-dlg no-designer window active" style="max-width: 400px; left:500px">
    <div class="title-bar">
        <div class="title-bar-text">Property Editor</div>
        <div class="title-bar-controls">
            <button aria-label="Minimize"></button>
            <button aria-label="Maximize"></button>
            <button aria-label="Close"></button>
        </div>
    </div>
    <div class="window-body has-space">
        <TreeNode t-if="data" node="data" level="[]"/>
    </div>
</div>
`;
PropertyEditor.template0 = xml`
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