describe("Given Bloody Nose login page", () => {
  describe("When the user logs in with 'xavi' and password '12345'", () => {
    it("Then it should be redirected to '/sessions'", () => {
      cy.visit("/login");
      cy.findByRole("textbox", { name: "Username" }).type("xavi");
      cy.findByTestId("password").type("12345");
      cy.findByRole("button", { name: "SIGN IN" }).click();

      cy.findByRole("heading", { name: "Bloody Nose" }).should("exist");
      cy.url().should("include", "/sessions");
    });
  });
});
