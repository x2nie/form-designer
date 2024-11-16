// import { Component, useState } from "@odoo/owl";

//@ts-nocheck

// export class TComponent extends Component {
//     static components = {}; //udpated soon
//     properties : Record<string, any>
//     setup(){
//         this.properties = useState({})
//         // debugger
//         // convert props to state, we don't need props which is a seed.
//         Object.entries(this.props.properties || {}).forEach(([key, value]) => {
//             this.properties[key] = value;
//         });

//     }
//     getComponent(name:string) {
//         return registeredComponents[name]
//     }
// }

// type TComponentClass<T = TComponent> = new (...args: any[]) => T;

export const registeredComponents /* : Record<string, TComponentClass> */ = {};

export function registerComponent(ComponentType/* : TComponentClass */) {
    const className = ComponentType.name;
    registeredComponents[className] = ComponentType;
}

// TComponent.components = registerComponent;