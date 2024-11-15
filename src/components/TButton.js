import { Component, useRef, useState, xml } from "@odoo/owl"

export default class TButton extends Component {

    setup() {
        const info = this.props.info
        this.att = useState({top: info.top, left: info.left})
        // this.windowService = useWindowService();
        this.root = useRef('root');
        // onMounted(this.updateZIndex);
    }

    startDragAndDrop(ev) {
        // this.updateZIndex();
        const self = this;
        const root = this.root;
    
        const el = root.el;
        el.classList.add('dragging');
    
        // const current = this.props.info;
        const current = this.att;
        const offsetX = current.left - ev.pageX;
        const offsetY = current.top - ev.pageY;
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
            self.att.top = top;
            self.att.left = left;
          }
        }
      }
}

TButton.template = xml`
    <button t-ref="root" 
        t-on-mousedown="startDragAndDrop"
        t-attf-style="left: #{att.left}px; top:#{att.top}px"
    ><t t-esc="props.caption"/></button>
`