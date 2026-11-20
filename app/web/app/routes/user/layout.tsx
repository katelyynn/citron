import { loadUser, UserPage } from "~/components/pages/user";
import { Outlet } from "react-router";
import type { Route } from "./+types/layout";

export async function loader({ params, request }: Route.LoaderArgs) {
	const name = params.name;

	const user = await loadUser(name, request);

	return { user };
}

export default function App({ loaderData }: Route.ServerComponentProps) {
	const { user } = loaderData;

	return (
		<UserPage user={user}>
			<Outlet context={{ user }} />
		</UserPage>
	)
}
