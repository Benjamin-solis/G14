
//FUNCIÓN ANALIZAR PROFESOR
function array_ramo(){
  var hoja = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var datos = hoja.getDataRange().getValues();
  
  var colTipoActividad = buscarPalabraEnArray("TIPO") - 1;
  var colProfesor = buscarPalabraEnArray("PROFESOR") - 1;
  var colDias = [
    buscarPalabraEnArray("LUNES") - 1,
    buscarPalabraEnArray("MARTES") - 1,
    buscarPalabraEnArray("MIERCOLES") - 1,
    buscarPalabraEnArray("JUEVES") - 1,
    buscarPalabraEnArray("VIERNES") - 1
  ];

  // Mapeo de las filas
  var actividad = datos.slice(1).map((row, index) => ({
    tipoActividad: row[colTipoActividad],
    profesor: row[colProfesor],
    dias: colDias.map(dia => row[dia]),
    fila: index + 2  
  }));

  return actividad;
}


function buscarPalabraEnArray(palabra){
var hoja = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

var primeraFila = hoja.getRange(1,1,1, hoja.getLastColumn()).getValues()[0];

var posicion = primeraFila.reduce((resultado, valorActual, indice) =>
  resultado === -1 && valorActual === palabra ? indice + 1: resultado, -1);

return posicion;

}

function buscarPalabrahorario(palabra){
var hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("CATALOGO");

var primeraFila = hoja.getRange(2, 1, hoja.getLastRow() - 1, hoja.getLastColumn()).getValues()[0];

var posicion = primeraFila.reduce((resultado, valorActual, indice) =>
  resultado === -1 && valorActual === palabra ? indice + 1: resultado, -1);

return posicion;
}

//FUNCIÓN ANALIZAR_HORARIOS
function obtenerDatosHorario(){
var hojaHorario = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Horario");
var datos = hojaHorario.getDataRange().getValues();
return datos;


}


//FUNCIÓN GRÁFICO AYUD-CLAS-LABT POR HORARIO

function obtenerDatosGrafico(){
var hoja = SpreadsheetApp.getActiveSpreadsheet(); 
var hojaDatos = hoja.getSheetByName("Horario");
return hojaDatos;
}


function obtenerDatos(hojaDatos) {
return hojaDatos.getDataRange().getValues();
}

//FUNCIÓN REPORTE EDIFICIO
function datos_edificios(){
var hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Horario");
datos = hoja.getDataRange().getValues();

var colDias = [
    buscarPalabraEnArray("LUNES") - 1,
    buscarPalabraEnArray("MARTES") - 1,
    buscarPalabraEnArray("MIERCOLES") - 1,
    buscarPalabraEnArray("JUEVES") - 1,
    buscarPalabraEnArray("VIERNES") - 1
  ];

var colEdificio = buscarPalabraEnArray("PROFESOR")-1;
var colSala = buscarPalabraEnArray("SALA")-1;

var actividad = datos.slice(1).map((row, index) => ({
  dias: colDias.map(dia => row[dia]),
  edificio: row[colEdificio],
  sala: row[colSala]
}));

return actividad;
}

//GENERAR HORARIO

function claseCarrera(carrera){
var hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("CATALOGO");
var encabezados = hoja.getRange(2, 1, 1, hoja.getLastColumn()).getValues()[0];
var datos = hoja.getRange(3, 1, hoja.getLastRow() - 2, hoja.getLastColumn()).getValues();
var indiceCarrera = encabezados.indexOf(carrera);

if (indiceCarrera === -1) {
  throw new Error("No se encontró la columna de la carrera: " + carrera);
}


var cumple = datos.filter(function(row) {
  return row[indiceCarrera] !== "" && row[indiceCarrera] !== null;
});

return cumple;

}


