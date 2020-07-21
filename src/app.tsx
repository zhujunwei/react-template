import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import { ConfigProvider } from 'antd';
import Zh_CN from 'antd/lib/locale-provider/zh_CN';
import history from './history';

function Home() {
    return (
        <div className="app" style={{ textAlign: 'center', width: '100%' }}>
            hello word
        </div>
    );
}

function App() {
    return (
        <Router history={history}>
            <ConfigProvider locale={Zh_CN}>
                <main className="balance-layout">
                    <Switch>
                        <Route path="/" exact component={Home} />
                    </Switch>
                </main>
            </ConfigProvider>
        </Router>
    );
}

export default hot(App);
