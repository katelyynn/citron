import type { IconProps as MingCuteIconProps } from '@mingcute/react';
import type { ForwardRefExoticComponent } from 'react';
import styles from './icon.module.css';
import { LoadingRegular } from '@mingcute/react/core-regular';

type IconProps = {
	name: ForwardRefExoticComponent<MingCuteIconProps & React.RefAttributes<SVGSVGElement>>;
	className?: string;
} & Omit<MingCuteIconProps, 'ref' | 'name'>;

export function Icon({
	name: IconComponent,
	className,
	...props
}: IconProps) {
	return (
		<IconComponent className={[
			styles.icon,
			className
		].join(' ')} {...props} />
	)
}

export function SpinnerIcon() {
	return (
		<Icon name={LoadingRegular} className={styles.spinner} />
	)
}
