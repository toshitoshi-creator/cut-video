import { toast } from "sonner";
import { t } from "@/i18n";

export interface MediaUploadToastResult {
	uploadedCount: number;
	assetNames?: string[];
}

function waitForNextPaint(): Promise<void> {
	return new Promise((resolve) => {
		requestAnimationFrame(() => {
			requestAnimationFrame(() => resolve());
		});
	});
}

export async function showMediaUploadToast<T extends MediaUploadToastResult>({
	filesCount,
	promise,
}: {
	filesCount: number;
	promise: Promise<T> | (() => Promise<T>);
}) {
	const run = typeof promise === "function" ? promise : () => promise;
	const toastPromise = toast.promise(async () => {
		await waitForNextPaint();
		return run();
	}, {
		loading:
			filesCount === 1
				? t("Uploading media asset...")
				: t("Uploading media assets..."),
		success: ({ uploadedCount, assetNames }) => {
			if (uploadedCount === 1) {
				const assetName = assetNames?.[0];
				return assetName
					? t("{name} has been uploaded", { name: assetName })
					: t("1 media asset has been uploaded");
			}

			if (uploadedCount > 1) {
				return t("{count} media assets have been uploaded", {
					count: uploadedCount,
				});
			}

			return t("No media assets were uploaded");
		},
		error:
			filesCount === 1
				? t("Failed to upload media asset")
				: t("Failed to upload media assets"),
	});

	return toastPromise.unwrap();
}
