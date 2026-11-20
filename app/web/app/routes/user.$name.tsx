import { loadUser, UserPage } from "~/components/pages/user";
import { Outlet } from "react-router";
import type { Route } from "./+types/user.$name";
import { useEffect } from "react";

export async function loader({ params, request }: Route.LoaderArgs) {
	const name = params.name;

	const user = await loadUser(name, request);

	return { user };
}

export default function App({ loaderData }: Route.ServerComponentProps) {
	const { user } = loaderData;

	useEffect(() => {
		console.log('user layout mounted');
		return () => console.log('user layout unmounted');
	}, []);

	return (
		<UserPage user={user}>
			<Outlet context={{ user }} />
		</UserPage>
	)
}
