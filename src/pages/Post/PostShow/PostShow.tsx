import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import { PREFIX } from '@/helpers/API.ts';
import { PostProps } from '@/interfaces/post.interface.ts';
import {Link, useParams} from 'react-router-dom';
import {Result, Button, Card, List, Typography, Breadcrumb, Space, message} from 'antd';
import { Comments } from '@/interfaces/comments.interface.ts';
import style from './PostShow.module.css';

const {  Paragraph } = Typography;

const PostShow: React.FC = () => {
	/**
	 * Напевно тобі цікаво для чого цей firstInit потрібний 😁
	 * Закоментуй 40-й рядок і ти побачиш що по дефолту, в тебе будуть підгружатись не 5, а 10 коментарів (дублі)
	 * Також ти можеш подивитись на вкладці Networks, що там теж запити дублюються https://i.imgur.com/NXY2KhQ.png
	 * Чому так трапляється, ось пояснення https://ru.stackoverflow.com/questions/1405415/useeffect-%D0%B2%D1%8B%D0%B7%D1%8B%D0%B2%D0%B0%D0%B5%D1%82%D1%81%D1%8F-2-%D1%80%D0%B0%D0%B7%D0%B0-%D0%BF%D1%80%D0%B8-%D1%80%D0%B5%D0%BD%D0%B4%D0%B5%D1%80%D0%B5-%D0%BD%D0%B5%D1%81%D0%BC%D0%BE%D1%82%D1%80%D1%8F-%D0%BD%D0%B0-%D0%BF%D1%83%D1%81%D1%82%D0%BE%D0%B9-%D0%BC%D0%B0%D1%81%D1%81%D0%B8%D0%B2-%D0%B7%D0%B0%D0%B2%D0%B8%D1%81%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D0%B5%D0%B9
	 * Якщо коротко, то це через React.StrictMode який ми викликаємо в main.tsx, на продакшині, такої шляпи не буде, але для того
	 * щоб при розробці в нас теж все правильно працювало, використовуємо ось такий трюк.
	 * Запам'ятай цю штуку, в майбутньому знадобиться.
	 */
	const firstInit = useRef<boolean>(true);
	const { id } = useParams<{ id: string }>();
	const [loading, setLoading] = useState(false);
	const [post, setPost] = useState<PostProps | null>(null);
	const [comments, setComments] = useState<Comments[]>([]);
	const [notFound, setNotFound] = useState<boolean>(false);
	const [currentCommentPage, setCurrentCommentPage] = useState<number>(1);
	const [totalComments, setTotalComments] = useState<number>(0);
	const [messageApi, messageContext] = message.useMessage();

	const startLoading = () => setLoading(true);
	const stopLoading = () => setLoading(false);

	useEffect(() => {
		if (! firstInit.current) {
			return;
		}

		firstInit.current = false;

		startLoading();

		axios.get<PostProps>(`${PREFIX}/posts/${id}`)
			.then(r => setPost(r.data))
			.catch(() => setNotFound(false))
			.finally(stopLoading);

	}, [id]);

	useEffect(() => {
		if (post === null) {
			return;
		}

		startLoading();

		axios.get<Comments[]>(`${PREFIX}/comments?_start=${(currentCommentPage - 1) * 5}&_limit=5`)
			.then(r => {
				setComments(p => [...p, ...r.data]);
				setTotalComments(r.headers['x-total-count']);
			})
			.catch(e => messageApi.error(e))
			.finally(stopLoading);

	}, [post, currentCommentPage, messageApi]);

	const loadMoreComments = () => {
		setCurrentCommentPage(prev => prev+1);
	};

	if(notFound) {
		return <Result 
			status='404'
			title='404'
			subTitle='Sorry, the page you visited does not exist.'
		/>;
	}

	return (
		<Space className={style.container} style={{width: '100%'}} direction={'vertical'}>
			{ messageContext }

			<Breadcrumb
				className={style['breadcrumb']}
				separator='>'
				itemRender={(item) => {
					return item.href ? <Link to={item.href}>{item.title}</Link> : <span>{item.title}</span>;
				}}
				items={[
					{ title: 'All posts',  href: '/posts'},
					{ title: post ? post.title : '' }
				]}
			/>
			{post && (
				<Card
					loading={loading}
					title={post.title}
				>	
					<Paragraph>{post.body}</Paragraph>
				</Card>
			)}

			<Card title={'Comments'}>
				<List
					dataSource={comments}
					renderItem={(comment: Comments) => (
						<List.Item extra={`Email: ${comment.email}`}>
							<List.Item.Meta
								className={style['card']}
								title={comment.name}
								description={comment.body}
							/>
						</List.Item>

					)}
				/>
				{comments.length <= totalComments && (
					<div className={style['btn']}>
						<Button type={'primary'} loading={loading} onClick={loadMoreComments}>
							Load More
						</Button>
					</div>
				)}
			</Card>
		</Space>
	);
};

export default PostShow;
