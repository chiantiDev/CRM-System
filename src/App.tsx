import React, { useEffect } from 'react';
import {RouterProvider} from "react-router";
import { router } from './router';
import {useAppDispatch, useAppSelector} from './hook/hook';
import { checkAuthSession } from './store/authorization/Slices/authorizationSlice.ts';
import {ConfigProvider, Spin} from 'antd';
import {selectAuthSessionStatus, selectLoginStatus} from "./Modules/authorization/selectors.ts";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoadingOrIdle } = useAppSelector(selectAuthSessionStatus);
  const { isLoading } = useAppSelector(selectLoginStatus);

  useEffect(() => {
      dispatch(checkAuthSession());
  }, [dispatch]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#7f265c',
        },
      }}
    >
      {isLoadingOrIdle || isLoading ? (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: '100vw',
          backgroundColor: '#f5f5f5'
        }}>
          <Spin size="large" description="Загрузка приложения..." />
        </div>
      ) : (
        <RouterProvider router={router} />
      )}
    </ConfigProvider>
  )

};

export default App;