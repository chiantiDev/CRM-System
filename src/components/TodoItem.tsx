import {FC, memo, useState} from "react";
import todoApi from '@/api/todoApi'
import {Button, Checkbox, CheckboxProps, Form, FormProps, Input, message,} from 'antd';
import {todoTitleRules} from "@/helpers/validation/todoTitleRules";
import {DeleteOutlined, EditOutlined, RollbackOutlined, SaveOutlined} from '@ant-design/icons';

type FieldType = {
  checkbox: boolean;
  input: string;
}

interface TodoItemProps {
  id: number
  titleTodo: string
  isDone: boolean
  onUpdate: () => Promise<void>
}

const TodoItem: FC<TodoItemProps> = ({id, titleTodo, isDone, onUpdate}) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm<FieldType>();

  const errorMessage = async (error: unknown) => {
    await messageApi.open({
      type: 'error',
      content: `${error}`,
    })
  }

  const onChangeStatusTodo: CheckboxProps['onChange'] = async (e): Promise<void> => {
    try {
      await todoApi.updateTodo(id, {isDone: e.target.checked})
      await onUpdate()
    } catch (error: unknown) {
      await errorMessage(error)
    }
  };

  const onFinish: FormProps<FieldType>['onFinish'] = async (values): Promise<void> => {
    try {
      await todoApi.updateTodo(id, {title: values.input})
      setIsEdit(false)
      await onUpdate()
    } catch (error: unknown) {
      await errorMessage(error)
    }
  };

  const onCancelEditTodo = () => {
    form.resetFields();
    setIsEdit(false)
  }

  const onDeleteTodo = async (): Promise<void> => {
    try {
      await todoApi.deleteTodo(id)
      await onUpdate()
    } catch (error: unknown) {
      await errorMessage(error)
    }
  }

  return (
    <>
      {contextHolder}
      <Form form={form} layout="inline" size={'large'}
            initialValues={{input: `${titleTodo}`}}
            onFinish={onFinish}
      >
        <Form.Item<FieldType> name="checkbox">
          <Checkbox checked={isDone} onChange={onChangeStatusTodo} />
        </Form.Item>

        <Form.Item<FieldType> name="input" rules={todoTitleRules}>
          <Input disabled={!isEdit} style={{textDecoration: isDone ? 'line-through' : 'none'}}/>
        </Form.Item>

        {!isEdit &&
          (<>
            <Form.Item>
              <Button color="primary" variant="solid"
                      icon={<EditOutlined />}
                      onClick={() => setIsEdit(true)}
              />
            </Form.Item>
            <Form.Item>
              <Button color="danger" variant="outlined"
                      icon={<DeleteOutlined />}
                      onClick={onDeleteTodo}
              />
            </Form.Item>
          </>)
        }
        {isEdit &&
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
                      onClick={onCancelEditTodo}
              />
            </Form.Item>
          </>)
        }
      </Form>
    </>
  )
}

export default memo(TodoItem)