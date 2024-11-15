import { Component, xml } from "@odoo/owl";

export class FormDesigner extends Component {
    static template = 'FormDesigner'
    static template0 = xml`
<div class="window" style="width:300px; left:50px;">
  <div class="title-bar">
    <div class="title-bar-text" contenteditable="true">A Window With Stuff In It</div>
    <div class="title-bar-controls">
      <button aria-label="Minimize"></button>
      <button aria-label="Maximize"></button>
      <button aria-label="Close"></button>
    </div>
  </div>
  <div class="window-body">
    <p>There's so much room for activities!</p>
  </div>
</div>
  
`;

}