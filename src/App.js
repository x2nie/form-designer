import { Component, xml } from "@odoo/owl";

import './style.css'
// import '98.css/dist/98.css'
// import '7.css/dist/7.css'
import 'xp.css/dist/XP.css'


import ComponentPalette from "./components/component-palette";
import { FormDesigner } from "./components/form-designer";

export default class App extends Component {
    static components = {ComponentPalette, FormDesigner}
    
}
App.template = xml`
    <ComponentPalette />
    <br/>
    <FormDesigner />
    
    
`;