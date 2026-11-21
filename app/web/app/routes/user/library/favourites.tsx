import { useOutletContext } from "react-router";
import type { User } from "@citron/share/user";
import { SectionHead } from "~/components/head/head";
import { Book5Regular } from "@mingcute/react/core-regular";
import type { Route } from "./+types/listens";
import { StarTopperFilled } from "@mingcute/react/core-filled";

export default function App({ loaderData }: Route.ServerComponentProps) {
	const { user } = useOutletContext<{ user: User }>();

	return (
		<section>
			<SectionHead icon={StarTopperFilled}>
				Favourites
			</SectionHead>
		</section>
	)
}
