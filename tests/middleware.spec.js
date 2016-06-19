import { expect } from 'chai';
import analyticsMiddleware from '../src/middleware';

describe('Analytics Middleware', function () {
  it('should return hello world', function () {
    expect(analyticsMiddleware()).to.eql('hello world');
  })
});
