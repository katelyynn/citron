import { loadUser, UserPage } from "~/components/pages/user";
import { useOutletContext } from "react-router";
import type { User } from "@citron/share/user";
import type { Route } from "./+types/library";
import { SectionHead } from "~/components/head/head";
import { DirectoryRegular } from "@mingcute/react/core-regular";

export default function App({ loaderData }: Route.ServerComponentProps) {
	const { user } = useOutletContext<{ user: User }>();

	return (
		<section>
			<SectionHead icon={DirectoryRegular}>
				Activity
			</SectionHead>
		</section>
	)
}
