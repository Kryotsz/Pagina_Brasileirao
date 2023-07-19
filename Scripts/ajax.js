// token teste = test_0d2f2199b6c253642030c86933a8bc
// token live = live_1cc0e2f51c12249ce776fca9765ba6

function ajaxTabela() {
    $.ajax({
    type: "GET",
    url: "https://api.api-futebol.com.br/v1/campeonatos/10/tabela",
    headers: {'Authorization': 'Bearer live_1cc0e2f51c12249ce776fca9765ba6'},
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
    headers: {'Authorization': 'Bearer live_1cc0e2f51c12249ce776fca9765ba6'},
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
    headers: {'Authorization': 'Bearer live_1cc0e2f51c12249ce776fca9765ba6'},
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
    headers: {'Authorization': 'Bearer test_0d2f2199b6c253642030c86933a8bc'},
    contentType: 'json',
    dataType: 'json',
    success: function(response){
        // console.log(response);
        criarArtilharia(response);
        existeArtilharia = true;
    }
    });
}