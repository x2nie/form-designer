import './style.css'
// import typescriptLogo from './typescript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.ts'
import { mount } from '@odoo/owl';
import App from './App';


mount(App, document.getElementById('app')!);