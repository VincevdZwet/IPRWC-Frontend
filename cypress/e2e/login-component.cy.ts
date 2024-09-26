describe("Test for login component", () => {
  beforeEach(() => {
    cy.visit("/login")
  });

  it('should login when credentials are valid', () => {
    cy.get("input[placeholder='Email']").type("test@mail.com");
    cy.get("input[placeholder='Password']").type("Test123!");
    cy.get("button[type='submit']").contains("Login").click();
    cy.location("pathname").should("eq", "/movies");
  });

  it('should not login when credentials are invalid', () => {
    cy.get("input[placeholder='Email']").type("test1@mail.com");
    cy.get("input[placeholder='Password']").type("Test123!");
    cy.get("button[type='submit']").contains("Login").click();
    cy.location("pathname").should("eq", "/login");
    cy.get("p").contains("Invalid credentials").should("exist");
  });

  it('login button should be disabled when form is invalid', () => {
    cy.get("input[placeholder='Email']").type("test@mail");
    cy.get("input[placeholder='Password']").type("Test123!");
    cy.get("button[type='submit']").contains("Login").should("be.disabled");
  });

  it('invalid input field should have a red border-color', () => {
    cy.get("input[placeholder='Email']").type("test@mail");
    cy.get("input[placeholder='Password']").type("Test123!");
    cy.get("input[placeholder='Email']").should("have.css", "border-color").and('eq', 'rgb(255, 0, 0)');
  });
});
