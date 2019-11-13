import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { fireEvent } from "@testing-library/dom";
import { render, cleanup, waitForElement } from "@testing-library/react";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
});

// describe("the poke name fetching", () => {
//   test("poke name is on the page", () => {
//     const { getByText, getByLabelText, getByTestId } = render(<App />);
//     const inputNode = getByLabelText("Pick a pokemon");
//     // console.log("inputNode: ", inputNode);
//     fireEvent.change(inputNode, { target: { value: "pikachu" } });
//     const buttonNode = getByTestId("search");
//     // console.log("buttonNode: ", buttonNode);
//     fireEvent.click(buttonNode);
//     const headerText = getByText("pikachu");
//     console.log("header:************************************ ", headerText);
//     getByText("pikachu");
//   });
// });

afterEach(cleanup);

const mockResponse = { name: "pikachu", id: "25" };
global.fetch = jest
  .fn()
  .mockImplementation(() =>
    Promise.resolve({ json: () => Promise.resolve(mockResponse) })
  );

test("App component", () => {
  let { debug, getByText, getByLabelText, getByTestId } = render(<App />);

  const input = getByLabelText("Pick a pokemon");
  fireEvent.change(input, { target: { value: "pikachu" } }); // fire a change event with the right value

  const button = getByTestId("search");

  fireEvent.click(button); // fire a real browser event on the submit button

  // check that our mock fetch has been called
  expect(global.fetch).toHaveBeenCalledTimes(1);

  // render(<App />);
  // Jest will wait for a promise if you return it from the test:
  // https://facebook.github.io/jest/docs/en/asynchronous.html#promises
  // Otherwise the test will end immediately and the async bit won't run
  return waitForElement(() => {
    debug();
    return getByText("pikachu");
  })
    .then(output => {
      console.log(output);
      expect(output.innerHTML).toEqual(mockResponse.name);
    })

    .catch(err => console.log(err));

  // wait until our element callback finds the output DOM node
  // then we have access to the node
  // so we can assert against it to make sure the innerHTML is correct
});
