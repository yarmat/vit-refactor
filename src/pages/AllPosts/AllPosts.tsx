import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PREFIX } from '../../helpers/API';
import { PostProps } from '../../interfaces/post.interface';
import { Button, Table, FloatButton } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined, FileSearchOutlined } from '@ant-design/icons';
import style from './AllPosts.module.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import PostManageModal from './Partials/PostManageModal';

const AllPosts: React.FC = () => {
	const [dataSource, setDataSource] = useState<PostProps[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [totalPages, setTotalPages] = useState<number>(0);
	const [loading, setLoading] = useState<boolean>(false);
	const {logout} = useAuth();

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

					<PostManageModal 
						post={record}
						onSuccess={fetchData}
					>
						<Button>
							<EditOutlined />
						</Button>
					</PostManageModal>

					<Link to={`${record.id}`}>
						<Button>
							<FileSearchOutlined />
						</Button>
					</Link> 
				</div>
			)
		}
	];

	return (
		<div className={style['table']}>
			<Button className={style['logout']} onClick={logout}>
				Logout
			</Button>
			<div>
				<PostManageModal 
					onSuccess={fetchData}
				>
					<FloatButton tooltip={<div>Add Post</div>} type="primary" icon={<PlusOutlined />}/>
				</PostManageModal>
			</div>

			<Table
				loading={loading}
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

		</div>
	);
};

export default AllPosts;

