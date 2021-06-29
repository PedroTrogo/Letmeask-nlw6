import { ReactNode } from 'react';
import '../styles/action-button.scss';

type ActionIconProps = {
	icon?: string;
	alt?: string;
	onClick: () => void;
	ariaLabel: string;
	children?: ReactNode;
	className?: string;
	disabled?: boolean;
}

export function ActionIcon({ 
	icon, 
	children, 
	alt, 
	onClick,
	ariaLabel,
	className,
	disabled
}: ActionIconProps) {
	return (
		<button 
			className={`action-icon ${className}`} 
			onClick={onClick} 
			aria-label={ariaLabel}
			disabled={disabled}
		>
			{children}
			{
				icon &&
				<img src={icon} alt={alt}/>
			}
		</button>
	)
}