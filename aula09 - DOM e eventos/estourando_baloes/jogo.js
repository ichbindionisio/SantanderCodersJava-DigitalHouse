function iniciaJogo() {

    var url = window.location.search;

    var nivel_jogo = url.replace("?", "");

    var tempo_segundos = 0;

    switch (nivel_jogo) {
        case '1':
            tempo_segundos = 120;
            break;

        case '2':
            tempo_segundos = 60;
            break;

        case '3':
            tempo_segundos = 30;
            break;

        default:
    }

    //inserindo no HTML
    document.getElementById('cronometro').innerHTML = tempo_segundos;

    //qtdade de baloes
    var qtde_baloes = 20;

    //imprimir qtde baloes inteiros
    document.getElementById('baloes_inteiros').innerHTML = qtde_baloes;
    document.getElementById('baloes_estourados').innerHTML = 0;

    cria_baloes(qtde_baloes);

    contagem_tempo(tempo_segundos + 1);
}

function cria_baloes(qtde_baloes) {
    for (var i = 1; i <= qtde_baloes; i++) {
        var balao = document.createElement("img");
        balao.src = 'imagens/balao_azul_pequeno.png';
        balao.style.margin = '10px';
        balao.id = 'b' + i;
        balao.onclick = function () { estourar(this); };

        document.getElementById('cenario').appendChild(balao);
    }
}

function contagem_tempo(segundos) {
    segundos -= 1;

    if (segundos == -1) {
        clearTimeout(timerId);
        game_over();
        return false;
    }

    document.getElementById('cronometro').innerHTML = segundos;

    timerId = setTimeout("contagem_tempo(" + segundos + ")", 1000);
}

function game_over() {
    alert('Fim de Jogo');
}

function estourar(e) {
    var id_balao = e.id;
    document.getElementById(id_balao).src = 'imagens/balao_azul_pequeno_estourado.png';
    pontuacao(-1);
}