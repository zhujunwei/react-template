import { createElement } from 'react';
import { render } from 'react-dom';
import App from './app';
import 'src/assets/css/base.less';
import 'antd/dist/antd.css';

render(createElement(App), document.getElementById('root'));

module.hot && module.hot.accept();
