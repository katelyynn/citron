import { useEffect, useLayoutEffect, useRef, useState, type ForwardRefExoticComponent, type ReactNode, type RefAttributes } from 'react';
import styles from './tabs.module.css';
import { Link } from 'react-router';
import { Icon } from '../icon/icon';
import type { IconProps } from '@mingcute/react';

export interface Tab {
	href: string;
	icon?: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>[];
	children: ReactNode;
}

interface TabsProps {
	location?: string;
	starting?: string;
	style?: 'tabs' | 'buttons';
	tabs: Tab[];
}

export function Tabs({
	location = '/',
	starting = '',
	style = 'tabs',
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
		<div className={styles[`${style}-container`]}>
			<ul className={[
				styles[style],
			].join(' ')} role='tablist'>
				{tabs.map((tab, index) => {
					const active = `${starting}${tab.href}`.replace(/\/+$/, '') == location.replace(/\/+$/, '');

					return (
						<Link key={index} className={[
							styles[`${style}-item`],
							active && styles.active
						].join(' ')} to={starting + tab.href} ref={active ? selected : null}>
							{tab.icon && (
								<>
									{(!active || tab.icon.length == 1) ? (
										<Icon name={tab.icon[0]} className={styles.icon} />
									) : (
										<Icon name={tab.icon[1]} className={styles.icon} />
									)}
								</>
							)}
							{tab.children}
						</Link>
					);
				})}
			</ul>
			<div className={styles[`${style}-underline`]} style={{
				left: underline.left,
				width: underline.width
			}} />
		</div>
	);
}
