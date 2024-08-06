import React from 'react'
import DashboardPage from './page'

describe('<DashboardPage />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<DashboardPage />)
  })
})