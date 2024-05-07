$(document).ready(function(){
  var baseUrl = "https://dadosabertos.camara.leg.br/api/v2/";

  // Função para carregar os deputados
  function carregarDeputados() {
    $.get(baseUrl + "deputados", function(data){
      var deputados = data.dados;
      var selectDeputados = $("#selectDeputados");
      selectDeputados.empty();
      selectDeputados.append("<option value='' disabled selected>Selecione um deputado</option>");
      $.each(deputados, function(index, deputado){
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

        // Exibir nome completo do deputado no topo da página
        var deputadoInfo = $("#deputadoInfo");
        deputadoInfo.html("<p>" + deputadoNome + "</p>");
      });
    } else {
      alert("Selecione um deputado antes de consultar as proposições.");
    }
  }
});
