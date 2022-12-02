import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../test-utils/renderWithProviders";
import SessionForm from "./SessionForm";

const mockCreation = jest.fn();
const mockUpdate = jest.fn();

jest.mock("../../hooks/useSessions/useSessions", () => {
  return () => ({
    addOneSession: mockCreation,
    updateOneSession: mockUpdate,
  });
});

describe("Given a Session form component", () => {
  describe("When it's rendered", () => {
    test("Then it should show 2 text inputs: Title, Location and a 'CREATE' button", () => {
      const labelTitle = "title";
      const labelLocation = "location";

      const nameButton = "CREATE";

      renderWithProviders(<SessionForm isUpdate={false} />);

      const buttonCreate = screen.getByRole("button", {
        name: nameButton,
      });

      const inputTitle = screen.getByLabelText(labelTitle);
      const inputLocation = screen.getByLabelText(labelLocation);

      expect(buttonCreate).toBeInTheDocument();
      expect(inputLocation).toBeInTheDocument();
      expect(inputTitle).toBeInTheDocument();
    });
  });

  describe("When its rendered and its 'CREATE' button is clicked", () => {
    test("Then the form should be submitted", async () => {
      const image = new File(["avatar"], "avatar.jpg", {
        type: "image/jpg",
      });
      renderWithProviders(<SessionForm isUpdate={false} />);

      const title = screen.queryByRole("textbox", {
        name: "Title",
      }) as HTMLInputElement;

      const content = screen.queryByRole("textbox", {
        name: "Content",
      }) as HTMLInputElement;

      const level = screen.queryByRole("textbox", {
        name: "Level",
      }) as HTMLInputElement;

      const material = screen.queryByRole("textbox", {
        name: "Material",
      }) as HTMLInputElement;

      const picture = screen.queryByLabelText("Picture");

      await userEvent.type(title, "aaaaa");
      await userEvent.type(content, "bbbb");
      await userEvent.type(level, "dddd");
      await userEvent.type(material, "fffff");
      await userEvent.upload(picture!, image);

      const button = screen.queryByRole("button", { name: "CREATE" })!;

      const selectLabel = /style/i;
      const selectEl = await screen.findByLabelText(selectLabel);
      expect(selectEl).toBeInTheDocument();
      userEvent.click(selectEl);
      const optionsPopupEl = await screen.findByRole("listbox", {
        name: selectLabel,
      });
      userEvent.click(within(optionsPopupEl).getByText(/karate/i));

      await userEvent.click(button);

      expect(mockCreation).toBeCalled();
    });
  });

  describe("When its rendered and its 'UPDATE' button is clicked", () => {
    test("Then the form should be submitted", async () => {
      const image = new File(["avatar"], "avatar.jpg", {
        type: "image/jpg",
      });
      renderWithProviders(<SessionForm isUpdate={true} />);

      const title = screen.queryByRole("textbox", {
        name: "Title",
      }) as HTMLInputElement;

      const content = screen.queryByRole("textbox", {
        name: "Content",
      }) as HTMLInputElement;

      const level = screen.queryByRole("textbox", {
        name: "Level",
      }) as HTMLInputElement;

      const material = screen.queryByRole("textbox", {
        name: "Material",
      }) as HTMLInputElement;

      const picture = screen.queryByLabelText("Picture");

      await userEvent.type(title, "aaaaa");
      await userEvent.type(content, "bbbb");
      await userEvent.type(level, "dddd");
      await userEvent.type(material, "fffff");
      await userEvent.upload(picture!, image);

      const button = screen.queryByRole("button", { name: "UPDATE" })!;

      const selectLabel = /style/i;
      const selectEl = await screen.findByLabelText(selectLabel);
      expect(selectEl).toBeInTheDocument();
      userEvent.click(selectEl);
      const optionsPopupEl = await screen.findByRole("listbox", {
        name: selectLabel,
      });
      userEvent.click(within(optionsPopupEl).getByText(/karate/i));

      await userEvent.click(button);

      expect(mockUpdate).toBeCalled();
    });
  });
});
