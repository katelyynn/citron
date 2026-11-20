import type { ReactNode } from 'react';
import styles from './alert.module.css';
import { Icon } from '../icon/icon';
import { InformationRegular } from '@mingcute/react/core-regular';
import { AlertFilled, CheckCircleFilled, CloseCircleFilled } from '@mingcute/react/core-filled';

interface AlertProps {
	type?: 'general' | 'warning' | 'error' | 'success';
	children: ReactNode;
}

export function Alert({
	type = 'general',
	children
}: AlertProps) {
	let icon = <Icon name={InformationRegular} />;

	switch (type) {
		case 'warning':
			icon = <Icon name={AlertFilled} />;
			break;
		case 'error':
			icon = <Icon name={CloseCircleFilled} />;
			break;
		case 'success':
			icon = <Icon name={CheckCircleFilled} />;
			break;
	}

	return (
		<label className={[
			styles.alert,
			'colourful',
			styles[type]
		].join(' ')}>
			{icon}
			{children}
		</label>
	)
}
