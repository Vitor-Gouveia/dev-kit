import { describe, it } from "node:test"
import assert from "node:assert"
import crypto from "node:crypto"

import { sum } from "../lib/sum.js"

describe("Unit Tests - sum", () => {
  it("should sum two numbers", () => {
    const num1 = crypto.randomInt(0, 10)
    const num2 = crypto.randomInt(0, 10)

    const result = sum(num1, num2)

    assert.equal(result, num1 + num2)
  })
})