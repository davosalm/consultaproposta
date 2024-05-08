$(document).ready(function(){
    // URL base da API
    var baseUrl = "https://dadosabertos.camara.leg.br/api/v2/";

    // Função para carregar os deputados
    function carregarDeputados() {
        $.get(baseUrl + "deputados", function(data){
            var deputados = data.dados;
            var selectDeputados = $("#selectDeputados");
            selectDeputados.empty();
            $.each(deputados, function(index, deputado){
                selectDeputados.append("<option value='" + deputado.id + "' data-partido='" + deputado.siglaPartido + "' data-nome='" + deputado.nome + "' data-uf='" + deputado.siglaUf + "'>" + deputado.nome + "</option>");
            });
            selectDeputados.prop("disabled", false);
        })
        .fail(function() {
            console.log("Erro ao carregar os deputados.");
        });
    }

    // Função para carregar informações do deputado selecionado
    function carregarInfoDeputado() {
        var deputadoSelecionado = $("#selectDeputados option:selected");
        var nomeDeputado = deputadoSelecionado.attr("data-nome");
        var partidoDeputado = deputadoSelecionado.attr("data-partido");
        var ufDeputado = deputadoSelecionado.attr("data-uf");

        $(".deputado-name").text(nomeDeputado);
        $(".deputado-party").text("Partido: " + partidoDeputado);
        $(".deputado-state").text("UF: " + ufDeputado);

        $("#deputadoInfoContainer").show();
    }

    // Função para carregar as proposições do deputado selecionado
    function carregarProposicoes() {
        var deputadoId = $("#selectDeputados").val();

        $.get(baseUrl + "proposicoes", {idDeputadoAutor: deputadoId}, function(data){
            var proposicoes = data.dados;
            var listaProposicoes = $("#listaProposicoes");
            listaProposicoes.empty();
            $.each(proposicoes, function(index, proposicao){
                listaProposicoes.append("<li>" + proposicao.siglaTipo + " " + proposicao.numero + " - " + proposicao.ementa + "</li>");
            });
        });
    }

    // Carregar os deputados ao carregar a página
    carregarDeputados();

    // Ao clicar em consultar, carregar informações do deputado e proposições
    $("#btnConsultar").click(function(){
        carregarInfoDeputado();
        carregarProposicoes();
        $(".header-text").hide();
        var fotoDeputado = $("#selectDeputados option:selected").attr("data-foto");
        $(".deputado-foto").attr("src", fotoDeputado);
    });
});
