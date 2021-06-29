import { ReactNode } from 'react';
import '../styles/question-box.scss';

type QuestionType = {
	id: string;
	author: {
		name: string;
		avatar: string;
	};
	content: string;
	isAnswered: boolean;
	isHighlighted: boolean;
	children: ReactNode;
}

export function QuestionBox({ content, author, children, isAnswered, isHighlighted}: QuestionType) {
	return (
		<div id='question-box' className={`${isAnswered ? 'answered' : ''} ${isHighlighted ? 'highlighted' : ''}`}>
			<p>{content}</p>

			<div className='question-box-footer'>
				<div className='user-info'>
					<img src={author.avatar} alt={author.name}/>
					<span>{author.name}</span>
				</div>

				<div className='question-control'>
					{children}
				</div>
			</div>
		</div>
	);
}
