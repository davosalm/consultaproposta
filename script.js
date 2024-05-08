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
                // Verifica se a URL da imagem está disponível
                if (deputado.urlFoto) {
                    // Cria um novo objeto Image
                    var img = new Image();
                    // Define o atributo src com a URL da imagem
                    img.src = deputado.urlFoto;
                    // Adiciona um evento onload para garantir que a imagem foi carregada corretamente
                    img.onload = function() {
                        // Adiciona o deputado ao dropdown após a imagem ser carregada
                        selectDeputados.append("<option value='" + deputado.id + "' data-partido='" + deputado.siglaPartido + "' data-nome='" + deputado.nome + "' data-uf='" + deputado.siglaUf + "' data-foto='" + img.src + "'>" + deputado.nome + "</option>");
                    };
                    // Adiciona um evento onerror para lidar com erros de carregamento da imagem
                    img.onerror = function() {
                        console.error("Erro ao carregar imagem para o deputado: " + deputado.nome);
                    };
                } else {
                    // Se a URL da imagem não estiver disponível, adicione apenas o nome do deputado ao dropdown
                    selectDeputados.append("<option value='" + deputado.id + "' data-partido='" + deputado.siglaPartido + "' data-nome='" + deputado.nome + "' data-uf='" + deputado.siglaUf + "'>" + deputado.nome + "</option>");
                }
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

        var fotoDeputado = deputadoSelecionado.attr("data-foto");
        $(".deputado-foto").attr("src", fotoDeputado); // Atualiza a imagem do deputado
        $(".deputado-info-container").show(); // Exibe as informações do deputado
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
        $(".header-text").hide(); // Esconde o texto do cabeçalho
    });
});
