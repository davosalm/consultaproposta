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
                selectDeputados.append("<option value='" + deputado.id + "' data-partido='" + deputado.siglaPartido + "'>" + deputado.nome + "</option>");
            });
            selectDeputados.prop("disabled", false);
        })
        .fail(function() {
            console.log("Erro ao carregar os deputados.");
        });
    }

    // Função para carregar as proposições do deputado selecionado
    function carregarProposicoes() {
        var deputadoId = $("#selectDeputados").val();
        var deputadoNome = $("#selectDeputados option:selected").text(); // Nome do deputado selecionado
        var partido = $("#selectDeputados option:selected").attr("data-partido"); // Partido do deputado selecionado

        $("#deputadoInfo").html("<p>" + deputadoNome + " - " + partido + "</p>"); // Exibir informações do deputado

        // Ocultar dropdown de deputados
        $("#selectDeputados").hide();

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

    // Botão de consulta
    $("#btnConsultar").click(function(){
        carregarProposicoes();
    });

    // Redirecionar para a página inicial quando clicar no título
    $(".title-link").click(function(event){
        event.preventDefault();
        carregarDeputados();
    });
});
