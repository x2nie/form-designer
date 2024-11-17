import { Component, loadFile, onWillStart, useChildSubEnv, useState, useSubEnv, xml } from "@odoo/owl";

import './style.css'
// import '98.css/dist/98.css'
// import '7.css/dist/7.css'
// import 'xp.css/dist/XP.css'
import 'xp.css/dist/98.css'
// import './desktop.scss'


// import ComponentPalette from "../components/component-palette";
// import { FormDesigner } from "../components/form-designer";
import { Cockpit } from "./Cockpit";
import { Desktop } from "./desktop";

export default class Application extends Component {
    static components = {Cockpit, Desktop}
    setup(){
        const designer = useState({
            root: null, //will be a form being designing
            // pickedComponent: 'TButton'
            // seed: {},
            // findObject: (name) => this.lookupObject(name, this.env.designer.seed),
            // // pickedComponent: null
            // pickedComponent: 'TPanel'
        })
        // useChildSubEnv({designer})
        onWillStart(async ()=>{
            const res = await loadFile('/samples/form1.json')
            designer.seed = JSON.parse(res)
        })
        useSubEnv({designer})
    }

    lookupObject(name, rootObject){
        if(rootObject.object == name)
            return rootObject;
        for(const child of rootObject.children){
            // if(child.object == name)
            //     return child;
            let result = this.lookupObject(name, child)
            if(result) return result
        }
    }
    
}
Application.template = xml`
    <Cockpit />
    <!-- <t t-out="env.designer.pickedComponent" /> -->
    <!-- <br/> -->
    <Desktop />
`;