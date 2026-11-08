export const checkIfMicrophoneIsAvailable = () => {
  const microphone = cy.get('[data-testid="VoiceRecognition-mic"]');

  microphone.should("be.visible").and("have.attr", "data-state", "off");
};

export const shouldBeRedirectedToLoginPage = () => {
  cy.visit("/salesAssistant");

  cy.url().should("contain", "/login");
};
