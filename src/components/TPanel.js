import { useRef, xml } from "@odoo/owl";
import { registerComponent } from "./register";
import { TWinControl } from "./TControl";

export class TPanel extends TWinControl {
    getCssClass(){
        return {...super.getCssClass(), panel:true}
    }
}

registerComponent(TPanel)