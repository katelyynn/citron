import { forwardRef, type ForwardedRef, type ReactElement, type ReactNode } from "react";
import styles from './cta.module.css';
import { Icon, SpinnerIcon } from "../icon/icon";
import { ArrowRightUpRegular, LeftRegular, RightRegular } from "@mingcute/react/core-regular";

interface CtaProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	loading?: boolean;
	disabled?: boolean;
	colourful?: boolean;
	placement?: 'left' | 'right';
	icon?: ReactElement;
	className?: string;
	children?: ReactNode;
	onClick?: () => void;
	href?: string;
	target?: '_blank';
}

const Cta = forwardRef<HTMLButtonElement, CtaProps>(
	({
		loading,
		disabled,
		colourful,
		placement = 'right',
		icon,
		className,
		children,
		onClick,
		href,
		target,
		...props
	}, ref) => {
		const classes = [
			styles.cta,
			colourful && styles.colourful,
			styles[`placement-${placement}`],
			className,
			'link-underline'
		].join(' ');

		function handleOnClick() {
			if (disabled || loading) return;

			onClick?.();
		}

		if (!icon) {
			if (target == '_blank') {
				icon = <Icon name={ArrowRightUpRegular} />
			} else if (placement == 'left') {
				icon = <Icon name={LeftRegular} />
			} else {
				icon = <Icon name={RightRegular} />
			}
		}

		const content = (
			<>
				{placement == 'left' && icon}
				{!loading ? children : (
					<>
						<SpinnerIcon />
						Loading
					</>
				)}
				{placement == 'right' && icon}
			</>
		);

		if (href) {
			return (
				<a className={classes} href={href} onClick={handleOnClick} disabled={disabled || loading} ref={ref as ForwardedRef<HTMLAnchorElement>} {...props}>
					{content}
				</a>
			)
		}

		return (
			<button className={classes} onClick={handleOnClick} disabled={disabled || loading} ref={ref} {...props}>
				{content}
			</button>
		)
	}
)

export default Cta;
