
jogadores = [];

TipoJogador = {
	HUMANO: 0,
	COMPUTADOR: 1,
};



Item = ["PEDRA", "PAPEL", "TESOURA"];

ModoJogo = {
	PvP: 0,
	PvC: 1,
};

modo_atual = ModoJogo.PvC;

$(document).ready(
	function(){
		$("#VsPessoa").off().click(
			function(){
				$("#TipoJogo").hide();
				modo_atual = ModoJogo.PvP;
				criarCadastro();
			}
		);
	}
)

$(document).ready(
	function(){
		$("#VsComputador").off().click(
			function(){
				$("#TipoJogo").hide();
				modo_atual = ModoJogo.PvC;
				criarCadastro();
			}
		);
	}
)

function Jogador(nome, sexo, tipoJogador){
	this.nome = nome;
	this.sexo = sexo;
	this.tipoJogador = tipoJogador;
	this.pontuacao = 0
	this.opcaoSelecionada = function(){
		if(this.tipoJogador == TipoJogador.COMPUTADOR){
			return Item[Math.floor((Math.random()*10))%3];
		}
		else{
			return "";
		}
	}
}

computador = new Jogador("!@#123$$$", "feminino", TipoJogador.COMPUTADOR);

function verificarJogador(nome){
	for(var i=0;i<jogadores.length;i++){
		if(jogadores[i].nome == nome){
			return i;
		}
	}
	return null;
}

function desistir(id) {
	$("#Jogo").hide();
	$("#TipoJogo").attr('style', 'display: inherit');
	if (id == 1){

	}
	else{

	}
	
}

function criarJogadores(){
	
	if(modo_atual == ModoJogo.PvC){
		jog_1_nome = $("input[name='nome1']").val();
		jog_1_sexo = $("input[name='sexo1']:checked").val();

		if(jog_1_nome == ""){
			window.alert("Jogador não pode ter nome vazio!");
			return;
		}
		j1 = verificarJogador(jog_1_nome)
		if(j1 == null){
			j1 = new Jogador(jog_1_nome, jog_1_sexo, TipoJogador.HUMANO);
			jogadores.push(j1);
		}
		else{
			j1 = jogadores[j1];
		}
		j2 = computador;
	}
	else{
		if (modo_atual == ModoJogo.PvP){
			
			jog_1_nome = $("input[name='nome1']").val();
			jog_1_sexo = $("input[name='sexo1']:checked").val();
			
			jog_2_nome = $("input[name='nome2']").val();
			jog_2_sexo = $("input[name='sexo2']:checked").val();
			if(jog_1_nome == "" || jog_2_nome == ""){
				window.alert("O Jogador não pode ter nome vazio.")
			}
			else{
				if(jog_1_nome == jog_2_nome ){
					window.alert("Jogadores não podem ter nomes iguais.");
					return;
				}
				else{
					j1 = verificarJogador(jog_1_nome);
					j2 = verificarJogador(jog_2_nome);
					if(j1 == null){		
						j1 = new Jogador(jog_1_nome, jog_1_sexo, TipoJogador.HUMANO);
						jogadores.push(j1);
					}
					else{
						j1 = jogadores[j1];
					}
					if(j2 == null){
						j2 = new Jogador(jog_2_nome, jog_2_sexo, TipoJogador.HUMANO);
						jogadores.push(j2);
					}
					else{
						j2 = jogadores[j2];
					}
				}				
			}
		}
	}
	//AQUI
	$("#formulario").hide();
	InterfaceJogo(modo_atual)
}

function criarFormulario(id){
	$("#jogador1").attr('style', 'display: inherit');
	if(id == 1){
		$("#jogador2").attr('style', 'display: inherit');
	}
}

function criarCadastro(){
	$("#formulario").attr('style', 'display: inherit');
	if(ModoJogo.PvP == modo_atual){
		criarFormulario(1);
		$("#formulario").append('<button class="btn btn-primary" id="submitFormulario" type="button" onclick="criarJogadores(ModoJogo.PvP)">Confirmar</button>');
	}
	else{
		criarFormulario(0);
		$("#formulario").append('<button class="btn btn-primary" id="submitFormulario" type="button" onclick="criarJogadores(ModoJogo.PvC)">Confirmar</button>');

	}
}

function verificarResultado(resultado1, resultado2) {
	if(modo_atual == ModoJogo.PvP){
		var indice1 = verificarJogador(j1.nome);
		var indice2 = verificarJogador(j2.nome);
		if(resultado1 == "PEDRA"){
			if(resultado2 == resultado1){
				jogadores[indice1].pontuacao++;
				jogadores[indice2].pontuacao++;
				$("#historico").append('<p class="resultado">EMPATE<br>'+
					j1.nome+'	vs	'+j2.nome+'<br>'+
					resultado1+' == '+resultado2+'</p>');
				return 0;
			}
			else{
				if(resultado2 == "PAPEL"){
					jogadores[indice2].pontuacao += 3;
					$("#historico").append('<p class="resultado">Jogador 2 ganhou.<br>'+
						j1.nome+'	vs	'+j2.nome+'<br>'+
						resultado1+' < '+resultado2+'</p>');
					return 2;
				}
				else{
					jogadores[indice1].pontuacao += 3;
					$("#historico").append('<p class="resultado">Jogador 1 ganhou.<br>'+
						j1.nome+'	vs	'+j2.nome+'<br>'+
						resultado1+' > '+resultado2+'</p>');
					return 1;
				}
			}
		}
		else{
			if(resultado1 == "PAPEL"){
				if(resultado2 == resultado1){
					jogadores[indice1].pontuacao++;
					jogadores[indice2].pontuacao++;
					$("#historico").append('<p class="resultado">EMPATE<br>'+
						j1.nome+'	vs	'+j2.nome+'<br>'+
						resultado1+' == '+resultado2+'</p>');
					return 0;
				}else{
					if(resultado2 == "PEDRA"){
						jogadores[indice1].pontuacao += 3;
						$("#historico").append('<p class="resultado">Jogador 1 ganhou.<br>'+
							j1.nome+'	vs	'+j2.nome+'<br>'+
							resultado1+' > '+resultado2+'</p>');
						return 1;
					}
					else{
						jogadores[indice2].pontuacao += 3;
						$("#historico").append('<p class="resultado">Jogador 2 ganhou.<br>'+
							j1.nome+'	vs	'+j2.nome+'<br>'+
							resultado1+' < '+resultado2+'</p>');
						return 2;
					}
				}
			}
			else{
				if(resultado1 == "TESOURA"){
					if(resultado2 == resultado1){
						jogadores[indice1].pontuacao++;
						jogadores[indice2].pontuacao++;
						$("#historico").append('<p class="resultado">EMPATE<br>'+
							j1.nome+'	vs	'+j2.nome+'<br>'+
							resultado1+' == '+resultado2+'</p>');
						return 0;
					}
					else{
						if(resultado2 == "PEDRA"){
							jogadores[indice2].pontuacao += 3;
							$("#historico").append('<p class="resultado">Jogador 2 ganhou.<br>'+
								j1.nome+'	vs	'+j2.nome+'<br>'+
								resultado1+' < '+resultado2+'</p>');
							return 2;
						}
						else{
							jogadores[indice1].pontuacao += 3;
							$("#historico").append('<p class="resultado">Jogador 1 ganhou.<br>'+
								j1.nome+'	vs	'+j2.nome+'<br>'+
								resultado1+' > '+resultado2+'</p>');
							return 1;
						}
					}
				}
			}
		}
	}
	else{
		if(modo_atual == ModoJogo.PvC){
			var jogador1 = verificarJogador(j1.nome);
			//computador foi criado globalmente
			var pc = computador.opcaoSelecionada();
			if(resultado1 == "PEDRA"){
				if (pc == resultado1){
					$("#historico").append('<p class="resultado">EMPATE<br>'+
							j1.nome+'	vs	COMPUTADOR<br>'+
							resultado1+' == '+pc+'</p>');
					return 0;
				}
				else{
					if(pc == "PAPEL"){
						$("#historico").append('<p class="resultado">O Computador ganhou.<br>'+
							j1.nome+'	vs	COMPUTADOR<br>'+
							resultado1+' < '+pc+'</p>');
						return -1;
					}
					else{
						$("#historico").append('<p class="resultado">O Jogador 1 ganhou.<br>'+
							j1.nome+'	vs	COMPUTADOR<br>'+
							resultado1+' > '+pc+'</p>');
						return 1;
					}
				}
			}
			else{
				if(resultado1 == "PAPEL"){
					if(pc == resultado1){
						$("#historico").append('<p class="resultado">EMPATE<br>'+
							j1.nome+'	vs	COMPUTADOR<br>'+
							resultado1+' == '+pc+'</p>');
						return 0;
					}
					else{
						if(pc == "PEDRA"){
							$("#historico").append('<p class="resultado">O Jogador 1 ganhou.<br>'+
								j1.nome+'	vs	COMPUTADOR<br>'+
								resultado1+' > '+pc+'</p>');
							return 1;
						}
						else{
							$("#historico").append('<p class="resultado">O Computador ganhou.<br>'+
								j1.nome+'	vs	COMPUTADOR<br>'+
								resultado1+' < '+pc+'</p>');
							return -1;
						}
					}
				}
				else{
					if (resultado1 == "TESOURA"){
						if(pc == resultado1){
							$("#historico").append('<p class="resultado">EMPATE<br>'+
								j1.nome+'	vs	COMPUTADOR<br>'+
								resultado1+' == '+pc+'</p>');
							return 0;
						}
						else{
							if(pc == "PAPEL"){
								$("#historico").append('<p class="resultado">O Jogador 1 ganhou.<br>'+
									j1.nome+'	vs	COMPUTADOR<br>'+
									resultado1+' > '+pc+'</p>');
								return 1;
							}
							else{
								$("#historico").append('<p class="resultado">O Computador ganhou.<br>'+
									j1.nome+'	vs	COMPUTADOR<br>'+
									resultado1+' < '+pc+'</p>');
								return -1;
							}
						}
					}
				}
			}

		}
	}
}

function InterfaceJogo(){
	$("#paragrafoInfo1").text("Nome: "+j1.nome);
	var r1, r2;
	$("#Jogo").attr('style','display: inherit');
	if(modo_atual == ModoJogo.PvP){
		$("#paragrafoInfo2").text("Nome: "+j2.nome);
		$("#enviarItemJogador1").attr('style','display: inline-block');
		$("#desistir1").attr('style', 'display: inline-block');
		$("#desistir2").attr('style', 'display: inline-block');
		$("#enviarItemJogador1").off().click(
			function(){
	
				$("#jg1").hide();
				$("#enviarItemJogador1").hide();
				r1 = $("input[name='escolhaJogo1']:checked").val();
				$("#jg2").attr('style', 'display: inherit');
				$("#enviarItemJogador2").attr('style','display: inline-block');
				$("#enviarItemJogador2").off().click(
					function(){
						$("#jg2").hide();
						$("#enviarItemJogador2").hide();
						r2 = $("input[name='escolhaJogo2']:checked").val();
						var r = verificarResultado(r1, r2);
						$("#jg1").attr('style', 'display: inherit');
						$("#enviarItemJogador1").attr('style','display: inline-block');
					}
				);
			}
		);
		
	}
	else{
		if(modo_atual == ModoJogo.PvC){
			$("#desistir1").attr('style', 'display: inline-block');
			$("#enviarItemJogador1").off().click(
				function(){
					r1 = $("input[name='escolhaJogo1']:checked").val();
					var r = verificarResultado(r1, computador.opcaoSelecionada());
				}
			);
		}
	}

	$("#desistir1").off().click(
		function(){
			$("#jogador2").hide();
			desistir(1);
		}
	);
	$("#desistir2").off().click(
		function(){
			$("#jogador2").hide();
			desistir(2);
		}
	);
	
}



