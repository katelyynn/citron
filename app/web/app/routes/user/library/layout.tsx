import { useLocation, useOutletContext } from "react-router";
import type { User } from "@citron/share/user";
import { SectionHead } from "~/components/head/head";
import { Book5Regular, IterationCcwRegular, MusicRegular } from "@mingcute/react/core-regular";
import { Outlet } from "react-router";
import type { Route } from "./+types/layout";
import { Tabs, type Tab } from "~/components/tabs/tabs";
import { Icon } from "~/components/icon/icon";
import { CircleStarFilled, DiscAlbumFilled, Mic2Filled, StarTopperFilled } from "@mingcute/react/core-filled";

export default function App({ loaderData }: Route.ServerComponentProps) {
	const { user } = useOutletContext<{ user: User }>();

	const tabs: Tab[] = [
		{
			href: '/',
			children: (
				<>
					<Icon name={Mic2Filled} />
					Listens
				</>
			)
		},
		{
			href: '/artists',
			children: (
				<>
					<Icon name={CircleStarFilled} />
					Artists
				</>
			)
		},
		{
			href: '/albums',
			children: (
				<>
					<Icon name={DiscAlbumFilled} />
					Albums
				</>
			)
		},
		{
			href: '/songs',
			children: (
				<>
					<Icon name={MusicRegular} />
					Songs
				</>
			)
		},
		{
			href: '/favourites',
			children: (
				<>
					<Icon name={StarTopperFilled} />
					Favourites
				</>
			)
		},
		{
			href: '/rotation',
			children: (
				<>
					<Icon name={IterationCcwRegular} />
					Rotation
				</>
			)
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
