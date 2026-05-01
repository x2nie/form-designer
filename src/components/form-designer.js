import { Component, loadFile, onWillStart, xml } from "@odoo/owl";
import { registeredComponents } from "./register";

import './package1' //load all registerd

export class FormDesigner extends Component {
    static template = 'FormDesigner'
    static components = registeredComponents;
    setup(){
      // onWillStart(async ()=>{
      //   const res = await loadFile('/samples/form1.json')
      //   this.seed = JSON.parse(res)
      // })
    }

    getComponent(name) {
      return this.constructor.components[name]
    }

}