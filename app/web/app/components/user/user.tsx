import type { User, UserListView } from "@citron/share/user";
import styles from './user.module.css';
import { Avatar } from "../avatar/avatar";
import { DefaultLink } from "../link/link";
import type { ReactNode } from "react";

interface UserItemProps {
	user: User;
	layout?: UserListView;
}

export function UserItem({
	user,
	layout = 'list'
}: UserItemProps) {
	return (
		<div className={styles.item}>
			<Avatar className={styles.avatar} src={user.avatar} alt={user.name} />
			<div className={styles.content}>
				<DefaultLink className={styles.name} to={`/user/${user.name}`}>
					{user.name}
				</DefaultLink>
			</div>
		</div>
	)
}

interface UserListProps {
	layout?: UserListView;
	children?: ReactNode;
}

export function UserList({
	layout = 'list',
	children
}: UserListProps) {
	return (
		<div className={styles.list}>
			{children}
		</div>
	)
}
