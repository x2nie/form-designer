import { Component, xml } from "@odoo/owl";
import { FormDesigner } from "../components/form-designer";
import { DesktopIcons } from "./desktop-icons";

export class Desktop extends Component {
    static components = {FormDesigner, DesktopIcons}
    static template = xml`
        <div class="desktop" style="">

            <DesktopIcons />
            <FormDesigner />
        
        </div>
    `;

}