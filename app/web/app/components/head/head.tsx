import type { ForwardRefExoticComponent, ReactElement, ReactNode, RefAttributes } from 'react';
import styles from './head.module.css';
import { Icon } from '../icon/icon';
import type { IconProps } from '@mingcute/react';

interface SectionHeadProps {
	icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
	children: ReactNode;
}

export function SectionHead({
	icon,
	children
}: SectionHeadProps) {
	return (
		<h2 className={styles.head}>
			<Icon className={styles.icon} name={icon} />
			{children}
		</h2>
	)
}
