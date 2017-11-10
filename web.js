
jogadores = [];

TipoJogador = {
	HUMANO: 0,
	COMPUTADOR: 1,
};

function Jogador(nome, sexo, tipoJogador){
	this.nome = nome;
	this.sexo = sexo;
	this.tipoJogador = tipoJogador;
	self.partidas = [];
	this.opcaoSelecionada = function(){
		if(tipoJogador == TipoJogador.COMPUTADOR){
			return "TO-DO RANDOM FUNCTION";
		}
		else{
			return "";
		}
	}
}

function criarJogadores(tipoJogador1, tipoJogador2) {
	var existe = false; 
	//JOGADOR 1
	jog_1_nome = $("input[name='nome1']").val();
	jog_1_sexo = $("input[name='sexo1']:checked").val();
	j1 = new Jogador(jog_1_nome, jog_1_sexo, tipoJogador1);
	for(var i=0;i<jogadores.length;i++){
		if(jogadores[i].nome == j1.nome){
			existe = true;
			break;
		}
	}
	if(existe == false){
		jogadores.push(j1);
	}

	existe = false;
	//JOGADOR 2
	jog_2_nome = $("input[name='nome2']").val();
	jog_2_sexo = $("input[name='sexo2']:checked").val();
	j2 = new Jogador(jog_2_nome, jog_2_sexo, tipoJogador2);
	for(var i=0;i<jogadores.length;i++){
		if(jogadores[i].nome == j2.nome){
			existe = true;
			break;
		}
	}
	if(existe == false){
		jogadores.push(j2);
	}
}

function criarFormulario(id) {
	if(id == 1){
		$("#formulario").append('<div class="form" id="jogador1"></div>');
		$("#jogador1").append('<p>Jogador 1</p>');
		$("#jogador1").append('Nome: <input type="text" name="nome1"> ');
		$("#jogador1").append('<br> Sexo: ');
		$("#jogador1").append('<input type="radio" name="sexo1" value="feminino" > Feminino');
		$("#jogador1").append('<input type="radio" name="sexo1" value="masculino"> Masculino <br>');	
	}
	else{
		$("#formulario").append('<div class="form" id="jogador2"></div>');
		$("#jogador2").append('<p>Jogador 2</p>');
		$("#jogador2").append('Nome: <input type="text" name="nome2"> ');
		$("#jogador2").append('<br> Sexo: ');
		$("#jogador2").append('<input type="radio" name="sexo2" value="feminino"> Feminino');
		$("#jogador2").append('<input type="radio" name="sexo2" value="masculino"> Masculino <br>');		
	}
	
}

function criarCadastro() {
	$("#Cadastro").append('<div id="formulario"></div>');
	criarFormulario(1)
	criarFormulario(2)
	$("#formulario").append('<button class="blue" id="submitFormulario" type="button" onclick="criarJogadores(TipoJogador.HUMANO, TipoJogador.HUMANO)">Confirmar</button>');
}

$(document).ready(
	function(){
		$("#VsPessoa").click(
			function(){
				$("#TipoJogo").hide();
			}
		);
	}
)

$(document).ready(
	function(){
		$("#VsComputador").click(
			function(){
				$("#TipoJogo").hide();
			}
		);
	}
)

$(document).ready(
	function(){
		$("#submitFormulario").click(
			function(){
				$("#formulario").hide();
			}
		);
	}
)