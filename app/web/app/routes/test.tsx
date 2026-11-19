import Button from "~/components/button/button";
import type { Route } from "./+types/test";

export function meta({ }: Route.MetaArgs) {
	return [
		{ title: "New React Router App" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

export default function Page() {
	return (
		<>
			<Button>
				Button
			</Button>
			<Button primary>
				Button
			</Button>
			<Button disabled>
				Button
			</Button>
			<Button primary disabled>
				Button
			</Button>
			<Button loading>
				Button
			</Button>
			<Button primary loading>
				Button
			</Button>
		</>
	);
}
