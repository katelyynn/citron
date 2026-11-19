import Button from "~/components/button/button";
import type { Route } from "./+types/test";
import type { ReactNode } from "react";

export function meta({ }: Route.MetaArgs) {
	return [
		{ title: "New React Router App" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

export default function Page() {
	return (
		<>
			<section>
				<DemoGrid>
					<DemoItem label='Button'>
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
					</DemoItem>
				</DemoGrid>
			</section>
		</>
	);
}

function DemoGrid({
	children
}: { children: ReactNode }) {
	return (
		<div className='demo-grid'>
			{children}
		</div>
	)
}

interface DemoItemProps {
	label: string;
	children: ReactNode;
}

function DemoItem({
	label,
	children
}: DemoItemProps) {
	return (
		<div className='demo-item-wrap'>
			<h4 className='demo-label'>{label}</h4>
			<div className='demo-item'>
				{children}
			</div>
		</div>
	)
}
