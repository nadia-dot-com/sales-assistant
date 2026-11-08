type SpeechRecognitionBuilder =
  | typeof window.SpeechRecognition
  | typeof window.webkitSpeechRecognition;

interface IsLocalRecognitionAvailableOptions {
  builder: SpeechRecognitionBuilder;
  language: string;
  onDownloadingChange: (isDownloading: boolean) => void;
}

export async function isLocalRecognitionAvailable({
  builder,
  language,
  onDownloadingChange,
}: IsLocalRecognitionAvailableOptions): Promise<boolean> {
  // On-device recognition is Chrome-only; other engines expose
  // `webkitSpeechRecognition` without these statics.
  if (typeof builder.available !== "function") {
    return false;
  }

  const availability = await builder.available({
    langs: [language],
    processLocally: true,
  });

  if (availability === "available") {
    return true;
  }

  if (availability !== "downloadable") {
    return false;
  }

  onDownloadingChange(true);
  try {
    return await builder.install({
      langs: [language],
      processLocally: true,
    });
  } finally {
    onDownloadingChange(false);
  }
}
