import { Component, useRef, useState, xml } from "@odoo/owl";
import './resizer.scss'

class Edge extends Component {
    static template = xml`
        <div class="resizer-edge" 
            t-attf-style="left: #{props.x}px; top: #{props.y}px;"/>`;

}

/**
 * Handle one object
 */
export class Resizer extends Component {
    static components = { Edge }
    setup(){
        this.target = this.props.target
        this.state = useState({
            l:0,t:0,w:100,h:50
        })
        // const 
    }

    getCssClass(){
        return {...super.getCssClass(), 
            'root-designing-component': false,
            TForm:true,
            window:true, active:true}
    }
}

Resizer.template = xml`
    <Edge x="state.l" y="state.t"/>
    <Edge x="state.l + state.w" y="state.t"/>
    <Edge x="state.l + state.w" y="state.t + state.h"/>
    <Edge x="state.l" y="state.t + state.h"/>
`