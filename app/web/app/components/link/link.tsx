type LinkProps = React.ComponentProps<'a'>;

export function Link({
	...props
}: LinkProps) {
	return (
		<a className='link-underline' {...props} />
	);
}
