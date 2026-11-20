import { LockRegular, MailRegular } from "@mingcute/react/core-regular";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Alert } from "~/components/alert/alert";
import { useAuth } from "~/components/auth/provider";
import Button from "~/components/button/button";
import Cta from "~/components/cta/cta";
import { Form, FormFooter, FormInner } from "~/components/form/form";
import { Icon } from "~/components/icon/icon";
import Input from "~/components/input/input";
import { DefaultLink } from "~/components/link/link";
import { ContentAside, ContentGeneric, Page } from "~/components/page/page";

export default function App() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const navigate = useNavigate();
	const { setUser } = useAuth();

	const login = async () => {
		setError('');

		try {
			const res = await fetch(`/api/auth/login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email,
					password
				}),
				credentials: 'include'
			});

			const data = await res.json();

			if (!res.ok) {
				setError(data.error);
				return;
			}

			setUser(data.user);
			navigate('/');
		} catch (e) {
			setError((e as Error)?.message);
		}
	};

	return (
		<Page>
			<ContentGeneric>
				<h1>Welcome back</h1>
				<p>By continuing, you agree to citron's <DefaultLink to='/terms'>Terms of Use</DefaultLink> and <DefaultLink to='/privacy'>Privacy Policy</DefaultLink>.</p>
				{error && (
					<Alert type='error'>
						{error}
					</Alert>
				)}
				<Form>
					<FormInner label='Email'>
						<Input icon={<Icon name={MailRegular} />} type='email' value={email} onChange={setEmail} />
					</FormInner>
					<FormInner label='Password'>
						<Input icon={<Icon name={LockRegular} />} type='password' value={password} onChange={setPassword} />
					</FormInner>
					<FormFooter>
						<Button primary onClick={login}>
							Login
						</Button>
					</FormFooter>
				</Form>
				<p>New here? <Cta to='/register'>Register an account</Cta></p>
			</ContentGeneric>
		</Page>
	)
}
