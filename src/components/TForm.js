import { useRef } from "@odoo/owl";
import { registerComponent } from "./register";
import { TWinControl } from "./TControl";

import './TForm.scss'

export class TForm extends TWinControl {
    static template = 'TForm'
    setup(){
        super.setup()
        this.mover = useRef('titlebar')
    }

    getCssClass(){
        return {...super.getCssClass(), 
            'root-designing-component': false,
            TForm:true,
            window:true, active:true}
    }
}

registerComponent(TForm)