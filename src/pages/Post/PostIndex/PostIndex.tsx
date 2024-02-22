import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { PREFIX } from '@/helpers/API.ts';
import { PostProps } from '@/interfaces/post.interface.ts';
import {Button, Table, FloatButton, Popconfirm, Space, Typography, Card, message} from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined, FileSearchOutlined } from '@ant-design/icons';
import style from './PostIndex.module.css';
import { Link } from 'react-router-dom';
import PostManageModal from '@/pages/Post/Partials/PostManageModal.tsx';

const { Title } = Typography;

const PostIndex: React.FC = () => {
	const [dataSource, setDataSource] = useState<PostProps[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [currentLimit, setCurrentLimit] = useState<number>(10);
	const [totalPages, setTotalPages] = useState<number>(0);
	const [loading, setLoading] = useState<boolean>(false);
	const [messageApi, messageContext] = message.useMessage();

	const startLoading = () => setLoading(true);
	const stopLoading = () => setLoading(false);

	useEffect(() => {
		startLoading();
		axios.get<PostProps[]>(`${PREFIX}/posts?_start=${(currentPage - 1) * currentLimit}&_limit=${currentLimit}`)
			.then((res) => {
				setDataSource(res.data);
				setTotalPages(res.headers['x-total-count']);
				window.scrollTo(0, 0);
			})
			.catch((error) => {
				messageApi.error(error).then();
			}).finally(stopLoading);
	}, [messageApi, currentPage, currentLimit]);

	const handlePaginationChange = (page: number, pageSize: number) => {
		setCurrentPage(page);
		setCurrentLimit(pageSize);
	};

	const handleDelete = (id: number) => {
		setLoading(true);

		axios.delete(`${PREFIX}/posts/${id}`)
			.then(() => {
				setDataSource(prev => prev.filter(post => post.id !== id));
			})
			.catch((error) => {
				messageApi.error(error).then();
			}).finally(stopLoading);
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
				<>
					<Space>
						<Link to={`${record.id}`}>
							<Button icon={<FileSearchOutlined />} />
						</Link>

						<PostManageModal
							post={record}
							onSuccess={post => setDataSource(prev => prev.map(cp => cp.id === post.id ? post : cp))}
						>
							<Button icon={<EditOutlined />} />
						</PostManageModal>

						<Popconfirm
							title='Are you sure you want to delete this post?'
							onConfirm={() => handleDelete(record.id)}
							okText='Yes'
							cancelText='No'
						>
							<Button
								icon={<DeleteOutlined />}
								key={record.id} 
								danger
							/>
						</Popconfirm>
					</Space>
				</>
			)
		}
	];

	return (
		<>
			{ messageContext }
			<Title style={{margin: 0}} className={style['title']} level={2}>All Posts</Title>
			<Card>
				<PostManageModal 
					onSuccess={post => setDataSource(prev => [post, ...prev])}
				>
					<FloatButton tooltip={<div>Add Post</div>} type="primary" icon={<PlusOutlined />}/>
				</PostManageModal>
				<Table 
					loading={loading}
					columns={columns}
					rowKey="id"  
					dataSource={dataSource}
					bordered
					pagination={{
						current: currentPage,
						total: totalPages,
						onChange: handlePaginationChange
					}}
				/>
			</Card>
		</>
	);
};

export default PostIndex;
