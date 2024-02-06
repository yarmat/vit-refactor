import { useEffect, useState } from 'react';
import { PREFIX } from '../../API/API';
import { Post } from '../../interfaces/post.interfae';
import { Button, Table } from 'antd';
import style from './AdminPages.module.css';
import axios from 'axios';



export function AdminPages() {

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
		axios.get(`${PREFIX}/posts?_start=0&_limit=20`)
			.then((res) => {
				setDataSource(res.data);
			})
			.catch((error) => {
				console.error('Error fetching data:', error);
			});
	};

	const handleDelete = (id: number) => {
		setDataSource(dataSource => dataSource.filter(post => post.id !== id));
	};

	const columns = [
		{
			title: '№',
			dataIndex: 'id'
		},
		{
			title: 'Title',
			dataIndex: 'title'
		},
		{
			title: 'Body',
			dataIndex: 'body'
		},
		{
			title: 'Action',
			key: 'action',
			render: (record: Post) => (
				<Button onClick={() => handleDelete(record.id)}>Delete</Button>
			)
		}
	];



	return (<div className={style['table']}>
		<Table columns={columns} dataSource={dataSource} />
	</div>);
}

