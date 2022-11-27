import App from "./App";
import { MemoryRouter } from "react-router-dom";
import TestRenderer from "react-test-renderer";
import { Provider } from "react-redux";
import mockInitialStore from "../../mocks/store/mockInitialStore";

describe("Given an App component", () => {
  describe("When it's rendered with path '/*'", () => {
    test("Then it should render 'Register Page'", () => {
      const expectedApp = TestRenderer.create(
        <Provider store={mockInitialStore}>
          <MemoryRouter initialEntries={["/"]}>
            <App />
          </MemoryRouter>
        </Provider>
      );

      expect(expectedApp).toMatchSnapshot();
    });
  });
});
