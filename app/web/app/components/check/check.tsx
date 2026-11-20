import { CheckRegular } from '@mingcute/react/core-regular';
import { Icon } from '../icon/icon';
import styles from './check.module.css';
import { useState } from 'react';

interface CheckboxProps {
	checked?: boolean;
	disabled?: boolean;
	onClick?: (v: boolean) => void;
	ignoreClicks?: boolean;
}

export function Checkbox({
	checked = false,
	disabled,
	onClick,
	ignoreClicks
}: CheckboxProps) {
	const [value, setValue] = useState(checked);

	return (
		<div className={styles.container}>
			<button onClick={() => {
				if (ignoreClicks || disabled) return;

				setValue(!value);
				onClick?.(value);
			}} className={[
				styles.checkbox,
				value && styles.checked,
				!ignoreClicks && styles.hoverable
			].join(' ')} disabled={disabled}>
				<Icon className={styles.check} name={CheckRegular} />
			</button>
		</div>
	)
}
