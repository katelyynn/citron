import { Link as ReactLink, type LinkProps as ReactLinkProps } from 'react-router';

type LinkProps = ReactLinkProps;

export function Link({
	...props
}: LinkProps) {
	return (
		<ReactLink className='link-underline' {...props} />
	);
}
