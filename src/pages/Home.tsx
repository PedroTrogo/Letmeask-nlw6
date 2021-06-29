import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import '../styles/auth.scss';
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

export function Home() {
	const history = useHistory();
	const { user, signInWithGoogle } = useAuth();
	const [ roomCode, setRoomCode ] = useState('');

	async function navigate() {
		if(!user) {
			await signInWithGoogle();
		}

		history.push('/rooms/new');
	}

	async function handleJoinRoom(event: FormEvent) {
		event.preventDefault();

		if(roomCode.trim() === '') {
			alert("Código incorreto!");
			return;
		}

		const roomRef = await database.ref(`rooms/${roomCode}`).get();
		
		if(!roomRef.exists()){
			alert("Código incorreto!");
			return;
		}

		if(roomRef.val().endedAt) {
			alert("Sala encerrada!");
			return;
		}

		history.push(`rooms/${roomCode}`);
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

					<button onClick={navigate} className={'google-button'} type="button">
						<img src={googleIconImg} alt="Logo do Google" />
						Crie sua sala com o Google
					</button>

					<div className="separator">ou entre em uma sala</div>

					<form onSubmit={handleJoinRoom}>
						<input 
							type="text" 
							placeholder={'Digite o código da sala'}
							onChange={(event) => setRoomCode(event.target.value)}
						/>

						<Button type={'submit'} disabled={roomCode.trim() === ''}>
							Entrar na sala
						</Button>
					</form>
				</div>
			</main>	
		</div>
	)
}
