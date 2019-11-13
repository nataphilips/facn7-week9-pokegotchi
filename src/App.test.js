import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { fireEvent, getAllByTestId } from "@testing-library/dom";
import { render, cleanup, waitForElement } from "@testing-library/react";

// it("renders without crashing", () => {
//   const div = document.createElement("div");
//   ReactDOM.render(<App />, div);
// });

afterEach(cleanup);

const mockResponse = {
  name: "pikachu",
  id: "25",
  sprites: {
    back_default:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/25.png",
    front_default:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
  }
};
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
  return waitForElement(() => getByTestId("pokename"))
    .then(output => {
      expect(output.innerHTML).toEqual(mockResponse.name);
    })
    .catch(err => console.log(err));

  // wait until our element callback finds the output DOM node
  // then we have access to the node
  // so we can assert against it to make sure the innerHTML is correct
});
