function ajaxTabela() {
    $.ajax({
    type: "GET",
    url: "https://api.api-futebol.com.br/v1/campeonatos/10/tabela",
    headers: {'Authorization': `Bearer ${token}`},
    contentType: 'json',
    dataType: 'json',
    success: function(response){
        //Se a solicitação for feita com sucesso, a resposta representará os dados
        // console.log(response);
        criarTabela(response);
        ajaxRodadas();
    }
    });
}

function ajaxRodadas() {
    $.ajax({
    type: "GET",
    url: "https://api.api-futebol.com.br/v1/campeonatos/10/rodadas",
    headers: {'Authorization': `Bearer ${token}`},
    contentType: 'json',
    dataType: 'json',
    success: function(response){
        // console.log(response);
        var rodadaId = verificaRodada(response);
        ajaxJogos(rodadaId);
    }
    });
}

function ajaxJogos(rodadaId) {
    $.ajax({
    type: "GET",
    url: `https://api.api-futebol.com.br/v1/campeonatos/10/rodadas/${rodadaId}`,
    headers: {'Authorization': `Bearer ${token}`},
    contentType: 'json',
    dataType: 'json',
    success: function(response){
        // console.log(response);
        criarJogos(response);
        existeArtilharia == false ? ajaxArtilharia() : "";
    }
    });
}

function ajaxArtilharia() {
    $.ajax({
    type: "GET",
    url: `https://api.api-futebol.com.br/v1/campeonatos/10/artilharia`,
    headers: {'Authorization': `Bearer ${token}`},
    contentType: 'json',
    dataType: 'json',
    success: function(response){
        // console.log(response);
        criarArtilharia(response);
        existeArtilharia = true;
    }
    });
}
