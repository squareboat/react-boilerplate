import { Form, Input, Button, Checkbox,Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import errorActions from '../../redux/error/actions'
import authActions from '../../redux/auth/actions'

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

export default function LoginPage() {
    const {loading} = useSelector(state => state.auth)
    const {error} = useSelector(state => state)

    const dispatch = useDispatch()

    const onFinish = (values) => {
        console.log('Success:', values);
        dispatch({
            type: authActions.LOGGIN,
            payload:values
        })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const clearError = (key) => {
        const { dispatch } = this.props
        dispatch({
          type: errorActions.CLEAR_ERROR,
          payload: {
            key,
          },
        })
      }


    return (
        <Spin spinning={loading}>
            <Form
                {...layout}
                name="basic"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Email"
                    name="email"
                    {...(error.email && {
                        help: error.email,
                        validateStatus: 'error',
                        })}
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                    ]}
                >
                    <Input 
                        onChange={() => (error.email ? clearError('email') : null)}
                    />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    {...(error.password && {
                        help: error.password,
                        validateStatus: 'error',
                        })}
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
        </Button>
                </Form.Item>
            </Form>
        </Spin>
    );
};