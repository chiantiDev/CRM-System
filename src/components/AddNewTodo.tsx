import {FC, memo} from 'react';
import type { FormProps } from 'antd';
import { Form, Input, Button } from 'antd';
import todoApi from "../api/todoApi.ts";
import {todoValidationRules} from "../helpers/todoValidationRules.ts";

type FieldType = {
  title: string;
}

type AddNewTodoProps = {
  updateTodoList: () => Promise<void>
}

const AddNewTodo: FC<AddNewTodoProps> = ({updateTodoList}) => {
  const [form] = Form.useForm<FieldType>();
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      await todoApi.addNewTodo(values.title)
      form.resetFields();
      await updateTodoList()
    } catch (error: unknown) {
      alert(error)
    }
  };

  return (
    <Form form={form} layout="inline" size={'large'} onFinish={onFinish}>
      <Form.Item<FieldType> name="title" rules={todoValidationRules}>
        <Input placeholder={'Task To Be Done...'}/>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Add</Button>
      </Form.Item>
    </Form>
  )
}

export default memo(AddNewTodo);