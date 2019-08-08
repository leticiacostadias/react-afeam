import { combineReducers, createStore } from 'redux';

function counterReducer (state = { valor: 0 }, action = {}) {
    // action = {
    //     type: ''
    // }

    // console.log(action);

    // DDD -> Domain Driven Development
    // types => 'domain/ACTION'

    console.log(state);

    if (action.type === 'counter/INCREMENTAR') { // 'ACTION'
        return { valor: state.valor + 1 };
    }

    if (action.type === 'counter/DECREMENTAR') {
        return { valor: state.valor - 1 };
    }

    if (action.type === 'counter/SETAR') {
        return action.valor;
    }

    return state;
}

function mensagemReducer (state = [], action = {}) {
    if (action.type === 'counter/INCREMENTAR') { // 'ACTION'
        return ['aumentou o valor', ...state];
    }

    return state;
}

const store = createStore(
    combineReducers({
        counter: counterReducer,
        mensagens: mensagemReducer
    })
);

window.store = store;