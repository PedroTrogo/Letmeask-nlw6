import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import '../styles/auth.scss';
import { Button } from '../components/Button';
import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';

export function NewRoom() {
	const history = useHistory();
	const { user } = useAuth();
	const [roomName, setRoomName] = useState('');

	function handleCreateRoom(event: FormEvent){
		event.preventDefault();
		console.log('submit');

		if(roomName.trim() === ''){
			alert('O campo "Nome da sala" deve ser preenchido!');
			return;
		}

		const roomsRef = database.ref('rooms');

		const firebaseRoom = roomsRef.push({
			title: roomName,
			authorId: user?.id
		});

		history.push(`rooms/${firebaseRoom.key}`);
	}

	return (
		<div id='page-auth'>
			<aside>
				<img src={illustrationImg} alt={"Ilustração simbolizando perguntas e respostas"} />
				<strong>Toda pergunta tem uma resposta.</strong>

				<p>Aprenda e compartilhe conhecimento com outras pessoas</p>
			</aside>

			<main>
				<div className={'form-container'}>
					<img src={logoImg} alt="Letmeask" />

					<h2>Crie uma nova sala</h2>

					<form onSubmit={handleCreateRoom}>
						<input 
							type="text" 
							placeholder={'Nome da sala'}
							onChange={(event) => setRoomName(event.target.value)}
						/>

						<Button type={'submit'} disabled={roomName.trim() === ''}>
							Criar sala
						</Button>
					</form>

					<p>Quer entrar em uma sala já existente? <Link to='/'>Clique aqui</Link></p>
				</div>
			</main>
		</div>
	)
}
