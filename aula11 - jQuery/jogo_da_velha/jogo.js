var rodada = 1;
var matriz_jogo = Array(3);

matriz_jogo['a'] = Array(3);
matriz_jogo['b'] = Array(3);
matriz_jogo['c'] = Array(3);

matriz_jogo['a'][1] = 0;
matriz_jogo['a'][2] = 0;
matriz_jogo['a'][3] = 0;

matriz_jogo['b'][1] = 0;
matriz_jogo['b'][2] = 0;
matriz_jogo['b'][3] = 0;

matriz_jogo['c'][1] = 0;
matriz_jogo['c'][2] = 0;
matriz_jogo['c'][3] = 0;

$(document).ready(function () {

    $("#button_start").click(function () {

        //valida digitação dos nomes dos jogadores
        if ($("#input_player_1").val() == "") {
            alert("Apelido do jogador 1 não foi preenchido");
            return false;
        }
        if ($("#input_player_2").val() == "") {
            alert("Apelido do jogador 2 não foi preenchido");
            return false;
        }
        //copiar os nomes dos jogadores para a tela de jogo
        $("#name_player_1").html($("#input_player_1").val());
        $("#name_player_2").html($("#input_player_2").val());

        //controla exibição das telas
        $("#pagina_inicial").hide();
        $("#palco_do_jogo").show();
    });

    $(".jogada").click(function () {

        var id_campo_clicado = this.id;
        $("#" + id_campo_clicado).off();
        jogada(id_campo_clicado);
    });

    function jogada(id) {
        var icone = '';
        var pontos = 0;

        if ((rodada % 2) == 1) {
            icone = 'url("imagens/marcacao_1.png")';
            ponto = -1;
        }
        else {
            icone = 'url("imagens/marcacao_2.png")';
            ponto = 1;
        }
        rodada++;

        $("#" + id).css("background-image", icone);

        //quebrar o 'id' para pegar a linha e coluna
        var linha_coluna = id.split('-');

        matriz_jogo[linha_coluna[0]][linha_coluna[1]] = ponto;

        //verifica se já houve vencedor
        verifica_combinacao();

    }

    function verifica_combinacao() {

        var pontos = 0;

        //verifica na linha A
        pontos = 0;
        for (var i = 1; i <= 3; i++) {
            pontos += matriz_jogo['a'][i];
        }
        ganhador(pontos);

        //verifica na linha B
        pontos = 0;
        for (var i = 1; i <= 3; i++) {
            pontos += matriz_jogo['b'][i];
        }
        ganhador(pontos);

        //verifica na linha C
        pontos = 0;
        for (var i = 1; i <= 3; i++) {
            pontos += matriz_jogo['c'][i];
        }
        ganhador(pontos);

        //verificar nas colunas
        for (var j = 1; j <= 3; j++) {
            pontos = 0;
            pontos += matriz_jogo['a'][j];
            pontos += matriz_jogo['b'][j];
            pontos += matriz_jogo['c'][j];

            ganhador(pontos);
        }

        //verifica nas diagonais
        pontos = 0;
        pontos = matriz_jogo['a'][1] + matriz_jogo['b'][2] + matriz_jogo['c'][3];
        ganhador(pontos);

        pontos = 0;
        pontos = matriz_jogo['c'][1] + matriz_jogo['b'][2] + matriz_jogo['a'][3];
        ganhador(pontos);

    }

    function ganhador(pontos) {
        if (pontos == -3) {
            var jogada_1 = $("#input_player_1").val();
            alert(jogada_1 + ' é o vencedor');
            $(".jogada").off();
        }
        else if (pontos == 3) {
            var jogada_2 = $("#input_player_2").val();
            alert(jogada_2 + " é o vencedor");
            $(".jogada").off();
        }
    }
});