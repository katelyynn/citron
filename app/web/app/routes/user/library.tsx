import { loadUser, UserPage } from "~/components/pages/user";
import { useOutletContext } from "react-router";
import type { User } from "@citron/share/user";
import type { Route } from "./+types/library";

export default function App({ loaderData }: Route.ServerComponentProps) {
	const { user } = useOutletContext<{ user: User }>();

	return (
		<p>library for {user.name}</p>
	)
}
