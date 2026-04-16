import * as React from "react";
import {FC, useState} from "react";
import todoApi from '../../api/todoApi.ts'
import {Form, FormProps, Checkbox, CheckboxProps, Input, Button,} from 'antd';
import {todoValidationRules} from "../../helpers/validate/todoValidationRules.ts";
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

  return (
    <Form form={form}
          layout="inline"
          size={'large'}
          style={{
            alignItems: 'center',
            width: '100%',
            marginBottom: 10,
            border: '1px solid #ccc',
            borderRadius: '6px',
            backgroundColor: '#f3f3f3',
            paddingBlock: '10px',
          }}
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
        <Input styles={{input: isDone ? { textDecoration: 'line-through' } : {}}}
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