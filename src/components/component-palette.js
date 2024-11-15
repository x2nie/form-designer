import { Component, xml } from "@odoo/owl";

export default class ComponentPalette extends Component {
    static template = 'ComponentPalette'
    static template0 = xml`
  
    <menu role="tablist">
      <!-- <li role="tab" aria-selected="true"><a href="#tabs">Desktop</a></li> -->
      <li role="tab" aria-selected="true"><a href="#tabs">Standard</a></li>
      <li role="tab"><a href="#tabs">Additional</a></li>
      <li role="tab"><a href="#tabs">Win32</a></li>
      <li role="tab"><a href="#tabs">System</a></li>
      <li role="tab"><a href="#tabs">Data Access</a></li>
      <li role="tab"><a href="#tabs">Data Controls</a></li>
    </menu>
    <div class="window" role="tabpanel">
      <div class="window-body">
        <p>the tab content</p>
      </div>
    </div>
  
`;

}