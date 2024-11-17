import { Component, xml } from "@odoo/owl";
import { FormDesigner } from "../components/form-designer";
import { DesktopIcons } from "./desktop-icons";
import DesktopCursor from "./desktop-cursor";

export class Desktop extends Component {
    static components = {FormDesigner, DesktopIcons, DesktopCursor}
    static template = xml`
        <div class="desktop xp" style="">

            <DesktopIcons />
            <FormDesigner />
            
            <DesktopCursor />
        </div>
    `;

}