import {FC, memo} from 'react';
import type { FormProps } from 'antd';
import { message, Form, Input, Button } from 'antd';
import todoApi from "../api/todoApi.ts";
import {validationLengthTitleTodo} from "../helpers/validationLengthTitleTodo.ts";

type FieldType = {
  title: string;
}

type AddNewTodoProps = {
  onUpdate: () => Promise<void>
}

const AddNewTodo: FC<AddNewTodoProps> = ({onUpdate}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm<FieldType>();
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      await todoApi.addNewTodo(values.title)
      form.resetFields();
      await onUpdate()
    } catch (error: unknown) {
      messageApi.open({
        type: 'error',
        content: `${error}`,
      })
    }
  };

  return (
    <>
      {contextHolder}
      <Form form={form} layout="inline" size={'large'} onFinish={onFinish}>
        <Form.Item<FieldType> name="title" rules={validationLengthTitleTodo(2, 64)}>
          <Input placeholder={'Task To Be Done...'}/>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Add</Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default memo(AddNewTodo);