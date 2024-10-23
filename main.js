


function onOpen() {
  var hoja = SpreadsheetApp.getActiveSpreadsheet();
  var menuItems = [
      { name: 'Activar Profesor', functionName: 'Activar_profesor' },
      { name: 'Analizar horario', functionName: 'Analizar_horarios' },
      { name: 'Generar gráfico de actividades', functionName: 'CrearGrafico' },
      {name: 'Reporte Edificos', functionName: 'Reporte_edificio'},
      {name: 'Generar horario', functionName: 'generar_horario'},
      {name: 'Generar horario bonito', functionName: 'mostrarFormulario'}
      
 
      
  ];
  hoja.addMenu('Opciones Personalizadas', menuItems);
}


function Activar_profesor() {
  const columna = array_ramo(); 
  const x = detecta_tope(columna);
  colProfesor = buscarPalabraEnArray("PROFESOR");  
  pintar(x, colProfesor); 
}


function Analizar_horarios() {
create_sheet_Slots();
const datos = array_ramo();
const x = analizarDatos(datos); 
crear_slots(x);
}

function CrearGrafico() {
  var hojaDatos = obtenerDatosGrafico();
  var hojaGraficos = obtenerHojaGraficos();

  var bloquesHorarios = definirBloquesHorarios(); 
  var actividades = definirActividades(); 

  var tablaConteo = inicializarTablaConteo(bloquesHorarios); 
  var datos = obtenerDatos(hojaDatos); 

  procesarDatos(datos, tablaConteo, bloquesHorarios, actividades); 
  escribirDatosEnGraficos(hojaGraficos, tablaConteo, bloquesHorarios, actividades); 
  crearYMostrarGrafico(hojaGraficos, bloquesHorarios, actividades); 
}

function Reporte_edificio(){
var datos = datos_edificios(); //RETORNA UNA MATRIZ DE ARRAYS CON DATOS DE CADA CLASE
var x = agregarDias(datos);
Logger.log(x);
var arreglo = transformarHoras(x, definirBloquesHorarios());
Logger.log(arreglo); 
var edificios = todosEdificios(datos);   

create_sheet_edificios(edificios);


//var edif_porHorario = filtrar_horarioEdf(edificios);
}
function generar_horario(){
var ui = SpreadsheetApp.getUi();
var carrera = ui.prompt('Ingrese una carrera: ICC IOC ICE ICI ICA', 'Escribe aquí:', ui.ButtonSet.OK_CANCEL).getResponseText().trim().toUpperCase();
var semestre = ui.prompt('Ingrese un semestre:', 'Escribe aquí:', ui.ButtonSet.OK_CANCEL).getResponseText();

var pan_con_queso = claseCarrera(carrera); //FUNCIÓN RETORNA LISTA CON CLASES DE ESA CARRERA
var indice_especialidad = buscarPalabrahorario(carrera)-1;
var indice_nombre = buscarPalabrahorario("TITULO")-1;
var pan_con_jamon = claseSemestre(pan_con_queso, semestre, indice_especialidad, indice_nombre); //FUNCIÓN RETORNA LISTA CON NOMBRES DE CURSOS CON SEMESTRE Y ESPECIALIDAD REQUERIDO

//var y = horario_filtraClases(claseSemestre); //RETORNA LISTA DE CLASES ANTERIORES PERO DE HORARIO
//
//var hoja = crearHojaHorario(); //GENERA HOJA CON EL HORARIO VACÍO



}





//CONSTANTES
function definirBloquesHorarios() {
return [
  "08:30 - 09:20", "09:30 - 10:20", "10:30 - 11:20", 
  "11:30 - 12:20", "12:30 - 13:20", "13:30 - 14:20",
  "14:30 - 15:20", "15:30 - 16:20", "16:30 - 17:20", 
  "17:30 - 18:20", "18:30 - 19:20"
];
}


function definirActividades() {
return ["CLAS", "AYUD", "LAB"];
}