import { useHistory, useParams } from 'react-router-dom';

import logoImg from '../assets/images/logo.svg';
// import emptyQuestionsImg from '../assets/images/empty-questions.svg';

import '../styles/room.scss';
import { RoomCode } from '../components/RoomCode';
import { database } from '../services/firebase';
import { useRoom } from '../hooks/useRoom';
import { QuestionBox } from '../components/QuestionBox';
import { ActionIcon } from '../components/ActionButton';

type RoomParams = {
	id: string;
}

export function AdminRoom() {
	const history = useHistory();
	const roomId = useParams<RoomParams>().id;
	const { questions, title } = useRoom(roomId);

	async function handleDeleteQuestion(questionId: string) {
		if (window.confirm('Tem certeza que deseja excluir essa pergunta?')) {
			await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
		}
	}

	async function handleEndRoom() {
		if (window.confirm('Tem certeza que deseja encerrar a sala?')) {
			await database.ref(`rooms/${roomId}`).update({
				endedAt: new Date(),
			});

			history.push('/');
		}
	}

	async function handleMarkAsRead(questionId: string, isHighlighted: boolean) {
		await database.ref(`rooms/${roomId}/questions/${questionId}`)
		.update({
			isHighlighted: !isHighlighted,
		});		
	}

	async function handleMarkAsAnswered(questionId: string, alreadyAnswered: boolean) {
		await database.ref(`rooms/${roomId}/questions/${questionId}`)
		.update({
			isAnswered: !alreadyAnswered,
		});
	}

	return (
		<div id='room-container'>
			<header>
				<img src={logoImg} alt="Letmeask" />

				<section>
					<RoomCode value={roomId}/>

					<button className="end-room-btn" onClick={handleEndRoom}>
						Encerrar sala
					</button>
				</section>
			</header>

			<hr />

			<main>
				<div className='room-title'>
					<h1>{title}</h1>
					{
						questions.length > 0 &&
						<span className='questions-count-tag'>{questions.length} perguntas</span>
					}
				</div>
				
				<div className='questions-list'>
					{ 
						questions.map(question => (
							<QuestionBox key={question.id} { ...question}>
								<ActionIcon 
									onClick={() => handleMarkAsRead(question.id, question.isHighlighted)} 
									ariaLabel={'Destacar pergunta'}
									className={question.isHighlighted ? 'activated' : ''}
								>
									<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<circle cx="12.0003" cy="11.9998" r="9.00375" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
									<path d="M8.44287 12.3391L10.6108 14.507L10.5968 14.493L15.4878 9.60193" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
									</svg>
								</ActionIcon>
								<ActionIcon 
									onClick={() => handleMarkAsAnswered(question.id, question.isAnswered)} 
									ariaLabel={'Marcar como respondida'}
									className={question.isAnswered ? 'activated' : ''}
								>
									<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path fillRule="evenodd" clipRule="evenodd" d="M12 17.9999H18C19.657 17.9999 21 16.6569 21 14.9999V6.99988C21 5.34288 19.657 3.99988 18 3.99988H6C4.343 3.99988 3 5.34288 3 6.99988V14.9999C3 16.6569 4.343 17.9999 6 17.9999H7.5V20.9999L12 17.9999Z" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
									</svg>
								</ActionIcon>
								<ActionIcon 
									onClick={() => handleDeleteQuestion(question.id)} 
									ariaLabel={'Excluir pergunta'}
								>
									<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M3 5.99988H5H21" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
									<path d="M8 5.99988V3.99988C8 3.46944 8.21071 2.96074 8.58579 2.58566C8.96086 2.21059 9.46957 1.99988 10 1.99988H14C14.5304 1.99988 15.0391 2.21059 15.4142 2.58566C15.7893 2.96074 16 3.46944 16 3.99988V5.99988M19 5.99988V19.9999C19 20.5303 18.7893 21.039 18.4142 21.4141C18.0391 21.7892 17.5304 21.9999 17 21.9999H7C6.46957 21.9999 5.96086 21.7892 5.58579 21.4141C5.21071 21.039 5 20.5303 5 19.9999V5.99988H19Z" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
									</svg>
								</ActionIcon>
							</QuestionBox>
						))
					}
				</div>
				{/* <div className='empty-questions-placeholder'>
					<img src={emptyQuestionsImg} alt="Balões de perguntas" />

					<strong>Nenhuma pergunta por aqui...</strong>

					<p>Envie o código desta sala para seus amigos e comece a responder perguntas!</p>
				</div> */}
			</main>
		</div>
	)
}
