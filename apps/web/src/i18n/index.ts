import { useCallback } from "react";
import { ja } from "./locales/ja";
import { type Locale, useLocaleStore } from "./store";

export { LOCALES, LOCALE_LABELS, type Locale, useLocaleStore } from "./store";

type TranslationVars = Record<string, string | number | null | undefined>;

const DICTIONARIES: Record<Locale, Record<string, string> | null> = {
	// English strings are the keys, so English needs no dictionary
	en: null,
	ja,
};

function interpolate({
	text,
	vars,
}: {
	text: string;
	vars?: TranslationVars;
}): string {
	if (!vars) return text;
	return text.replace(/\{(\w+)\}/g, (match, name: string) =>
		name in vars ? String(vars[name]) : match,
	);
}

export function translateFor({
	locale,
	text,
	vars,
}: {
	locale: Locale;
	text: string;
	vars?: TranslationVars;
}): string {
	const translated = DICTIONARIES[locale]?.[text] ?? text;
	return interpolate({ text: translated, vars });
}

/**
 * Translate outside React (toasts, command handlers). Components should use
 * `useTranslation` instead so they re-render when the locale changes.
 */
// Positional args keep call sites short: t("Export"), t("Delete {count}", { count })
// eslint-disable-next-line opencut/prefer-object-params
export function t(text: string, vars?: TranslationVars): string {
	return translateFor({
		locale: useLocaleStore.getState().locale,
		text,
		vars,
	});
}

export function useTranslation() {
	const locale = useLocaleStore((state) => state.locale);
	const setLocale = useLocaleStore((state) => state.setLocale);
	const translate = useCallback(
		(text: string, vars?: TranslationVars) =>
			translateFor({ locale, text, vars }),
		[locale],
	);
	return { t: translate, locale, setLocale };
}
