import {
  fireEvent,
  queryByTestId,
  render,
  screen,
} from "@testing-library/react";
import '@testing-library/jest-dom'
import { act } from "react-dom/test-utils";
import App from "../App";

describe("test for add todo form", () => {
  it("render form", function () {
    const { getByTestId } = render(<App />);
    const formElement = getByTestId("form");
    expect(formElement).toBeInTheDocument;
  });

  it("can't submit when text length is 0", async function () {
    const { getByTestId } = render(<App />);
    const formBtn = getByTestId("form-submit");
    expect(formBtn.getAttribute("disabled")).toBe("");
  });

  it("can submit when text length is greather than 0", async function () {
    const { getByTestId } = render(<App />);
    const formBtn = getByTestId("form-submit");
    const formInput = getByTestId("form-input");
    const text = "To eat";

    await act(async () => {
      await fireEvent.change(formInput, { target: { value: text } });
      expect(formBtn.getAttribute("disabled")).toBe(null);
    });
  });
});

describe("todo crud and complete test", () => {
  it("empty todo in initial", function () {
    const { queryByTestId } = render(<App />);
    const todo = queryByTestId("todo-item");
    expect(todo).toBeFalsy;
  });

  it("create 2 todos", async function () {
    const { getByTestId, getAllByTestId } = render(<App />);
    const form = getByTestId("form");
    const formInput = getByTestId("form-input");
    
    // add one todo
    const text = "To eat";
    await act(async () => {
      await fireEvent.change(formInput, { target: { value: text } });
      await fireEvent.submit(form);
    });

    // check todos length is 1
    let todo = getAllByTestId("todo-item");
    expect(await todo.length).toBe(1);
    expect(screen.getByText(text)).toBeInTheDocument;

    // add another todo
    const text2 = "to drink";
    await act(async () => {
      await fireEvent.change(formInput, { target: { value: text2 } });
      await fireEvent.submit(form);
    });

    // check todos length is 2
    todo = getAllByTestId("todo-item");
    expect(await todo.length).toBe(2);
    expect(screen.getByText(text2)).toBeInTheDocument;
  });

  it("delete todo", async function () {
    const { getByTestId, getAllByTestId } = render(<App />);
    const form = getByTestId("form");
    const formInput = getByTestId("form-input");

    // add one todo
    const text = "To eat";
    await act(async () => {
      await fireEvent.change(formInput, { target: { value: text } });
      await fireEvent.submit(form);
    });

    // add another todo
    const text2 = "to drink";
    await act(async () => {
      await fireEvent.change(formInput, { target: { value: text2 } });
      await fireEvent.submit(form);
    });

    // delete first todo
    const delBtns = getAllByTestId("delBtn");
    await act(async () => {
      await fireEvent.click(delBtns[0]);
    });

    // check only one left
    let todo = getAllByTestId("todo-item");
    expect(await todo.length).toBe(1);
    expect(screen.getByText(text2)).toBeInTheDocument;
  });

  it("complete todo", async function () {
    const { getByTestId} = render(<App />);
    const form = getByTestId("form");
    const formInput = getByTestId("form-input");
    const text = "To eat";
    let completeContainer = getByTestId('complete-container');
    let todoContainer = getByTestId('todo-container');

    // add one todo
    await act(async () => {
      await fireEvent.change(formInput, { target: { value: text } });
      await fireEvent.submit(form);
    });
    let completeBtn = getByTestId('completeBtn');
    let todo = getByTestId("todo-item");

    // check todo in imcomplete
    expect(todoContainer).toContainElement(todo);
    
    // click complete btn
    await act(async ()=>{
        await fireEvent.click(completeBtn);
    })
    // check todo exist in complete container and not in imcomplete
    todo = getByTestId("todo-item");
    expect(todoContainer).not.toContainElement(todo);
    expect(completeContainer).toContainElement(todo);
  });

  it('when edit option btn will not visible',async ()=>{
    const { getByTestId , queryByTestId } = render(<App />);
    const form = getByTestId("form");
    const formInput = getByTestId("form-input");

    // add one todo
    const text = "To eat";
    await act(async () => {
      await fireEvent.change(formInput, { target: { value: text } });
      await fireEvent.submit(form);
    });


    let todo = getByTestId('todo-item');
    let editBtn = getByTestId('editBtn');
    let completeBtn = getByTestId('completeBtn');
    let delBtn = getByTestId('delBtn');
    
    expect(todo).toContainElement(editBtn);
    expect(todo).toContainElement(completeBtn);
    expect(todo).toContainElement(delBtn);
    
    await act(async()=>{
      await fireEvent.click(editBtn);
    })

    expect(queryByTestId('editBtn')).toBeFalsy();
    expect(queryByTestId('completeBtn')).toBeFalsy();
    expect(queryByTestId('delBtn')).toBeFalsy();
  })

  it('when edit input form is visible',async()=>{
    const { getByTestId , queryByTestId } = render(<App />);
    const form = getByTestId("form");
    const formInput = getByTestId("form-input");

    // add one todo
    const text = "To eat";
    await act(async () => {
      await fireEvent.change(formInput, { target: { value: text } });
      await fireEvent.submit(form);
    });


    
    let editBtn = getByTestId('editBtn');

    expect(queryByTestId('completeEdit')).toBeFalsy();
    expect(queryByTestId('cancelEdit')).toBeFalsy();

    await act(async()=>{
      await fireEvent.click(editBtn);
    })

    let todo = getByTestId('todo-item');
    let completeEdit = getByTestId('completeEdit');
    let cancelEdit = getByTestId('cancelEdit');
    let editFormInput = getByTestId('edit-form-input');
    let editForm = getByTestId('edit-form');
    
    expect(todo).toContainElement(completeEdit);
    expect(todo).toContainElement(cancelEdit);
    expect(todo).toContainElement(editForm);

    const text2 = "new Text"
    await act(async () => {
      await fireEvent.change(editFormInput, { target: { value: text2 } });
      await fireEvent.submit(editForm);
    });
    expect(screen.getByText(text2)).toBeInTheDocument;
  })
  
});
