import { useOutletContext } from "react-router";
import type { User } from "@citron/share/user";
import type { Route } from "./+types/library";
import { SectionHead } from "~/components/head/head";
import { Book5Regular } from "@mingcute/react/core-regular";

export default function App({ loaderData }: Route.ServerComponentProps) {
	const { user } = useOutletContext<{ user: User }>();

	return (
		<section>
			<SectionHead icon={Book5Regular}>
				Library
			</SectionHead>
		</section>
	)
}
