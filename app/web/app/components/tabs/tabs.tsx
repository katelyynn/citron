import { useRef, useState, type ReactNode } from 'react';
import styles from './tabs.module.css';

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
	const [selected, setSelected] = useState<HTMLElement | null>(null);

	return (
		<div className={styles.container}>
			<ul className={styles.tabs} role='tablist'>
				{tabs.map((tab, index) => {
					const active = `${starting}${tab.href}` == location;

					return (
						<a key={index} className={[
							styles.tab,
							active && styles.active
						].join(' ')} href={starting + tab.href} ref={active ? setSelected : null}>
							{tab.children}
						</a>
					);
				})}
			</ul>
			{selected && <TabUnderline element={selected} />}
		</div>
	)
}

interface TabUnderlineProps {
	element: HTMLElement;
}

function TabUnderline({
	element
}: TabUnderlineProps) {
	return (
		<div className={styles.underline} style={{
			left: element.offsetLeft,
			width: element.offsetWidth
		}} />
	)
}
