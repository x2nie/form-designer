import { Component, xml } from "@odoo/owl";
import { FormDesigner } from "../components/form-designer";
import { DesktopIcons } from "./desktop-icons";
import DesktopCursor from "./desktop-cursor";
import PropertyEditor from "./property-editor";


export class Desktop extends Component {
    static components = {FormDesigner, DesktopIcons, DesktopCursor, PropertyEditor}
    static template = xml`
        <div class="desktop xp" style="">

            <DesktopIcons />

            <PropertyEditor/>
            <FormDesigner />
            
            <DesktopCursor />
        </div>
    `;

}