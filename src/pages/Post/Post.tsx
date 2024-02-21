import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PREFIX } from '../../helpers/API';
import { PostProps } from '../../interfaces/post.interface';
import { useParams } from 'react-router-dom';
import { Result, Button, Card, List, Typography, Breadcrumb, Space } from 'antd';
import { Comments } from '../../interfaces/comments.interface';
import style from './Post.module.css';

const { Text, Paragraph, Title } = Typography;



const Post: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [post, setPost] = useState<PostProps | null>(null);
	const [comments, setComments] = useState<Comments[]>([]);
	const [notFound, setNotFound] = useState<boolean>(false);
	const [loadedComments, setLoadedComments] = useState<number>(0);

	useEffect(() => {
		const fetchPost = async () => {
			try {
				const response = await axios.get<PostProps>(`${PREFIX}/posts/${id}`);
				setPost(response.data);
			} catch (error) {
				setNotFound(true);
			}
		};
		fetchPost();
	}, [id]);

	useEffect(() => {
		if (post) {
			const fetchComments = async () => {
				try {
					const response = await axios.get<Comments[]>(`${PREFIX}/comments?_start=0&_limit=5`);
					setComments(response.data);
				} catch (error) {
					console.error(error);
				}
			};
			fetchComments();
		}
	}, [post]);

	const loadMoreComments = async () => {
		try {
			const response = await axios.get<Comments[]>(`${PREFIX}/comments?_start=${loadedComments}&_limit=5`);
			setComments([...comments, ...response.data]);
			setLoadedComments(loadedComments + 5);
		} catch (error) {
			console.error(error);
		}
	};

	if(notFound) {
		return <Result 
			status='404'
			title='404'
			subTitle='Sorry, the page you visited does not exist.'
		/>;
	}

	return (
		<div>
			<Space direction='vertical' size={30}>
				<Breadcrumb className={style['breadcrumb']}
					separator='>'
					items={[
						{
							title: <a href="/posts">All posts</a>
						},
						{
							title: post ? post.title : ''
						}
					]}
				/>
				{post && (
					<Card 
						// title={post.title}
					>
						<Paragraph>{post.body}</Paragraph>
						<Card>
							<Title className={style['comments']}>
							Comments
							</Title> 
							<List
								dataSource={comments}
								renderItem={(comment: Comments) => (
									<Card title={comment.name}>
										<Paragraph>{comment.body}</Paragraph>
										<Text className={style['email']}>Email: {comment.email}</Text>
									</Card>
								)}
							/>
							{comments.length > 0 && (
								<div className={style['btn']}>
									<Button className={style['button']} onClick={loadMoreComments}>
								Load More
									</Button>
								</div>

							)}
						</Card>
					</Card>
				)}
			</Space>
		</div>
	);
};

export default Post;
