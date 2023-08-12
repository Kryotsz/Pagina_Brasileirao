// faz a requisição para obter os dados da tabela
function ajaxTabela() {
    $.ajax({
    type: "GET",
    url: "https://api.api-futebol.com.br/v1/campeonatos/10/tabela",
    headers: {'Authorization': `Bearer test_0d2f2199b6c253642030c86933a8bc`},
    contentType: 'json',
    dataType: 'json',
    success: function(response){
        //Se a solicitação for feita com sucesso, a resposta representará os dados
        // console.log(response);
        // chama a função que criará a tabela e passa de parâmetro os dados obtidos da API
        criarTabela(response);
        // depois da tabela ser criada, chama a função para obter os dados das rodadas
        ajaxRodadas();
    }
    });
}

// faz a requisição para obter todas as rodadas
function ajaxRodadas() {
    $.ajax({
    type: "GET",
    url: "https://api.api-futebol.com.br/v1/campeonatos/10/rodadas",
    headers: {'Authorization': `Bearer test_0d2f2199b6c253642030c86933a8bc`},
    contentType: 'json',
    dataType: 'json',
    success: function(response){
        // console.log(response);
        // chama a função que verifica as rodadas
        var rodadaId = verificaRodada(response);
        // depois, chama a função que requisita os dados da rodada em andamento ou da próxima agendada
        ajaxJogos(rodadaId);
    }
    });
}

// faz a requisição para obter os dados da rodada atual, ou a próxima que deve ser exibida
function ajaxJogos(rodadaId) {
    $.ajax({
    type: "GET",
    url: `https://api.api-futebol.com.br/v1/campeonatos/10/rodadas/${rodadaId}`,
    headers: {'Authorization': `Bearer test_0d2f2199b6c253642030c86933a8bc`},
    contentType: 'json',
    dataType: 'json',
    success: function(response){
        // console.log(response);
        // chama a função que cria a section jogos (rodadas)
        criarJogos(response);
        // se a section artilharia não existe, chama a função para requisitar os dados, se existe, não faz nada
        existeArtilharia == false ? ajaxArtilharia() : "";
    }
    });
}

// faz a requisição para obter os dados da artilharia
function ajaxArtilharia() {
    $.ajax({
    type: "GET",
    url: `https://api.api-futebol.com.br/v1/campeonatos/10/artilharia`,
    headers: {'Authorization': `Bearer test_0d2f2199b6c253642030c86933a8bc`},
    contentType: 'json',
    dataType: 'json',
    success: function(response){
        // console.log(response);
        // chama a função para criar a section artilharia
        criarArtilharia(response);
        // muda a variável de controle para 'true' caso a artilharia tenha sido criada
        existeArtilharia = true;
    }
    });
}
