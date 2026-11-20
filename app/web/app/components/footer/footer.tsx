import { Link } from 'react-router';
import { CitronIcon } from '../icon/icon';
import styles from './footer.module.css';
import { DefaultLink } from '../link/link';

export function Footer() {
	return (
		<footer className={styles.footer}>
			<div className={styles.inner}>
				<sub className={styles.subName}>
					<Link className={styles.citron} to='/'>
						<CitronIcon />
						citron
					</Link>
				</sub>
				<sub className={styles.sub}>
					<span className={styles.copyright}>
						© 2026 yuzu, GPL-3.0
					</span>
					<span className={styles.subLinks}>
						<DefaultLink className={styles.subLink} to='/terms'>
							Terms of Use
						</DefaultLink>
						<DefaultLink className={styles.subLink} to='/privacy'>
							Privacy Policy
						</DefaultLink>
					</span>
				</sub>
			</div>
		</footer>
	)
}
