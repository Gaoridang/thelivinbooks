describe("Navigation", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.get('input[name="email"]').type("test@gmail.com");
    cy.get('input[name="password"]').type("12341234");
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/dashboard");
  });

  // it("should navigate to the writing page and submit successfully", () => {
  //   cy.get('a[href*="writing"]').click();
  //   cy.url().should("include", "/writing");

  //   cy.get("input").should("exist");
  //   cy.get("textarea").should("exist");

  //   cy.get("input[name=title]").type("Title");
  //   cy.get("textarea").type("Content");
  //   cy.wait(1000);

  //   cy.get('button[type="submit"]').contains("발행").click();

  //   cy.url().should("include", "/answers");

  //   cy.get("h2#title").should("exist");
  //   cy.get("p#content").should("exist");
  //   cy.wait(3000);

  //   // Should not startsWith "<comment>" and endsWith "</comment>"
  //   cy.get("p#ai-reply").should("exist");
  //   cy.get("p#ai-reply").should("not.contain", "<comment>");
  //   cy.get("p#ai-reply").should("not.contain", "</comment>");
  // });

  it("should show error dialog when submission fails", () => {
    cy.get('a[href*="writing"]').click();
    cy.url().should("include", "/writing");

    cy.get("input[name=title]").type("Error Test Title");
    cy.get("textarea").type("Error Test Content");
    cy.get('button[type="submit"]').contains("발행").click();

    // 에러 dialog 확인
    cy.get('[role="alertdialog"]', { timeout: 2000 }).should("be.visible");
  });
});
