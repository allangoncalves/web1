
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

function criarJogadores(Jogo){
	
	if(Jogo == ModoJogo.PvC){
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
		if (Jogo == ModoJogo.PvP){
			
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
	InterfaceJogo(Jogo)
}

function criarFormulario(id){
	$("#formulario").append('<div class="form" id="jogador1"></div>');
	$("#jogador1").append('<p>Jogador 1</p>');
	$("#jogador1").append('Nome: <input type="text" name="nome1"> ');
	$("#jogador1").append('<br> Sexo: ');
	$("#jogador1").append('<input type="radio" name="sexo1" value="feminino" checked> Feminino');
	$("#jogador1").append('<input type="radio" name="sexo1" value="masculino"> Masculino <br>');	
	if(id == 1){
		$("#formulario").append('<div class="form" id="jogador2"></div>');
		$("#jogador2").append('<p>Jogador 2</p>');
		$("#jogador2").append('Nome: <input type="text" name="nome2"> ');
		$("#jogador2").append('<br> Sexo: ');
		$("#jogador2").append('<input type="radio" name="sexo2" value="feminino" checked> Feminino');
		$("#jogador2").append('<input type="radio" name="sexo2" value="masculino"> Masculino <br>');	
	}
}

function criarCadastro(id){
	$("#Cadastro").append('<div id="formulario"></div>');
	if(ModoJogo.PvP == id){
		criarFormulario(1);
		$("#formulario").append('<button class="btn btn-primary" id="submitFormulario" type="button" onclick="criarJogadores(ModoJogo.PvP)">Confirmar</button>');
	}
	else{
		criarFormulario(0);
		$("#formulario").append('<button class="btn btn-primary" id="submitFormulario" type="button" onclick="criarJogadores(ModoJogo.PvC)">Confirmar</button>');

	}
}

function verificarResultado(Jogo, resultado1, resultado2) {
	if(Jogo == ModoJogo.PvP){
		var indice1 = verificarJogador(j1.nome);
		var indice2 = verificarJogador(j2.nome);
		if(resultado1 == "PEDRA"){
			if(resultado2 == resultado1){
				jogadores[indice1].pontuacao++;
				jogadores[indice2].pontuacao++;
				return 0;
			}
			else{
				if(resultado2 == "PAPEL"){
					jogadores[indice2].pontuacao += 3;
					return 2;
				}
				else{
					jogadores[indice1].pontuacao += 3;
					return 1;
				}
			}
		}
		else{
			if(resultado1 == "PAPEL"){
				if(resultado2 == resultado1){
					jogadores[indice1].pontuacao++;
					jogadores[indice2].pontuacao++;
					return 0;
				}else{
					if(resultado2 == "PEDRA"){
						jogadores[indice1].pontuacao += 3;
						return 1;
					}
					else{
						jogadores[indice2].pontuacao += 3;
						return 2;
					}
				}
			}
			else{
				if(resultado1 == "TESOURA"){
					if(resultado2 == resultado1){
						jogadores[indice1].pontuacao++;
						jogadores[indice2].pontuacao++;
						return 0;
					}
					else{
						if(resultado2 == "PEDRA"){
							jogadores[indice2].pontuacao += 3;
							return 2;
						}
						else{
							jogadores[indice1].pontuacao += 3;
							return 1;
						}
					}
				}
			}
		}
	}
	else{
		if(Jogo == ModoJogo.PvC){
			var jogador1 = verificarJogador(j1.nome);
			//computador foi criado globalmente
			var pc = computador.opcaoSelecionada();
			if(resultado1 == "PEDRA"){
				if (pc == resultado1){
					return 0;
				}
				else{
					if(pc == "PAPEL"){
						return -1;
					}
					else{
						return 1;
					}
				}
			}
			else{
				if(resultado1 == "PAPEL"){
					if(pc == resultado1){
						return 0;
					}
					else{
						if(pc == "PEDRA"){
							return 1;
						}
						else{
							return -1;
						}
					}
				}
				else{
					if (resultado1 == "TESOURA"){
						if(pc == resultado1){
							return 0;
						}
						else{
							if(pc == "PAPEL"){
								return 1;
							}
							else{
								return -1;
							}
						}
					}
				}
			}

		}
	}
}

function InterfaceJogo(Jogo){
	var r1, r2;
	if(Jogo == ModoJogo.PvP){
		$("#Jogo").attr('style','display: inherit');
		$("#enviarItemJogador1").click(
			function(){
				
				$("#jg1").hide();
				r1 = $("input[name='escolhaJogo1']:checked").val();
				$("#jg2").attr('style', 'display: inherit');
				
				$("#enviarItemJogador2").click(
					function(){
						$("#jg2").hide();
						r2 = $("input[name='escolhaJogo2']:checked").val();
						var r = verificarResultado(Jogo, r1, r2);
						$("#painel").text(r);
						$("#jg1").attr('style', 'display: inherit');
					}
				);
			}
		);
		
	}
	else{
		if(Jogo == ModoJogo.PvC){

		}
	}

	
	
	
}


$(document).ready(
	function(){
		$("#VsPessoa").click(
			function(){
				$("#TipoJogo").hide();
				criarCadastro(ModoJogo.PvP)
			}
		);
	}
)

$(document).ready(
	function(){
		$("#VsComputador").click(
			function(){
				$("#TipoJogo").hide();
				criarCadastro(ModoJogo.PvC)
			}
		);
	}
)

