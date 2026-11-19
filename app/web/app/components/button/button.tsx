import { LoadingRegular } from "@mingcute/react/core-regular";
import { forwardRef, type ReactNode } from "react";
import styles from './button.module.css';

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
		...props
	}, ref) => {
		return (
			<button className={[
				styles.button,
				chibi && styles.chibi,
				primary && styles.primary,
				colourful && styles.colourful,
				accented && styles.accented,
				className
			].join(' ')} onClick={() => {
				if (disabled || loading) return;

				onClick?.();
			}} disabled={disabled || loading} ref={ref} {...props}>
				{!loading ? children : (
					<>
						<LoadingRegular />
						Loading
					</>
				)}
			</button>
		)
	}
)

export default Button;
