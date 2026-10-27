import { create } from "zustand";
import { persist } from "zustand/middleware";

export const LOCALES = ["ja", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "ja";

export const LOCALE_LABELS: Record<Locale, string> = {
	ja: "日本語",
	en: "English",
};

interface LocaleState {
	locale: Locale;
	setLocale: (locale: Locale) => void;
}

export const useLocaleStore = create<LocaleState>()(
	persist(
		(set) => ({
			locale: DEFAULT_LOCALE,
			setLocale: (locale) => set({ locale }),
		}),
		{
			name: "locale",
			// Rehydrated by LocaleHydrator after mount so server and first client
			// render agree on DEFAULT_LOCALE.
			skipHydration: true,
		},
	),
);
