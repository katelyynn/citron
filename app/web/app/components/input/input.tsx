import { forwardRef, type ReactElement } from "react";
import styles from './input.module.css';

type InputProps = {
	type?: 'text' | 'username' | 'password' | 'email';
	disabled?: boolean;
	readOnly?: boolean;
	error?: string;
	className?: string;
	value?: string;
	onChange?: (v: string) => void;
	onSubmit?: (v: string) => void;
	icon?: ReactElement;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'ref' | 'onInput' | 'onChange'>;

const Input = forwardRef<HTMLInputElement, InputProps>(
	({
		type,
		disabled,
		readOnly,
		error,
		className,
		value,
		onChange,
		onSubmit,
		icon,
		...props
	}, ref) => {
		const classes = [
			styles.input,
			error && styles.error,
			icon && styles.icon,
			'colourful',
			className
		].join(' ');

		return (
			<div className={styles.container}>
				<input
					type={type}
					className={classes}
					value={value}
					disabled={disabled}
					readOnly={readOnly}
					onInput={(e) => {
						value = e.currentTarget.value;
						onChange?.(value);
					}}
					onKeyDown={(e) => {
						if (e.key == 'Enter') {
							onSubmit?.(e.currentTarget.value);
							return;
						}

						value = e.currentTarget.value;
						onChange?.(value);
					}}
					ref={ref}
					{...props}
				/>
				{icon && (
					<div className={styles.identifier}>
						{icon}
					</div>
				)}
			</div>
		)
	}
)

export default Input;
