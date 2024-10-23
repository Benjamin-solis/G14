
    
function pintar(lista, colProfesor){
  var hoja = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  lista.forEach(celda => hoja.getRange(celda, colProfesor).setBackground("red"));
}



function crear_slots(filas) {
  var slotsSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Slots");
  
  filas.forEach(fila => slotsSheet.appendRow(fila));
  
}
function create_sheet_Slots(){
  var slotsSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Slots");
  if (!slotsSheet) {
    slotsSheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet("Slots");
  } 
  else {
    slotsSheet.clear(); 
  }
  slotsSheet.appendRow(["Day", "Time", "CLAS", "AYUD", "LABT"]);
  
}

function create_sheet_edificios(lista){
  var slotsSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Edificios");
  if (!slotsSheet) {
    slotsSheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet("Edificios");
  } else {
    slotsSheet.clear(); 
  }
  slotsSheet.appendRow(["Day", "Time", ...lista]);
}


function obtenerHojaGraficos() {
  var hoja = SpreadsheetApp.getActiveSpreadsheet();
  var hojaGraficos = hoja.getSheetByName("Gráficos");
  if (!hojaGraficos) {
    hojaGraficos = hoja.insertSheet("Gráficos");
  } else {
    hojaGraficos.clear();  // Limpiar si ya existe
  }
  return hojaGraficos;
}


function escribirDatosEnGraficos(hojaGraficos, tablaConteo, bloquesHorarios, actividades) {
  hojaGraficos.getRange(1, 1).setValue("Bloque Horario");
  actividades.forEach(function(actividad, index) {
    hojaGraficos.getRange(1, index + 2).setValue(actividad);
  });

  bloquesHorarios.forEach(function(bloque, fila) {
    hojaGraficos.getRange(fila + 2, 1).setValue(bloque);
    actividades.forEach(function(actividad, index) {
      hojaGraficos.getRange(fila + 2, index + 2).setValue(tablaConteo[bloque][actividad]);
    });
  });
}


function crearYMostrarGrafico(hojaGraficos, bloquesHorarios, actividades) {
  var rangoDatos = hojaGraficos.getRange(1, 1, bloquesHorarios.length + 1, actividades.length + 1);

  var chart = hojaGraficos.newChart()
    .setChartType(Charts.ChartType.COLUMN) 
    .addRange(rangoDatos)
    .setPosition(1, 5, 0, 0)
    .setOption('title', 'Cantidad de actividades por bloque horario')
    .setOption('legend', { position: 'top' })
    .setOption('isStacked', false)  
    .setOption('series', {
      0: { color: 'blue', labelInLegend: 'CLAS' },  
      1: { color: 'green', labelInLegend: 'AYUD' }, 
      2: { color: 'red', labelInLegend: 'LABT' }    
    })
    .build();

  hojaGraficos.insertChart(chart);
}

function crear_hoja_generar_horario(){
  const nombreHoja = "HorarioClases";  // Nombre de la hoja a crear
    const libro = SpreadsheetApp.getActiveSpreadsheet();
    let hoja = libro.getSheetByName(nombreHoja);  // Verificar si la hoja existe

    if (hoja) {
        libro.deleteSheet(hoja);  // Borrar la hoja si ya existe
    }

    hoja = libro.insertSheet(nombreHoja);  // Crear una nueva hoja

    // Días de la semana
    const dias = ["Hora", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

    // Horas del día
    const horas = [
        "08:30 - 09:20", "09:30 - 10:20", "10:30 - 11:20", "11:30 - 12:20",
        "12:30 - 13:20", "13:30 - 14:20", "14:30 - 15:20", "15:30 - 16:20",
        "16:30 - 17:20", "17:30 - 18:20", "18:30 - 19:20"
    ];

    // Imprimir los días de la semana en la primera fila
    hoja.getRange(1, 1, 1, dias.length).setValues([dias]);

    // Imprimir las horas en la primera columna
    horas.forEach((hora, index) => {
        hoja.getRange(index + 2, 1).setValue(hora);  // Rellenar las horas en la primera columna
    });
}

function agregar_clases_hoja_horario(cursos){

  const nombreHoja = "HorarioClases";  // Nombre de la hoja a crear
    const libro = SpreadsheetApp.getActiveSpreadsheet();
    let hoja = libro.getSheetByName(nombreHoja);  // Verificar si la hoja existe

    if (hoja) {
        libro.deleteSheet(hoja);  // Borrar la hoja si ya existe
    }

    hoja = libro.insertSheet(nombreHoja);  // Crear una nueva hoja

    // Días de la semana
    const dias = ["Hora", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

    // Horas del día
    const horas = [
        "08:30 - 09:20", "09:30 - 10:20", "10:30 - 11:20", "11:30 - 12:20",
        "12:30 - 13:20", "13:30 - 14:20", "14:30 - 15:20", "15:30 - 16:20",
        "16:30 - 17:20", "17:30 - 18:20", "18:30 - 19:20"
    ];

    const colores = [
    { CLAS: '#FF0000', AYUD: '#FFB2B2', LABT: '#FFB2B2' },  // ROJO
    { CLAS: '#FFFF00', AYUD: '#FFFFB2', LABT: '#FFFFB2'  },  // AMARILLO
    { CLAS: '#008000', AYUD: '#a2fb95', LABT: '#B2E6B2'  },  // VERDE
    { CLAS: '#00BFFF', AYUD: '#ADD8E6' , LABT: '#ADD8E6'  },  // CELESTE
    { CLAS: '#0033CC', AYUD: '#93adff', LABT: '#ADD8E6'  },  // AZUL
    { CLAS: '#800080', AYUD: '#DDA0DD', LABT: '#DDA0DD' },  // MORADO
    { CLAS: '#FF4500', AYUD: '#FFDB94', LABT: '#FFDB94' },  // NARANJA
    { CLAS: '#ff00fb', AYUD: '#FFB6C1', LABT: '#FFB6C1' },  // ROSADO // Naranja oscuro
    ];

    nombresCursos = cursos.map(ramo => ramo.curso).filter((valor, indice, self) => {
      return self.indexOf(valor) === indice;
    });



    // Imprimir los días de la semana en la primera fila
    hoja.getRange(1, 1, 1, dias.length).setValues([dias]);

    // Imprimir las horas en la primera columna
    horas.forEach((hora, index) => {
        hoja.getRange(index + 2, 1).setValue(hora);  // Rellenar las horas en la primera columna
    });

  

  cursos.forEach((curso) => {
        const { nrc, profesor, horarios, tipo, curso: nombreCurso } = curso;

        const indiceCurso = nombresCursos.indexOf(nombreCurso);
        const color = indiceCurso !== -1 ? colores[indiceCurso % colores.length][tipo] : '#FFFFFF';

        horarios.forEach((horario, diaIndex) => {
            if (horario) {  // Si hay un horario asignado
                
                const [horaInicio, horaFin] = horario.split(' -');
                Logger.log([horaInicio, horaFin]);
                
                // Encuentra la fila correspondiente a la hora de inicio
                const filaInicio = horas.findIndex(hora => hora.startsWith(horaInicio)) + 2;  // +2 porque la fila 1 es los días y la fila 2 empieza las horas
                const filaFinal = horas.findIndex(hora => hora.endsWith(horaFin)) + 2;
                console.log(`Hora inicio: ${horaInicio}, Fila asignada: ${filaInicio}`);
                console.log(`Hora Final: ${horaFin}, Fila asignada: ${filaFinal}`);
                if (filaInicio > 1) {
                    const claseInfo = `${nombreCurso} (${tipo}) - ${profesor} [${nrc}]`;
                    
                    // Asignar la clase en la celda correspondiente (día y hora)
                    const rango = hoja.getRange(filaInicio, diaIndex + 2, filaFinal - filaInicio + 1, 1);
                    rango.setValue(claseInfo);
                    rango.setWrap(true); // Activar el ajuste de texto
                    rango.setBackground(color); // Usar el color asignado
                }
            }
        });
    });
    
    // Formato de la hoja
    hoja.setColumnWidth(1, 150);  // Ajustar el ancho de la columna de horas
    hoja.autoResizeColumns(2, 6); // Ajustar automáticamente las columnas de los días
    hoja.setFrozenRows(1);  // Fijar la fila de los días
    hoja.setFrozenColumns(1);  // Fijar la columna de las horas
}





