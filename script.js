// Função para carregar as proposições do deputado selecionado
function carregarProposicoes() {
    var deputadoId = $("#selectDeputados").val();
    var deputadoNome = $("#selectDeputados option:selected").text();
    var deputadoPartido = $("#selectDeputados option:selected").data("partido");
    
    if (deputadoId) {
        $.get(baseUrl + "proposicoes", {idDeputadoAutor: deputadoId}, function(data){
            var proposicoes = data.dados;
            var listaProposicoes = $("#listaProposicoes");
            listaProposicoes.empty();
            $.each(proposicoes, function(index, proposicao){
                listaProposicoes.append("<li>" + proposicao.siglaTipo + " " + proposicao.numero + " - " + proposicao.ementa + "</li>");
            });

            // Exibir nome e partido do deputado no topo da página
            var deputadoInfo = $("#deputadoInfo");
            deputadoInfo.html("<p class='deputado-name'>" + deputadoNome.toUpperCase() + "</p><p class='deputado-party'>" + deputadoPartido.toUpperCase() + "</p>");
        });
    } else {
        alert("Selecione um deputado antes de consultar as proposições.");
    }
}
