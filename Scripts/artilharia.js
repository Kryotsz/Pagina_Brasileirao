// função que cria a section artilharia, utilizando os dados obtidos da API
function criarArtilharia(response) {
    // obtém o container que abrigará a section artilharia
    var container = document.getElementById("containerInferior");

        // cria a section artilharia e adiciona classe
        var sectionArtilharia = document.createElement("section");
        sectionArtilharia.setAttribute("class", "section-artilharia");

            // cria o titulo da section artilharia e adiciona classe
            var titulo = document.createElement("h2");
            titulo.setAttribute("class", "artilhariaTitulo");
            titulo.innerText = "PRINCIPAIS ARTILHEIROS";
            sectionArtilharia.appendChild(titulo);

            // cria a div que abriga o ranking dos jogadores
            var ranking = document.createElement("div");

                // cria o cabeçalho do ranking
                var rankingHeader = document.createElement("header");
                rankingHeader.setAttribute("class", "rankingHeader");

                    // div que abriga o texto "RANKING"
                    var rankingHeaderTitulo = document.createElement("div");
                    rankingHeaderTitulo.innerText = "RANKING";
                    rankingHeader.appendChild(rankingHeaderTitulo);

                    // div que abriga o texto "GOLS"
                    var rankingHeaderGols = document.createElement("div");
                    rankingHeaderGols.setAttribute("class", "rankingHeaderGols");
                    rankingHeaderGols.innerText = "GOLS";
                    rankingHeader.appendChild(rankingHeaderGols);

                // coloca o cabeçalho dentro da div ranking
                ranking.appendChild(rankingHeader);

                // cria a div principal do ranking, onde realmente fica o ranqueamento de jogadores
                var rankingContent = document.createElement("div");
                rankingContent.setAttribute("class", "rankingContent");

                    // percorre o array de jogadores obtido da API e popula as linhas com os dados de cada jogador
                    for (var i = 0; i < response.length; i++) {
                        // se o jogador não apresenta uma posição, substitui por um traço
                        response[i].atleta.posicao.nome == undefined ? response[i].atleta.posicao.nome = "-" : "";

                        // div que abriga os dados do jogador
                        var rankingItem = document.createElement("div");
                        rankingItem.setAttribute("class", "rankingItem");

                            // div que abriga o número do ranking do jogador
                            var classificacao = document.createElement("div");
                            classificacao.setAttribute("class", "rankingNumero");
                            classificacao.innerText = i+1;
                            rankingItem.appendChild(classificacao);

                            // div que abriga os dados específicos do jogador como: escudo do time, nome do jogador, posição e número de gols
                            var jogador = document.createElement("div");
                            jogador.setAttribute("class", "jogador");

                                // var jogadorFoto = document.createElement("img");
                                // jogadorFoto.setAttribute("class", "jogadorFoto");
                                // jogadorFoto.src = response[i].jogadorFoto;
                                // jogador.appendChild(jogadorFoto);

                                // div que abriga o logo (escudo) do time do jogador
                                var jogadorTime = document.createElement("img");
                                jogadorTime.setAttribute("class", "jogadorTime");
                                jogadorTime.src = response[i].time.escudo;
                                jogador.appendChild(jogadorTime);

                                // div que abriga as informações como: nome do jogador e posição
                                var jogadorInfo = document.createElement("div");
                                jogadorInfo.setAttribute("class", "jogadorInfo");

                                    // div que abriga o nome do jogador
                                    var jogadorNome = document.createElement("div");
                                    jogadorNome.setAttribute("class", "jogadorNome");
                                    jogadorNome.innerText = response[i].atleta.nome_popular;
                                    jogadorInfo.appendChild(jogadorNome);

                                    // div que abriga a posição do jogador
                                    var jogadorPosicao = document.createElement("div");
                                    jogadorPosicao.setAttribute("class", "jogadorPosicao");
                                    jogadorPosicao.innerText = response[i].atleta.posicao.nome;
                                    jogadorInfo.appendChild(jogadorPosicao);

                                // adiciona a div jogadorInfo na div jogador
                                jogador.appendChild(jogadorInfo);

                                // div que abriga a quantidade de gols realizados pelo jogador
                                var jogadorGols = document.createElement("div");
                                jogadorGols.setAttribute("class", "jogadorGols");
                                jogadorGols.innerText = response[i].gols;
                                jogador.appendChild(jogadorGols);

                            // coloca a div jogador na div rankingItem (div que abriga todos os dados de determinado jogador)
                            rankingItem.appendChild(jogador);
                        // coloca a div rankingItem na div rankingContent (div principal do ranking)
                        rankingContent.appendChild(rankingItem);
                    }
                // coloca a div rankingContent na div ranking (div que abriga toda a section de ranking, tanto o corpo quanto o cabeçalho)
                ranking.appendChild(rankingContent);
            // coloca a div ranking dentro da div sectionArtilharia
            sectionArtilharia.appendChild(ranking);
        // coloca a div sectionArtilharia dentro do container
        container.appendChild(sectionArtilharia);
}