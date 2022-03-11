import React, { Fragment, useState, useEffect } from 'react';
import './App.css';
import { Button, Layout, Table, Menu } from 'antd';
import { PlusCircleFilled, DeleteFilled, EditFilled, ProfileFilled  } from "@ant-design/icons";
import EditContact from './EditContact';
import { connect } from "react-redux";
import { addContact, deleteContact, fetchContacts, editContact } from './redux/contacts/actions';


const { Header, Content, Sider } = Layout;

const App = ({contacts, addContact, deleteContact, fetchContacts, editContact}) => {

  const [showDrawer, setShowDrawer] = useState(false);
  const [errorInfo, setErrorInfo] = useState({});
  const [collapsed, setCollapsed] = useState(false);
  const [contact, setContact] = useState({
    first_name: "", 
    last_name: "", 
    email: "", 
    phone: null,
    key: "",
    id: ""
  });
  const [mode, setMode] = useState('add');

  useEffect(() => {
    console.log('inside useeffect')
    fetchContacts();
    // fetch(url)
    //  .then(resp => resp.json())
    //  .then(data => this.setState())
  },[])

  const onCollapse = isCollapsed => {
    setCollapsed(isCollapsed);
  };

  const handleEditFormOnFinish = (data) => {
    console.log('data in handleEditFormOnFinish', data)
    editContact(data);
    setShowDrawer(false);
    setContact({
      first_name: "", 
      last_name: "", 
      email: "", 
      phone: null,
      key: "",
      id: ""
    })
    setMode('add')
  }

  const handleAddFormOnFinish = (data) => {
    console.log('data in handleAddFormOnFinish', data)
    addContact({
      id: contacts.length+1,
      ...data
    })
    setShowDrawer(false);
  }

  const handleAddFormOnFinishFailed = (errorInfo) => {
    setErrorInfo(errorInfo);
  }

  const handleOnClose = () => {
    setShowDrawer(false);
    setContact({
      first_name: "", 
      last_name: "", 
      email: "", 
      phone: null,
      key: "",
      id: ""
    })
    setMode('add')
  }

  const openEditDrawer = (contact) => {
    setContact(contact);
    setShowDrawer(true);
    setMode('edit')
  }

  //console.log("values: ", values);
  
  const columns = [
    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'first_name',
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'last_name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, contact) => (
        <span>
          <Button 
            onClick={() => deleteContact(contact.id)} 
            icon={<DeleteFilled />} />
          <Button
            style={{ marginLeft: 5}}
            onClick={() => openEditDrawer(contact)} 
            icon={<EditFilled />} />
        </span>
      )
    }
  ];

  console.log('contacts', contacts)

  return (
    <Layout style={{ minHeight: '100vh' }}>
        <Sider 
          collapsible 
          collapsed={collapsed} 
          onCollapse={onCollapse}
          >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item style={{ fontSize: 18, marginTop: 12}} key="contacts" icon={<ProfileFilled />}>
              Contacts
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header style={{ padding: 0, background: "#fff", textAlign:"center", fontSize:20, fontStyle:"bold" }}>Contact Management System</Header>
          <Content style={{ margin: '0 16px' }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <Fragment>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
                  <div></div>
                  <div>
                    <Button 
                      type="primary" 
                      icon={<PlusCircleFilled />} 
                      onClick={() => setShowDrawer(true)}
                      >
                      Add
                    </Button>
                  </div>
                </div>
                
                <Layout.Content>
                  <Table dataSource={contacts} columns={columns} />
                </Layout.Content>
                {showDrawer && (
                  <EditContact 
                  show={showDrawer} 
                  handleOnClose={handleOnClose}
                  handleOnFinish={handleAddFormOnFinish}
                  handleOnFinishFailed={handleAddFormOnFinishFailed}
                  handleEditOnFinish={handleEditFormOnFinish}
                  initialValues={contact}
                  mode={mode}
                  />
                )}
                
              </Fragment>
            </div>
          </Content>
        </Layout>
      </Layout>
  );
}

const mapStateToProps = (state) => {
  // console.log('state in mapstatetoprops', state)
  return {
   contacts: state.contacts && state.contacts.allContacts
  }
}

const mapDispatchToProps = (dispatch) => {
  // console.log('dispatch in mapDispatchToProps', dispatch)
  return {
    addContact:(contact) => {
      dispatch(addContact(contact))
    },
    deleteContact: (id) => {
      dispatch(deleteContact(id))
    },
    fetchContacts:() => {
      dispatch(fetchContacts())
    },
    editContact: (id) => {
      dispatch(editContact(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App) ;
