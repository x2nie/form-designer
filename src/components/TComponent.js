import { Component, useState } from "@odoo/owl";
import { registeredComponents } from "./register";

export class TComponent extends Component {
    static components = registeredComponents
    setup(){
        this.properties = useState({})
        // debugger
        // convert props to state, we don't need props which is a seed.
        Object.entries(this.props.properties || {}).forEach(([key, value]) => {
            this.properties[key] = value;
        });

    }
    getComponent(name) {
        return registeredComponents[name]
    }

    startDragAndDrop(ev) {
        // this.updateZIndex();
        const self = this;
        const root = this.root;
    
        const el = root.el;
        el.classList.add('dragging');
    
        // const current = this.props.info;
        const current = this.properties;
        const offsetX = current.Left - ev.pageX;
        const offsetY = current.Top - ev.pageY;
        let left, top;
    
        window.addEventListener("mousemove", moveWindow);
        window.addEventListener("mouseup", stopDnD, { once: true });
    
        function moveWindow(ev) {
          left = Math.max(offsetX + ev.pageX, 0);
          top = Math.max(offsetY + ev.pageY, 0);
          el.style.left = `${left}px`;
          el.style.top = `${top}px`;
        }
        function stopDnD() {
          window.removeEventListener("mousemove", moveWindow);
          el.classList.remove('dragging');
    
          if (top !== undefined && left !== undefined) {
            // self.windowService.updatePosition(current.id, left, top);
            self.properties.Top = top;
            self.properties.Left = left;
          }
        }
    }
}