import { User3Filled } from "@mingcute/react/core-filled";
import { LockRegular, MailRegular } from "@mingcute/react/core-regular";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Alert } from "~/components/alert/alert";
import Button from "~/components/button/button";
import Cta from "~/components/cta/cta";
import { Form, FormFooter, FormInner } from "~/components/form/form";
import { Icon } from "~/components/icon/icon";
import Input from "~/components/input/input";
import { Link } from "~/components/link/link";
import { ContentAside, Page } from "~/components/page/page";

export default function App() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const navigate = useNavigate();

	const register = async () => {
		setError('');

		try {
			const res = await fetch(`/api/auth/register`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name,
					email,
					password
				})
			});

			const data = await res.json();

			if (!res.ok) {
				setError(data.error);
				return;
			}

			navigate('/login');
		} catch (e) {
			setError((e as Error)?.message);
		}
	};

	return (
		<Page>
			<ContentAside>
				<h1>Register</h1>
				<p>By continuing, you agree to citron's <Link href='/terms'>Terms of Use</Link> and <Link href='/privacy'>Privacy Policy</Link>.</p>
				{error && (
					<Alert type='error'>
						{error}
					</Alert>
				)}
				<Form>
					<FormInner label='Name'>
						<Input icon={<Icon name={User3Filled} />} type='username' value={name} onChange={setName} />
					</FormInner>
					<FormInner label='Email'>
						<Input icon={<Icon name={MailRegular} />} type='email' value={email} onChange={setEmail} />
					</FormInner>
					<FormInner label='Password'>
						<Input icon={<Icon name={LockRegular} />} type='password' value={password} onChange={setPassword} />
					</FormInner>
					<FormFooter>
						<Button primary onClick={register}>
							Register
						</Button>
					</FormFooter>
				</Form>
				<p>Been here before? <Cta href='/login'>Log in</Cta></p>
			</ContentAside>
		</Page>
	)
}
