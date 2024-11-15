import { Component, xml } from "@odoo/owl";

import './style.css'
// import '98.css/dist/98.css'
import '7.css/dist/7.css'
// import 'xp.css/dist/XP.css'


// import ComponentPalette from "../components/component-palette";
// import { FormDesigner } from "../components/form-designer";
import { Cockpit } from "./cockpit";
import { Desktop } from "./desktop";

export default class App extends Component {
    static components = {Cockpit, Desktop}
    
}
App.template = xml`
    <Cockpit />
    <!-- <br/> -->
    <Desktop />
`;