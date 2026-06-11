// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {Provider} from "react-redux";
import {store} from "@/store";
import {ConfigProvider} from "antd";
import ruRU from 'antd/locale/ru_RU';
import App from "@/App";

const root = document.getElementById('root')

if (!root) {
  throw new Error('Root element not found')
}

createRoot(root).render(
  // <StrictMode>
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#7f265c',
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
    <Provider store={store}>
      <App/>
    </Provider>
  </ConfigProvider>
  // </StrictMode>
)