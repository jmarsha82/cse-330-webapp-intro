const {
  calculateResult,
  getSelectedOperation,
  calculate,
  wireCalculator
} = require("../../Module5/calculate");

describe("Module 5 calculator", () => {
  test.each([
    ["2", "3", "add", "2+3=5"],
    ["8", "3", "subtract", "8-3=5"],
    ["4", "6", "multiply", "4*6=24"],
    ["9", "3", "divide", "9/3=3"],
    ["1.5", "2", "add", "1.5+2=3.5"]
  ])("calculates %s %s with %s", (first, second, operation, expected) => {
    expect(calculateResult(first, second, operation)).toBe(expected);
  });

  test("requires both numbers and an operation", () => {
    expect(calculateResult("", "3", "add")).toBe("All fields required!");
    expect(calculateResult("3", "", "add")).toBe("All fields required!");
    expect(calculateResult("3", "4", null)).toBe("All fields required!");
    expect(calculateResult("3", "4", "power")).toBe("All fields required!");
  });

  test("prevents division by zero", () => {
    expect(calculateResult("10", "0", "divide")).toBe("The second number cannot be zero!");
  });

  test("finds the checked operation in a radio collection", () => {
    const operations = [
      { checked: false, value: "add" },
      { checked: true, value: "multiply" },
      { checked: false, value: "divide" }
    ];

    expect(getSelectedOperation(operations)).toBe("multiply");
    expect(getSelectedOperation([{ checked: false, value: "add" }])).toBeNull();
  });

  test("updates the calculator output from DOM fields", () => {
    document.body.innerHTML = `
      <input id="firstNumber" value="6">
      <input id="secondNumber" value="7">
      <input type="radio" name="operation" value="multiply" checked>
      <output id="answer"></output>
    `;

    calculate();

    expect(document.getElementById("answer").textContent).toBe("6*7=42");
  });

  test("wires change events when calculator elements exist", () => {
    document.body.innerHTML = `
      <input id="firstNumber" value="10">
      <input id="secondNumber" value="5">
      <input type="radio" name="operation" value="divide" checked>
      <output id="answer"></output>
    `;

    wireCalculator();
    document.getElementById("secondNumber").dispatchEvent(new Event("change"));

    expect(document.getElementById("answer").textContent).toBe("10/5=2");
  });

  test("skips DOM wiring when the calculator markup is not present", () => {
    document.body.innerHTML = "";

    expect(() => wireCalculator()).not.toThrow();
  });
});
