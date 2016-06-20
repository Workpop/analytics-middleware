import { expect } from 'chai';
import { sandbox } from 'sinon';
import { createStore, applyMiddleware }  from 'redux';
import analyticsMiddleware from '../src/middleware';

describe('Analytics Middleware', function () {
  let store;
  let trackAnalytics;
  let testSandbox;

  function rootReducer(state = "OFF", action) {
    switch (action.type) {
      case 'TOGGLE':
      {
        return "ON"
      }
      default:
      {
        return state;
      }
    }
  }

  beforeEach(function () {
    testSandbox = sandbox.create();
    trackAnalytics = sandbox.spy();
    store = createStore(rootReducer, {}, applyMiddleware(analyticsMiddleware(trackAnalytics)));
  });
  afterEach(function () {
    testSandbox.restore();
  });


  it('When an analytics event is dispatched, track should be called with eventName as the first argument', function () {
    store.dispatch({
      type: "TOGGLE",
      analytics: {
        eventName: "HELLO"
      }
    });
    const [ eventName, eventData ] = trackAnalytics.getCall(0).args;
    expect(eventName).to.eql('HELLO');
    expect(eventData).to.eql({});
  });

  it('track should be called with event meta data if present', function () {
    store.dispatch({
      type: "TOGGLE",
      analytics: {
        eventName: "HELLO",
        eventData: {
          "Button Name": "Toggle"
        }
      }
    });

    const [, eventData ] = trackAnalytics.getCall(0).args;
    expect(eventData).to.eql({
      "Button Name": "Toggle"
    });
  });

  it('It should not invoke the tracking callback, if theres no analytics data', () => {
    store.dispatch({
      type: "TOGGLE"
    });
    expect(trackAnalytics.callCount).to.eql(0);
  });
});
