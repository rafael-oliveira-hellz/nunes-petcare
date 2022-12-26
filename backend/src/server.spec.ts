import sayHelloWorld from "@/server";

describe("sayHelloWorld", () => {
  it("should return the message", () => {
    expect(sayHelloWorld("Hello World")).toBe("Hello World");
  });
});