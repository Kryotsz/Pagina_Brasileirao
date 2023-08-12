// função para obter a rodada atual, caso esteja em andamento se não houver, obtém a próxima rodada agendada
function verificaRodada(response) {
    for (var i = 0; i < response.length; i++) {
        if (response[i].status == "em andamento" || response[i].status == "agendada") {
            var rodadaId = response[i].rodada;
            return rodadaId;
        }else {
            var rodadaId = response[i].rodada;
        }
    }
    return rodadaId;
}