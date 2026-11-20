import { Link } from "react-router";
import { useAuth } from "../auth/provider";
import Button from "../button/button";
import { CitronIcon } from "../icon/icon";
import styles from './header.module.css';

export function Header() {
	const { user } = useAuth();

	if (!user) {
		return <LoggedOutHeader />
	}

	return (
		<header className={styles.header}>
			<div className={styles.left}>
				<Link className={styles.citron} to='/'>
					<CitronIcon />
					citron
				</Link>
			</div>
			<div className={styles.right}>
				<Button href={`/user/${user.name}`}>
					{user.name}
				</Button>
			</div>
		</header>
	)
}

function LoggedOutHeader() {
	return (
		<header className={styles.header}>
			<div className={styles.left}>
				<Link className={styles.citron} to='/'>
					<CitronIcon />
					citron
				</Link>
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
