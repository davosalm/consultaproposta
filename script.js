$(document).ready(function(){

    // URL puxada da API
    var baseUrl = "https://dadosabertos.camara.leg.br/api/v2/";

    // Função que serve pra carregar os deputados/as
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
            console.log("Erro ao carregar os deputados. Pode ser algum problema no banco da Câmara dos Deputados. Aguarde alguns segundos e tente novamente.");
        });
    }

    // Carregar informações do deputado/a selecionado
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
    // Isso daqui serve pra carregar as proposições do deputado selecionado, puxado através da API
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
