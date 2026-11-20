import Button from "~/components/button/button";
import type { Route } from "./+types/test";
import { useState, type ReactNode } from "react";
import { CheckIcon, MinusIcon, PlusIcon, XIcon } from "~/components/icon/icon";
import Cta from "~/components/cta/cta";
import { ContentMain, Page } from "~/components/page/page";
import { Avatar } from "~/components/avatar/avatar";
import { SongList, SongRow } from "~/components/song/song";
import Input from "~/components/input/input";

export function meta({ }: Route.MetaArgs) {
	return [
		{ title: "New React Router App" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

export default function Test() {
	const [art, toggleArt] = useState(false);
	const [index, toggleIndex] = useState(false);
	const [avi, showAvi] = useState(false);
	const [primary, togglePrimary] = useState(false);

	const [inputError, setInputError] = useState(false);

	return (
		<>
			<Page>
				<ContentMain>
					<section>
						<DemoGrid>
							<DemoItem label='Button'>
								<Button primary={primary}>
									Button
								</Button>
								<Button primary={primary} disabled>
									Button
								</Button>
								<Button primary={primary} loading>
									Button
								</Button>
								<Button primary={primary}>
									<CheckIcon />
									Save
								</Button>
								<Button primary={primary}>
									<XIcon />
									Delete
								</Button>
								<Button primary={primary}>
									<PlusIcon />
									Add
								</Button>
								<Button primary={primary}>
									<MinusIcon />
									Minus
								</Button>
								<Button primary={primary} href='#'>
									Link
								</Button>
								<input type='checkbox' onChange={() => { togglePrimary(!primary) }} />
							</DemoItem>
							<DemoItem label='Cta'>
								<Cta>
									See more
								</Cta>
								<Cta placement='left'>
									See more
								</Cta>
								<Cta target='_blank'>
									See more
								</Cta>
								<Cta disabled>
									See more
								</Cta>
								<Cta placement='left' disabled>
									See more
								</Cta>
								<Cta target='_blank' disabled>
									See more
								</Cta>
								<Cta loading>
									See more
								</Cta>
								<Cta placement='left' loading>
									See more
								</Cta>
								<Cta target='_blank' loading>
									See more
								</Cta>
							</DemoItem>
						</DemoGrid>
					</section>
					<section>
						<DemoGrid>
							<DemoItem label='Input'>
								<Input type='text' error={inputError ? 'Put error text here' : undefined} />
								<Input type='email' error={inputError ? 'Put error text here' : undefined} />
								<Input type='password' error={inputError ? 'Put error text here' : undefined} />
								<input type='checkbox' onChange={() => { setInputError(!inputError) }} />
							</DemoItem>
						</DemoGrid>
					</section>
					<section>
						<DemoGrid>
							<DemoItem label='Avatar'>
								<Avatar src={avi ? 'https://github.com/katelyynn.png' : undefined} size='xs' />
								<Avatar src={avi ? 'https://github.com/katelyynn.png' : undefined} size='s' />
								<Avatar src={avi ? 'https://github.com/katelyynn.png' : undefined} size='m' />
								<Avatar src={avi ? 'https://github.com/katelyynn.png' : undefined} size='l' />
								<Avatar src={avi ? 'https://github.com/katelyynn.png' : undefined} size='xl' />
								<input type='checkbox' onChange={() => { showAvi(!avi) }} />
							</DemoItem>
						</DemoGrid>
					</section>
					<section>
						<DemoGrid>
							<DemoItem label='Song'>
								<SongList>
									<SongRow index={index ? 1 : undefined} art={art} id='0' name='is it new years yet?' artistId='0' artist='Sabrina Carpenter' />
									<SongRow index={index ? 2 : undefined} art={art} id='0' name='is it new years yet?' artistId='0' artist='Sabrina Carpenter' />
									<SongRow index={index ? 3 : undefined} art={art} id='0' name='is it new years yet?' artistId='0' artist='Sabrina Carpenter' />
									<SongRow index={index ? 4 : undefined} art={art} id='0' name='is it new years yet?' artistId='0' artist='Sabrina Carpenter' />
								</SongList>
								<input type='checkbox' onChange={() => { toggleArt(!art) }} />
								<input type='checkbox' onChange={() => { toggleIndex(!index) }} />
							</DemoItem>
						</DemoGrid>
					</section>
				</ContentMain>
			</Page>
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
