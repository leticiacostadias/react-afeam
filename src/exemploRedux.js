function createStore (reducer) {
    const subscribers = [];
    let state;

    return {
        dispatch(action) {
            state = reducer(state, action);

            subscribers.forEach(listener => listener());
        },

        subscribe(listener) {
            subscribers.push(listener);

            return createUnsubscribe(listener);
        },

        getState() {
            return state;
        },

        createUnsubscribe(listener) {
            return function unsubscribe(listener) {};
        }
    };
}