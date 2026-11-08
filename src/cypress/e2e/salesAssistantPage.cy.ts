import { DEFAULT_LANGUAGE_IN_BCP47 } from "../../features/salesAssistant/config";
import { CHAT_SESSION_KEY } from "../../features/salesAssistant/constants/chatSessionKey";
import type { ChatSession } from "../../features/salesAssistant/types/chatSession.types";
import { installSpeechRecognitionMock } from "../support/mockSpeechRecognition";
import {
  checkIfMicrophoneIsAvailable,
  shouldBeRedirectedToLoginPage,
} from "../utils/salesAssistantPage/utils";

const MISMATCHED_CHAT_ID = "00000000-0000-0000-0000-000000000000";

function visitSalesAssistant(url: string) {
  cy.visit(url, {
    onBeforeLoad(win) {
      installSpeechRecognitionMock(win);
    },
  });
}

function shouldHaveSortValue(turnIndex: number, expected: string) {
  cy.get('[data-testid="ChatMessageItem-gridResponse"]')
    .eq(turnIndex)
    .find("select")
    .should(($select) => {
      expect($select.val() ?? "").to.equal(expected);
    });
}

describe("Authorized User (Employee)", () => {
  describe("Granted permissions for microphone", () => {
    beforeEach(function () {
      cy.setPermissionState("microphone", "granted");
      cy.fixture("employee").then((employee) => {
        this.user = employee;
        cy.login(this.user.email, this.user.password);
      });

      cy.visit("/salesAssistant", {
        onBeforeLoad(win) {
          installSpeechRecognitionMock(win);
        },
      });
    });

    it("goes to the Sales Assistant Page and see working microphone", () => {
      checkIfMicrophoneIsAvailable();
    });

    it("is able to click on the microphone and it changes color to red which means its recording, says sentence and catches it", () => {
      cy.fixture("extractedSentence").then((extractedSentence) => {
        cy.stubExtractSentence(extractedSentence);
      });

      checkIfMicrophoneIsAvailable();
      const microphone = cy.get('[data-testid="VoiceRecognition-mic"]');

      microphone.click();

      microphone.should("have.attr", "data-state", "recording");

      cy.saySentence(["find", "me", "moisturizing", "cream"]);

      cy.get('[data-testid="ChatMessageItem-transcript"]').should(
        "have.text",
        "find me moisturizing cream",
      );

      cy.wait("@extractSentence");
    });

    it("doesn't say anything and microphone just turns off itself and after that he clicks on microphone and recognition starts again", () => {
      checkIfMicrophoneIsAvailable();

      cy.get('[data-testid="VoiceRecognition-mic"]').click();

      cy.get('[data-testid="VoiceRecognition-mic"]').should(
        "have.attr",
        "data-state",
        "recording",
      );

      cy.endRecognition();

      cy.get("@speechRecognitionStop").should("have.been.called");

      cy.get('[data-testid="VoiceRecognition-mic"]').should(
        "have.attr",
        "data-state",
        "off",
      );

      cy.get('[data-testid="VoiceRecognition-mic"]').click();

      cy.get('[data-testid="VoiceRecognition-mic"]').should(
        "have.attr",
        "data-state",
        "recording",
      );
    });

    it("captures a second sentence after the first search completes", () => {
      cy.fixture("extractedSentence").then((extractedSentence) => {
        cy.stubExtractSentence(extractedSentence);
      });

      checkIfMicrophoneIsAvailable();

      cy.get('[data-testid="VoiceRecognition-mic"]').click();
      cy.saySentence(["find", "me", "sunscreen", "please"]);

      cy.get('[data-testid="ChatMessageItem-transcript"]')
        .last()
        .should("have.text", "find me sunscreen please");

      cy.wait("@extractSentence");
      cy.wait("@getProductsByKeys");

      cy.get('[data-testid="VoiceRecognition-mic"]').should(
        "have.attr",
        "data-state",
        "off",
      );

      cy.get('[data-testid="VoiceRecognition-mic"]').click();
      cy.saySentence(["show", "me", "lipstick"]);

      cy.wait("@extractSentence");
      cy.wait("@getProductsByKeys");

      cy.get('[data-testid="ChatMessageItem-transcript"]')
        .last()
        .should("have.text", "show me lipstick");
    });
  });

  describe("Has denied permissions for microphone", () => {
    beforeEach(function () {
      cy.fixture("employee").then((employee) => {
        this.user = employee;
        cy.login(this.user.email, this.user.password);
      });
      cy.visit("/salesAssistant", {
        onBeforeLoad(win) {
          installSpeechRecognitionMock(win);
        },
      });
      cy.setPermissionState("microphone", "denied");
    });

    it("sees the message that he needs to enable permissions for voice recognition", () => {
      cy.get('[data-testid="VoiceRecognition-spinner"]').should("be.visible");

      cy.get('[data-testid="VoiceRecognition-enableMicrophone"]').should(
        "be.visible",
      );
    });

    it("after enabeling the microphone permissions the message dissapears", () => {
      cy.get('[data-testid="VoiceRecognition-spinner"]').should("be.visible");

      cy.get('[data-testid="VoiceRecognition-enableMicrophone"]').should(
        "be.visible",
      );

      cy.setPermissionState("microphone", "granted");

      cy.get('[data-testid="VoiceRecognition-mic"]').should(
        "have.attr",
        "data-state",
        "off",
      );
    });
  });

  describe("has unsupported browser", () => {
    before(function () {
      cy.fixture("employee").then((employee) => {
        this.user = employee;
        cy.login(this.user.email, this.user.password);
      });

      cy.visit("/salesAssistant", {
        onBeforeLoad(win) {
          (win as unknown as { SpeechRecognition: unknown }).SpeechRecognition =
            undefined;
          (
            win as unknown as { webkitSpeechRecognition: unknown }
          ).webkitSpeechRecognition = undefined;
        },
      });
    });

    it("shows the message for unsupported browser", () => {
      cy.get('[data-testid="VoiceRecognition-unsupportedBrowser"]');
    });
  });

  describe("Chat turn structure", () => {
    beforeEach(function () {
      cy.setPermissionState("microphone", "granted");
      cy.fixture("employee").then((employee) => {
        this.user = employee;
        cy.login(this.user.email, this.user.password);
      });

      cy.visit("/salesAssistant", {
        onBeforeLoad(win) {
          installSpeechRecognitionMock(win);
        },
      });

      checkIfMicrophoneIsAvailable();
    });

    it("produces a keyword-response bubble then a grid-response bubble for a successful turn", () => {
      cy.fixture("extractedSentence").then((extractedSentence) => {
        cy.stubExtractSentence(extractedSentence);
      });

      cy.get('[data-testid="VoiceRecognition-mic"]').click();
      cy.saySentence(["find", "me", "sunscreen"]);

      cy.wait("@extractSentence");
      cy.get('[data-testid="ChatMessageItem-keywordResponse"]').should(
        "have.text",
        "sunscreen",
      );

      cy.wait("@getProductsByKeys");
      cy.get('[data-testid="ChatMessageItem-gridResponse"]').should(
        "be.visible",
      );

      cy.get(
        '[data-testid="ChatMessageItem-keywordResponse"], [data-testid="ChatMessageItem-gridResponse"]',
      ).then(($els) => {
        const order = [...$els].map((el) => el.getAttribute("data-testid"));
        expect(order).to.deep.equal([
          "ChatMessageItem-keywordResponse",
          "ChatMessageItem-gridResponse",
        ]);
      });
    });

    it("keep voice recognition message in input while waiting for response", () => {
      cy.fixture("extractedSentence").then((extractedSentence) => {
        cy.stubExtractSentence(extractedSentence, { delay: 3000 });
      });

      cy.get('[data-testid="VoiceRecognition-mic"]').click();
      cy.saySentence(["find", "me", "sunscreen"]);

      cy.get('[data-testid="VoiceRecognition-mic"]').should(
        "have.attr",
        "data-state",
        "off",
      );

      cy.get('[data-testid="VoiceRecognition-mic"]').click();
      cy.saySentence(["another", "message"]);

      cy.get('[data-testid="VoiceRecognition-mic"]').should(
        "have.attr",
        "data-state",
        "off",
      );
      cy.get('[data-testid="ChatTextarea-textarea"]').should(
        "have.value",
        "another message",
      );

      cy.wait("@extractSentence");
    });

    it("shows a keyword error and never calls getProductsByKeys when extraction fails", () => {
      cy.intercept({ method: "POST", url: "/salesAssistant*" }).as("allCalls");
      cy.stubExtractSentenceFailure();

      cy.get('[data-testid="VoiceRecognition-mic"]').click();
      cy.saySentence(["find", "me", "sunscreen"]);

      cy.wait("@extractSentence");

      cy.get('[data-testid="Toast-error"]').should("be.visible");

      cy.get("@allCalls.all").then(
        (calls: { request: { headers: Record<string, string> } }[]) => {
          const productsCalls = calls.filter((call) =>
            call.request.headers["content-type"]?.startsWith(
              "multipart/form-data",
            ),
          );
          expect(productsCalls).to.have.length(0);
        },
      );
    });

    it("shows a grid error and never calls getProductsByKeys when matching keywords to products fails", () => {
      cy.intercept({ method: "POST", url: "/salesAssistant*" }).as("allCalls");
      cy.fixture("extractedSentence").then((extractedSentence) => {
        cy.stubGetProductsKeysFailure(extractedSentence);
      });

      cy.get('[data-testid="VoiceRecognition-mic"]').click();
      cy.saySentence(["find", "me", "sunscreen"]);

      cy.wait("@extractSentence");
      cy.get('[data-testid="ChatMessageItem-keywordResponse"]').should(
        "have.text",
        "sunscreen",
      );

      cy.wait("@getProductsKeys");
      cy.get('[data-testid="Toast-error"]').should("be.visible");

      cy.get("@allCalls.all").then(
        (calls: { request: { headers: Record<string, string> } }[]) => {
          const productsByKeysCalls = calls.filter((call) =>
            call.request.headers["content-type"]?.startsWith(
              "multipart/form-data",
            ),
          );
          expect(productsByKeysCalls).to.have.length(0);
        },
      );
    });

    it("changing filters on one turn's grid doesn't affect another turn's grid", () => {
      cy.fixture("extractedSentence").then((extractedSentence) => {
        cy.stubMultiPageProducts(extractedSentence, 1);
      });

      cy.get('[data-testid="VoiceRecognition-mic"]').click();
      cy.saySentence(["find", "me", "sunscreen"]);
      cy.wait("@extractSentence");
      cy.wait("@getProductsByKeys");

      cy.get('[data-testid="VoiceRecognition-mic"]').should(
        "have.attr",
        "data-state",
        "off",
      );

      cy.get('[data-testid="VoiceRecognition-mic"]').click();
      cy.saySentence(["show", "me", "lipstick"]);
      cy.wait("@extractSentence");
      cy.wait("@getProductsByKeys");

      cy.get('[data-testid="ChatMessageItem-gridResponse"]').should(
        "have.length",
        2,
      );

      cy.get('[data-testid="ChatMessageItem-gridResponse"]')
        .eq(0)
        .find('[data-testid="ControlFilters"]')
        .click();

      cy.get('[data-testid="ChatMessageItem-gridResponse"]')
        .eq(1)
        .find('[data-testid="ControlFilters"]')
        .click();

      shouldHaveSortValue(0, "");
      shouldHaveSortValue(1, "");

      cy.get('[data-testid="ChatMessageItem-gridResponse"]')
        .eq(0)
        .find('[data-testid="SortSelect"]')
        .click();

      cy.get('[role="option"]:visible').eq(1).click();

      cy.wait("@getProductsByKeys");

      cy.get('[data-testid="ChatMessageItem-gridResponse"]').should(
        "have.length",
        2,
      );

      shouldHaveSortValue(0, "name_desc");
      shouldHaveSortValue(1, "");
    });

    it("changes page when clicking a numbered pagination button, not just prev/next", () => {
      cy.fixture("extractedSentence").then((extractedSentence) => {
        cy.stubMultiPageProducts(extractedSentence, 50);
      });

      cy.get('[data-testid="VoiceRecognition-mic"]').click();
      cy.saySentence(["find", "me", "sunscreen"]);
      cy.wait("@extractSentence");
      cy.wait("@getProductsByKeys");

      cy.get("@getProductsByKeys.all")
        .its("length")
        .then((before) => {
          cy.contains("nav button", "2").click({ force: true });

          cy.wait("@getProductsByKeys");

          cy.get("@getProductsByKeys.all")
            .its("length")
            .should("be.greaterThan", Number(before));
        });
    });
  });

  describe("sessionStorage logic in chat", () => {
    beforeEach(function () {
      cy.setPermissionState("microphone", "granted");
      cy.fixture("employee").then((employee) => {
        this.user = employee;
        cy.login(this.user.email, this.user.password);
      });

      cy.visit("/salesAssistant", {
        onBeforeLoad(win) {
          installSpeechRecognitionMock(win);
        },
      });

      checkIfMicrophoneIsAvailable();
    });

    it("Upon returning to the PDP with a valid chatId, the chat history is restored.", () => {
      cy.fixture("extractedSentence").then((extractedSentence) => {
        cy.stubMultiPageProducts(extractedSentence, 10);
      });

      cy.get('[data-testid="VoiceRecognition-mic"]').click();
      cy.saySentence(["find", "me", "sunscreen"]);

      cy.wait("@extractSentence");
      cy.get('[data-testid="ChatMessageItem-keywordResponse"]').should(
        "have.text",
        "sunscreen",
      );

      cy.wait("@getProductsByKeys");
      cy.get('[data-testid="ChatMessageItem-gridResponse"]').should(
        "be.visible",
      );

      cy.get('[data-testid="ChatProductCard"]').click();

      cy.get('[data-testid="ChatProductCard"]').find("a").first().click();
      cy.url().should("include", "/products/");
      cy.url().should("contain", "chatId");

      cy.go("back");

      cy.url().should("contain", "chatId");

      cy.get('[data-testid="ChatMessages-list"]').should("be.visible");
    });

    it("Accessing the chat without a chatId (or with a mismatched ID) results in an empty history.", () => {
      cy.fixture("extractedSentence").then((extractedSentence) => {
        cy.stubMultiPageProducts(extractedSentence, 1);
      });

      cy.get('[data-testid="VoiceRecognition-mic"]').click();
      cy.saySentence(["find", "me", "sunscreen"]);

      cy.wait("@extractSentence");
      cy.get('[data-testid="ChatMessageItem-keywordResponse"]').should(
        "have.text",
        "sunscreen",
      );

      cy.wait("@getProductsByKeys");
      cy.get('[data-testid="ChatMessageItem-gridResponse"]').should(
        "be.visible",
      );

      cy.window().then((win) => {
        const stored = win.localStorage.getItem(CHAT_SESSION_KEY);
        expect(stored, "chat session persisted").to.be.a("string");

        const { session, chatHistory } = JSON.parse(
          stored as string,
        ) as ChatSession;

        expect(session, "stored session id").to.not.equal(MISMATCHED_CHAT_ID);
        expect(chatHistory, "stored chat history").to.not.be.empty;
      });

      visitSalesAssistant(`/salesAssistant?chatId=${MISMATCHED_CHAT_ID}`);

      checkIfMicrophoneIsAvailable();
      cy.get('[data-testid="Chat"]').should("not.exist");

      visitSalesAssistant("/salesAssistant");

      checkIfMicrophoneIsAvailable();
      cy.url().should("contain", "chatId");
      cy.get('[data-testid="Chat"]').should("not.exist");
    });

    it("Upon return, the scroll position is restored to the saved state.", () => {
      cy.fixture("extractedSentence").then((extractedSentence) => {
        cy.stubMultiPageProducts(extractedSentence, 10);
      });

      cy.get('[data-testid="VoiceRecognition-mic"]').click();
      cy.saySentence(["find", "me", "sunscreen"]);

      cy.wait("@extractSentence");
      cy.get('[data-testid="ChatMessageItem-keywordResponse"]').should(
        "have.text",
        "sunscreen",
      );

      cy.wait("@getProductsByKeys");

      cy.get('[data-testid="ChatMessages-list"]').should("be.visible");
      cy.get("body").scrollTo(0, 10);

      cy.window().should((win) => {
        const value = win.sessionStorage.getItem("CHAT_SCROLL_KEY");
        expect(value).to.exist;
      });

      cy.get('[data-testid="ChatProductCard"]')
        .find("a")
        .first()
        .click({ scrollBehavior: false });
      cy.url().should("include", "/products/");
      cy.url().should("contain", "chatId");

      cy.go("back");

      cy.url().should("contain", "chatId");

      cy.get('[data-testid="ChatMessages-list"]').should("be.visible");

      cy.get("body").should(($body) => {
        expect($body[0].scrollTop).to.be.greaterThan(0);
      });
    });

    it("scroll down button is visible", () => {
      cy.viewport(1000, 300);

      cy.fixture("extractedSentence").then((extractedSentence) => {
        cy.stubMultiPageProducts(extractedSentence, 10);
      });

      cy.get('[data-testid="VoiceRecognition-mic"]').click();
      cy.saySentence(["find", "me", "sunscreen"]);

      cy.wait("@extractSentence");
      cy.wait("@getProductsByKeys");

      cy.get("body").scrollTo("top");

      cy.get('[data-testid="ScrollDownButton"]').should("be.visible");
    });

    it("scroll down button scrolls body to chat bottom", () => {
      cy.viewport(1000, 300);

      cy.fixture("extractedSentence").then((extractedSentence) => {
        cy.stubMultiPageProducts(extractedSentence, 10);
      });

      cy.get('[data-testid="VoiceRecognition-mic"]').click();
      cy.saySentence(["find", "me", "sunscreen"]);

      cy.wait("@extractSentence");
      cy.wait("@getProductsByKeys");

      cy.get("body").scrollTo("top");
      cy.get('[data-testid="ScrollDownButton"]').should("be.visible");
      cy.get('[data-testid="ScrollDownButton"]').click({ force: true });

      cy.get('[data-testid="SalesAssistant-intersection-box"]').should(
        ($el) => {
          const rect = $el[0].getBoundingClientRect();
          expect(rect.top, "intersection box top").to.be.at.most(
            Cypress.config("viewportHeight"),
          );
          expect(rect.bottom, "intersection box bottom").to.be.at.least(0);
        },
      );
    });
  });

  describe("has a downloadable recognition language", () => {
    beforeEach(function () {
      cy.setPermissionState("microphone", "granted");
      cy.fixture("employee").then((employee) => {
        this.user = employee;
        cy.login(this.user.email, this.user.password);
      });

      cy.visit("/salesAssistant", {
        onBeforeLoad(win) {
          installSpeechRecognitionMock(win, { availability: "downloadable" });
        },
      });
    });

    it("shows the spinner while the language downloads and reveals the mic once ready", () => {
      cy.get('[data-testid="VoiceRecognition-spinner"]').should("be.visible");

      cy.window().then((win) => {
        win.__resolveInstall?.(true);
      });

      cy.get('[data-testid="VoiceRecognition-mic"]')
        .should("be.visible")
        .and("have.attr", "data-state", "off");

      cy.get('[data-testid="VoiceRecognition-spinner"]').should("not.exist");
    });
  });

  describe("is able to change language", () => {
    beforeEach(function () {
      cy.setPermissionState("microphone", "granted");
      cy.fixture("employee").then((employee) => {
        this.user = employee;
        cy.login(this.user.email, this.user.password);
      });

      cy.visit("/salesAssistant", {
        onBeforeLoad(win) {
          installSpeechRecognitionMock(win, { availability: "downloadable" });
        },
      });

      cy.get('[data-testid="VoiceRecognition-spinner"]').should("be.visible");

      cy.window().then((win) => {
        win.__resolveInstall?.(true);
      });

      cy.get('[data-testid="VoiceRecognition-mic"]').should("be.visible");
    });

    it("selects a language and it appears in url and changes recognition language", () => {
      cy.get('[data-testid="LanguageSwitcher"]').click();

      cy.get('[role="option"]').should("have.length.greaterThan", 1);
      cy.get('[role="option"]').eq(1).click();

      cy.location("search").should((search) => {
        expect(new URLSearchParams(search).get("language")).to.not.equal(
          DEFAULT_LANGUAGE_IN_BCP47,
        );
      });

      cy.get('[data-testid="LanguageSwitcher-value"]').should(
        "not.contain.text",
        "GB",
      );

      cy.get('[data-testid="VoiceRecognition-mic"]').should("be.visible");
      cy.get('[data-testid="VoiceRecognition-mic"]').click();

      cy.window().should((win) => {
        const instances = win.__speechInstances ?? [];
        const latest = instances[instances.length - 1];
        expect(latest?.lang).to.be.a("string").and.not.be.empty;
        expect(latest?.lang).to.not.equal(DEFAULT_LANGUAGE_IN_BCP47);
      });
    });
  });

  describe("is able to use text input in Sales Assitant", () => {
    beforeEach(function () {
      cy.setPermissionState("microphone", "granted");
      cy.fixture("employee").then((employee) => {
        this.user = employee;
        cy.login(this.user.email, this.user.password);
      });

      cy.visit("/salesAssistant", {
        onBeforeLoad(win) {
          installSpeechRecognitionMock(win);
        },
      });

      cy.fixture("extractedSentence").then((extractedSentence) => {
        cy.stubExtractSentence(extractedSentence);
      });

      checkIfMicrophoneIsAvailable();
    });

    it("click on the textInput and fires a request", () => {
      const text =
        "Columbus the client forgot the sunscreen and now her face is red and hurts";
      const input = cy
        .get('[data-testid="ChatTextarea-textarea"]')
        .should("be.visible");

      input.click();
      input.type(text);

      cy.get('[data-testid="SalesAssistant-submit-button"]').click();
      cy.get('[data-testid="ChatMessageItem-transcript"]').should(
        "have.text",
        text,
      );

      cy.wait("@extractSentence");
    });

    it("says something first then clicks on input edits it and fires a request", () => {
      const sentence = "The client wants moisturizing cream";

      checkIfMicrophoneIsAvailable();
      const microphone = cy.get('[data-testid="VoiceRecognition-mic"]');

      microphone.click();

      microphone.should("have.attr", "data-state", "recording");

      cy.saySentence(["The", "client", "wants", "mosturizing", "cream"]);

      const input = cy
        .get('[data-testid="ChatTextarea-textarea"]')
        .should("have.value", "The client wants mosturizing cream");

      input.clear();
      input.type(sentence);

      cy.get('[data-testid="SalesAssistant-submit-button"]').click();
      cy.get('[data-testid="ChatMessageItem-transcript"]').should(
        "have.text",
        sentence,
      );

      cy.wait("@extractSentence");
    });

    it("says something first then clicks on input and clears it", () => {
      checkIfMicrophoneIsAvailable();
      const microphone = cy.get('[data-testid="VoiceRecognition-mic"]');

      microphone.click();

      microphone.should("have.attr", "data-state", "recording");

      cy.saySentence([
        "The",
        "clunt",
        "wants",
        "mosturizing",
        "cream",
        "blah blah blah total nonsense",
      ]);

      cy.get('[data-testid="ChatTextarea-textarea"]').should(
        "have.value",
        "The clunt wants mosturizing cream blah blah blah total nonsense",
      );

      cy.get('[data-testid="ChatTextarea-cancel"]').click();

      cy.get('[data-testid="ChatTextarea-textarea"]').should("have.value", "");

      cy.get('[data-testid="ChatMessageItem-transcript"]').should("not.exist");
    });

    it("clicks on input types something and clicks outside which keeps the text", () => {
      const text = "The client wants a new lipstick";

      cy.get('[data-testid="ChatTextarea-textarea"]').type(text);

      cy.get('[data-testid="LanguageSwitcher"]').click();

      cy.get('[data-testid="ChatTextarea-textarea"]').should(
        "have.value",
        text,
      );

      cy.get('[data-testid="ChatMessageItem-transcript"]').should("not.exist");
    });

    it("sends a second message using input after the first search", () => {
      const secondSentence = "find me a lipstick";

      cy.get('[data-testid="ChatTextarea-textarea"]').type("find me sunscreen");

      cy.get('[data-testid="SalesAssistant-submit-button"]').click();

      cy.wait("@extractSentence");
      cy.wait("@getProductsByKeys");

      cy.get('[data-testid="SalesAssistantView-inputBar"]').should(
        "be.visible",
      );

      cy.get('[data-testid="ChatTextarea-textarea"]').type(secondSentence);

      cy.get('[data-testid="SalesAssistant-submit-button"]').click();

      cy.get('[data-testid="ChatMessageItem-transcript"]')
        .last()
        .should("have.text", secondSentence);
    });

    it("stops the recording when the user clicks on the input", () => {
      const microphone = cy.get('[data-testid="VoiceRecognition-mic"]');

      microphone.click();

      microphone.should("have.attr", "data-state", "recording");

      cy.saySentence(["find", "me", "sunscreen"]);

      cy.get('[data-testid="ChatTextarea-textarea"]').click();

      cy.get('[data-testid="VoiceRecognition-mic"]').should(
        "have.attr",
        "data-state",
        "off",
      );
    });

    it("clears the message after input fired a request", () => {
      const text = "find me sunscreen";

      cy.get('[data-testid="ChatTextarea-textarea"]').type(text);

      cy.get('[data-testid="SalesAssistant-submit-button"]').click();

      cy.wait("@extractSentence");

      cy.get('[data-testid="ChatTextarea-textarea"]').should("have.value", "");
    });

    it("disables the submit button when the input is empty", () => {
      cy.get('[data-testid="SalesAssistant-submit-button"]').should(
        "be.disabled",
      );
    });

    it("disables the cancel button when the input is empty", () => {
      cy.get('[data-testid="ChatTextarea-cancel"]').should("be.disabled");
    });

    it("disables the submit button while isLoading, even with text entered", () => {
      cy.fixture("extractedSentence").then((extractedSentence) => {
        cy.stubExtractSentence(extractedSentence, { delay: 1000 });
      });

      cy.get('[data-testid="ChatTextarea-textarea"]').type("find me sunscreen");
      cy.get('[data-testid="SalesAssistant-submit-button"]').click();

      cy.get('[data-testid="ChatTextarea-textarea"]').type("another message");

      cy.get('[data-testid="SalesAssistant-submit-button"]').should(
        "be.disabled",
      );

      cy.get('[data-testid="ChatMessageItem-transcript"]').should(
        "have.length",
        1,
      );

      cy.wait("@extractSentence");
    });

    it("does not submit on Enter while isLoading, even with text entered", () => {
      cy.fixture("extractedSentence").then((extractedSentence) => {
        cy.stubExtractSentence(extractedSentence, { delay: 1000 });
      });

      cy.get('[data-testid="ChatTextarea-textarea"]').type(
        "find me sunscreen{enter}",
      );

      cy.get('[data-testid="ChatTextarea-textarea"]').type(
        "another message{enter}",
      );

      cy.get('[data-testid="ChatMessageItem-transcript"]').should(
        "have.length",
        1,
      );
      cy.get('[data-testid="ChatTextarea-textarea"]').should(
        "have.value",
        "another message",
      );

      cy.wait("@extractSentence");

      cy.get('[data-testid="ChatMessageItem-transcript"]')
        .last()
        .should("have.text", "find me sunscreen");
    });
  });
});

describe("Not Logged User", () => {
  it("should redirect user to login page", () => {
    shouldBeRedirectedToLoginPage();
  });

  it("should be redirected to the login page and after logging in to employee account he should be able to go back to Sales Assistant Page", function () {
    shouldBeRedirectedToLoginPage();

    cy.fixture("employee").then((employee) => {
      this.user = employee;
      cy.login(this.user.email, this.user.password);
    });

    cy.visit("/salesAssistant", {
      onBeforeLoad(win) {
        installSpeechRecognitionMock(win);
      },
    });

    cy.url().should("contain", "/salesAssistant");
  });
});

describe("Unauthorized User", () => {
  it("should be redirected to unauthorizedPage", function () {
    cy.fixture("unauthorizedUser").then((unauthorizedUser) => {
      this.user = unauthorizedUser;
      cy.login(this.user.email, this.user.password);
    });

    cy.visit("/salesAssistant");

    cy.get(".next-error-h1").should("contain.text", "403");
  });
});
