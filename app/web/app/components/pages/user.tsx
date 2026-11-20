import type { User } from "@citron/share/user";
import type { ReactNode } from "react";
import { ContentAside, ContentMain, Page } from "../page/page";
import { Avatar } from "../avatar/avatar";
import { Tabs, type Tab } from "../tabs/tabs";
import { useLocation } from "react-router";

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
			href: '/library',
			children: 'Library'
		}
	];

	const location = useLocation();

	return (
		<Page>
			<ContentAside>
				<Avatar src={user.avatar} size='xl' alt={user.name} />
			</ContentAside>
			<ContentMain>
				<h1>{user.name}</h1>
				<Tabs tabs={tabs} location={location.pathname} starting={`/user/${user.name}`} />
				{children}
			</ContentMain>
		</Page>
	)
}
