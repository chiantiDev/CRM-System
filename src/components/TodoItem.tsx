import * as React from "react";
import {FC, memo, useState} from "react";
import todoApi from '../api/todoApi.ts'
import {Form, FormProps, Checkbox, CheckboxProps, Input, Button,} from 'antd';
import {todoValidationRules} from "../helpers/todoValidationRules.ts";
import {EditOutlined, DeleteOutlined, SaveOutlined, RollbackOutlined} from '@ant-design/icons';

type FieldType = {
  checkbox: boolean;
  input: string;
}

interface TodoItemProps {
  id: number
  titleTodo: string
  isDone: boolean
  updateTodoList: () => Promise<void>
}

const TodoItem: FC<TodoItemProps> = ({id, titleTodo, isDone, updateTodoList}) => {
  const [modeButtons, setModeButtons] = useState<'viewing' | 'editing'>('viewing');
  const [form] = Form.useForm<FieldType>();

  const onChangeCheckbox: CheckboxProps['onChange'] = async (e) => {
    try {
      await todoApi.updateTodo(id, {isDone: e.target.checked})
      await updateTodoList()
    } catch (error) {
      alert(`Ошибка запроса: ${error}`)
    }
  };

  const editingTodo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setModeButtons('editing')
  }

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      await todoApi.updateTodo(id, {title: values.input})
      setModeButtons('viewing')
      await updateTodoList()
    } catch (error) {
      alert(`Ошибка запроса: ${error}`)
    }
  };

  const cancelEditingTodo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    form.resetFields();
    setModeButtons('viewing')
  }

  const deletingTodo = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault()
      await todoApi.deleteTodo(id)
      await updateTodoList()
    } catch (error) {
      alert(`Ошибка запроса: ${error}`)
    }
  }

  return (
    <Form form={form} layout="inline" size={'large'}
          initialValues={{input: `${titleTodo}`}}
          onFinish={onFinish}
    >
      <Form.Item<FieldType> name="checkbox">
        <Checkbox checked={isDone} onChange={onChangeCheckbox} />
      </Form.Item>

      <Form.Item<FieldType> name="input" rules={todoValidationRules}>
        <Input disabled={modeButtons === 'viewing'} style={{textDecoration: isDone ? 'line-through' : 'none'}}/>
      </Form.Item>

      {modeButtons === 'viewing' &&
        (<>
          <Form.Item>
            <Button color="primary" variant="solid"
                    icon={<EditOutlined />}
                    onClick={editingTodo}
            />
          </Form.Item>
          <Form.Item>
            <Button color="danger" variant="outlined"
                    icon={<DeleteOutlined />}
                    onClick={deletingTodo}
            />
          </Form.Item>
        </>)
      }
      {modeButtons === 'editing' &&
        (<>
          <Form.Item>
            <Button color="green" variant="solid"
                    icon={<SaveOutlined />}
                    htmlType="submit"
            />
          </Form.Item>
          <Form.Item>
            <Button color="primary" variant="outlined"
                    icon={<RollbackOutlined />}
                    onClick={cancelEditingTodo}
            />
          </Form.Item>
        </>)
      }
    </Form>
  )
}

export default memo(TodoItem)