import { useEffect, useState } from 'react';
import { PREFIX } from '../../API/API';
import { Post } from '../../interfaces/post.interfae';
import { Button, Table } from 'antd';
import style from './AllPosts.module.css';
import axios from 'axios';


const AllPosts: React.FC = () => {

	const [dataSource, setDataSource] = useState<Post[]>([]);

	// useEffect(() => {
	// 	data();
	// }, []);

	// const data = () => { 
	// 	fetch(`${PREFIX}/posts?_start=0&_limit=20`)
	// 		.then((res) => res.json())
	// 		.then((result) => {
	// 			setDataSource(result);
	// 		});
	// };
 
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
				<Button key={record.id} onClick={() => handleDelete(record.id)}>Delete</Button>
			)
		}
	];

	return (
		<div className={style['table']}>
			<Table
				columns={columns}
				rowKey="id"  
				dataSource={dataSource}
				bordered={true} />
		</div>
	);
};

export default AllPosts;


