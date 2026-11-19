import type { IconProps as MingCuteIconProps } from '@mingcute/react';
import type { ForwardRefExoticComponent } from 'react';
import styles from './icon.module.css';
import { AddRegular, CheckRegular, CloseRegular, Loading3Regular, LoadingRegular, MinimizeRegular } from '@mingcute/react/core-regular';

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
		<Icon name={Loading3Regular} className={styles.spinner} />
	)
}

export function CheckIcon() {
	return (
		<Icon name={CheckRegular} className={styles.check} />
	)
}

export function XIcon() {
	return (
		<Icon name={CloseRegular} className={styles.x} />
	)
}

export function PlusIcon() {
	return (
		<Icon name={AddRegular} className={styles.plus} />
	)
}

export function MinusIcon() {
	return (
		<Icon name={MinimizeRegular} className={styles.minus} />
	)
}
