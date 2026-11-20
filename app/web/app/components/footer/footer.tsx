import { CitronIcon } from '../icon/icon';
import styles from './footer.module.css';

export function Footer() {
	return (
		<footer className={styles.footer}>
			<sub className={styles.subName}>
				<a className={styles.citron} href='/'>
					<CitronIcon />
					citron
				</a>
			</sub>
			<sub className={styles.sub}>
				<span className={styles.copyright}>
					© 2026 yuzu, GPL-3.0
				</span>
			</sub>
		</footer>
	)
}
