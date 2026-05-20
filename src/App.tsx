import React, { useEffect } from 'react';
import {RouterProvider} from "react-router";
import { router } from './router';
import { useAppDispatch, useAppSelector } from './hook/hook';
import { checkAuthSession } from './store/loginSlice.ts';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.authorization);

  useEffect(() => {
    dispatch(checkAuthSession());
  }, [dispatch]);

  if (isLoading) {
    return <div>Инициализация приложения...</div>;
  }

  return <RouterProvider router={router} />;
};

export default App;