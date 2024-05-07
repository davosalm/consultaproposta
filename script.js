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
        selectDeputados.append("<option value='" + deputado.id + "' data-nome='" + deputado.nome + "' data-partido='"
