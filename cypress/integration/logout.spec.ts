describe('Logout Spec', () => {
  beforeEach(() => {
    // reset and seed the database prior to every test
    cy.exec('npm run db:reset && npm run db:seed');
  });

  it('Should logout', () => {
    // programmatically log us in without needing the UI
    cy.request('POST', '/api/authenticate', {
      email: 'cypress@test.com',
      password: 'test1234',
    });

    // now that we're logged in, we can visit
    // any kind of restricted route!
    cy.visit('/dashboard');

    // our auth cookie should be present
    // Cypress.Cookies.debug(true);
    cy.getCookies().then((cookies) => {
      expect(cookies.find((c) => c.name.includes('with-iron-session'))).to.not.eq(undefined);
    });

    // should be on the dashboard page
    cy.location('pathname').should('eq', '/dashboard');
    cy.get('h1').should('contain', 'Dashboard');

    // logout
    cy.contains('button', 'Logout').click();
    cy.location('pathname').should('eq', '/login');
    cy.get('h1').should('contain', 'Login');
    cy.getCookies().then((cookies) => {
      expect(cookies.find((c) => c.name.includes('with-iron-session'))).to.eq(undefined);
    });
  });
});
