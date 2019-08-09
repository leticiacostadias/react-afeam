const stateInicial = {
    lista: [],
    tweetSelecionado: null,
};

function tweetsReducer (state = stateInicial, action) {
    // action => atualiza a lista de tweets
    switch (action.type) {
        case 'tweets/ATUALIZA_LISTA':
            return {
                ...state,
                lista: action.listaTweets
            };
    
        case 'tweets/NOVO_TWEET':
            return {
                ...state,
                lista: [action.tweetCriado, ...state.lista]
            };

        default: 
            return state;
    }
}

export default tweetsReducer;
