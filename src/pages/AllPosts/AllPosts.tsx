import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PREFIX } from '../../helpers/API';
import { PostProps } from '../../interfaces/post.interface';
import { Button, Input, Modal, Table, FloatButton, Spin } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined, FileSearchOutlined } from '@ant-design/icons';
import style from './AllPosts.module.css';
import { Link, useNavigate } from 'react-router-dom';

const AllPosts: React.FC = () => {
	const [dataSource, setDataSource] = useState<PostProps[]>([]);
	const [editRecord, setEditRecord] = useState<PostProps | null>(null);
	const [editTitle, setEditTitle] = useState<string>('');
	const [editBody, setEditBody] = useState<string>('');
	const [addPost, setAddPost] = useState<boolean>(false);
	const [newTitle, setNewTitle] = useState<string>('');
	const [newBody, setNewBody] = useState<string>('');
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [totalPages, setTotalPages] = useState<number>(0);
	const [loading, setLoading] = useState<boolean>(false);
	const navigate = useNavigate();

	useEffect(() => {
		fetchData();
	}, [currentPage]);

	const fetchData = () => {
		setLoading(true);
		axios.get<PostProps[]>(`${PREFIX}/posts?page=${currentPage}`)
			.then((res) => {
				setTimeout(() => { 
					setDataSource(res.data);
					setTotalPages(res.headers['x-total-count']);
					setLoading(false);
					window.scrollTo(0, 0);
				}, 1000); 
			})
			.catch((error) => {
				console.error(error);
				setLoading(false); 
			});
	};

	const handlePaginationChange = (page: number) => {
		setCurrentPage(page);
	};

	const handleDelete = (id: number) => {
		axios.delete(`${PREFIX}/posts/${id}`)
			.then(() => {
				setDataSource(prevdataSource => prevdataSource.filter(post => post.id !== id));
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const handleEdit = (record: PostProps) => {
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
				axios.put(`${PREFIX}/posts/${editRecord.id}`, {
					title: editTitle,
					body: editBody
				})
					.then(() => {
						setDataSource(updatedDataSource);
						setEditRecord(null);
					})
					.catch((error) => {
						console.error(error);
					});
			}
		}
	};

	const addingPost = () => {
		axios.post<PostProps>(`${PREFIX}/posts`, {
			title: newTitle,
			body: newBody
		})
			.then((res) => {
				setDataSource(prevdataSource => [res.data, ...prevdataSource]);
				setAddPost(false);
				setNewTitle('');
				setNewBody('');
			});
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
			render: (record: PostProps) => (
				<div>
					<Button 
						key={record.id} 
						onClick={() => handleDelete(record.id)}
						danger
					><DeleteOutlined /></Button>
					<Button onClick={() => handleEdit(record)}><EditOutlined /></Button>
					<Link to={`${record.id}`}><Button><FileSearchOutlined /></Button></Link> 
				</div>
			)
		}
	];

	return (
		<div className={style['table']}>
			<Button className={style['logout']} onClick={() => navigate('/')}>Logout</Button>
			<div>
				<FloatButton tooltip={<div>Add Post</div>} type="primary" onClick={() => setAddPost(true)} icon={<PlusOutlined />}/>
			</div>
			<Modal 
				title="Add Post"
				open={addPost}
				onCancel={() => setAddPost(false)}
				onOk={addingPost}
			>
				<Input 
					placeholder="Title"
					value={newTitle}
					onChange={(e) => setNewTitle(e.target.value)}
				/>
				<Input.TextArea 
					placeholder="Body"
					value={newBody}
					onChange={(e) => setNewBody(e.target.value)}
				/>
			</Modal>
			<Spin spinning={loading} tip="Loading..." size="large">
				<Table
					columns={columns}
					rowKey="id"  
					dataSource={dataSource}
					bordered={true} 
					pagination={{
						current: currentPage,
						total: totalPages * 10,
						onChange: handlePaginationChange
					}}
				/>


			</Spin>

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

