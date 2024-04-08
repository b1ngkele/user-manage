import styles from './app.module.less';
import { Button, Divider, Popconfirm, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { IUser } from './interface';
import { useSelector, useDispatch } from 'react-redux'
import { fetchData } from '@/utils/request'
import CreateOrEditModal from './component/CreateOrEditModal';
import { useRef } from 'react';
import { useRequest } from 'ahooks';

function App() {
  const userInfo = useSelector((state: {
    userInfo: IUser[]
  }) => state.userInfo);
  const dispatch = useDispatch();
  const { run: runDelete, loading } = useRequest(fetchData, {
    manual: true,
    onSuccess: (data) => {
      dispatch({
        type: 'delete',
        payload: data,
      })
    }
  });
  const modalRef = useRef<{
    show: (data?: IUser) => void
  }>();

  const handleEdit = (data) => {
    modalRef.current.show(data);
  }

  const handleDelete = (data) => {
    runDelete(data.name)
  }

  const columns: ColumnsType<IUser> = [{
    key: 'name',
    title: '姓名',
    dataIndex: 'name'
  },
  {
    key: 'age',
    title: '年龄',
    dataIndex: 'age'
  },
  {
    key: 'status',
    title: "状态",
    dataIndex: 'status',
    render: (status) => {
      if (status === 1) {
        return '未删除'
      } else {
        return '已删除'
      }
    }
  },
  {
    key: 'address',
    title: '地址',
    dataIndex: 'address'
  },
  {
    key: 'action',
    title: '操作',
    width: 200,
    render: (_, record) => {
      return (
        <>
          <a key="edit" onClick={handleEdit.bind(null, record)}>编辑</a>
          <Divider type="vertical" />
          <Popconfirm onConfirm={handleDelete.bind(null, record)} title="提示">
            <a key="delete" >删除</a>
          </Popconfirm>
        </>
      )
    }
  }]

  return (
    <>
      <div className={styles.App}>
        <div className={styles.actionBar}>
          <Button type='primary' onClick={() => {
            modalRef.current.show();
          }}>
            添加用户
          </Button>
        </div>
        <div>
          <Table
            columns={columns}
            dataSource={userInfo}
            loading={loading}
          />
        </div>
      </div>
      <CreateOrEditModal ref={modalRef} />
    </>
  );
}

export default App;
