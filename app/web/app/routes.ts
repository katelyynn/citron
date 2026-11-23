import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";
import { flatRoutes } from "@react-router/fs-routes";

export default [
	route('user/:name', 'routes/user/layout.tsx', [
		index('routes/user/_index.tsx'),
		route('wall', 'routes/user/wall.tsx'),
		route('comments', 'routes/user/comments.tsx'),

		route('library', 'routes/user/library/layout.tsx', [
			index('routes/user/library/listens.tsx'),
			route('artists', 'routes/user/library/artists.tsx'),
			route('albums', 'routes/user/library/albums.tsx'),
			route('songs', 'routes/user/library/songs.tsx'),
			route('favourites', 'routes/user/library/favourites.tsx'),
			route('rotation', 'routes/user/library/rotation.tsx'),
		]),
	]),

	route('login', 'routes/auth/login.tsx'),
	route('register', 'routes/auth/register.tsx'),

	route('terms', 'routes/legal/terms.tsx'),
	route('privacy', 'routes/legal/privacy.tsx'),

	route('community', 'routes/home/community.tsx'),

	route('listen', 'routes/dev/listen.tsx'),

	...(await flatRoutes())
] satisfies RouteConfig;
