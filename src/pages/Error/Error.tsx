import { Result } from 'antd';

export function Error() {
	return <Result 
		status='404'
		title='404'
		subTitle='Sorry, the page you visited does not exist.'
	/>;
}

