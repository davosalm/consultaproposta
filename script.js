$(document).ready(function(){
    // URL base da API
    var baseUrl = "https://dadosabertos.camara.leg.br/api/v2/";

    // Função para carregar os partidos
    function carregarPartidos() {
        $.get(baseUrl + "partidos", function(data){
            var partidos = data.dados;
            var selectPartidos = $("#selectPartidos");
            selectPartidos.empty();
            selectPartidos.append("<option value='' disabled selected>Selecione um partido</option>");
            $.each(partidos, function(index, partido){
                selectPartidos.append("<option value='" + partido.sigla + "'>" + partido.nome + " (" + partido.sigla + ")</option>");
            });
        });
    }

    // Função para carregar os deputados
    function carregarDeputados() {
        $.get(baseUrl + "deputados", function(data){
@@ -23,35 +9,41 @@ $(document).ready(function(){
            selectDeputados.empty();
            selectDeputados.append("<option value='' disabled selected>Selecione um deputado</option>");
            $.each(deputados, function(index, deputado){
                selectDeputados.append("<option value='" + deputado.id + "'>" + deputado.nome + "</option>");
                selectDeputados.append("<option value='" + deputado.id + "' data-nome='" + deputado.nome + "' data-partido='" + deputado.siglaPartido + "'>" + deputado.nome + "</option>");
            });
            selectDeputados.prop("disabled", false);
        });
    }

    // Carregar os deputados ao carregar a página
    carregarDeputados();

    // Botão de consulta
    $("#btnConsultar").click(function(){
        carregarProposicoes();
    });

    // Função para carregar as proposições do deputado selecionado
    function carregarProposicoes() {
        var deputadoId = $("#selectDeputados").val();
        var deputadoNome = $("#selectDeputados option:selected").data("nome");
        var deputadoPartido = $("#selectDeputados option:selected").data("partido");

        if (deputadoId) {
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
                // Exibir nome e partido do deputado no topo da página
                var deputadoInfo = $("#deputadoInfo");
                deputadoInfo.html("<p>" + deputadoNome + " (" + deputadoPartido + ")</p>");
            });
        } else {
            alert("Selecione um deputado antes de consultar as proposições.");
        }
    }
});
