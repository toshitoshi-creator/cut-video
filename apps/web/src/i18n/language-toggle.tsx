"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/utils/ui";
import { useTranslation } from "@/i18n";

export function LanguageToggle({ className }: { className?: string }) {
	const { t, locale, setLocale } = useTranslation();
	const nextLocale = locale === "ja" ? "en" : "ja";

	return (
		<Button
			variant="ghost"
			size="sm"
			className={cn("h-8 px-2 text-xs", className)}
			onClick={() => setLocale(nextLocale)}
			aria-label={t("Switch language")}
			title={t("Switch language")}
		>
			{nextLocale === "en" ? "EN" : "日本語"}
		</Button>
	);
}
