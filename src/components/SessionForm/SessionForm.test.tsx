import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../test-utils/renderWithProviders";
import SessionForm from "./SessionForm";

const mockCreation = jest.fn();
const mockUpdate = jest.fn();
const mockLoad = jest.fn();

jest.mock("../../hooks/useSessions/useSessions", () => {
  return () => ({
    addOneSession: mockCreation,
    updateOneSession: mockUpdate,
    loadOneSession: mockLoad,
  });
});

describe("Given a Session form component", () => {
  describe("When it's rendered", () => {
    test("Then it should show 2 text inputs: Title, Location and a 'SUBMIT' button", () => {
      const labelTitle = "title";
      const labelLocation = "location";

      const nameButton = "SUBMIT";

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

  describe("When its rendered and its 'SUBMIT' button is clicked", () => {
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

      URL.createObjectURL = jest.fn().mockReturnValue(image.type);
      await userEvent.upload(picture!, image);

      const button = screen.queryByRole("button", { name: "SUBMIT" })!;

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

  describe("When its rendered and its 'SUBMIT' button is clicked for an update", () => {
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

      URL.createObjectURL = jest.fn().mockReturnValue(image.type);

      await userEvent.upload(picture!, image);

      const button = screen.queryByRole("button", { name: "SUBMIT" })!;

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

  describe("When its rendered without a picture", () => {
    test("Then the form should be submitted", async () => {
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

      await userEvent.type(title, "aaaaa");
      await userEvent.type(content, "bbbb");
      await userEvent.type(level, "dddd");
      await userEvent.type(material, "fffff");

      const button = screen.queryByRole("button", { name: "SUBMIT" })!;

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
