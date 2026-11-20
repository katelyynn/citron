import { loadUser, UserPage } from "~/components/pages/user";
import { useOutletContext } from "react-router";
import type { User } from "@citron/share/user";
import type { Route } from "./+types/_index";
import { SectionHead } from "~/components/head/head";
import { AlbumRegular, IterationCcwRegular, MusicRegular } from "@mingcute/react/core-regular";
import { Mic2Filled, StarTopperFilled } from "@mingcute/react/core-filled";

export default function App({ loaderData }: Route.ServerComponentProps) {
	const { user } = useOutletContext<{ user: User }>();

	return (
		<>
			<section>
				<SectionHead icon={StarTopperFilled}>
					Favourites
				</SectionHead>
			</section>
			<section>
				<SectionHead icon={IterationCcwRegular}>
					Rotation
				</SectionHead>
			</section>
			<section>
				<SectionHead icon={Mic2Filled}>
					Recents
				</SectionHead>
			</section>
			<section>
				<SectionHead icon={Mic2Filled}>
					Artists
				</SectionHead>
			</section>
			<section>
				<SectionHead icon={AlbumRegular}>
					Albums
				</SectionHead>
			</section>
			<section>
				<SectionHead icon={MusicRegular}>
					Songs
				</SectionHead>
			</section>
		</>
	)
}
