import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router";
import {useAppDispatch, useAppSelector} from "@/hook/hook";
import {selectUserRequest} from "@/Modules/user/userSelectors.ts";
import {getUser, updateUser} from "@/store/user/Slice/userSlice";
import {FormProps, Space} from 'antd';
import {Form, Input, Button, message} from "antd";
import {selectUserStatus} from "@/Modules/user/userSelectors.ts";
import {emailRules, phoneNumberRules, userNameRules} from "@/helpers/validation/registrationRules";
import {UserRequest} from "@/types/users.ts";

const UserPage: React.FC = () => {
  const {id} = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const {data: userData} = useAppSelector(selectUserRequest);
  const {isLoaded} = useAppSelector(selectUserStatus);
  const [isEdit, setIsEdit] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    id ? dispatch(getUser(id)) : null;
  }, [dispatch]);

  const onFinish: FormProps<UserRequest>['onFinish'] = async (updateUserData) => {
    setIsEdit(false)
    if (!id) return;
    try {
      await dispatch(updateUser({id, updateUserData})).unwrap();
      await messageApi.success('Данные успешно обновлены');
    } catch (error: unknown) {
      await messageApi.error('Ошибка обновления данных, имя и email обновляются вместе');
    }
  };

  const onFinishFailed: FormProps<UserRequest>['onFinishFailed'] = () => {
    messageApi.error('Пожалуйста, исправьте ошибки в форме');
  };

  return (
    <>
      {contextHolder}
      {isLoaded ? (
          <Form layout="vertical"
                style={{ maxWidth: 400 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                disabled={!isEdit}
                initialValues={{
                  username: userData?.username,
                  email: userData?.email,
                  phoneNumber: userData?.phoneNumber || 'Не указан',
                }}>
            <Form.Item<UserRequest> label="Имя пользователя" name="username" rules={userNameRules}>
              <Input/>
            </Form.Item>

            <Form.Item<UserRequest> label="Email пользователя" name="email" rules={emailRules}>
              <Input/>
            </Form.Item>

            <Form.Item<UserRequest> label="Номер телефона" name="phoneNumber" rules={phoneNumberRules}>
              <Input/>
            </Form.Item>

            <Space>
              <Form.Item label={null}>
                <Button disabled={isEdit} type="primary" onClick={() => setIsEdit(true)}>
                  Редактировать
                </Button>
              </Form.Item>

              <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                  Сохранить
                </Button>
              </Form.Item>

              <Form.Item label={null}>
                <Button disabled={false} type="primary">
                  <Link to="/home/users">Вернуться</Link>
                </Button>
              </Form.Item>
            </Space>
          </Form>
        ) : null}
    </>
  );
}


export default UserPage