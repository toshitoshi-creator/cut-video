import type { Viewport } from "next";

// Pinch/double-tap zoom on tablets scales the whole editor chrome instead of
// the timeline or preview, so lock the page scale here.
export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
	viewportFit: "cover",
};

export default function EditorLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}
