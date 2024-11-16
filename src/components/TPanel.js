import { xml } from "@odoo/owl";
import { registerComponent } from "./register";
import { TWinControl } from "./TControl";

export class TPanel extends TWinControl {
    static template = xml`
    <div class="panel"  t-att-style="getStyle()">
        <!-- <t t-out="window.JSON.stringify(props)"/> -->
        <!-- <t t-out="window.JSON.stringify(properties)"/> -->
        <!-- <hr/> -->
        <t t-out="properties.Caption"/>
    </div>
    `
    setup(){
        super.setup()
    }
}

registerComponent(TPanel)