export default function analyticsMiddleware(track) {
  return store => next => action => {
    const analytics = action.analytics;
    const returnAction = next(action);
    if (!action || !analytics) {
      return returnAction;
    }
    const eventName = analytics.name;
    const eventMetaData = analytics.metadata || {};
    if (!eventName) {
      return returnAction;
    }
    // track mixpanel event
    track(eventName, eventMetaData);
    return returnAction;
  };
}
