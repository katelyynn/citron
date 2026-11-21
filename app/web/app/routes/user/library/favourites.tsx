import { useOutletContext } from "react-router";
import type { User } from "@citron/share/user";
import { SectionHead } from "~/components/head/head";
import { Book5Regular } from "@mingcute/react/core-regular";
import type { Route } from "./+types/listens";

export default function App({ loaderData }: Route.ServerComponentProps) {
	const { user } = useOutletContext<{ user: User }>();

	return (
		<section>
			<SectionHead icon={Book5Regular}>
				Listens
			</SectionHead>
		</section>
	)
}
