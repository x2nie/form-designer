import { Component, useRef, useState } from "@odoo/owl";
import { registerComponent, registeredComponents } from "./register";
// import { debounce } from "../utils";
import debounce from 'lodash.debounce'
import { TWinControl } from "./TControl";

import './TComponent.scss'

let guid = 0;

export class TComponent extends Component {
  static template = "TComponent"
  static components = registeredComponents
  static tag = 'div'
  setup() {
    this.properties = useState({ ...this.props.properties })
    this.name = this.props.object;
    // debugger
    // convert props to state, we don't need props which is a seed.
    // Object.entries(this.props.properties || {}).forEach(([key, value]) => {
    //     this.properties[key] = value;
    // });
    this.root = useRef('root');
    this.mover = useRef('root');
    if (!!this.props.designerroot) {
      this.env.designer.root = this;
    }
  }
  getComponent(name) {
    return registeredComponents[name] || UnknownTComponent
  }

  getStyle() {
    let style = 'width:32px; height:32px;'
    'Left Top'.split(' ').forEach(att => {
      style += `${att.toLowerCase()}:${this.properties[att]}px; `
    })
    return style;
  }

  getCssClass() {
    return {
      'root-designing-component': this.props.designerroot,
    }
  }

  onMouseDown(ev) {
    if (this.env.designer.pickedComponent)
      // this.mousePlacingComponent(ev);
      this.startPlacingComponent(ev);
    else
      this.startMoveComponent(ev)
  }
  
  mousePlacingComponent(ev) {
    // this.startPlacingComponent(ev)
    const container = this instanceof TWinControl ? this : this.__owl__.parent.component;
    // const node = this.env.designer.findObject(container.name)
    container.props.children.push({
      // node.children.push({
      class: this.env.designer.pickedComponent, object: `random${guid++}`,
      properties: { Left: ev.offsetX, Top: ev.offsetY, Width: 100, Height: 43, Caption: '123' },
      children: []
    })
    this.env.designer.pickedComponent = null;
  }

  placingComponent(pos) {
    const container = this instanceof TWinControl ? this : this.__owl__.parent.component;
    // const node = this.env.designer.findObject(container.name)
    container.props.children.push({
      // node.children.push({
      class: this.env.designer.pickedComponent, object: `random${guid++}`,
      properties: { 
        Left: pos.left, 
        Top: pos.top, 
        Width: pos.width || 100, 
        Height: pos.height || 43, Caption: '123' },
      children: []
    })
    this.env.designer.pickedComponent = null;
  }

  startPlacingComponent(ev) {
    // if (ev.target != this.mover.el) return;
    const target = ev.target;
    const rdc = target.closest('.root-designing-component')
    const rdc_rect = rdc.getBoundingClientRect()
    const rdc_abs_x = rdc_rect.left + ( window.scrollY || document.documentElement.scrollTop)
    const rdc_abs_y = rdc_rect.top + ( window.scrollX || document.documentElement.scrollLeft)
    const rdc_left = ev.pageX - rdc_abs_x
    const rdc_top = ev.pageY - rdc_abs_y
    let rdc_width, rdc_height;
    rdc.style.setProperty('--vir-left', `${rdc_left}px`)
    rdc.style.setProperty('--vir-top', `${rdc_top}px`)

    //? pos in mouseDown.target
    const put_x1 = ev.offsetX
    const put_y1 = ev.offsetY
    let put_x2 = put_x1, put_y2 = put_y1;

    // this.updateZIndex();
    const self = this;
    const root = this.root;
    if (!root || !root.el) return;
    
    const el = root.el;

    // const current = this.props.info;
    const current = this.properties;
    // const offsetX = current.Left - ev.pageX;
    // const offsetY = current.Top - ev.pageY;
    
    
    const debounceMoveWindow = debounce(moveWindow, 0, { leading: true, trailing: true, maxWait: 10 })
    window.addEventListener("mousemove", debounceMoveWindow);
    window.addEventListener("mouseup", stopDnD, { once: true });
    
    function moveWindow(ev) {
      rdc.classList.add('dragging');
      put_x2 = ev.offsetX
      put_y2 = ev.offsetY
      // left = Math.max(offsetX + ev.pageX, 0);
      // top = Math.max(offsetY + ev.pageY, 0);

      const nowX = ev.pageX - rdc_abs_x;
      const nowY = ev.pageY - rdc_abs_y;

      rdc_width = Math.abs(nowX - rdc_left);
      rdc_height = Math.abs(nowY - rdc_top);

      rdc.style.setProperty('--vir-width', `${rdc_width}px`)
      rdc.style.setProperty('--vir-height', `${rdc_height}px`)

      

      rdc.style.setProperty('--vir-left', `${Math.min(nowX, rdc_left)}px`)
      rdc.style.setProperty('--vir-top', `${Math.min(nowY, rdc_top)}px`)
      // rdc.style.setProperty('--vir-top', `${rdc_top}px`)
      // rdc.style.setProperty('--vir-top', `${ev.pageY - rdc_y}px`)
    }
    function stopDnD() {
      //   window.removeEventListener("mousemove", moveWindow);
      window.removeEventListener("mousemove", debounceMoveWindow);
      rdc.classList.remove('dragging');

      const left = Math.min(put_x1, put_x2)
      const top = Math.min(put_y1, put_y2)
      // let width = Math.max(put_x1, put_x2) - left;
      // let height = Math.max(put_y1, put_y2) - top;
      self.placingComponent({left, top, width:rdc_width, height:rdc_height})
    }
  }
  startMoveComponent(ev) {
    if (ev.target != this.mover.el) return;
    // this.updateZIndex();
    const self = this;
    const root = this.root;
    if (!root || !root.el) return;

    const el = root.el;
    el.classList.add('dragging');

    // const current = this.props.info;
    const current = this.properties;
    const offsetX = current.Left - ev.pageX;
    const offsetY = current.Top - ev.pageY;
    let left, top;

    const debounceMoveWindow = debounce(moveWindow, 0, { leading: true, trailing: true, maxWait: 10 })
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

  getCssClass() {
    return { ...super.getCssClass(), iconic: true }
  }
}

registerComponent(UnknownTComponent)