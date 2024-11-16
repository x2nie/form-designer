// import './style.css'
// import typescriptLogo from './typescript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.ts'
import { loadFile, mount } from '@odoo/owl';
import Application from './application/App';


// mount(App, document.getElementById('app')!);
// async, so we can use async/await
(async function setup() {
  const templates = await loadFile(`/owl_templates.xml`);
  const env = {
    designer : {
      root: null, //will be a form being designing
    }
    // ui: createUI(),
    // _t: someTranslateFn,
    // templates,
    // possibly other stuff
  };

  mount(Application, document.getElementById('app')!, { env, templates, });
})();