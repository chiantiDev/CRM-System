import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../hook/hook.ts";
import {getProfileUser, logoutUser} from "../store/profile/Slices/profileSlice.ts";
import {Button, Card, Space, Typography } from "antd";
import {selectProfileRequest, selectProfileStatus} from "../Modules/profile/selectors.ts";
const { Title, Text } = Typography;

const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data: userProfile } = useAppSelector(selectProfileRequest);
  const { isLoading } = useAppSelector(selectProfileStatus);

  useEffect(() => {
    dispatch(getProfileUser())
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  if (isLoading) {
    return
  }

  return (
      <Card style={{width: 500, boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}>
        <Space orientation={'vertical'}>
          <Title level={2}>Данные о пользователе</Title>
          <span><Text strong>Имя пользователя: </Text><Text underline>{`${userProfile?.username}`}</Text></span>
          <span><Text strong>Email: </Text><Text underline>{`${userProfile?.email}`}</Text></span>
          <span><Text strong>Телефон: </Text><Text underline>{`${userProfile?.phoneNumber ? userProfile.phoneNumber : 'не указан'}`}</Text></span>
          <Button onClick={handleLogout} danger>Выйти</Button>
        </Space>
      </Card>
  )
};

export default ProfilePage;