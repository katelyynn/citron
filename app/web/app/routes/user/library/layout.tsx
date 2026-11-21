import { useLocation, useOutletContext } from "react-router";
import type { User } from "@citron/share/user";
import { SectionHead } from "~/components/head/head";
import { Book5Regular } from "@mingcute/react/core-regular";
import { Outlet } from "react-router";
import type { Route } from "./+types/layout";
import { Tabs, type Tab } from "~/components/tabs/tabs";

export default function App({ loaderData }: Route.ServerComponentProps) {
	const { user } = useOutletContext<{ user: User }>();

	const tabs: Tab[] = [
		{
			href: '/',
			children: 'Listens'
		},
		{
			href: '/artists',
			children: 'Artists'
		},
		{
			href: '/albums',
			children: 'Albums'
		},
		{
			href: '/songs',
			children: 'Songs'
		},
		{
			href: '/favourites',
			children: 'Favourites'
		},
		{
			href: '/rotation',
			children: 'Rotation'
		},
	];

	const location = useLocation();

	return (
		<section>
			<Tabs tabs={tabs} style='buttons' location={location.pathname} starting={`/user/${user.name}/library`} />
			<Outlet context={{ user }} />
		</section>
	)
}
