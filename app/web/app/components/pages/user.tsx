import type { User } from "@citron/share/user";
import type { ReactNode } from "react";
import { ContentAside, ContentMain, Page } from "../page/page";
import { Avatar } from "../avatar/avatar";
import { Tabs, type Tab } from "../tabs/tabs";
import { useLocation } from "react-router";
import { DateTime } from "luxon";

export async function loadUser(name: string, request: Request): Promise<User> {
	const res = await fetch(new URL(`/api/user/${name}`, request.url));

	if (!res.ok) {
		throw new Response('user not found', { status: 404 });
	}

	const user = await res.json();

	return user;
}

interface UserPageProps {
	user: User;
	children: ReactNode;
}

export function UserPage({
	user,
	children
}: UserPageProps) {
	const tabs: Tab[] = [
		{
			href: '/',
			children: 'Home'
		},
		{
			href: '/wall',
			children: 'Wall'
		},
		{
			href: '/library',
			children: 'Library'
		},
		{
			href: '/friends',
			children: 'Friends'
		},
		{
			href: '/comments',
			children: 'Comments'
		},
		{
			href: '/lists',
			children: 'Lists'
		},
	];

	const location = useLocation();
	let path = location.pathname;

	if (path.startsWith(`/user/${user.name}/library/`))
		path = `/user/${user.name}/library`;

	return (
		<Page>
			<ContentAside>
				<Avatar src={user.avatar} size='xl' alt={user.name} />
			</ContentAside>
			<ContentMain>
				<h1>{user.name}</h1>
				<p>since {DateTime.fromISO(user.created).toLocaleString(DateTime.DATETIME_MED)}</p>
				<Tabs tabs={tabs} location={path} starting={`/user/${user.name}`} />
				{children}
			</ContentMain>
		</Page>
	)
}
