import { useState } from "react";
import { Alert } from "~/components/alert/alert";
import Button from "~/components/button/button";
import { Form, FormFooter, FormInner } from "~/components/form/form";
import { CheckIcon } from "~/components/icon/icon";
import Input from "~/components/input/input";
import { ContentGeneric, Page } from "~/components/page/page";

export default function App() {
	const [name, setName] = useState('');
	const [artist, setArtist] = useState('');
	const [album, setAlbum] = useState('');
	const [albumArtist, setAlbumArtist] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const listen = async () => {
		setError('');
		setSuccess('');

		try {
			const res = await fetch(`/api/listen`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name,
					artist,
					album,
					albumArtist,
					submitter: 'citron-web'
				})
			});

			const data = await res.json();

			if (!res.ok) {
				setError(data.error);
				return;
			}

			setSuccess('Submitted listen');
		} catch (e) {
			setError((e as Error)?.message);
		}
	};

	return (
		<Page>
			<ContentGeneric>
				<h1>Listen</h1>
				{error && (
					<Alert type='error'>
						{error}
					</Alert>
				)}
				{success && (
					<Alert type='success'>
						{success}
					</Alert>
				)}
				<Form>
					<FormInner label='Name'>
						<Input type='text' value={name} onChange={setName} />
					</FormInner>
					<FormInner label='Artist'>
						<Input type='text' value={artist} onChange={setArtist} />
					</FormInner>
					<FormInner label='Album'>
						<Input type='text' value={album} onChange={setAlbum} />
					</FormInner>
					<FormInner label='Album artist'>
						<Input type='text' value={albumArtist} onChange={setAlbumArtist} />
					</FormInner>
					<FormFooter>
						<Button primary onClick={listen}>
							<CheckIcon />
							Submit
						</Button>
					</FormFooter>
				</Form>
			</ContentGeneric>
		</Page>
	)
}
