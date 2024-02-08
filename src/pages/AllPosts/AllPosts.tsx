import { useEffect, useState } from 'react';
import { PREFIX } from '../../helpers/API';
import { Post } from '../../interfaces/post.interfae';
import { Button, Input, Modal, Table } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import style from './AllPosts.module.css';
import axios from 'axios';


const AllPosts: React.FC = () => {

	const [dataSource, setDataSource] = useState<Post[]>([]);
	const [editRecord, setEditRecord] = useState<Post | null>(null);
	const [editTitle, setEditTitle] = useState<string>('');
	const [editBody, setEditBody] = useState<string>('');

 
	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = () => {
		axios.get<Post[]>(`${PREFIX}/posts?_start=5&_limit=40`)
			.then((res) => {
				setDataSource(res.data);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const handleDelete = (id: number) => {
		setDataSource(prevdataSource => prevdataSource.filter(post => post.id !== id));
	};

	const handleEdit = (record: Post) => {
		setEditRecord(record);
		setEditTitle(record.title);
		setEditBody(record.body);
	};

	const handleSaveEdit = () => {
		if (editRecord) {
			const editedIndex = dataSource.findIndex(post => post.id === editRecord.id);
			if (editedIndex !== -1) {
				const updatedDataSource = [...dataSource];
				updatedDataSource[editedIndex].title = editTitle;
				updatedDataSource[editedIndex].body = editBody;
				setDataSource(updatedDataSource);
			}
			setEditRecord(null);
		}
	};

	const columns = [
		{
			title: 'Title',
			dataIndex: 'title',
			key: 'title'
		},
		{
			title: 'Body',
			dataIndex: 'body',
			key: 'body'
		},
		{
			title: 'Action',
			key: 'action',
			render: (record: Post) => (
				<div>
					<Button 
						key={record.id} 
						onClick={() => handleDelete(record.id)}
						danger
					><DeleteOutlined /></Button>
					<Button onClick={() => handleEdit(record)}><EditOutlined /></Button>
				</div>
			)
		}
	];

	return (
		<div className={style['table']}>
			<Table
				columns={columns}
				rowKey="id"  
				dataSource={dataSource}
				bordered={true} 
			/>
			<Modal 
				title="Edit"
				open={!!editRecord}
				onCancel={() => setEditRecord(null)}
				onOk={handleSaveEdit}
			>
				<Input 
					value={editTitle}
					onChange={(e) => setEditTitle(e.target.value)}
				/>
				<Input.TextArea 
					value={editBody}
					onChange={(e) => setEditBody(e.target.value)}
				/>
			</Modal>
		</div>
	);
};

export default AllPosts;


