import { Component, xml } from "@odoo/owl";
import { FormDesigner } from "../components/form-designer";

export class Desktop extends Component {
    static components = {FormDesigner}
    static template = xml`
<div class="desktop" style="">
    <FormDesigner />
  
</div>
  
`;

}