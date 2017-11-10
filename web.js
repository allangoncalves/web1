
jogadores = []

function Jogador(nome, sexo, tipoJogador){
	this.nome = nome;
	this.sexo = sexo;
	this.tipoJogador = tipoJogador;
	this.opcaoSelecionada = function(){
		if(nome == "pc"){
			return "TO-DO RANDOM FUNCTION";
		}
		else{
			return "";
		}
	}
}

function criarJogadores() { 
	jog_1_nome = $("input[name='nome1']").val()
	jog_1_nome = $("input[name='nome1']").val()
	jog_1_sexo = $("input[name='sexo1']").val()
	j1 = new Jogador()
	jogadores.push()
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
	$("#formulario").append('<button class="blue" id="submitFormulario" type="button" onclick="criarJogadores()">Confirmar</button>');
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