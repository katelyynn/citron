import type { Route } from "./+types/user.$id";

export async function loader({ params, request }: Route.LoaderArgs) {
	const id = params.id;

	const res = await fetch(new URL(`/api/user/${id}`, request.url));

	if (!res.ok) {
		throw new Response('user not found', { status: 404 });
	}

	const user = await res.json();

	return { user };
}

export default function App({ loaderData }: Route.ServerComponentProps) {
	const { user } = loaderData;

	return (
		<div>
			<p>{user.name}</p>
		</div>
	)
}
