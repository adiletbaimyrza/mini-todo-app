import assert from 'assert'
import { NextFunction, Request, Response } from 'express'
import { describe, it } from 'node:test'
import { validateTodoPayload } from './validateTodoPayload'

describe('validateTodoPayload middleware', () => {
  // Mock Response
  const mockResponse = (): Partial<Response> => {
    const res: Partial<Response> = {}
    res.status = function (code: number): Response {
      this.statusCode = code
      return this as Response
    }
    res.json = function (data: any): Response {
      this.data = data
      return this as Response
    }
    return res
  }

  // Mock Next Function
  const mockNext = (): NextFunction => {
    let called = false
    const next: NextFunction = () => {
      called = true
    }
    next.called = () => called
    return next
  }

  it('should allow valid payloads', () => {
    const req = {
      body: {
        name: 'Test Todo',
        dueDate: '2025-02-01',
        isCompleted: true,
        completionDate: '2025-01-30',
      },
    } as Partial<Request>
    const res = mockResponse() as Response
    const next = mockNext()

    validateTodoPayload(req as Request, res, next)

    assert(next.called(), 'Next function should be called')
    assert.strictEqual(
      res.statusCode,
      undefined,
      'Response status should not be set'
    )
  })

  it('should return an error if name is missing or empty', () => {
    const req = {
      body: {
        name: '',
        dueDate: '2025-02-01',
        isCompleted: false,
      },
    } as Partial<Request>
    const res = mockResponse() as Response
    const next = mockNext()

    validateTodoPayload(req as Request, res, next)

    assert.strictEqual(res.statusCode, 400)
    assert.strictEqual(res.data.success, false)
    assert.strictEqual(res.data.errorCode, 'VALIDATION_ERROR')
    assert.ok(res.data.details.find((err: any) => err.field === 'name'))
  })

  it('should return an error if dueDate is invalid', () => {
    const req = {
      body: {
        name: 'Test Todo',
        dueDate: 'invalid-date',
        isCompleted: true,
      },
    } as Partial<Request>
    const res = mockResponse() as Response
    const next = mockNext()

    validateTodoPayload(req as Request, res, next)

    assert.strictEqual(res.statusCode, 400)
    assert.strictEqual(res.data.success, false)
    assert.ok(res.data.details.find((err: any) => err.field === 'dueDate'))
  })

  it('should return an error if completionDate is in the future', () => {
    const req = {
      body: {
        name: 'Test Todo',
        isCompleted: true,
        completionDate: '2099-01-01',
      },
    } as Partial<Request>
    const res = mockResponse() as Response
    const next = mockNext()

    validateTodoPayload(req as Request, res, next)

    assert.strictEqual(res.statusCode, 400)
    assert.strictEqual(res.data.success, false)
    assert.ok(
      res.data.details.find((err: any) => err.field === 'completionDate')
    )
  })

  it('should return an error if isCompleted is false and completionDate is provided', () => {
    const req = {
      body: {
        name: 'Test Todo',
        isCompleted: false,
        completionDate: '2025-01-01',
      },
    } as Partial<Request>
    const res = mockResponse() as Response
    const next = mockNext()

    validateTodoPayload(req as Request, res, next)

    assert.strictEqual(res.statusCode, 400)
    assert.strictEqual(res.data.success, false)
    assert.ok(
      res.data.details.find((err: any) => err.field === 'completionDate')
    )
  })

  it('should return an error if id is provided', () => {
    const req = {
      body: {
        id: 1,
        name: 'Test Todo',
        isCompleted: true,
      },
    } as Partial<Request>
    const res = mockResponse() as Response
    const next = mockNext()

    validateTodoPayload(req as Request, res, next)

    assert.strictEqual(res.statusCode, 400)
    assert.strictEqual(res.data.success, false)
    assert.ok(res.data.details.find((err: any) => err.field === 'id'))
  })
})
