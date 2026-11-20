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
import type { Me } from "@citron/share/user";
import type { ReactNode } from "react";

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
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Gentium+Book+Plus:ital,wght@0,400;0,700;1,400;1,700&display=swap"
	}
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
			cookie: request.headers.get('cookie') || ''
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

// saves having to duplicate code
export function Wrapper({ loaderData, children }: { loaderData: { user: Me | null }, children: ReactNode }) {
	return (
		<AuthProvider initial={loaderData?.user}>
			<Header />
			{children}
			<Footer />
		</AuthProvider>
	);
}

export default function App({ loaderData }: Route.ComponentProps) {
	return (
		<Wrapper loaderData={loaderData}>
			<Outlet />
		</Wrapper>
	);
}

export function ErrorBoundary({ loaderData, error }: Route.ErrorBoundaryProps) {
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
		<Wrapper loaderData={loaderData || { user: null }}>
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
		</Wrapper>
	);
}
