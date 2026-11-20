import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";
import { flatRoutes } from "@react-router/fs-routes";

export default [
	route('user/:name', 'routes/user/layout.tsx', [
		index('routes/user/_index.tsx'),
		route('library', 'routes/user/library.tsx')
	]),

	route('login', 'routes/auth/login.tsx'),
	route('register', 'routes/auth/register.tsx'),

	route('terms', 'routes/legal/terms.tsx'),
	route('privacy', 'routes/legal/privacy.tsx'),

	...(await flatRoutes())
] satisfies RouteConfig;
