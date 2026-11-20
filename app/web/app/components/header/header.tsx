import { Link } from "react-router";
import { useAuth } from "../auth/provider";
import Button from "../button/button";
import { CitronIcon, Icon } from "../icon/icon";
import styles from './header.module.css';
import { Avatar } from "../avatar/avatar";
import { DefaultLink } from "../link/link";
import { Album3Regular, TrendingUpRegular } from "@mingcute/react/core-regular";
import { Group3Filled } from "@mingcute/react/core-filled";

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
				<div className={styles.leftNav}>
					<DefaultLink className={styles.nav} to='/browse'>
						<Icon name={Album3Regular} />
						Browse
					</DefaultLink>
					<DefaultLink className={styles.nav} to='/community'>
						<Icon name={Group3Filled} />
						Community
					</DefaultLink>
					<DefaultLink className={styles.nav} to='/trending'>
						<Icon name={TrendingUpRegular} />
						Trending
					</DefaultLink>
				</div>
			</div>
			<div className={styles.right}>
				<Button className={styles.user} to={`/user/${user.name}`}>
					<Avatar className={styles.avatar} size='xs' src={user.avatar} alt={user.name} />
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
					<Button to='/login'>
						Log in
					</Button>
					<Button primary to='/register'>
						Join for free
					</Button>
				</div>
			</div>
		</header>
	)
}
