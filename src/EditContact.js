import React, { useState, useEffect, Fragment } from 'react'
import propTypes from 'prop-types'
import { Drawer, Form, Button, Input } from 'antd'

const EditDrawer = ({
  show, 
  handleOnClose, 
  handleOnFinish, 
  handleOnFinishFailed,
  initialValues,
  mode,
  handleEditOnFinish
}) => {
  console.log('initialValues in edit form',initialValues)
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});

  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({});
  }, []);

  return (
    <Drawer 
      width={412}
      title={`${mode==='edit'?'Edit Contact':'Add Contact'}`}
      visible={show} 
      onClose={handleOnClose} 
      maskClosable={true}
      destroyOnClose={true}
      >
      
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={initialValues}
        onFinish={mode==='edit'?handleEditOnFinish:handleOnFinish}
        onFinishFailed={handleOnFinishFailed}
        autoComplete="off"
        layout="vertical"
      >

      <Form.Item
        style={{ display: 'none'}}
        label="Contact Id"
        name="id"
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="First Name"
        name="first_name"
        rules={[{ required: true, message: 'Please input your first Name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Last Name"
        name="last_name"
        rules={[{ required: true, message: 'Please input your last Name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input type="email"/>
      </Form.Item>

      <Form.Item
        label="Phone Number"
        name="phone"
        rules={[{ required: true, message: 'Please input your phone number!' }]}
      >
        <Input type="tel" minLength={10} maxLength={15}/>
      </Form.Item>

      <Form.Item
        shouldUpdate
        wrapperCol={{ offset: 8, span: 16 }}>
        {() => (
          <Fragment>
            <Button
              style={{ marginRight: 20 }}
              type="primary"
              htmlType="submit"
              // disabled={
              //   !form.isFieldsTouched(true) ||
              //   !!form.getFieldsError().filter(({ errors }) => errors.length).length
              // }
            >
              { mode === "edit" ? "Edit" : "Add"}
            </Button>
            <Button
              htmlType="button"
              onClick={() => form.resetFields()}
            >
            Reset
            </Button>
          </Fragment> 
        )}
        
      </Form.Item>

      <Form.Item>
          
      </Form.Item>
    </Form>

    </Drawer>
  );
}

EditDrawer.propTypes = {
  show: propTypes.bool.isRequired,
  handleOnClose: propTypes.func.isRequired,
  handleOnFinish: propTypes.func.isRequired,
  handleOnFinishFailed: propTypes.func.isRequired,
  initialValues: propTypes.object.isRequired,
  mode: propTypes.oneOf(['add', 'edit']),
  handleEditOnFinish: propTypes.func.isRequired
};

export default EditDrawer;