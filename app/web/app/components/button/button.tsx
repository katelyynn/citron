import { forwardRef, type ForwardedRef, type ReactNode } from "react";
import styles from './button.module.css';
import { SpinnerIcon } from "../icon/icon";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	loading?: boolean;
	disabled?: boolean;
	chibi?: boolean;
	colourful?: boolean;
	primary?: boolean;
	accented?: boolean;
	className?: string;
	children?: ReactNode;
	onClick?: () => void;
	href?: string;
	target?: '_blank';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({
		loading,
		disabled,
		chibi,
		colourful,
		primary,
		accented,
		className,
		children,
		onClick,
		href,
		target,
		...props
	}, ref) => {
		const classes = [
			styles.button,
			chibi && styles.chibi,
			primary && styles.primary,
			colourful && styles.colourful,
			accented && styles.accented,
			className
		].join(' ');

		function handleOnClick() {
			if (disabled || loading) return;

			onClick?.();
		}

		if (href) {
			return (
				<a className={classes} onClick={handleOnClick} disabled={disabled || loading} ref={ref as ForwardedRef<HTMLAnchorElement>} {...props}>
					{!loading ? children : (
						<>
							<SpinnerIcon />
							Loading
						</>
					)}
				</a>
			)
		}

		return (
			<button className={classes} onClick={handleOnClick} disabled={disabled || loading} ref={ref} {...props}>
				{!loading ? children : (
					<>
						<SpinnerIcon />
						Loading
					</>
				)}
			</button>
		)
	}
)

export default Button;
