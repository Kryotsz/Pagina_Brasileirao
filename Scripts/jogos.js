// objeto que abriga as sources dos SVGs utilizados na section jogos (rodadas)
var imagens = {
    setaEsquerda: '<svg class="seta-esquerda" stroke="#06AA48" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129"><path d="M40.4 121.3c-.8.8-1.8 1.2-2.9 1.2s-2.1-.4-2.9-1.2c-1.6-1.6-1.6-4.2 0-5.8l51-51-51-51c-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8 0l53.9 53.9c1.6 1.6 1.6 4.2 0 5.8l-53.9 53.9z"></path></svg>',

    setaDireita: '<svg class="seta-direita" stroke="#06AA48" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129"><path d="M40.4 121.3c-.8.8-1.8 1.2-2.9 1.2s-2.1-.4-2.9-1.2c-1.6-1.6-1.6-4.2 0-5.8l51-51-51-51c-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8 0l53.9 53.9c1.6 1.6 1.6 4.2 0 5.8l-53.9 53.9z"></path></svg>',

    placarVersus: '<svg viewBox="0 0 100 100" id="scoreboard-vs-icon" width="100%" height="100%"><line x1="-3" x2="100" y1="1" y2="100" stroke="#555" stroke-width="5"></line><line x1="-3" x2="100" y1="100" y2="1" stroke="#555" stroke-width="5"></line></svg>',

    setaEsquerdaDesativada: '<svg class="seta-esquerda" stroke="rgb(204, 204, 204)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129"><path d="M40.4 121.3c-.8.8-1.8 1.2-2.9 1.2s-2.1-.4-2.9-1.2c-1.6-1.6-1.6-4.2 0-5.8l51-51-51-51c-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8 0l53.9 53.9c1.6 1.6 1.6 4.2 0 5.8l-53.9 53.9z"></path></svg>',

    setaDireitaDesativada: '<svg class="seta-direita" stroke="rgb(204, 204, 204)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129"><path d="M40.4 121.3c-.8.8-1.8 1.2-2.9 1.2s-2.1-.4-2.9-1.2c-1.6-1.6-1.6-4.2 0-5.8l51-51-51-51c-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8 0l53.9 53.9c1.6 1.6 1.6 4.2 0 5.8l-53.9 53.9z"></path></svg>',
};

// função que cria os botões de navegação entre rodadas
function criaBotoesNavegacaoRodada(objetoRodada, direcional) {
    // cria o botão e adiciona classe baseada nos parâmetros passados na função
    var button= document.createElement("button");
    var classeDirecaoBotao = direcional == "previous" ? "buttonEsquerdo" : "buttonDireito";
    button.setAttribute("class", classeDirecaoBotao);

    // cria o span que abriga a imagem da seta, adiciona classe baseada nos parâmetros passados na função
    var seta = document.createElement("span");
    var classeDirecaoSeta = direcional == "previous" ? "span--seta-esquerda" : "span--seta-direita";
    seta.setAttribute("class", classeDirecaoSeta);
    seta.innerHTML = direcional == "previous" ? imagens.setaEsquerda : imagens.setaDireita;
    button.appendChild(seta);

    // se a rodada anterior ou a próxima rodada não forem nulo, adiciona o evento 'onclick' que chamará as funções para recriar a section jogos (rodadas) com novos dados
    if (objetoRodada != null) {
        direcional == "previous" ? button.setAttribute("onclick", `ajaxJogos(${objetoRodada.rodada})`) : button.setAttribute("onclick", `ajaxJogos(${objetoRodada.rodada})`);
    }else {
        // caso for nulo, ou seja, se estiver atualmente na primeira rodada ou na última, o botão de 'anterior' ou de 'próximo' tem que ser desabilitado
        button.disabled = true;
        var setaURL = direcional == "previous" ? imagens.setaEsquerdaDesativada : imagens.setaDireitaDesativada;
        seta.innerHTML = setaURL;
    }

    return button;
}
// altera a variável de controle para 'false'
controleJogos = false;

// função que cria a section jogos (rodadas), utilizando os dados da API
function criarJogos(response) {
    // array para guardar o dia da semana de forma simplificada
    diaSemana = new Array ("DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"); 

    // obtém o container que abrigará a section jogos (rodadas)
    var container = document.getElementById("containerSuperior");

    // se a section jogos ja existe, ela é removida para que possa ser criado a nova com os dados atualizados
    // isso acontece quando o usuário clica nas setas de navegação para ir para a próxima rodada ou para voltar à rodada anterior
    if (controleJogos){
        var sectionJogosRemove = document.getElementById("sectionJogos")
        container.removeChild(sectionJogosRemove);
        controleJogos = false;
    }
        // cria a section jogos (rodadas), altera a variável de controle para 'true' e adiciona classe e Id
        var sectionJogos = document.createElement("section");
        controleJogos = true;
        sectionJogos.setAttribute("class", "sectionJogos");
        sectionJogos.setAttribute("id", "sectionJogos");

            // cria o cabeçalho da section jogos (rodadas)
            var header = document.createElement("header");
                // cria o titulo e adiciona classe
                var titulo = document.createElement("h2");
                titulo.innerText = "JOGOS";
                titulo.setAttribute("class", "titulo-jogos");
                header.appendChild(titulo);

            // coloca o cabeçalho na section jogos (rodadas)
            sectionJogos.appendChild(header);

            // cria a navegação das rodadas e adiciona classe
            var nav = document.createElement("nav");
            nav.setAttribute("class", "nav-jogos");
                
                // se é o botão esquerdo que tem que ser criado, chama a função de criar botão e passa os dados da rodada anterior
                var buttonEsquerdo = criaBotoesNavegacaoRodada(response.rodada_anterior, "previous");
                nav.appendChild(buttonEsquerdo);

                // cria o span que abriga o nome da rodada atual e adiciona classe
                var rodada = document.createElement("span");
                rodada.innerText = response.nome;
                rodada.setAttribute("class", "titulo-rodada");
                nav.appendChild(rodada);

                // se é o botão direito que tem que ser criado, chama a função de criar botão e passa os dados da próxima rodada
                var buttonDireito = criaBotoesNavegacaoRodada(response.proxima_rodada, "next");
                nav.appendChild(buttonDireito);

            // adiciona a navegação na section jogos (rodadas)
            sectionJogos.appendChild(nav);

            // exibe todos os jogos da rodada mostrada na navegação, utilizando os dados obtidos da API
            for (var i = 0; i < response.partidas.length; i++) {
                // se o estádio não foi definido ainda, substitui o nome por um espaço vazio, se já foi definido, não faz nada
                response.partidas[i].estadio == null ? response.partidas[i].estadio = {nome_popular: ""} : "";

                // cria a div que abriga o jogo e adiciona classe
                var jogo = document.createElement("div");
                jogo.setAttribute("class", "jogo");

                    // cria a div que abriga todas as informações como: dia da semana, data, estádio e hora
                    var informacoes = document.createElement("div");
                    informacoes.setAttribute("class", "jogo-informacoes");

                        // cria o span que abriga o dia da semana do jogo
                        var spanDiaSemana = document.createElement("span");
                        var dataAPI = new Date(response.partidas[i].data_realizacao_iso);
                        spanDiaSemana.innerText = diaSemana[dataAPI.getDay()];
                        spanDiaSemana.setAttribute("class", "jogo-informacoes--dia");
                        informacoes.appendChild(spanDiaSemana);

                        // span que abriga a data do jogo
                        var data = document.createElement("span");
                        data.innerText = response.partidas[i].data_realizacao;
                        data.setAttribute("class", "jogo-informacoes--data");
                        informacoes.appendChild(data);

                        // span que abriga o estádio onde ocorrerá o jogo
                        var estadio = document.createElement("span");
                        estadio.innerText = response.partidas[i].estadio.nome_popular;
                        estadio.setAttribute("class", "jogo-informacoes--estadio");
                        informacoes.appendChild(estadio);

                        // span que abriga a hora que ocorrerá aquele jogo
                        var hora = document.createElement("span");
                        hora.innerText = response.partidas[i].hora_realizacao;
                        hora.setAttribute("class", "jogo-informacoes--hora");
                        informacoes.appendChild(hora); 

                    // adiciona a div informações dentro da div do respectivo jogo
                    jogo.appendChild(informacoes);

                    // cria a div que abriga os dados do placar do jogo
                    var placar = document.createElement("div");
                    placar.setAttribute("class", "jogo-placar");

                        // div que abriga os dados do placar do time mandante
                        var equipeMandante = document.createElement("div");
                        equipeMandante.setAttribute("class", "jogo-placar--equipe");
                        equipeMandante.classList.add("jogo-placar--equipe-mandante");

                            // span que abriga a sigla do time mandante
                            var siglaMandante = document.createElement("span");
                            siglaMandante.innerText = response.partidas[i].time_mandante.sigla;
                            equipeMandante.appendChild(siglaMandante);

                            // logo (escudo) do time mandante
                            var logoMandante = document.createElement("img");
                            logoMandante.src = response.partidas[i].time_mandante.escudo;
                            logoMandante.setAttribute("class", "jogo-escudo");
                            logoMandante.classList.add("jogo-escudo--mandante");
                            equipeMandante.appendChild(logoMandante);

                        // coloca a div do time mandante na div placar
                        placar.appendChild(equipeMandante);

                        // div que abriga as informações de placar de gols de cada time
                        var placarBox = document.createElement("div");
                        placarBox.setAttribute("class", "placar-box");

                            // span que abriga os gols do time mandante
                            var golsMandante = document.createElement("span");
                            golsMandante.innerText = response.partidas[i].placar_mandante;
                            golsMandante.setAttribute("class", "placar-box--valor");
                            placarBox.appendChild(golsMandante);

                            // span que abriga o simbolo de X (versus)
                            var placarBoxVersus = document.createElement("span");
                            placarBoxVersus.setAttribute("class", "placar-box--versus");
                            placarBoxVersus.innerHTML = imagens.placarVersus;
                            placarBox.appendChild(placarBoxVersus);

                            // span que abriga os gols do time visitante
                            var golsVisitante = document.createElement("span");
                            golsVisitante.innerText = response.partidas[i].placar_visitante;
                            golsVisitante.setAttribute("class", "placar-box--valor");
                            placarBox.appendChild(golsVisitante);

                        // coloca a div placarBox dentro da div placar
                        placar.appendChild(placarBox);

                        // div que abriga os dados do placar do time visitante
                        var equipeVisitante = document.createElement("div");
                        equipeVisitante.setAttribute("class", "jogo-placar--equipe");
                        equipeVisitante.classList.add("jogo-placar--equipe-visitante");

                            // logo (escudo) do time visitante
                            var logoVisitante = document.createElement("img");
                            logoVisitante.src = response.partidas[i].time_visitante.escudo;
                            logoVisitante.setAttribute("class", "jogo-escudo");
                            logoVisitante.classList.add("jogo-escudo--visitante");
                            equipeVisitante.appendChild(logoVisitante);

                            // span que abriga a sigla do time visitante
                            var siglaVisitante = document.createElement("span");
                            siglaVisitante.innerText = response.partidas[i].time_visitante.sigla;
                            equipeVisitante.appendChild(siglaVisitante);
                        
                        // coloca a div do time visitante na div placar
                        placar.appendChild(equipeVisitante);
                    // coloca a div placar dentro da div do respectivo jogo
                    jogo.appendChild(placar);

                    // div que abriga o link para a transmissão do respectivo jogo (não implementado)
                    // atualmente só exibe o texto "VEJA COMO FOI"
                    var transmissao = document.createElement("div");
                    transmissao.innerText = "VEJA COMO FOI";
                    transmissao.setAttribute("class", "jogo-transmissao");
                    jogo.appendChild(transmissao);

                // adiciona o jogo dentro da section jogos (rodadas)
                sectionJogos.appendChild(jogo);
            }
        // adiciona a section jogos (rodadas) no container
        container.appendChild(sectionJogos);
}