import { Component, loadFile, onWillStart, useEffect, useState, xml } from "@odoo/owl";
import { registeredComponents } from "./register";

import './package1' //load all registerd
import { Resizer } from "../application/resizer";
import { lookupObject } from "../application/utils";

export class FormDesigner extends Component {
    static template = 'FormDesigner'
    static components = {...registeredComponents, Resizer};
    setup(){
      // onWillStart(async ()=>{
      //   const res = await loadFile('/samples/form1.json')
      //   this.seed = JSON.parse(res)
      // })
      this.state = useState({
        designer: this.env.designer,
        selectedComponent: null
      })

      useEffect(
        (pickedId) => {
          if(pickedId) {
            this.state.selectedComponent = lookupObject(pickedId, this.env.designer.seed);
          }
        },
        () => [this.state.designer.pickedId]
      )
    }

    getComponent(name) {
      return this.constructor.components[name]
    }

}