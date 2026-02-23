import { expect, test, describe } from "bun:test";
import { binarySearch } from "./array";

describe("binarySearch", () => {
  const numberCompare = (a: number, b: number) => a - b;

  test("should find an element in the middle", () => {
    const arr = [1, 2, 3, 4, 5];
    expect(binarySearch(arr, 3, numberCompare)).toBe(2);
  });

  test("should find an element at the beginning", () => {
    const arr = [1, 2, 3, 4, 5];
    expect(binarySearch(arr, 1, numberCompare)).toBe(0);
  });

  test("should find an element at the end", () => {
    const arr = [1, 2, 3, 4, 5];
    expect(binarySearch(arr, 5, numberCompare)).toBe(4);
  });

  test("should return -1 when element is not found (smaller than all)", () => {
    const arr = [2, 3, 4, 5];
    expect(binarySearch(arr, 1, numberCompare)).toBe(-1);
  });

  test("should return -1 when element is not found (larger than all)", () => {
    const arr = [1, 2, 3, 4];
    expect(binarySearch(arr, 5, numberCompare)).toBe(-1);
  });

  test("should return -1 when element is not found (middle gap)", () => {
    const arr = [1, 2, 4, 5];
    expect(binarySearch(arr, 3, numberCompare)).toBe(-1);
  });

  test("should handle empty array", () => {
    expect(binarySearch([], 1, numberCompare)).toBe(-1);
  });

  test("should handle single element array (found)", () => {
    expect(binarySearch([1], 1, numberCompare)).toBe(0);
  });

  test("should handle single element array (not found)", () => {
    expect(binarySearch([1], 2, numberCompare)).toBe(-1);
  });

  test("should work with objects", () => {
    const arr = [
      { id: 1, name: "A" },
      { id: 2, name: "B" },
      { id: 3, name: "C" },
    ];
    const target = { id: 2, name: "B" };
    const compare = (a: { id: number }, b: { id: number }) => a.id - b.id;
    expect(binarySearch(arr, target, compare)).toBe(1);
  });

  test("should work with duplicates (returns some valid index)", () => {
    const arr = [1, 2, 2, 2, 3];
    const index = binarySearch(arr, 2, numberCompare);
    expect([1, 2, 3]).toContain(index);
  });
});
