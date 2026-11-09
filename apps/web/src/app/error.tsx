"use client";

import { ErrorDetails } from "./error-details";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return <ErrorDetails error={error} reset={reset} />;
}
