import { Component, useChildSubEnv, useState, useSubEnv, xml } from "@odoo/owl";

import './style.css'
// import '98.css/dist/98.css'
import '7.css/dist/7.css'
// import 'xp.css/dist/XP.css'
// import './desktop.scss'


// import ComponentPalette from "../components/component-palette";
// import { FormDesigner } from "../components/form-designer";
import { Cockpit } from "./cockpit";
import { Desktop } from "./desktop";

export default class Application extends Component {
    static components = {Cockpit, Desktop}
    setup(){
        const designer = useState({
            root: null, //will be a form being designing
            // activeComponent: 'TButton'
            activeComponent: null
        })
        // useChildSubEnv({designer})
        useSubEnv({designer})
    }
    
}
Application.template = xml`
    <Cockpit />
    <t t-out="env.designer.activeComponent" />
    <br/>
    <Desktop />
`;