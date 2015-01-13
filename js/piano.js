var sonidoFin = new Audio("sound/revelar.mp3");
var sonidoOK = new Audio("sound/ok.mp3");
var generadas = -4;

$(document).on("ready", main);

function main(){
	//$("#iniciar-juego").on("click", iniciarJuego);
	//$(".pantalla").hide();
	//$(".pantalla-principal").fadeIn();
	$("#volver").on("click", iniciarJuego);
	iniciarJuego();
}

function iniciarJuego(){
	$("#puntuacionFinal").html("");

	$(".pantalla").hide();
	$(".pantalla-juego").fadeIn();
	for (var i = 0; i < 4; i++) {
		generarNuevaLinea();
	}
	$(".casilla-negra:last").html("YA!");
	$(".casilla-negra:last").attr("id","ya");
	$("#ya").on("click", iniciarCronometro);
}

function finalizarJuego(){
	$("#puntuacionFinal").append('Hiciste: '+generadas+' en '+ $("#cronometro").html());
	
	generadas = -4;
	$(".pantalla-juego").html("");
	//sonidoFin.play();
	$(".pantalla-juego").hide();
	$(".pantalla-fin").fadeIn();
}
function recorrerCasillas(){
	//sonidoOK.play();
	desplazar();
}

function desplazar(){
	generarNuevaLinea();
	//margen = parseInt($(".casilla:first").css("margin-top"));
	//aumento = parseInt($(".casilla:first").css("height"));
	//$(".linea-casillas:first").css("margin-top", (margen+aumento)+"px");
}

function generarNuevaLinea(){
	var casillaNegra = getNumeroAleatorio(0, 3);
	lineaNueva = '<div class="linea-casillas">';
	for (var i = 0; i < 4; i++) {
		if (i === casillaNegra) {
			lineaNueva += '<div onclick=\"recorrerCasillas()\" class="casilla casilla-negra">B'+generadas+'</div>';
		}else{
			lineaNueva += '<div onclick=\"finalizarJuego()\" class="casilla casilla-blanca">W'+generadas+'</div>';
		}
	}
	lineaNueva += '</div>';
	$(".pantalla-juego").prepend(lineaNueva);
	sonidoOK.play();
	
	generadas++;
}

function getNumeroAleatorio(valorMinimo, valorMaximo){return Math.floor(Math.random() * (valorMaximo - valorMinimo + 1)) + valorMinimo;}

	var minuto = 0;
	var segundo = 0;
	var fraccion = 0;
function iniciarCronometro(){
	fraccion+=25;

	if (fraccion > 1000){segundo++;	fraccion=0};
	if (segundo > 60)	{minuto++;	segundo=0}

	$("#cronometro").html(minuto+"'"+segundo+"''"+fraccion+"'''");
	
	tiempo = setTimeout('iniciarCronometro()',25)
}