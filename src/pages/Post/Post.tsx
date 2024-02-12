import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PREFIX } from '../../helpers/API';
import { PostProps } from '../../interfaces/post.interfase';
import { useParams } from 'react-router-dom';

const Post: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [post, setPost] = useState<PostProps | null>(null);

	useEffect(() => {
		const fetchPost = async () => {
			try {
				const response = await axios.get<PostProps>(`${PREFIX}/posts/${id}`);
				setPost(response.data);
			} catch (error) {
				console.error(error);
			}
		};
		fetchPost();
	}, [id]);

	if (!post) {
		return <div>Error</div>;
	}

	return (
		<div>
			<h1>{post.title}</h1>
			<p>{post.body}</p>
		</div>
	);
};

export default Post;
