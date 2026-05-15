import {FC} from "react";
import {TodoInfo, TodoStatus} from "../types/todo.ts";
import {Menu, type MenuProps} from 'antd';

interface TabsFilterTodoProps {
  todoStatus: TodoStatus;
  setTodoStatus: (value: TodoStatus) => void;
  todoInfo: TodoInfo;
}

const MenuFilterTodo: FC<TabsFilterTodoProps> = ({todoStatus, setTodoStatus, todoInfo}) => {
  type MenuItem = Required<MenuProps>['items'][number];

  const menuItems: MenuItem[] = [
    {
      key: 'all',
      label: `Все (${todoInfo.all})`,
    },
    {
      key: 'completed',
      label: `в работе (${todoInfo.completed})`,
    },
    {
      key: 'inWork',
      label: `сделано (${todoInfo.inWork})`,
    },
  ];

  const onClick: MenuProps['onClick'] = (e) => {
    setTodoStatus(e.key as TodoStatus)
  };

  return (
    <>
      <Menu mode="horizontal" selectedKeys={[todoStatus]} items={menuItems} onClick={onClick}/>
    </>
  )
}

export default MenuFilterTodo