import copyIcon from '../assets/images/copy.svg';

import '../styles/room-code.scss';

interface ButtonProps{
	value: string;
};

export function RoomCode({ value}: ButtonProps) {
	function handleCopyToClipboard() {
		navigator.clipboard.writeText(value);
	}

	return (
		<div id="room-code-container">
			<button onClick={handleCopyToClipboard}>
				<img src={copyIcon} alt="Copiar código"/>
			</button>

			<span>Sala #{value}</span>				
		</div>
	)
}
