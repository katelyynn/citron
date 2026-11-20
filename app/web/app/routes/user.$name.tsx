import { ContentAside, ContentMain, Page } from "~/components/page/page";
import type { Route } from "./+types/user.$name";
import { Avatar } from "~/components/avatar/avatar";

export async function loader({ params, request }: Route.LoaderArgs) {
	const name = params.name;

	const res = await fetch(new URL(`/api/user/${name}`, request.url));

	if (!res.ok) {
		throw new Response('user not found', { status: 404 });
	}

	const user = await res.json();

	return { user };
}

export default function App({ loaderData }: Route.ServerComponentProps) {
	const { user } = loaderData;

	return (
		<Page>
			<ContentAside>
				<Avatar src={user.avatar} size='xl' alt={user.name} />
			</ContentAside>
			<ContentMain>
				<h1>{user.name}</h1>
			</ContentMain>
		</Page>
	)
}
