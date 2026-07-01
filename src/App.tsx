import React, { useEffect } from 'react';
import {RouterProvider} from "react-router";
import {router} from '@/router';
import {useAppDispatch, useAppSelector} from '@/hook/hook';
import {checkAuthSession} from '@/store/authorization/Slices/authorizationSlice';
import {ConfigProvider} from "antd";
import ruRU from 'antd/locale/ru_RU';
import {Spin} from "antd";
import {selectAuthSessionStatus, selectLoginStatus} from "@/Modules/authorization/authorizationSelectors.ts";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const sessionStatus = useAppSelector(selectAuthSessionStatus);
  const loginStatus = useAppSelector(selectLoginStatus);

  useEffect(() => {
    dispatch(checkAuthSession());
  }, [dispatch]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#7f265c',
        },
        components: {
          Modal: {
            colorBgMask: 'rgba(0,0,0,0.03)',
            boxShadow: '0'
          },
        },
      }}
      locale={{
        ...ruRU,
        Table: {
          ...ruRU.Table,
          triggerAsc: 'По возрастанию',
          triggerDesc: 'По убыванию',
          cancelSort: 'Отмена сортировки',
        },
      }}
    >
      {sessionStatus.isLoadingOrIdle || loginStatus.isLoading ? (
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