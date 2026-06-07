import * as React from "react";
import {useAppDispatch, useAppSelector} from "@/hook/hook";
import {registrationUser} from "@/store/registration/Slices/registrationSlice";
import {Link} from "react-router";
import {Button, Card, Flex, Form, Input, message, notification, Space, Typography} from "antd";
import {LockOutlined, MailOutlined, PhoneOutlined, UserOutlined} from '@ant-design/icons';
import {
  confirmPasswordRules,
  emailRules,
  loginRules,
  passwordRules,
  phoneNumberRules,
  userNameRules,
} from '@/helpers/validation/registrationRules';
import {selectRegistrationStatus} from "@/Modules/registration/selectors";

const { Text } = Typography;

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
  const { isLoading } = useAppSelector(selectRegistrationStatus);
  const [form] = Form.useForm<RegisterFormValues>();
  const [api, contextHolder] = notification.useNotification();

  const onFinish = async (values: RegisterFormValues) => {
    try {
      const { confirmPassword, ...restValues } = values;
      await dispatch(registrationUser(restValues)).unwrap()
      api.success({
        title: 'Регистрация успешна!',
        description: (
          <span>
            Теперь вы можете <Link to="/" style={{ fontWeight: 'bold' }} replace>войти в аккаунт</Link>.
          </span>
        ),
        duration: 0
      });
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
      {contextHolder}
      <Flex justify="center" align="center">
        <Card style={{width: 500, boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}>
          <Form form={form}
                name="register"
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                disabled={isLoading}
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
                <Button type="primary" htmlType="submit">Зарегистрироваться</Button>
              </Form.Item>

              <Form.Item>
                <Button type="default" onClick={() => form.resetFields()}>Сбросить всё</Button>
              </Form.Item>
            </Space>

            <div>
              <Text type="secondary">вы уже зарегистрированы? </Text>
              <Link to="/" style={{fontWeight: 500, textDecoration: 'none', color: '#7f265c'}}>Войти</Link>
            </div>
          </Form>
        </Card>
      </Flex>
    </>
  )
}
export default RegistrationPage