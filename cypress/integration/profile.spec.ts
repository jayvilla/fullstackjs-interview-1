import { errorMessages } from '../../src/components/profile/constants';

describe('Profile Spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4000/login');
    cy.get('[data-cy="login-input-email"]').type('test2@sold.com');
    cy.get('[data-cy="login-input-password"]').type('!Test1234');
    cy.get('form').submit();
    cy.get('.linkToProfile').dblclick();
  });

  it('should have prerendered user data', () => {
    cy.get('[data-cy="profile-firstName"]').should('have.value', 'test2');
    cy.get('[data-cy="profile-lastName"]').should('have.value', 'user2');
    cy.get('[data-cy="profile-phoneNumber"]').should('have.value', '+15105551232');
    cy.get('[data-cy="profile-email"]').should('have.value', 'test2@sold.com');
  });

  it('should render error messages on invalid fields', () => {
    cy.get('[data-cy="profile-firstName"]').clear().type(' ');
    cy.get('form').submit();
    cy.get('[data-cy="profile-firstName"] ~ [data-cy="profile-error"]').should(
      'contain.html',
      errorMessages.firstName,
    );

    cy.get('[data-cy="profile-lastName"]').clear().type(' ');
    cy.get('form').submit();
    cy.get('[data-cy="profile-lastName"] ~ [data-cy="profile-error"]').should(
      'contain.html',
      errorMessages.lastName,
    );

    cy.get('[data-cy="profile-phoneNumber"]').clear().type('+1510555123');
    cy.get('form').submit();
    cy.get('[data-cy="profile-phoneNumber"] ~ [data-cy="profile-error"]').should(
      'contain.html',
      errorMessages.phoneNumber,
    );

    cy.get('[data-cy="profile-email"]').clear().type('wrong@answer');
    cy.get('form').submit();
    cy.get('[data-cy="profile-email"] ~ [data-cy="profile-error"]').should(
      'contain.html',
      errorMessages.email,
    );
  });

  it('should render success message if updated profile is successful', () => {
    cy.get('[data-cy="profile-firstName"]').clear().type('test222');
    cy.get('[data-cy="profile-lastName"]').clear().type('user222');
    cy.get('[data-cy="profile-phoneNumber"]').clear().type('+15105554321');
    cy.get('form').submit();
    cy.get('[data-cy="form-message"]').should('contain.html', 'Profile successfully updated.');
  });

  it('should change test user back to normal info', () => {
    cy.get('[data-cy="profile-firstName"]').clear().type('test2');
    cy.get('[data-cy="profile-lastName"]').clear().type('user2');
    cy.get('[data-cy="profile-phoneNumber"]').clear().type('+15105551232');
    cy.get('form').submit();
    cy.get('[data-cy="form-message"]').should('contain.html', 'Profile successfully updated.');
  });
});
