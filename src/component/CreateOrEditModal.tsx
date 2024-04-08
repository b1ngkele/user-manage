import { Modal, Form, Input, InputNumber } from "antd";
import React, { useImperativeHandle, useState } from "react";
import { useDispatch } from 'react-redux';
import { useRequest } from 'ahooks';
import { fetchData } from '@/utils/request'
import { IUser } from "@/interface";

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
}

const CreateOrEditModal = React.forwardRef((props, ref) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState<boolean>(false);
  const [initData, setInitData] = useState<Partial<IUser>>({});
  const dispatch = useDispatch();

  useImperativeHandle(ref, () => {
    return {
      show: (data: IUser) => {
        if (data) {
          form.setFieldsValue({
            ...data
          })
          setInitData(data)
        }
        setVisible(true);
      }
    }
  })

  const onCancel = () => {
    setVisible(false);
  }

  const { run: runCreate, loading: createLoading } = useRequest(fetchData, {
    manual: true,
    onSuccess: (data) => {
      dispatch({
        type: 'add',
        payload: data
      });
      onCancel();
    }
  });
  const { run: runEdit, loading: editLoading } = useRequest(fetchData, {
    manual: true,
    onSuccess: (data) => {
      dispatch({
        type: 'edit',
        payload: data
      });
      onCancel();
    }
  });

  const onOk = () => {
    form.validateFields().then((values) => {
      if (initData.name) {
        runEdit(values)
      } else {
        runCreate(values)
      }
    })
  }
  return (
    <Modal
      title={initData.name ? '编辑' : '创建'}
      width={800}
      open={visible}
      onCancel={onCancel}
      onOk={onOk}
      confirmLoading={createLoading || editLoading}
      afterClose={() => {
        setInitData({});
        form.resetFields()
      }}
    >
      <Form form={form} {...formItemLayout}>
        <Form.Item name="name" label="姓名" rules={[{ required: true, message: '请输入姓名' }]}>
          <Input disabled={!!initData.name} />
        </Form.Item>
        <Form.Item name="age" label="年龄" initialValue={1}>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="address" label="地址">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  )
})

export default CreateOrEditModal;