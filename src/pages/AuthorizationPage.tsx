import * as React from "react";
import {Link} from "react-router";
import {useAppDispatch, useAppSelector} from "@/hook/hook";
import {loginUser} from "@/store/authorization/Slices/authorizationSlice";
import {Button, Checkbox, Col, Form, Input, message, Row, Typography} from "antd";
const { Title, Text } = Typography;
import {loginRules, passwordRules} from "@/helpers/validation/registrationRules";
import bg from '@/accets/auth-bg.jpg'
import icon from '@/accets/iconLogin.jpg'
import {selectAuthSessionStatus} from "@/Modules/authorization/authorizationSelectors.ts";

interface authorizationFormValues {
  login: string;
  password: string;
}

const AuthorizationPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading: isSessionLoading } = useAppSelector(selectAuthSessionStatus);
  const [form] = Form.useForm<authorizationFormValues>();

  const onFinish = async (values: authorizationFormValues) => {
    try {
      await dispatch(loginUser(values)).unwrap()
    } catch (error: unknown) {
      if (typeof error === 'string') {
        message.error(error);
      }
    }
  };

  const onFinishFailed = async () => {
   await message.error('Пожалуйста, исправьте ошибки в форме');
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column', minHeight: "calc(100vh - 20px)", padding: "10px", backgroundColor: '#ffe6c8'}}>
      <Row style={{display: 'flex', flex: 1, backgroundColor: '#ffffff', border: '10px solid #fff', borderRadius: '50px',}}>
        <Col xs={0} md={12}
             style={{
               borderRadius: '50px 0 0 50px',
               background: `#ffffff url(${bg}) no-repeat left center / cover`,}}>
        </Col>

        <Col xs={24} md={12}
             style={{
               display: 'flex', justifyContent: 'center', alignItems: 'center'}}
        >
          <div style={{ width: '100%', maxWidth: '400px' }}>
            <div style={{ marginBottom: '24px' }}>
              <img src={icon} alt="Logo" style={{ height: '74px' }} />
            </div>

            <Title level={2} style={{ margin: '0 0 4px 26px' }}>
              Войдите в свой аккаунт
            </Title>

            <Text type="secondary" style={{ display: 'block', margin: '0 0 20px 26px' }}>
              Узнайте, что происходит с вашим бизнесом.
            </Text>

            <Form
              form={form}
              name="authorization"
              layout="vertical"
              requiredMark={false}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              disabled={isSessionLoading}
              autoComplete="off"
            >
              <Form.Item name="login" label="Логин" hasFeedback rules={loginRules} style={{ marginBottom: '20px' }}>
                <Input placeholder="user123" size="large" style={{ borderRadius: '6px' }} />
              </Form.Item>

              <Form.Item name="password" label="Пароль" hasFeedback rules={passwordRules} style={{ marginBottom: 0 }}>
                <Input.Password placeholder="****************" size="large" style={{ borderRadius: '6px' }} />
              </Form.Item>

              <Form.Item style={{ marginBottom: '24px' }}>
                <Row justify="space-between" align="middle">
                  <Col>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                      <Checkbox>Запомнить меня</Checkbox>
                    </Form.Item>
                  </Col>
                  <Col>
                    <Typography.Link style={{ color: '#7f265c', textDecoration: 'none', fontWeight: 500 }}>
                      Забыли пароль?
                    </Typography.Link>
                  </Col>
                </Row>
              </Form.Item>

              <Form.Item style={{ marginBottom: 0 }}>
                <Button type="primary" htmlType="submit" size="large" block
                        style={{backgroundColor: '#7f265c', borderRadius: '6px', height: '45px'}}>
                  Войти
                </Button>
              </Form.Item>
            </Form>

            <div style={{ textAlign: 'center', marginTop: '250px' }}>
              <Text type="secondary">Ещё не зарегистрированы?  </Text>
              <Link to="/registration" style={{ color: '#7f265c', fontWeight: 500, textDecoration: 'none' }}>
                Создайте аккаунт
              </Link>
            </div>

          </div>
        </Col>
      </Row>
    </div>
  );
}
export default AuthorizationPage