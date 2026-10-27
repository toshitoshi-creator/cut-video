"use client";

import { useEffect } from "react";
import { useLocaleStore } from "./store";

export function LocaleHydrator() {
	const locale = useLocaleStore((state) => state.locale);

	useEffect(() => {
		void useLocaleStore.persist.rehydrate();
	}, []);

	useEffect(() => {
		document.documentElement.lang = locale;
	}, [locale]);

	return null;
}
