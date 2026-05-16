import {Link, useNavigate} from "react-router";
import * as React from "react";
import {useAppDispatch, useAppSelector} from "../hook/hook.ts";
import { authorizationUser } from "../store/authorizationSlice.ts";
import {Button, Card, Flex, Form, Input, message, Space} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {loginRules, passwordRules} from "../helpers/validation/registrationRules.ts";
import {useEffect} from "react";

interface authorizationFormValues {
  login: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { token, isLoading } = useAppSelector((state) => state.authorization);
  const [form] = Form.useForm<authorizationFormValues>();

  useEffect(() => {
    if (token) {
      navigate('/', { replace: true });
    }
  }, [token, navigate]);

  const onFinish = async (values: authorizationFormValues) => {
    try {
      await dispatch(authorizationUser(values)).unwrap()
      navigate('/home', { replace: true });
    } catch (error: unknown) {
      if (typeof error === 'string') {
        message.error(error);
      }
    }
  };

  const onFinishFailed = () => {
    message.error('Пожалуйста, исправьте ошибки в форме');
  };

  return (
    <>
      <Flex justify="center" align="center">
        <Card style={{width: 500, boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}>
          <Form form={form}
                name="authorization"
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                disabled={isLoading}
          >
            <Form.Item<authorizationFormValues>
              name="login"
              label="Логин"
              rules={loginRules}
            >
              <Input prefix={<UserOutlined/>}/>
            </Form.Item>

            <Form.Item<authorizationFormValues>
              name="password"
              label="Пароль"
              rules={passwordRules}
              hasFeedback
            >
              <Input.Password prefix={<LockOutlined/>}/>
            </Form.Item>
            <Space vertical={false}>
              <Form.Item>
                <Button type="primary" htmlType="submit">Войти</Button>
              </Form.Item>

              <Form.Item>
                <Button type="default"><Link to="/registration">Регистрация</Link></Button>
              </Form.Item>
            </Space>
          </Form>
        </Card>
      </Flex>
    </>
  )
}
export default LoginPage