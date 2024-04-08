import ReactDOM from 'react-dom/client';
import './index.css';
import { ConfigProvider } from 'antd'
import App from './App';
// import reportWebVitals from './reportWebVitals';
// 引入Ant Design中文语言包
import zhCN from 'antd/locale/zh_CN'
import { Provider } from 'react-redux';
import { store } from './store';

const root = ReactDOM.createRoot(document.getElementById('root') as ReactDOM.Container);
root.render(
  <ConfigProvider locale={zhCN}>
    <Provider store={store}>
      <App />
    </Provider>
  </ConfigProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
