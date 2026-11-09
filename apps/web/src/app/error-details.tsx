"use client";

import { useEffect } from "react";

// Shown instead of Next's bare "Application error" so the cause can be read
// (and reported) on devices without a browser console, such as iPad.
export function ErrorDetails({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	const lines = [`${error.name}: ${error.message}`];
	if (error.digest) lines.push(`digest: ${error.digest}`);
	if (typeof window !== "undefined") {
		lines.push(`URL: ${location.href}`, `UA: ${navigator.userAgent}`);
	}
	if (error.stack) lines.push("", error.stack);
	const details = lines.join("\n");

	return (
		<div
			style={{
				padding: 24,
				fontFamily: "system-ui, sans-serif",
				maxWidth: 900,
				margin: "0 auto",
			}}
		>
			<h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
				エラーが発生しました / An error occurred
			</h1>
			<p style={{ fontSize: 14, marginBottom: 16 }}>
				下の内容をスクリーンショットで送ってください。
			</p>
			<pre
				style={{
					whiteSpace: "pre-wrap",
					wordBreak: "break-word",
					fontSize: 12,
					background: "rgba(127,127,127,0.12)",
					padding: 12,
					borderRadius: 8,
					maxHeight: "60vh",
					overflow: "auto",
				}}
			>
				{details}
			</pre>
			<button
				type="button"
				onClick={reset}
				style={{
					marginTop: 16,
					padding: "8px 16px",
					borderRadius: 8,
					border: "1px solid currentColor",
					background: "transparent",
				}}
			>
				再読み込み / Retry
			</button>
		</div>
	);
}
