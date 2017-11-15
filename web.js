
jogadores = [];

total_partidas = 0;

TipoJogador = {
	HUMANO: 0,
	COMPUTADOR: 1,
};

Item = ["PEDRA", "PAPEL", "TESOURA"];


$(document).ready(
	function(){
		$("#VsComputador").off().click(
			function(){
				$("#IniciarJogo").hide();
				criarCadastro();
			}
		);
	}
)

//CONSTRUTOR
function Jogador(nome, sexo, tipoJogador){
	//INFO GERAL
	this.nome = nome;
	this.sexo = sexo;
	this.tipoJogador = tipoJogador;
	//TEMPO TOTAL
	this.horas = 0;
	this.minutos = 0;
	this.segundos = 0;
	//ARMAZENAMENTO DOS DADOS DAS PARTIDAS
	this.tabela = $("#historico").append('<table id="tabelaHistorico" class="table table-striped table-hover"><thead><tr><th>VENCEDOR</th>'+
							'<th>ESCOLHA 1</th><th>ESCOLHA 2</th><th>TEMPO DA PARTIDA</th>'+
							'</tr></thead><tbody></tbody></table>');
	this.score = [0,0];
	this.totalJogos = 0;
	//ESCOLHA ALEATORIA
	this.opcaoSelecionada = function(){
		if(this.tipoJogador == TipoJogador.COMPUTADOR){
			return Item[Math.floor((Math.random()*10))%3];
		}
		else{
			return "";
		}
	}
}

//INSTANCIA DO COMPUTADOR
computador = new Jogador("!@#123$$$", "feminino", TipoJogador.COMPUTADOR);
jogadores.push(computador);

//SE O JOGADOR EXISTE, RETORNA SUA POSICAO NA LISTA DE JOGADORES, SENAO NULL
function verificarJogador(nome){
	for(var i=0;i<jogadores.length;i++){
		if(jogadores[i].nome == nome){
			return i;
		}
	}
	return null;
}

//CONTABILIZA O TEMPO TOTAL DO JOGADOR
function computarTempo(nome, horas, minutos, segundos) {
		
		var i = verificarJogador(nome);

		var contseg = segundos + jogadores[i].segundos;
		minutos += Math.floor(contseg/60);
		contseg = Math.floor(contseg%60);
		var contmin = minutos + jogadores[i].minutos;
		horas += Math.floor(contmin/60);
		contmin = Math.floor(contmin%60);
		var conthoras = horas + jogadores[i].horas;
		console.log("horas"+conthoras+"minutos"+contmin+"segundos"+contseg);

		jogadores[i].segundos = contseg;
		jogadores[i].minutos = contmin;
		jogadores[i].horas = conthoras;
}

//REALIZA TODAS AS AÇOES NECESSARIAS PARA A DESISTENCIA DO JOGADOR
function desistir() {
	//INICIO VERIFICACAO DO TEMPO
	fim_tempo_total = performance.now();
	fim_tempo_total = fim_tempo_total - inicio_tempo_total;
	horas_total = Math.floor(fim_tempo_total/3600000)%24;
	minutos_total = Math.floor(fim_tempo_total/60000)%60;
	segundos_total = Math.floor(fim_tempo_total/1000)%60;
	computarTempo(j1.nome, horas_total, minutos_total, segundos_total);
	//FIM VERIFICACAO TEMPO

	//AJUSTES NA INTERFACE
	$("#Jogo").hide();
	$("#IniciarJogo").attr('style', 'display: inherit');
	$("#tempoTotal").attr('style', 'display: inherit');
	var i = verificarJogador(j1.nome);
	$("input[name='nome']").val("");
	$("input[name='sexo']:checked").val("feminino");
	$(".tempo").text("Tempo total do jogador: "+jogadores[i].nome);
	$("#paragrafoTempo").text("Horas:"+jogadores[i].horas+" Minutos:"+jogadores[i].minutos+" Segundos:"+jogadores[i].segundos);
	$("#score1").text(0);
	$("#score2").text(0);
	jogadores[i].tabela = $("#historico").html();//SALVA A TABELA DE HISTORICO
	$("#tabelaHistorico").remove();
}

function criarJogadores(){
	//COLETA OS DADOS
	jog_1_nome = $("input[name='nome']").val();
	jog_1_sexo = $("input[name='sexo']:checked").val();
	
	//NOME VAZIO
	if(jog_1_nome == ""){
		window.alert("Jogador não pode ter nome vazio!");
		return;
	}

	j1 = verificarJogador(jog_1_nome);

	//VERIFICA SE O JOGADOR EXISTE E O RECUPERA, SE NÃO EXISTIR UM NOVO É CRIADO
	if(j1 == null){
		j1 = new Jogador(jog_1_nome, jog_1_sexo, TipoJogador.HUMANO);
		jogadores.push(j1);
	}
	else{
		j1 = jogadores[j1];
	}

	//ESCONDE A TELA ATUAL E PASSA PARA A PROXIMA
	$("#formulario").hide();
	InterfaceJogo();
}

//TORNA VISIVEL A TELA DE CADASTRO
function criarCadastro(){
	$("#formulario").attr('style', 'display: inherit');
	$("#jogador1").attr('style', 'display: inherit');
	$("#formulario").append('<button class="btn btn-success" id="submitFormulario" type="button" onclick="criarJogadores()">Confirmar</button>');
}

//VERIFICA E CONTABILIZA OS RESULTADOS
function verificarResultado(resultado1, resultado2) {
	//TEMPO DA PARTIDA
	fim_partida = performance.now();
	fim_partida = fim_partida - inicio_partida;
	horas_total_partida = Math.floor(fim_partida/3600000)%24;
	minutos_total_partida = Math.floor(fim_partida/60000)%60;
	segundos_total_partida = Math.floor(fim_partida/1000)%60;

	var indice1 = verificarJogador(j1.nome);
	var pc = computador.opcaoSelecionada();
	if(resultado1 == "PEDRA"){
		if (pc == resultado1){
			jogadores[indice1].score[0]++;
			jogadores[indice1].score[1]++;
			$('#tabelaHistorico > tbody:first').prepend('<tr><td>EMPATE</td><td>'+resultado1+'</td><td>'+resultado2+'</td><td>'+horas_total_partida+':'+minutos_total_partida+':'+segundos_total_partida+'</td></tr>');
		}
		else{
			if(pc == "PAPEL"){
				jogadores[indice1].score[1] += 3;
				$('#tabelaHistorico > tbody:first').prepend('<tr><td>COMPUTADOR</td><td>'+resultado1+'</td><td>'+resultado2+'</td><td>'+horas_total_partida+':'+minutos_total_partida+':'+segundos_total_partida+'</td></tr>');
			}
			else{
				jogadores[indice1].score[0] += 3;
				$('#tabelaHistorico > tbody:first').prepend('<tr><td>'+j1.nome+'</td><td>'+resultado1+'</td><td>'+resultado2+'</td><td>'+horas_total_partida+':'+minutos_total_partida+':'+segundos_total_partida+'</td></tr>');
			}
		}
	}
	else{
		if(resultado1 == "PAPEL"){
			if(pc == resultado1){
				jogadores[indice1].score[0]++;
				jogadores[indice1].score[1]++;
				$('#tabelaHistorico > tbody:first').prepend('<tr><td>EMPATE</td><td>'+resultado1+'</td><td>'+resultado2+'</td><td>'+horas_total_partida+':'+minutos_total_partida+':'+segundos_total_partida+'</td></tr>');
			}
			else{
				if(pc == "PEDRA"){
					jogadores[indice1].score[0] += 3;
					$('#tabelaHistorico > tbody:first').prepend('<tr><td>'+j1.nome+'</td><td>'+resultado1+'</td><td>'+resultado2+'</td><td>'+horas_total_partida+':'+minutos_total_partida+':'+segundos_total_partida+'</td></tr>');
				}
				else{
					jogadores[indice1].score[1] += 3;
					$('#tabelaHistorico > tbody:first').prepend('<tr><td>COMPUTADOR</td><td>'+resultado1+'</td><td>'+resultado2+'</td><td>'+horas_total_partida+':'+minutos_total_partida+':'+segundos_total_partida+'</td></tr>');
				}
			}
		}
		else{
			if (resultado1 == "TESOURA"){
				if(pc == resultado1){
					jogadores[indice1].score[0]++;
					jogadores[indice1].score[1]++;
					$('#tabelaHistorico > tbody:first').prepend('<tr><td>EMPATE</td><td>'+resultado1+'</td><td>'+resultado2+'</td><td>'+horas_total_partida+':'+minutos_total_partida+':'+segundos_total_partida+'</td></tr>');
				}
				else{
					if(pc == "PAPEL"){
						jogadores[indice1].score[0] += 3;
						$('#tabelaHistorico > tbody:first').prepend('<tr><td>'+j1.nome+'</td><td>'+resultado1+'</td><td>'+resultado2+'</td><td>'+horas_total_partida+':'+minutos_total_partida+':'+segundos_total_partida+'</td></tr>');
					}
					else{
						jogadores[indice1].score[1] += 3;
						$('#tabelaHistorico > tbody:first').prepend('<tr><td>COMPUTADOR</td><td>'+resultado1+'</td><td>'+resultado2+'</td><td>'+horas_total_partida+':'+minutos_total_partida+':'+segundos_total_partida+'</td></tr>');
					}
				}
			}
		}
	}
}

//INTERACOES DO JOGO
function InterfaceJogo(){
	inicio_tempo_total = performance.now();
	inicio_partida = performance.now();
	$("#paragrafoInfo").text(j1.nome);
	var r1;
	var indice = verificarJogador(j1.nome);
	$("#Jogo").attr('style','display: inherit');
	$("#score1").text(jogadores[indice].score[0]);
	$("#score2").text(jogadores[indice].score[1]);
	$("#desistir").attr('style', 'display: inline-block');
	$("#totalPartidas").text("TOTAL DE PARTIDAS: "+jogadores[indice].totalJogos);
	$("#historico").append(jogadores[indice].tabela);
	$("#enviarItemJogador").attr('style','display: inline-block');

	//CLICK NO BOTAO ENVIAR RESPOSTA
	$("#enviarItemJogador").off().click(
		function(){
			r1 = $("input[name='escolhaJogo']:checked").val();
			var r = verificarResultado(r1, computador.opcaoSelecionada());
			inicio_partida = performance.now();
			$("#score1").text(jogadores[indice].score[0]);
			$("#score2").text(jogadores[indice].score[1]);
			jogadores[indice].totalJogos++;
			$("#totalPartidas").text("TOTAL DE PARTIDAS: "+jogadores[indice].totalJogos);
		}
	);
	//CLICK NO BOTAO DESISTIR
	$("#desistir").off().click(
		function(){
			desistir(1);
		}
	);
}



