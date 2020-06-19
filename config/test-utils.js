// test-utils.js
/**
 * Configuring Jest with Test Utils
 *
 * @see https://testing-library.com/docs/example-react-redux
 * @see https://testing-library.com/docs/react-testing-library/setup#configuring-jest-with-test-utils
 */
// test-utils.js
// import React from 'react';
// import { render as rtlRender } from '@testing-library/react';
// import { createStore, applyMiddleware } from 'redux';
// import { Provider } from 'react-redux';
// import thunk from 'redux-thunk';
// import reducer from '../../src/reducers';

// function render(
//   ui,
//   {
//     initialState = {},
//     store = createStore(reducer, initialState, applyMiddleware(thunk)),
//     ...renderOptions
//   } = {},
// ) {
//   function Wrapper({ children }) {
//     return <Provider store={store}>{children}</Provider>;
//   }
//   return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
// }

// re-export everything
export * from '@testing-library/react';

// override render method
// export { render };
