export function getPlatformSpecialKey(): string {
	return isAppleDevice() ? "⌘" : "Ctrl";
}

export function getPlatformAlternateKey(): string {
	return isAppleDevice() ? "⌥" : "Alt";
}

export function isAppleDevice(): boolean {
	return /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
}

/**
 * iPadOS reports itself as "Macintosh", so detect it by touch support instead.
 */
export function isAppleTouchDevice(): boolean {
	return (
		/(iPhone|iPod|iPad)/i.test(navigator.userAgent) ||
		(/Macintosh/i.test(navigator.userAgent) && navigator.maxTouchPoints > 1)
	);
}

const TABLET_MIN_SHORT_SIDE_PX = 700;

export function isTabletDevice(): boolean {
	if (navigator.maxTouchPoints <= 1) return false;
	const shortSide = Math.min(window.screen.width, window.screen.height);
	return shortSide >= TABLET_MIN_SHORT_SIDE_PX;
}
