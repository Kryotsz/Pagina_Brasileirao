// função que montará toda a tabela utilizando os dados da API
function criarTabela(resposta) {
    // muda a variável de controle para 'true'
    existeTabela = true;
    // chama a função para desatiar o loader da tela
    loaderTabela();

    // array contendo o nome das colunas que deverá ter na tabela
    const cabecalhoArray = ["CLASSIFICAÇÃO", "P", "J", "V", "E", "D", "GP", "GC", "SG", "%", "ÚLT.JOGOS"];

    // obtém o container que abrigará toda a tabela
    var container = document.getElementById("containerSuperior");

        // cria a section tabela e adiciona classe
        var sectionTable = document.createElement("section");
        sectionTable.setAttribute("class", "sectionTable");

            // cria o titulo da tabela, adiciona classe e coloca na section tabela
            var tableTitulo = document.createElement("h2");
            tableTitulo.innerText = "TABELA";
            tableTitulo.setAttribute("class", "tituloTable");
            sectionTable.appendChild(tableTitulo);

            // cria a tabela
            var table = document.createElement("table");

                // cria a 'cabeça' da tabela
                var thead = document.createElement("thead");
                    
                    // cria a linha de cabeçalho da tabela e adiciona classe
                    var cabecalho = document.createElement("tr");
                    cabecalho.setAttribute("class", "cabecalho");

                        // cria as colunas, percorrendo o array já estabelecido anteriormente
                        for (var i = 0; i < cabecalhoArray.length; i++) {
                            if (i == 0) {
                                var th = document.createElement("th");
                                th.innerText = cabecalhoArray[i];
                                th.setAttribute("colspan", "3");
                                th.setAttribute("class", "classificacao");
                                cabecalho.appendChild(th);
                            }else {
                                var th = document.createElement("th");
                                th.innerText = cabecalhoArray[i];
                                cabecalho.appendChild(th);
                            }
                        }
                    // coloca o cabeçalho dentro do thead
                    thead.appendChild(cabecalho);
                // coloca o thead dentro da tabela
                table.appendChild(thead);
                
                // cria o corpo da tabela
                var tbody = document.createElement("tbody");
                    
                    // cria todas as linhas da tabela e popula com os dados obtidos da API
                    for (var i = 0; i < resposta.length; i++) {
                        var tr = document.createElement("tr");
                            // para cada coluna, cria-se um td que abrigará o dado trazido da API
                            for (var j = 0; j < cabecalhoArray.length + 2; j++) {
                                var td = document.createElement("td");
                                // var propriedades = Object.getObjectName(resposta[i]);
                                if (j == 0) {
                                    td.innerText = resposta[i].posicao;
                                }else if (j == 1) {
                                    var icone = document.createElement("img");
                                    icone.src = resposta[i].time.escudo;
                                    icone.setAttribute("class", "icone");
                                    td.appendChild(icone);
                                }else if (j == 2) {
                                    td.innerText = resposta[i].time.nome_popular;
                                }else if (j == 3) {
                                    td.innerText = resposta[i].pontos;
                                }else if (j == 4) {
                                    td.innerText = resposta[i].jogos;
                                }else if (j == 5) {
                                    td.innerText = resposta[i].vitorias;
                                }else if (j == 6) {
                                    td.innerText = resposta[i].empates;
                                }else if (j == 7) {
                                    td.innerText = resposta[i].derrotas;
                                }else if (j == 8) {
                                    td.innerText = resposta[i].gols_pro;
                                }else if (j == 9) {
                                    td.innerText = resposta[i].gols_contra;
                                }else if (j == 10) {
                                    td.innerText = resposta[i].saldo_gols;
                                }else if (j == 11) {
                                    td.innerText = resposta[i].aproveitamento;
                                }else {
                                    // cria as bolinhas de vitória, derrota ou empate
                                    for (var k = 0; k < 5; k++) {
                                        var bolinha = document.createElement("span");
                                        bolinha.setAttribute("class", "ultimos-jogos");
                                        if (resposta[i].ultimos_jogos[k] == "v") {
                                            bolinha.classList.add("vitoria");
                                        }else if (resposta[i].ultimos_jogos[k] == "d") {
                                            bolinha.classList.add("derrota");
                                        }else {
                                            bolinha.classList.add("empate");
                                        }
                                        // coloca as bolinhas dentro da td
                                        td.appendChild(bolinha);
                                    }
                                } 
                                // coloca cada dado dentro da linha em que pertence
                                tr.appendChild(td);
                            }
                        // coloca a linha dentro do corpo da tabela
                        tbody.appendChild(tr);
                    }
                // coloca o corpo da tabela dentro da tabela
                table.appendChild(tbody);
            // coloca a tabela dentro da section tabela
            sectionTable.appendChild(table);
        // coloca a section tabela dentro do container que agora abriga toda a tabela
        container.appendChild(sectionTable);
}