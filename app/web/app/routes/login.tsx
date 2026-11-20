import { LockRegular, MailRegular } from "@mingcute/react/core-regular";
import Button from "~/components/button/button";
import Cta from "~/components/cta/cta";
import { Form, FormFooter, FormInner } from "~/components/form/form";
import { Icon } from "~/components/icon/icon";
import Input from "~/components/input/input";
import { Link } from "~/components/link/link";
import { ContentAside, ContentMain, Page } from "~/components/page/page";

export default function App() {
	return (
		<Page>
			<ContentAside>
				<h1>Welcome back</h1>
				<p>By continuing, you agree to citron's <Link href='/terms'>Terms of Use</Link> and <Link href='/privacy'>Privacy Policy</Link>.</p>
				<Form>
					<FormInner label='Email'>
						<Input icon={<Icon name={MailRegular} />} type='email' />
					</FormInner>
					<FormInner label='Password'>
						<Input icon={<Icon name={LockRegular} />} type='password' />
					</FormInner>
					<FormFooter>
						<Button primary>
							Login
						</Button>
					</FormFooter>
				</Form>
				<p>New here? <Cta href='/register'>Register an account</Cta></p>
			</ContentAside>
		</Page>
	)
}
