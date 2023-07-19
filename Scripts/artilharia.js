function criarArtilharia(response) {;
    var container = document.getElementById("containerInferior");

        var sectionArtilharia = document.createElement("section");
        sectionArtilharia.setAttribute("class", "section-artilharia");

            var titulo = document.createElement("h2");
            titulo.setAttribute("class", "artilhariaTitulo");
            titulo.innerText = "PRINCIPAIS ARTILHEIROS";
            sectionArtilharia.appendChild(titulo);

            var ranking = document.createElement("div");

                var rankingHeader = document.createElement("header");
                rankingHeader.setAttribute("class", "rankingHeader");

                    var rankingHeaderTitulo = document.createElement("div");
                    rankingHeaderTitulo.innerText = "RANKING";
                    rankingHeader.appendChild(rankingHeaderTitulo);

                    var rankingHeaderGols = document.createElement("div");
                    rankingHeaderGols.setAttribute("class", "rankingHeaderGols");
                    rankingHeaderGols.innerText = "GOLS";
                    rankingHeader.appendChild(rankingHeaderGols);

                ranking.appendChild(rankingHeader);

                var rankingContent = document.createElement("div");
                rankingContent.setAttribute("class", "rankingContent");

                    for (var i = 0; i < response.length; i++) {
                        response[i].atleta.posicao.nome == undefined ? response[i].atleta.posicao.nome = "-" : "";

                        var rankingItem = document.createElement("div");
                        rankingItem.setAttribute("class", "rankingItem");

                            var classificacao = document.createElement("div");
                            classificacao.setAttribute("class", "rankingNumero");
                            classificacao.innerText = i+1;
                            rankingItem.appendChild(classificacao);

                            var jogador = document.createElement("div");
                            jogador.setAttribute("class", "jogador");

                                // var jogadorFoto = document.createElement("img");
                                // jogadorFoto.setAttribute("class", "jogadorFoto");
                                // jogadorFoto.src = response[i].jogadorFoto;
                                // jogador.appendChild(jogadorFoto);

                                var jogadorTime = document.createElement("img");
                                jogadorTime.setAttribute("class", "jogadorTime");
                                jogadorTime.src = response[i].time.escudo;
                                jogador.appendChild(jogadorTime);

                                var jogadorInfo = document.createElement("div");
                                jogadorInfo.setAttribute("class", "jogadorInfo");

                                    var jogadorNome = document.createElement("div");
                                    jogadorNome.setAttribute("class", "jogadorNome");
                                    jogadorNome.innerText = response[i].atleta.nome_popular;
                                    jogadorInfo.appendChild(jogadorNome);

                                    var jogadorPosicao = document.createElement("div");
                                    jogadorPosicao.setAttribute("class", "jogadorPosicao");
                                    jogadorPosicao.innerText = response[i].atleta.posicao.nome;
                                    jogadorInfo.appendChild(jogadorPosicao);

                                jogador.appendChild(jogadorInfo);

                                var jogadorGols = document.createElement("div");
                                jogadorGols.setAttribute("class", "jogadorGols");
                                jogadorGols.innerText = response[i].gols;
                                jogador.appendChild(jogadorGols);

                            rankingItem.appendChild(jogador);

                        rankingContent.appendChild(rankingItem);
                    }

                ranking.appendChild(rankingContent);

            sectionArtilharia.appendChild(ranking);

        container.appendChild(sectionArtilharia);
}