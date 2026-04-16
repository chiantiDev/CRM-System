import {FC} from 'react';
import type { FormProps } from 'antd';
import { Form, Input, Button } from 'antd';
import todoApi from "../../api/todoApi.ts";
import {todoValidationRules} from "../../helpers/validate/todoValidationRules.ts";

type FieldType = {
  title: string;
}

type AddNewTodoProps = {
  updateTodoList: () => Promise<void>
}

const AddNewTodo: FC<AddNewTodoProps> = ({updateTodoList}) => {
  const [form] = Form.useForm<FieldType>();

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
   await todoApi.addNewTodo(values.title)
    form.resetFields();
   await updateTodoList()
  };

  return (
    <Form
      form={form}
      layout="inline"
      size={'large'}
      style={{ width: '100%', marginBottom: 10}}
      onFinish={onFinish}
    >
      <Form.Item<FieldType>
        name="title"
        style={{flex: 1, marginRight: 10}}
        rules={todoValidationRules}
      >
        <Input placeholder={'Task To Be Done...'}/>
      </Form.Item>
      <Form.Item style={{ marginRight: 0 }}>
        <Button style={{width:'110px'}} type="primary" htmlType="submit">
          Add
        </Button>
      </Form.Item>
    </Form>
  )
}

export default AddNewTodo;