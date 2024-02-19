import React, { ReactNode, useState } from 'react';
import { PostProps } from '../../../interfaces/post.interface';
import { Form, Input, Modal } from 'antd';
import axios from 'axios';
import { PREFIX } from '../../../helpers/API';


type Props = {
    post?: PostProps
    children: ReactNode
	onSuccess?: (post: PostProps) => void
}

type Payload = {
	title: string
	body: string
}

const PostManageModal: React.FC<Props> = ({children, post, onSuccess}) => {
	const [visible, setVisible] = useState(false);
	const [form] = Form.useForm();

	const openModal = () => {
		setVisible(true);
	};

	const closeModal = () => {
		setVisible(false);
	};

	const updateHandler = (post: PostProps, payload: Payload) => {
		axios
			.put(`${PREFIX}/posts/${post.id}`, payload)
			.then(() => {
				post.title = payload.title;
				post.body = payload.body;
				onSuccess && onSuccess(post);
				closeModal();
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const storeHandler = (payload: object) => {
		axios
			.post<PostProps>(`${PREFIX}/posts`, payload)
			.then((res) => {
				onSuccess && onSuccess(res.data);
				form.resetFields();
				closeModal();
			})
			.catch((error) => {
				console.error(error);
			});
	};

	// обробник на додавання, редагування
	const handleSave = () => {
		form.validateFields().then((data) => {

			if (post) {
				updateHandler(post, data);
			} else {
				storeHandler(data);
			}
		});
	};

	return (
		<>
			<span onClick={openModal}>{children}</span>
			
			<Modal
				onOk={handleSave}
				onCancel={closeModal}
				open={visible}
				title={post ? 'Edit post' : 'Create Post'}
			>
				<Form
					form={form}
					initialValues={{
						title: post?.title,
						body: post?.body
					}}
				>
					<Form.Item name="title" rules={[{ required: true, message: 'Enter title' }]}>
						<Input 
							placeholder="Title"
						/>
					</Form.Item>

					<Form.Item name={'body'} rules={[{ required: true, message: 'Enter body'  }]}>
						<Input.TextArea 
							placeholder="Body"
						/>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};

export default PostManageModal;

// import React, { ReactNode, useState } from 'react';
// import { PostProps } from '../../../interfaces/post.interface';
// import { Form, Input, Modal } from 'antd';
// import axios from 'axios';
// import { PREFIX } from '../../../helpers/API';


// type Props = {
//     post?: PostProps
//     children: ReactNode
// 	onSuccess?: () => void
// }

// const PostManageModal: React.FC<Props> = ({children, post, onSuccess}) => {
// 	const [visible, setVisible] = useState(false);
// 	const [form] = Form.useForm();

// 	const openModal = () => {
// 		setVisible(true);
// 	};

// 	const closeModal = () => {
// 		setVisible(false);
// 	};

// 	// обробник на додавання, редагування
// 	const handleSave = () => {
// 		form.validateFields().then((data) => {
// 			const { title, body } = data;

// 			if (post) {
// 				// редагування
// 				axios
// 					.put(`${PREFIX}/posts/${post.id}`, { title, body })
// 					.then(() => {
// 						// колбек на оновлення при збереженні
// 						onSuccess && onSuccess();
// 						closeModal();
// 					})
// 					.catch((error) => {
// 						console.error(error);
// 					});
// 			} else {
// 				// додавання
// 				axios
// 					.post<PostProps>(`${PREFIX}/posts`, { title, body })
// 					.then(() => {
// 						onSuccess && onSuccess();
// 						form.resetFields();
// 						closeModal();
// 					})
// 					.catch((error) => {
// 						console.error(error);
// 					});
// 			}
// 		});
// 	};

// 	return (
// 		<>
// 			<span onClick={openModal}>{children}</span>
			
// 			<Modal
// 				onOk={handleSave}
// 				onCancel={closeModal}
// 				open={visible}
// 				title={post ? 'Edit post' : 'Create Post'}
// 			>
// 				<Form
// 					form={form}
// 					initialValues={{
// 						title: post?.title,
// 						body: post?.body
// 					}}
// 				>
// 					<Form.Item name="title" rules={[{ required: true, message: 'Enter title' }]}>
// 						<Input 
// 							placeholder="Title"
// 						/>
// 					</Form.Item>

// 					<Form.Item name={'body'} rules={[{ required: true, message: 'Enter body'  }]}>
// 						<Input.TextArea 
// 							placeholder="Body"
// 						/>
// 					</Form.Item>
// 				</Form>
// 			</Modal>
// 		</>
// 	);
// };

// export default PostManageModal;