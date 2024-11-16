import { Component, useState } from "@odoo/owl";

export class TComponent extends Component {
    static components = {}; //udpated soon
    properties : Record<string, any>
    setup(){
        this.properties = useState({})
        // convert props to state, we don't need props which is a seed.
        Object.entries(this.props).forEach(([key, value]) => {
            this.properties[key] = value;
        });

    }
}

type TComponentClass<T = TComponent> = new (...args: any[]) => T;

export const registeredComponents: Record<string, TComponentClass> = {};

export function registerComponent(ComponentType: TComponentClass): void {
    const className = ComponentType.name;
    registeredComponents[className] = ComponentType;
}

TComponent.components = registerComponent;