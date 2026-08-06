import {FC, memo} from 'react';
import type {FormProps} from 'antd';
import {Button, Form, Input, message} from 'antd';
import todoApi from "@/api/todoApi";
import {todoTitleRules} from "@/helpers/validation/todoTitleRules";

type FieldType = {
  title: string;
}

interface AddNewTodoProps {
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
        <Form.Item<FieldType> name="title" rules={todoTitleRules}>
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