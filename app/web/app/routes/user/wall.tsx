import { loadUser, UserPage } from "~/components/pages/user";
import { useOutletContext } from "react-router";
import type { User } from "@citron/share/user";
import { SectionHead } from "~/components/head/head";
import { DirectoryRegular } from "@mingcute/react/core-regular";
import type { WallEntry } from "@citron/share/wall";
import type { Route } from "./+types/wall";

export async function loader({ params, request }: Route.LoaderArgs) {
	const name = params.name;

	const res = await fetch(new URL(`/api/wall/${name}`, request.url));

	if (!res.ok) {
		throw new Response('user not found', { status: 404 });
	}

	const wall: WallEntry[] = await res.json();

	return { wall };
}

export default function App({ loaderData }: Route.ServerComponentProps) {
	const { user } = useOutletContext<{ user: User }>();
	const { wall } = loaderData;

	return (
		<section>
			<SectionHead icon={DirectoryRegular}>
				Wall
			</SectionHead>
			{wall.map((entry, i) => (
				<p key={i}>{entry.id}</p>
			))}
		</section>
	)
}
