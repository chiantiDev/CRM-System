import React, { useEffect } from 'react';
import {RouterProvider} from "react-router";
import {router} from '@/router';
import {useAppDispatch, useAppSelector} from '@/hook/hook';
import {checkAuthSession} from '@/store/authorization/Slices/authorizationSlice';
import {selectAuthSessionStatus, selectLoginStatus} from "@/Modules/authorization/authorizationSelectors.ts";
import {Spin} from "antd";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const {isLoadingOrIdle } = useAppSelector(selectAuthSessionStatus);
  const { isLoading } = useAppSelector(selectLoginStatus);

  useEffect(() => {
    dispatch(checkAuthSession());
  }, [dispatch]);

  return (
    <>
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
    </>
  )

};

export default App;