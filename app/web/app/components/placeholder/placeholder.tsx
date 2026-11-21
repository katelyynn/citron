import type { ReactNode } from 'react';
import styles from './placeholder.module.css';

interface SectionPlaceholderProps {
	head?: string;
	children: ReactNode;
}

export function SectionPlaceholder({
	head,
	children
}: SectionPlaceholderProps) {
	return (
		<div className={styles.section}>
			{head && (
				<strong className={styles.head}>
					{head}
				</strong>
			)}
			<p className={styles.body}>
				{children}
			</p>
		</div>
	)
}
