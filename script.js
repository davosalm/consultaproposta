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
                selectDeputados.append("<option value='" + deputado.id + "' data-partido='" + deputado.siglaPartido + "' data-foto='" + deputado.urlFoto + "' data-nome='" + deputado.nome + "' data-uf='" + deputado.siglaUf + "'>" + deputado.nome + "</option>");
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
        var fotoDeputado = deputadoSelecionado.attr("data-foto");
        var nomeDeputado = deputadoSelecionado.attr("data-nome");
        var partidoDeputado = deputadoSelecionado.attr("data-partido");
        var ufDeputado = deputadoSelecionado.attr("data-uf");

        $("#deputadoFoto").attr("src", fotoDeputado);
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

    // Ao selecionar um deputado, carregar suas informações
    $("#selectDeputados").change(function(){
        carregarInfoDeputado();
    });

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
