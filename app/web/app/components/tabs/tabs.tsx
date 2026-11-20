import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import styles from './tabs.module.css';
import { Link } from 'react-router';

export interface Tab {
	href: string;
	children: ReactNode;
}

interface TabsProps {
	location?: string;
	starting?: string;
	tabs: Tab[];
}

export function Tabs({
	location = '/',
	starting = '',
	tabs
}: TabsProps) {
	const [underline, setUnderline] = useState({ left: 0, width: 0 });
	const selected = useRef<HTMLAnchorElement>(null);

	useEffect(() => {
		console.log('tabs mounted');
		return () => console.log('tabs unmounted');
	}, []);

	useLayoutEffect(() => {
		const active = selected.current;
		if (!active) return;

		setUnderline({
			left: active.offsetLeft,
			width: active.offsetWidth
		});
	}, [location, starting, tabs]);

	return (
		<div className={styles.container}>
			<ul className={styles.tabs} role='tablist'>
				{tabs.map((tab, index) => {
					const active = `${starting}${tab.href}`.replace(/\/+$/, '') == location.replace(/\/+$/, '');

					return (
						<Link key={index} className={[
							styles.tab,
							active && styles.active
						].join(' ')} to={starting + tab.href} ref={active ? selected : null}>
							{tab.children}
						</Link>
					);
				})}
			</ul>
			<div className={styles.underline} style={{
				left: underline.left,
				width: underline.width
			}} />
		</div>
	);
}
