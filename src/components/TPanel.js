import { xml } from "@odoo/owl";
import { registerComponent } from "./register";
import { TWinControl } from "./TControl";

export class TPanel extends TWinControl {
    static template = xml`
    <div class="panel"  t-att-style="getStyle()">
        <!-- <t t-out="window.JSON.stringify(props)"/> -->
        <!-- <t t-out="window.JSON.stringify(properties)"/> -->
        <t t-out="properties.Caption"/>
        <!-- <t t-raw="0"/> -->
        <!-- <t t-slot="default"/> -->
        <t t-foreach="props.children or []" t-as="child" t-key="child.object">
            <!-- <hr/> -->
            <!-- <div t-out="window.JSON.stringify(child)"/> -->
            <t t-component="getComponent(child.class)" t-props="child"/>
            <!-- <t t-call="render-component">
                <t t-set="comp" t-value="child"/>
            </t> -->
        </t>
    </div>
    `
    setup(){
        super.setup()
        // debugger
        if(!!this.props.designerroot){
            this.env.designer.root = this;
        }
    }
}

registerComponent(TPanel)