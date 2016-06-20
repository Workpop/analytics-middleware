# Workpop Redux Analytics Middleware

Analytics middleware for [Redux](https://github.com/rackt/redux).

### Installation

```bash
$ npm install --save @workpop/analytics-middleware
```

### Usage

Whenever we want to track analytics events we usually are required to supply our analytics library 2 things:

```js
type AnalyticsEventType = {
    name: string,
    metadata: Object
}
```

1. name - Name of the analytics event
2. metadata - any additional data sent along with the event.

A sample action creator:

```js
function addSparksAction(sparkCount, uiSource) {
    return {
        type: "ADD_SPARKS",
        data: sparkCount,
        analytics: {
            name: "Track Sparks",
            metadata: {
                sparkCount,
                "UI Source": uiSource
            }
        }
    }
}
```

### Setup

To enable the Redux Store to start dispatching analytics tracking, we need to setup our middleware.

```js
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './rootReducer';
import { analyticsMiddleware } from '@workpop/analytics-middleware';
import { event } from '@workpop/analytics-core';

export const store = createStore(rootReducer, {}, applyMiddleware(analyticsMiddleware(event));
```

The analytics middleware takes one argument, which is your event tracking implementation:

### `analyticsMiddleware(track)`

1. `track` - Function - analytics implementation from whatever library. 

The middleware will call this `track` function with 2 params, `name`, and `metadata`.
