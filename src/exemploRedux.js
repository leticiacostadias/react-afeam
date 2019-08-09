function createStore (reducer) {
    const subscribers = [];
    let state;

    return {
        dispatch(action) {
            // Thunk comes in
            if (typeof action === 'function') {
                action(dispatch);
                return;
            }
            // Thunk goes out

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