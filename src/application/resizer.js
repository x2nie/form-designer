import { Component, useEffect, useState, xml } from "@odoo/owl";
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
        const getTargetStats = (properties) => {
            // console.log(properties)
            return {
                l: Number(properties.Left ?? properties.left ?? 0),
                t: Number(properties.Top ?? properties.top ?? 0),
                w: Number(properties.Width ?? properties.width ?? 100),
                h: Number(properties.Height ?? properties.height ?? 50),
            };
        };

        this.target = this.props.target;
        // console.log(this.target)
        this.state = useState({
            coor: getTargetStats(this.target.properties)
        });

        useEffect(
            (properties) => {
                console.log('changed', properties)
                this.state.coor = getTargetStats(properties);
            },
            () => {
                const properties = this.props.target?.properties || {};
                return [properties]
            }
        );
    }

    // get state0(){
    //     return this.state.coor
    // }

    getCssClass(){
        return {...super.getCssClass(), 
            'root-designing-component': false,
            TForm:true,
            window:true, active:true}
    }
}

Resizer.template = xml`
    <Edge x="state.coor.l" y="state.coor.t"/>
    <Edge x="state.coor.l + state.coor.w" y="state.coor.t"/>
    <Edge x="state.coor.l + state.coor.w" y="state.coor.t + state.coor.h"/>
    <Edge x="state.coor.l" y="state.coor.t + state.coor.h"/>
`
