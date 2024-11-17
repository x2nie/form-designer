import { Component, loadFile, onWillStart, xml } from "@odoo/owl";
import { registeredComponents } from "./register";

import './package1' //load all registerd

export class FormDesigner extends Component {
    static template = 'FormDesigner'
    static components = registeredComponents;
    setup(){
      onWillStart(async ()=>{
        const res = await loadFile('/samples/form1.json')
        this.seed = JSON.parse(res)
      })
    }

    getComponent(name) {
      return this.constructor.components[name]
    }

}











FormDesigner.template0 = xml`
<div class="window" style="width:300px; left:50px;">
  <div class="title-bar">
    <div class="title-bar-text" contenteditable="true">A Window With Stuff In It</div>
    <div class="title-bar-controls">
      <button aria-label="Minimize"></button>
      <button aria-label="Maximize"></button>
      <button aria-label="Close"></button>
    </div>
  </div>
  <div class="window-body">
    <p>There's so much room for activities!</p>
  </div>
</div>
  
`;