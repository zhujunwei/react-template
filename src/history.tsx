import React from 'react';
import ReactDOM from 'react-dom';
import { Modal } from 'antd';
import { createBrowserHistory } from 'history';
const basename = '/ebalanceadmin-front/';

export default createBrowserHistory({
    basename,
    getUserConfirmation: (message, callback) => {
        const ConFirmComponent = () => {
            return (
                <Modal
                    title="提示"
                    visible={true}
                    cancelText="取消"
                    okText="确定"
                    onOk={() => {
                        callback(true);
                        ReactDOM.unmountComponentAtNode(document.getElementById('root1'));
                    }}
                    onCancel={() => {
                        callback(false);
                        ReactDOM.unmountComponentAtNode(document.getElementById('root1'));
                    }}
                >
                    {message}
                </Modal>
            );
        };
        ReactDOM.render(<ConFirmComponent />, document.getElementById('root1'));
    },
});
