import { useAuth } from "../auth/provider";
import Button from "../button/button";
import styles from './header.module.css';

export function Header() {
	const { user } = useAuth();

	if (!user) {
		return <LoggedOutHeader />
	}

	return <p>wip</p>
}

function LoggedOutHeader() {
	return (
		<header className={styles.header}>
			<div className={styles.left}>
				<a className={styles.logo} href='/'>
					citron
				</a>
			</div>
			<div className={styles.right}>
				<div className={styles.loggedOutPortal}>
					<Button href='/login'>
						Log in
					</Button>
					<Button primary href='/register'>
						Join for free
					</Button>
				</div>
			</div>
		</header>
	)
}
