import { Component, onWillDestroy, useEffect, useEnv, useState, xml } from "@odoo/owl";


export default class DesktopCursor extends Component {
    static template = xml`
    <t>
        <div class="component-cursor"
            t-if="state.activeComponent != null" 
            t-attf-style="left:#{mouse.x}px; top:#{mouse.y}px"
        >
            <div class="component-icon" style="--item-index:2;"/>
            <!-- <t t-out="window.JSON.stringify(env.designer.activeComponent)" /> -->
        </div>
    </t>
    `
    setup() {
        this.env = useEnv()
        this.state = useState(this.env.designer);

        useEffect(
            (active)=>{
                document.body.style.cursor = active? 'none': 'default';
            },
            () => [this.state.activeComponent != null]
        )

        // this hooks is bound to the 'mouse' property.
        this.mouse = useMouse();
    }

}


// We define here a custom behaviour: this hook tracks the state of the mouse
// position
function useMouse() {
    const position = useState({x:0, y: 0});

    function update(e) {
      position.x = e.clientX;
      position.y = e.clientY;
    }
    window.addEventListener('mousemove', update);
    onWillDestroy(() => {
        window.removeEventListener('mousemove', update);
    });

    return position;
}