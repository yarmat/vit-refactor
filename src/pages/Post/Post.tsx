import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PREFIX } from '../../helpers/API';
import { PostProps } from '../../interfaces/post.interface';
import { useParams } from 'react-router-dom';
import { Result } from 'antd';

const Post: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [post, setPost] = useState<PostProps | null>(null);
	const [notFound, setNotFound] = useState<boolean>(false);

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

	if(notFound) {
		return <Result 
			status='404'
			title='404'
			subTitle='Sorry, the page you visited does not exist.'
		/>;
	}

	return (
		<div>
			<h1>{post?.title}</h1>
			<p>{post?.body}</p>
		</div>
	);
};

export default Post;