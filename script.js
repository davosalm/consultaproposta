$(document).ready(function(){
    // URL base da API
    var baseUrl = "https://dadosabertos.camara.leg.br/api/v2/";

    // Função para carregar os partidos
    function carregarPartidos() {
        $.get(baseUrl + "partidos", function(data){
            var partidos = data.dados;
            var selectPartidos = $("#selectPartidos");
            selectPartidos.empty();
            $.each(partidos, function(index, partido){
                selectPartidos.append("<option value='" + partido.sigla + "'>" + partido.nome + " (" + partido.sigla + ")</option>");
            });
        });
    }

    // Função para carregar os deputados do partido selecionado
    function carregarDeputados() {
        var partidoSigla = $("#selectPartidos").val();
        $.get(baseUrl + "deputados", {siglaPartido: partidoSigla}, function(data){
            var deputados = data.dados;
            var selectDeputados = $("#selectDeputados");
            selectDeputados.empty();
            $.each(deputados, function(index, deputado){
                selectDeputados.append("<option value='" + deputado.id + "'>" + deputado.nome + "</option>");
            });
            selectDeputados.prop("disabled", false);
        });
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

    // Carregar os partidos ao carregar a página
    carregarPartidos();

    // Botão de consulta
    $("#btnConsultar").click(function(){
        carregarProposicoes();
    });

    // Carregar os deputados ao selecionar um partido
    $("#selectPartidos").change(function(){
        carregarDeputados();
    });
});