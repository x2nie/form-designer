import { Component, useRef, useState } from "@odoo/owl";
import { registerComponent, registeredComponents } from "./register";
// import { debounce } from "../utils";
import debounce from 'lodash.debounce'
import { TWinControl } from "./TControl";

let guid = 0;

export class TComponent extends Component {
    static template = "TComponent"
    static components = registeredComponents
    static tag = 'div'
    setup(){
        this.properties = useState({...this.props.properties})
        this.name = this.props.object;
        // debugger
        // convert props to state, we don't need props which is a seed.
        // Object.entries(this.props.properties || {}).forEach(([key, value]) => {
        //     this.properties[key] = value;
        // });
        this.root = useRef('root');
        if(!!this.props.designerroot){
          this.env.designer.root = this;
        }
    }
    getComponent(name) {
        return registeredComponents[name] || UnknownTComponent
    }

    getStyle(){
      let style='width:32px; height:32px;'
      'Left Top'.split(' ').forEach(att =>{
        style += `${att.toLowerCase()}:${this.properties[att]}px; `
      })
      return style;
    }
    
    getCssClass(){
      return {
        'root-designing-component': this.props.designerroot,
      }
    }

    onMouseDown(ev){
      console.log(this.env.designer.pickedComponent)
      if(this.env.designer.pickedComponent){
        const container = this instanceof TWinControl ? this : this.__owl__.parent.component;
        // const node = this.env.designer.findObject(container.name)
        container.props.children.push({
        // node.children.push({
          class: this.env.designer.pickedComponent, object:`random${guid++}`, 
          properties: {Left: ev.offsetX, Top: ev.offsetY, Width:100, Height: 43, Caption:'123'},
          children:[]
        })
        this.env.designer.pickedComponent = null;
      } 
      else this.startMoveComponent(ev)
    }

    startMoveComponent(ev) {
        // this.updateZIndex();
        const self = this;
        const root = this.root;
        if(!root || !root.el) return;
    
        const el = root.el;
        el.classList.add('dragging');
    
        // const current = this.props.info;
        const current = this.properties;
        const offsetX = current.Left - ev.pageX;
        const offsetY = current.Top - ev.pageY;
        let left, top;
        
        const debounceMoveWindow = debounce(moveWindow, 0, {leading:true, trailing:true, maxWait: 10})
        window.addEventListener("mousemove", debounceMoveWindow);
        window.addEventListener("mouseup", stopDnD, { once: true });
    
        function moveWindow(ev) {
          left = Math.max(offsetX + ev.pageX, 0);
          top = Math.max(offsetY + ev.pageY, 0);
          el.style.left = `${left}px`;
          el.style.top = `${top}px`;
        }
        function stopDnD() {
        //   window.removeEventListener("mousemove", moveWindow);
          window.removeEventListener("mousemove", debounceMoveWindow);
          el.classList.remove('dragging');
    
          if (top !== undefined && left !== undefined) {
            // self.windowService.updatePosition(current.id, left, top);
            self.properties.Top = top;
            self.properties.Left = left;
          }
        }
    }
}

export class UnknownTComponent extends TComponent {
  static template = 'TComponent.Iconic'
}

registerComponent(UnknownTComponent)