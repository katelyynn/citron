import { loadUser, UserPage } from "~/components/pages/user";
import { useOutletContext } from "react-router";
import type { User } from "@citron/share/user";
import { SectionHead } from "~/components/head/head";
import { Chat1Regular, DirectoryRegular } from "@mingcute/react/core-regular";
import type { WallEntry } from "@citron/share/wall";
import type { Route } from "./+types/comments";

export async function loader({ params, request }: Route.LoaderArgs) {
	const name = params.name;

	const res = await fetch(new URL(`/api/user/${name}/comments`, request.url));

	if (!res.ok) {
		throw new Response('user not found', { status: 404 });
	}

	const comments: WallEntry[] = await res.json();

	return { comments };
}

export default function App({ loaderData }: Route.ServerComponentProps) {
	const { user } = useOutletContext<{ user: User }>();
	const { comments } = loaderData;

	return (
		<section>
			<SectionHead icon={Chat1Regular}>
				Comments
			</SectionHead>
			{comments.map((entry, i) => (
				<p key={i}>{entry.id}</p>
			))}
		</section>
	)
}
