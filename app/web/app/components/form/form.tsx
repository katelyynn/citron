import type { ReactNode } from 'react';
import styles from './form.module.css';

interface FormProps {
	children: ReactNode;
}

export function Form({
	children
}: FormProps) {
	return (
		<div className={styles.form}>
			{children}
		</div>
	)
}

interface FormInnerProps {
	label: string;
	children: ReactNode;
}

export function FormInner({
	label,
	children
}: FormInnerProps) {
	return (
		<div className={styles.inner}>
			<label className={styles.label}>
				{label}
			</label>
			{children}
		</div>
	)
}

interface FormFooterProps {
	children: ReactNode;
}

export function FormFooter({
	children
}: FormFooterProps) {
	return (
		<div className={styles.footer}>
			{children}
		</div>
	)
}
