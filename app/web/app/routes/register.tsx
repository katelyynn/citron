import Button from "~/components/button/button";
import Cta from "~/components/cta/cta";
import { Form, FormFooter, FormInner } from "~/components/form/form";
import Input from "~/components/input/input";
import { Link } from "~/components/link/link";
import { ContentAside, Page } from "~/components/page/page";

export default function App() {
	return (
		<Page>
			<ContentAside>
				<h1>Register</h1>
				<p>By continuing, you agree to citron's <Link href='/terms'>Terms of Use</Link> and <Link href='/privacy'>Privacy Policy</Link>.</p>
				<Form>
					<FormInner label='Name'>
						<Input type='username' />
					</FormInner>
					<FormInner label='Email'>
						<Input type='email' />
					</FormInner>
					<FormInner label='Password'>
						<Input type='password' />
					</FormInner>
					<FormFooter>
						<Button primary>
							Register
						</Button>
					</FormFooter>
				</Form>
				<p>Been here before? <Cta href='/login'>Log in</Cta></p>
			</ContentAside>
		</Page>
	)
}
