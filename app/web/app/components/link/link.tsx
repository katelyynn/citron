import { Link as ReactLink, type LinkProps as ReactLinkProps } from 'react-router';

type LinkProps = {
	className?: string;
} & ReactLinkProps;

export function DefaultLink({
	className,
	...props
}: LinkProps) {
	return (
		<ReactLink className={['link-underline', className].join(' ')} {...props} />
	);
}
