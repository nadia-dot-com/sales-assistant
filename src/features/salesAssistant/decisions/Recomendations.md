## Trigger
There are a lot of triggers you can configure for the app, and it's up to you which one is best — you can also combine several of them. In our case we went with triggering by keyword and cutting off once the employee stops speaking.

## Languages

* Languages must be provided as **BCP 47** language tags — see [MDN: SpeechRecognition.lang](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/lang).

## Language Recognition — `recognition.lang` Is Only a Hint
Setting the `lang` property on a `SpeechRecognition` instance does **not** mean recognition will work exclusively in that language. It is more of a preferred language / hint for the recognizer. In practice, recognition can still interpret an utterance as a different language. There is no setting in the Web Speech API that restricts results to a single language.

The difference is especially visible in Chrome, which uses a multilingual model. With both browsers set to `en-US`, Chrome more often interprets an English utterance as Polish, while Safari handles the "recognize only one specific language" case noticeably better and stays much closer to the requested language.

So we cannot guarantee, through `SpeechRecognition` alone, that the mechanism will recognize only one language — this is a limitation of how browser speech recognition works. In terms of recognizing a single, specific language, Safari performed better in our tests.

## Keyword Detection
In Safari, keyword detection worked noticeably better. Spoken words were detected more reliably, so the browser reacted better to ongoing conversations.

## Battery Usage & Auto-stop
The two browsers behave differently when it comes to keeping recognition alive:

* **Chrome** stops recognition automatically after roughly 20–25 seconds from the last word it heard (this fires `onend`; it varies by browser and version). You can work around it by calling `recognition.start()` again inside the **`recognition.onend`** handler — but note that keeping recognition alive that way has a battery cost. This auto-stop can actually be an advantage for battery life when you don't need constant listening.
* **Safari** keeps voice recognition active and does not switch itself off in the same way. It can be muted from the browser, but that requires an extra user action.

From a battery standpoint, Safari can therefore have a meaningful disadvantage, especially if the device is meant to listen for long periods. That said, in my testing the laptop ran cooler with recognition on constantly in Safari than it did in Chrome.

Running recognition constantly is rough on a laptop and drains the battery fast. On mobile, letting the screen lock (which stops the microphone) can help.
## Options

Both browsers can handle our scenarios. They differ in trade-offs, so the choice depends on the deployment:

* **Safari** — stronger single-language recognition and more reliable keyword detection in our tests. Keeps recognition active continuously, which drives battery usage up over long sessions. 
* **Chrome / Chromium** — uses a multilingual model, so it's the option to consider if you want a multilingual recognizer. Its ~20–25s auto-stop can be an advantage for battery life
