import { TComponent } from "./TComponent";

export class TControl extends TComponent {


    getStyle(){
      let style= super.getStyle()
      'Width Height'.split(' ').forEach(att =>{
        style += `${att.toLowerCase()}:${this.properties[att]}px; `
      })
      return style;
    }

    
}


export class TWinControl extends TControl {}