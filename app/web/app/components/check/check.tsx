import { CheckRegular } from '@mingcute/react/core-regular';
import { Icon } from '../icon/icon';
import styles from './check.module.css';
import { useState } from 'react';

interface CheckboxProps {
	checked?: boolean;
	setChecked?: (v: boolean) => void;
	interactable?: boolean;
	disabled?: boolean;
}

export function Checkbox({
	checked = false,
	setChecked,
	interactable,
	disabled,
}: CheckboxProps) {
	if (setChecked) interactable = true;

	return (
		<div className={styles.container}>
			<button onClick={() => {
				if (!interactable || disabled) return;

				setChecked?.(!checked);
			}} className={[
				styles.checkbox,
				checked && styles.checked,
				interactable && styles.hoverable
			].join(' ')} disabled={disabled}>
				<Icon className={styles.check} name={CheckRegular} />
			</button>
		</div>
	)
}
