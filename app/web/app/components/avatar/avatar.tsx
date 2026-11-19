import { User3Filled } from '@mingcute/react/core-filled';
import { Icon } from '../icon/icon';
import styles from './avatar.module.css';

interface AvatarProps {
	src?: string;
	size?: 'xs' | 's' | 'm' | 'l' | 'xl';
	alt?: string;
}

export function Avatar({
	src,
	size = 's',
	alt
}: AvatarProps) {
	return (
		<div className={[
			styles.avatar,
			styles[`size-${size}`]
		].join(' ')}>
			{src ? (
				<img className={styles.inner} src={src} alt={alt} />
			) : (
				<div className={styles.placeholder}>
					<Icon name={User3Filled} />
				</div>
			)}
		</div>
	)
}
