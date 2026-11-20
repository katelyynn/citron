import { ContentMain, Page } from "~/components/page/page";
import type { Route } from "./+types/community";
import { UserItem, UserList } from "~/components/user/user";
import type { User } from "@citron/share/user";

export async function loader({ request }: Route.LoaderArgs) {
	const res = await fetch(new URL(`/api/user`, request.url));

	if (!res.ok) {
		throw new Response('no users', { status: 404 });
	}

	const users: User[] = await res.json();

	return { users };
}

export default function App({ loaderData }: Route.ServerComponentProps) {
	const { users } = loaderData;

	return (
		<Page>
			<ContentMain>
				<h1>Community</h1>
				<UserList>
					{users.map((user, i) => (
						<UserItem user={user} key={i} />
					))}
				</UserList>
			</ContentMain>
		</Page>
	)
}
