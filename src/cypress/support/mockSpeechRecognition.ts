/// <reference types="cypress" />

type SpeechAvailability =
  | "available"
  | "downloadable"
  | "downloading"
  | "unavailable";

interface EmitOptions {
  isFinal?: boolean;
}

interface InstallSpeechRecognitionMockOptions {
  availability?: SpeechAvailability;
}

export class MockSpeechRecognition extends EventTarget {
  lang = "";
  continuous = false;
  interimResults = false;
  processLocally = false;

  onstart: ((event: Event) => void) | null = null;
  onend: ((event: Event) => void) | null = null;
  onerror: ((event: unknown) => void) | null = null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null = null;

  private results: SpeechRecognitionResult[] = [];

  start(): void {
    this.onstart?.(new Event("start"));
  }

  stop(): void {
    this.onend?.(new Event("end"));
  }

  abort(): void {
    this.onend?.(new Event("end"));
  }

  emit(transcript: string, { isFinal = true }: EmitOptions = {}): void {
    const alternative = { transcript, confidence: 1 };
    const result = Object.assign([alternative], {
      isFinal,
      length: 1,
    }) as unknown as SpeechRecognitionResult;

    const last = this.results[this.results.length - 1];
    if (last && !last.isFinal) {
      this.results[this.results.length - 1] = result;
    } else {
      this.results.push(result);
    }

    const resultIndex = this.results.length - 1;
    const results = Object.assign([...this.results], {
      length: this.results.length,
    });

    this.onresult?.({
      results,
      resultIndex,
    } as unknown as SpeechRecognitionEvent);
  }

  static available(): Promise<SpeechAvailability> {
    return Promise.resolve("unavailable");
  }

  static install(): Promise<boolean> {
    return Promise.resolve(false);
  }
}

declare global {
  interface Window {
    __speechInstances?: MockSpeechRecognition[];
    __resolveInstall?: (installed: boolean) => void;
  }
}

export function installSpeechRecognitionMock(
  win: Window,
  { availability = "unavailable" }: InstallSpeechRecognitionMockOptions = {},
): void {
  const instances: MockSpeechRecognition[] = [];

  let resolveInstall: (installed: boolean) => void = () => {};
  const installPromise = new Promise<boolean>((resolve) => {
    resolveInstall = resolve;
  });

  class TrackedSpeechRecognition extends MockSpeechRecognition {
    constructor() {
      super();
      cy.stub(this, "start").as("speechRecognitionStart").callThrough();
      cy.stub(this, "stop").as("speechRecognitionStop").callThrough();
      instances.push(this);
    }

    static available(): Promise<SpeechAvailability> {
      return Promise.resolve(availability);
    }

    static install(): Promise<boolean> {
      return installPromise;
    }
  }

  win.__speechInstances = instances;
  win.__resolveInstall = resolveInstall;

  (win as unknown as { SpeechRecognition: unknown }).SpeechRecognition =
    TrackedSpeechRecognition;
  (
    win as unknown as { webkitSpeechRecognition: unknown }
  ).webkitSpeechRecognition = TrackedSpeechRecognition;
}
