import * as React from "react";
import {FC, useState} from "react";
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
  const [form] = Form.useForm<FieldType>();
  const [modeButtons, setModeButtons] = useState<'viewing' | 'editing'>('viewing');

  const onChangeCheckbox: CheckboxProps['onChange'] = async (e) => {
    await todoApi.updateTodo(id, {isDone: e.target.checked})
    await updateTodoList()
  };

  const editingTodo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setModeButtons('editing')
  }

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    await todoApi.updateTodo(id, {title: values.input})
    setModeButtons('viewing')
    await updateTodoList()
  };

  const cancelEditingTodo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    form.resetFields();
    setModeButtons('viewing')
  }

  const deletingTodo = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    await todoApi.deleteTodo(id)
    await updateTodoList()
  }

    const boxStyleForm: React.CSSProperties = {
        alignItems: 'center',
        width: '100%',
        marginBottom: 10,
        boxShadow: '0 0 2px 1px var(--color-shodow)',
        borderRadius: '6px',
        backgroundColor: 'var(--color-background-50)',
        paddingBlock: '10px',
    }

    const boxStyleInput: React.CSSProperties = {
        textDecoration: isDone ? 'line-through' : 'none',
        border: "none",
        boxShadow: modeButtons === 'editing' ? '0 0 2px 1px var(--color-shodow)' : "none",
    }

  return (
    <Form form={form}
          layout="inline"
          size={'large'}
          style={boxStyleForm}
          initialValues={{
            input: `${titleTodo}`,
          }}
          onFinish={onFinish}>

      <Form.Item<FieldType>
        name="checkbox"
        style={{marginInline: 10}}
      >
        <Checkbox checked={isDone} onChange={onChangeCheckbox} />
      </Form.Item>

      <Form.Item<FieldType>
        name="input"
        style={{flex: 1, marginRight: 10}}
        rules={todoValidationRules}
      >
        <Input style={boxStyleInput}
               disabled={modeButtons === 'viewing'}
        />
      </Form.Item>

      {modeButtons === 'viewing' &&
        (<>
          <Form.Item style={{marginRight: 10}}>
            <Button color="primary" variant="solid"
                    icon={<EditOutlined style={{fontSize: '26px'}}/>}
                    onClick={editingTodo}
            />
          </Form.Item>
          <Form.Item style={{marginRight: 10}}>
            <Button color="danger" variant="outlined"
                    icon={<DeleteOutlined style={{fontSize: '26px'}}/>}
                    onClick={deletingTodo}
            />
          </Form.Item>
        </>)
      }
      {modeButtons === 'editing' &&
        (<>
          <Form.Item style={{marginRight: 10}}>
            <Button color="green" variant="solid"
                    icon={<SaveOutlined style={{fontSize: '26px'}} />}
                    htmlType="submit"
            />
          </Form.Item>
          <Form.Item style={{marginRight: 10}}>
            <Button color="primary" variant="outlined"
                    icon={<RollbackOutlined style={{fontSize: '26px'}}/>}
                    onClick={cancelEditingTodo}
            />
          </Form.Item>
        </>)
      }
    </Form>
  )
}

export default TodoItem