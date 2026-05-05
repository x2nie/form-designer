import { Component, useEffect, useState, xml } from "@odoo/owl";
import './resizer.scss'

class Edge extends Component {
    static template = xml`
        <div t-attf-class="resizer-edge #{props.kind}" 
            t-attf-style="left: #{props.x}px; top: #{props.y}px; transform: translate(#{props.jump.l}px, #{props.jump.t}px);"/>`;

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
            coor: getTargetStats(this.target.properties),
            jump: {l:0, t:0}
        });

        useEffect(
            (properties) => {
                console.log('changed', properties)
                this.state.coor = getTargetStats(properties);
                this.state.jump = this.client2Form(this.props.target)
            },
            () => {
                const properties = this.props.target?.properties || {};
                return [properties]
            }
        );
    }

    client2Form(target){
        let l = 0, t = 0;
        if(target){
            let c = document.getElementById(target.object).parentElement
            while(!c.classList.contains('root-designing-component')){
                l += c.offsetLeft
                t += c.offsetTop
                c = c.parentElement
            }
        }
        return { l, t }
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
    <Edge kind="'lt'" jump="state.jump" x="state.coor.l" y="state.coor.t"/>
    <Edge kind="'rt'" jump="state.jump" x="state.coor.l + state.coor.w" y="state.coor.t"/>
    <Edge kind="'rb'" jump="state.jump" x="state.coor.l + state.coor.w" y="state.coor.t + state.coor.h"/>
    <Edge kind="'lb'" jump="state.jump" x="state.coor.l" y="state.coor.t + state.coor.h"/>
`
