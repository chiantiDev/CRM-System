import * as React from "react";
import {Button, Card, Flex, Form, Input, message, Space} from "antd";
import {UserOutlined, MailOutlined, PhoneOutlined, LockOutlined} from '@ant-design/icons';
import {
  userNameRules,
  loginRules,
  passwordRules,
  confirmPasswordRules,
  emailRules,
  phoneNumberRules,
} from '../helpers/validation/registrationRules';

import {useAppDispatch} from "../hook/hook.ts";
import { registerUser } from "../store/registrationSlice.ts";

interface RegisterFormValues {
  username: string;
  login: string;
  password: string;
  confirmPassword: string;
  email: string;
  phoneNumber: string | undefined;
}

const RegistrationPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm<RegisterFormValues>();

  const onFinish = (values: RegisterFormValues) => {
    console.log('Success:', values);
    message.success('Регистрация успешна!');
    const { confirmPassword, ...restValues } = values;
    dispatch(registerUser(restValues))
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    message.error('Пожалуйста, исправьте ошибки в форме');
  };

  return (
    <Flex justify="center" align="center">
      <Card style={{width: 500, boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}>
        <Form form={form}
              name="register"
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
        >
          <Form.Item<RegisterFormValues>
            name="username"
            label="Имя"
            rules={userNameRules}
          >
            <Input prefix={<UserOutlined/>}/>
          </Form.Item>

          <Form.Item<RegisterFormValues>
            name="login"
            label="Логин"
            rules={loginRules}
          >
            <Input prefix={<UserOutlined/>}/>
          </Form.Item>

          <Form.Item<RegisterFormValues>
            name="password"
            label="Пароль"
            rules={passwordRules}
            hasFeedback
          >
            <Input.Password prefix={<LockOutlined/>}/>
          </Form.Item>

          <Form.Item<RegisterFormValues>
            name="confirmPassword"
            label="Повторите пароль"
            dependencies={['password']}
            rules={confirmPasswordRules()}
            hasFeedback
          >
            <Input.Password prefix={<LockOutlined/>}/>
          </Form.Item>

          <Form.Item<RegisterFormValues>
            name="email"
            label="E-mail"
            rules={emailRules}
          >
            <Input prefix={<MailOutlined/>}/>
          </Form.Item>

          <Form.Item<RegisterFormValues>
            name="phoneNumber"
            label="Телефон"
            rules={phoneNumberRules}
          >
            <Input prefix={<PhoneOutlined/>}/>
          </Form.Item>

          <Space vertical={false}>
            <Form.Item>
              <Button type="default" onClick={() => form.resetFields()}>Сбросить всё</Button>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">Зарегистрироваться</Button>
            </Form.Item>
          </Space>
        </Form>
      </Card>
    </Flex>
  )
}
export default RegistrationPage