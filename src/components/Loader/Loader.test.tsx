import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import Loader from "./Loader";

describe("Given a Loader component", () => {
  describe("When its rendered", () => {
    test("Then it should show an animation on the screen", () => {
      render(
        <Provider store={store}>
          <Loader />
        </Provider>
      );

      const renderedAnimation = screen.queryByRole("alert");

      expect(renderedAnimation).toBeInTheDocument();
    });
  });
});
