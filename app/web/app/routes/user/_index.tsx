import { loadUser, UserPage } from "~/components/pages/user";
import { useOutletContext } from "react-router";
import type { User } from "@citron/share/user";
import type { Listen } from "@citron/share/listen";
import type { Route } from "./+types/_index";
import { SectionHead } from "~/components/head/head";
import { AlbumRegular, IterationCcwRegular, MusicRegular } from "@mingcute/react/core-regular";
import { Mic2Filled, StarTopperFilled } from "@mingcute/react/core-filled";
import { SectionPlaceholder } from "~/components/placeholder/placeholder";
import { useAuth } from "~/components/auth/provider";
import { SongList, SongRow } from "~/components/song/song";

export async function loader({ params, request }: Route.LoaderArgs) {
	const name = params.name;

	const res = await fetch(new URL(`/api/user/${name}/recent`, request.url));

	if (!res.ok) {
		throw new Response('user not found', { status: 404 });
	}

	const listens: Listen[] = await res.json();

	return { listens };
}

export default function App({ loaderData }: Route.ServerComponentProps) {
	const { user: auth } = useAuth();
	const { user } = useOutletContext<{ user: User }>();
	const { listens } = loaderData;

	const isOwn = auth?.id == user.id;

	return (
		<>
			<section>
				<SectionHead icon={StarTopperFilled}>
					Favourites
				</SectionHead>
				<SectionPlaceholder>
					{isOwn ? 'You have no favourites yet' : `${user.name} has no favourites yet`}
				</SectionPlaceholder>
			</section>
			<section>
				<SectionHead icon={IterationCcwRegular}>
					Rotation
				</SectionHead>
				<SectionPlaceholder>
					{isOwn ? 'You have nothing in rotation yet' : `${user.name} has nothing in ${user.pronouns.determiner} rotation`}
				</SectionPlaceholder>
			</section>
			<section>
				<SectionHead icon={Mic2Filled}>
					Recents
				</SectionHead>
				{listens.length > 0 ? (
					<SongList>
						{listens.map((listen, i) => (
							<SongRow
								id={listen.song.id}
								name={listen.song.name}
								artistId={listen.song.artist.id}
								artist={listen.song.artist.name}
								albumId={listen.song.album?.id}
								album={listen.song.album?.name}
							/>
						))}
					</SongList>
				) : (
					<SectionPlaceholder>
						{isOwn ? 'You haven\'t listened to anything recently' : `${user.name} has no recent listens`}
					</SectionPlaceholder>
				)}
			</section>
			<section>
				<SectionHead icon={Mic2Filled}>
					Artists
				</SectionHead>
				<SectionPlaceholder>
					{isOwn ? 'You have no artists in this range' : `${user.name} has no artists in this range`}
				</SectionPlaceholder>
			</section>
			<section>
				<SectionHead icon={AlbumRegular}>
					Albums
				</SectionHead>
				<SectionPlaceholder>
					{isOwn ? 'You have no albums in this range' : `${user.name} has no albums in this range`}
				</SectionPlaceholder>
			</section>
			<section>
				<SectionHead icon={MusicRegular}>
					Songs
				</SectionHead>
				<SectionPlaceholder>
					{isOwn ? 'You have no songs in this range' : `${user.name} has no songs in this range`}
				</SectionPlaceholder>
			</section>
		</>
	)
}
