import {
	isRouteErrorResponse,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { Footer } from "./components/footer/footer";
import { ContentMain, Page } from "./components/page/page";
import { AuthProvider } from "./components/auth/provider";
import { Header } from "./components/header/header";

export const links: Route.LinksFunction = () => [
	{ rel: "preconnect", href: "https://fonts.googleapis.com" },
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous",
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Hanken+Grotesk:ital,wght@0,100..900;1,100..900&display=swap",
	},
];

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export async function loader({ request }: Route.LoaderArgs) {
	const res = await fetch(new URL(`/api/auth/me`, request.url), {
		headers: {
			cookie: request.headers.get('citron') || ''
		},
	});

	if (!res.ok) {
		return {
			user: null
		}
	}

	const data = await res.json();

	return {
		user: data.user ?? null
	}
}

export default function App({ loaderData }: Route.ComponentProps) {
	return (
		<AuthProvider initial={loaderData.user}>
			<Header />
			<Outlet />
			<Footer />
		</AuthProvider>
	);
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	let message = "Oops!";
	let details = "An unexpected error occurred.";
	let stack: string | undefined;

	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? "404" : "Error";
		details =
			error.status === 404
				? "The requested page could not be found."
				: error.statusText || details;
	} else if (import.meta.env.DEV && error && error instanceof Error) {
		details = error.message;
		stack = error.stack;
	}

	return (
		<Page>
			<ContentMain>
				<section>
					<h1>{message}</h1>
					<p>{details}</p>
					{stack && (
						<pre>
							<code>{stack}</code>
						</pre>
					)}
				</section>
			</ContentMain>
		</Page>
	);
}
