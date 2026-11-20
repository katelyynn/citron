import { loadUser, UserPage } from "~/components/pages/user";
import type { Route } from "./+types/user.$name.library";
import { useOutletContext } from "react-router";
import type { User } from "@citron/share/user";

export default function App({ loaderData }: Route.ServerComponentProps) {
	const { user } = useOutletContext<{ user: User }>();

	return (
		<p>library for {user.name}</p>
	)
}
