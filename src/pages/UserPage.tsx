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
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm<UserRequest>();
  const [isEdit, setIsEdit] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [changedFields, setChangedFields] = useState<UserRequest>({});

  useEffect(() => {
    id ? dispatch(getUser(id)) : null;
  }, [dispatch, isUpdate]);

  useEffect(() => {
    if (userData) {
      form.setFieldsValue({
        username: userData.username,
        email: userData.email,
        phoneNumber: userData.phoneNumber || 'Не указан',
      });
    }
  }, [userData]);

  const handleValuesChange = (changedValues: UserRequest) => {
    setChangedFields((prev) => ({
      ...prev,
      ...changedValues
    }));
  };

  const onFinish: FormProps<UserRequest>['onFinish'] = async () => {
    if (!id) return;
    try {
      setIsEdit(false);
      await dispatch(updateUser({id, updateUserData: changedFields})).unwrap();
      await messageApi.success('Данные успешно обновлены');
      setIsUpdate(prev => !prev);
      setChangedFields({});
    } catch (error: unknown) {
      await messageApi.error('Ошибка обновления данных, имя и email обновляются вместе');
    }
  };

  const onFinishFailed: FormProps<UserRequest>['onFinishFailed'] = async () => {
    await messageApi.error('Пожалуйста, исправьте ошибки в форме');
  };

  return (
    <>
      {contextHolder}
      {isLoaded ? (
          <Form form={form}
                layout="vertical"
                style={{ maxWidth: 400 }}
                onValuesChange={handleValuesChange}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                disabled={!isEdit}
          >
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