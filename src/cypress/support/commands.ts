/// <reference types="cypress" />

import type { SalesAssistantExtractedSentenceResponse } from "../../features/salesAssistant/types/responseAndRequest.types";
import type { MockSpeechRecognition } from "./mockSpeechRecognition";

declare global {
  namespace Cypress {
    interface Chainable {
      login(username: string, password: string): Chainable<void>;
      saySentence(words: string[]): Chainable<void>;
      endRecognition(): Chainable<void>;
      stubExtractSentence(
        response: SalesAssistantExtractedSentenceResponse,
        options?: { delay?: number },
      ): Chainable<void>;
      stubExtractSentenceFailure(): Chainable<void>;
      stubGetProductsKeysFailure(
        response: SalesAssistantExtractedSentenceResponse,
      ): Chainable<void>;
      stubGetProductsByKeysFailure(
        response: SalesAssistantExtractedSentenceResponse,
      ): Chainable<void>;
      stubMultiPageProducts(
        response: SalesAssistantExtractedSentenceResponse,
        totalProducts: number,
      ): Chainable<void>;
      setPermissionState(
        permission: string,
        state: PermissionState,
      ): Chainable<void>;
    }
  }
}

Cypress.Commands.add("login", (username: string, password: string) => {
  cy.session([username, password], () => {
    cy.visit("/login");

    cy.get('[data-testid="LoginForm-email"]').should(($el) => {
      const hydrated = Object.keys($el[0]).some((key) =>
        key.startsWith("__reactFiber"),
      );
      expect(hydrated, "login form is hydrated").to.be.true;
    });

    cy.get('[data-testid="LoginForm-email"]')
      .type(username)
      .should("have.value", username);

    cy.get('[data-testid="LoginForm-password"]')
      .type(password)
      .should("have.value", password);

    cy.get('[data-testid="LoginForm-submit"]').click();

    cy.location("pathname").should("eq", "/");
  });
});

// Server actions expect a React Flight stream in response, not plain JSON —
// row 0 must carry `{a: <action return value>, f: <flight data>}`, otherwise
// the action promise on the client never settles.
function serverActionReply(value: unknown, delay?: number) {
  return {
    statusCode: 200,
    headers: { "content-type": "text/x-component" },
    body: `0:{"a":${JSON.stringify(value)},"f":""}\n`,
    delay,
  };
}

const EMPTY_PRODUCTS_RESPONSE = {
  totalProducts: 0,
  products: [],
  priceBounds: { min: 0, max: 0 },
};

const FAKE_PRODUCT = {
  key: "fake-product",
  name: "Fake Product",
  masterVariant: {
    price: { value: { centAmount: 1000, currencyCode: "EUR" } },
    images: [
      {
        url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
        alt: "Fake Product",
      },
    ],
    availability: { noChannel: { isOnStock: true } },
    attributesRaw: [],
  },
  categories: [{ key: "fake-category" }],
};

function isProductsByKeysRequest(contentType: string | string[] | undefined) {
  const value = Array.isArray(contentType) ? contentType[0] : contentType;
  return value?.startsWith("multipart/form-data") ?? false;
}

function isProductsKeysRequest(body: unknown) {
  if (typeof body !== "string") {
    return false;
  }

  try {
    const args: unknown = JSON.parse(body);
    const extractedQuery = Array.isArray(args) ? args[0] : undefined;
    return (
      typeof extractedQuery === "object" &&
      extractedQuery !== null &&
      Array.isArray((extractedQuery as { keywords?: unknown }).keywords)
    );
  } catch {
    return false;
  }
}

const PRODUCT_MATCHES = [{ id: FAKE_PRODUCT.key, score: 1 }];

interface StubReply {
  statusCode: number;
  headers?: Record<string, string>;
  body?: string;
  delay?: number;
}

interface SalesAssistantReplies {
  sentence: StubReply;
  productsKeys?: StubReply;
  productsByKeys: StubReply;
}

function interceptSalesAssistantActions({
  sentence,
  productsKeys,
  productsByKeys,
}: SalesAssistantReplies) {
  cy.intercept({ method: "POST", url: "/salesAssistant*" }, (req) => {
    if (!req.headers["next-action"]) {
      return;
    }

    if (isProductsByKeysRequest(req.headers["content-type"])) {
      req.alias = "getProductsByKeys";
      req.reply(productsByKeys);
      return;
    }

    if (isProductsKeysRequest(req.body)) {
      req.alias = "getProductsKeys";
      req.reply(productsKeys ?? serverActionReply(PRODUCT_MATCHES));
      return;
    }

    req.reply(sentence);
  }).as("extractSentence");
}

Cypress.Commands.add(
  "stubExtractSentence",
  (
    response: SalesAssistantExtractedSentenceResponse,
    options?: { delay?: number },
  ) => {
    interceptSalesAssistantActions({
      sentence: serverActionReply(response, options?.delay),
      productsByKeys: serverActionReply(EMPTY_PRODUCTS_RESPONSE),
    });
  },
);

Cypress.Commands.add("stubExtractSentenceFailure", () => {
  interceptSalesAssistantActions({
    sentence: { statusCode: 500 },
    productsByKeys: serverActionReply(EMPTY_PRODUCTS_RESPONSE),
  });
});

Cypress.Commands.add(
  "stubGetProductsKeysFailure",
  (response: SalesAssistantExtractedSentenceResponse) => {
    interceptSalesAssistantActions({
      sentence: serverActionReply(response),
      productsKeys: { statusCode: 500 },
      productsByKeys: serverActionReply(EMPTY_PRODUCTS_RESPONSE),
    });
  },
);

Cypress.Commands.add(
  "stubGetProductsByKeysFailure",
  (response: SalesAssistantExtractedSentenceResponse) => {
    interceptSalesAssistantActions({
      sentence: serverActionReply(response),
      productsByKeys: { statusCode: 500 },
    });
  },
);

Cypress.Commands.add(
  "stubMultiPageProducts",
  (
    response: SalesAssistantExtractedSentenceResponse,
    totalProducts: number,
  ) => {
    interceptSalesAssistantActions({
      sentence: serverActionReply(response),
      productsByKeys: serverActionReply({
        totalProducts,
        products: [FAKE_PRODUCT],
        priceBounds: { min: 0, max: 0 },
      }),
    });
  },
);

Cypress.Commands.add("saySentence", (words: string[]) => {
  cy.window().then((win) => {
    const instances = win.__speechInstances;
    const recognition = instances?.[instances.length - 1] as
      | MockSpeechRecognition
      | undefined;

    if (!recognition) {
      throw new Error(
        "No SpeechRecognition instance found. Did you call installSpeechRecognitionMock in onBeforeLoad?",
      );
    }

    words.forEach((word, index) => {
      const chunk = index === 0 ? word : ` ${word}`;
      recognition.emit(chunk, { isFinal: false });
      recognition.emit(chunk, { isFinal: true });
    });
  });
});

Cypress.Commands.add("endRecognition", () => {
  cy.window().then((win) => {
    const instances = win.__speechInstances;
    const recognition = instances?.[instances.length - 1] as
      | MockSpeechRecognition
      | undefined;

    if (!recognition) {
      throw new Error(
        "No SpeechRecognition instance found. Did you call installSpeechRecognitionMock in onBeforeLoad?",
      );
    }

    recognition.stop();
  });
});

Cypress.Commands.add("setPermissionState", (permission, state) => {
  return cy.wrap(
    Cypress.automation("remote:debugger:protocol", {
      command: "Browser.setPermission",
      params: {
        origin: origin || Cypress.config("baseUrl"),
        permission: { name: permission },
        setting: state,
      },
    }),
  );
});
