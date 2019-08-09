export function atualizaTweets(listaTweets) {
    return {
        type: 'tweets/ATUALIZA_LISTA',
        listaTweets
    }
}
