import type { ReactNode } from "react";
import styles from './page.module.css';

interface PageProps {
	children: ReactNode;
}

export function Page({
	children
}: PageProps) {
	return (
		<div className={styles.page}>
			{children}
		</div>
	)
}

interface ContentAsideProps {
	children: ReactNode;
}

export function ContentAside({
	children
}: ContentAsideProps) {
	return (
		<aside className={styles.aside}>
			{children}
		</aside>
	)
}

interface ContentMainProps {
	children: ReactNode;
}

export function ContentMain({
	children
}: ContentMainProps) {
	return (
		<main className={styles.main}>
			{children}
		</main>
	)
}

interface ContentGenericProps {
	children: ReactNode;
}

export function ContentGeneric({
	children
}: ContentGenericProps) {
	return (
		<main className={styles.generic}>
			{children}
		</main>
	)
}
