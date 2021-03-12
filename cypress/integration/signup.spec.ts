import { errorMessages } from '../../src/components/signup/constants';

describe('Sign Up Spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4000/sign-up');
  });

  it('should render error when first name field is blank', () => {
    cy.get('[data-cy="input-firstName"]').type(' ');
    cy.get('[data-cy="input-lastName"]').type('user');
    cy.get('[data-cy="input-email"]').type('test@user.com');
    cy.get('[data-cy="input-password"]').type('!Test1234');
    cy.get('[data-cy="input-confirmPassword"]').type('!Test1234');
    cy.get('[data-cy="input-phoneNumber"]').type('+15106721234');
    cy.get('form').submit();
    cy.get('[data-cy="signup-error"]').should('contain.html', errorMessages.firstName);
  });

  it('should render error when last name field is blank', () => {
    cy.get('[data-cy="input-firstName"]').type('test');
    cy.get('[data-cy="input-lastName"]').type(' ');
    cy.get('[data-cy="input-email"]').type('test@user.com');
    cy.get('[data-cy="input-password"]').type('!Test1234');
    cy.get('[data-cy="input-confirmPassword"]').type('!Test1234');
    cy.get('[data-cy="input-phoneNumber"]').type('+15106721234');
    cy.get('form').submit();
    cy.get('[data-cy="signup-error"]').should('contain.html', errorMessages.lastName);
  });

  it('should render error when not valid email', () => {
    cy.get('[data-cy="input-firstName"]').type('test');
    cy.get('[data-cy="input-lastName"]').type('user');
    cy.get('[data-cy="input-email"]').type('test@test');
    cy.get('[data-cy="input-password"]').type('!Test1234');
    cy.get('[data-cy="input-confirmPassword"]').type('!Test1234');
    cy.get('[data-cy="input-phoneNumber"]').type('+15106721234');
    cy.get('form').submit();
    cy.get('[data-cy="signup-error"]').should('contain.html', errorMessages.email);
  });

  it('should render error when password is not at least 8 characters (1 special, 1 upper, 1 lower)', () => {
    cy.get('[data-cy="input-firstName"]').type('test');
    cy.get('[data-cy="input-lastName"]').type('user');
    cy.get('[data-cy="input-email"]').type('test@user.com');
    cy.get('[data-cy="input-password"]').type('test1234');
    cy.get('[data-cy="input-confirmPassword"]').type('test1234');
    cy.get('[data-cy="input-phoneNumber"]').type('+15106721234');
    cy.get('form').submit();
    cy.get('[data-cy="signup-error"]').should('contain.html', errorMessages.password);
  });

  it('should render error when passwords do not match', () => {
    cy.get('[data-cy="input-firstName"]').type('test');
    cy.get('[data-cy="input-lastName"]').type('user');
    cy.get('[data-cy="input-email"]').type('test@user.com');
    cy.get('[data-cy="input-password"]').type('!Test1234');
    cy.get('[data-cy="input-confirmPassword"]').type('test1234');
    cy.get('[data-cy="input-phoneNumber"]').type('+15106721234');
    cy.get('form').submit();
    cy.get('[data-cy="signup-error"]').should('contain.html', errorMessages.confirmPassword);
  });

  it('should render error when not valid phone number', () => {
    cy.get('[data-cy="input-firstName"]').type('test');
    cy.get('[data-cy="input-lastName"]').type('user');
    cy.get('[data-cy="input-email"]').type('test@user.com');
    cy.get('[data-cy="input-password"]').type('!Test1234');
    cy.get('[data-cy="input-confirmPassword"]').type('!Test1234');
    cy.get('[data-cy="input-phoneNumber"]').type('(510) 672-1234');
    cy.get('form').submit();
    cy.get('[data-cy="signup-error"]').should('contain.html', errorMessages.phoneNumber);
  });

  it('should render dashboard on successful signup', () => {
    cy.get('[data-cy="input-firstName"]').type('test');
    cy.get('[data-cy="input-lastName"]').type('user');
    cy.get('[data-cy="input-email"]').type('test@user.com');
    cy.get('[data-cy="input-password"]').type('!Test1234');
    cy.get('[data-cy="input-confirmPassword"]').type('!Test1234');
    cy.get('[data-cy="input-phoneNumber"]').type('+15106721234');
    cy.get('form').submit();
    cy.location('pathname').should('eq', '/dashboard');
  });

  it('should render user already exists if duplicate user', () => {
    cy.get('[data-cy="input-firstName"]').type('test');
    cy.get('[data-cy="input-lastName"]').type('user');
    cy.get('[data-cy="input-email"]').type('test@user.com');
    cy.get('[data-cy="input-password"]').type('!Test1234');
    cy.get('[data-cy="input-confirmPassword"]').type('!Test1234');
    cy.get('[data-cy="input-phoneNumber"]').type('+15106721234');
    cy.get('form').submit();
    cy.get('[data-cy="form-message"]').should('contain.html', 'User already exists');
  });
});
