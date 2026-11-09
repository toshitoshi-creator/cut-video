"use client";

import { ErrorDetails } from "./error-details";

// Catches errors thrown by the root layout itself, so it renders its own document.
export default function GlobalError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<html lang="ja">
			<body>
				<ErrorDetails error={error} reset={reset} />
			</body>
		</html>
	);
}
