//FUNCIÓN ACTIVAR PROFESOR

function detecta_tope(actividad) {
  var clase = actividad.filter((clase) => clase.tipoActividad == "CLAS");

  
  return clase.reduce((celdasConTope, clase1, index1) => {
    const celdas = clase
      .filter((clase2, index2) => index1 != index2 && hayTope(clase1, clase2))
      .map(clase2 => {
        return clase2.fila; 
      });

    return celdasConTope.concat(celdas); 
  }, []); 
}

function hayTope(clase1, clase2){
if(clase1.profesor == clase2.profesor){
  var tope = clase1.dias.some((dia, indice) => dia && dia == clase2.dias[indice]);
  return tope
}

else{
  return false
}
}


//FUNCIÓN ACTIVAR HORARIO



function analizarDatos(actividad) {

var diasIndices = {
  "LUNES": 5,
  "MARTES": 6,
  "MIERCOLES": 7,
  "JUEVES": 8,
  "VIERNES": 9
};


var slots = Object.entries(diasIndices)
  .map(([dia, index]) => {
    return actividad
      .filter(clase => clase.dias[index - 5] != null && clase.dias[index - 5] != "") 
      .map(clase => ({ dia: dia, hora: clase.dias[index - 5], tipo: clase.tipoActividad }));
  })
  .flat() // Aplanar el array de arrays

  // Agrupar los resultados por día-hora
  .reduce((acumulador, clase) => {
    var key = clase.dia + " " + clase.hora;
    
    if (!acumulador[key]) {
      acumulador[key] = { CLAS: 0, AYUD: 0, LABT: 0 };
    }
    
    if (clase.tipo == "CLAS") acumulador[key].CLAS++;
    else if (clase.tipo == "AYUD") acumulador[key].AYUD++;
    else if (clase.tipo == "LABT") acumulador[key].LABT++;
    
    return acumulador;
  }, {});

// Convertir el objeto en un array de filas y ordenarlo por día y luego por hora
var filas = Object.keys(slots).map(function(key) {
  var partes = key.split(" ");
  var dia = partes[0];
  var hora = partes.slice(1).join(" ");
  
  // Filtrar horarios inválidos o vacíos
  if (hora.match(/\d{2}:\d{2}/)) { // Verificar que la hora tenga el formato correcto
    return [dia, hora, slots[key].CLAS, slots[key].AYUD, slots[key].LABT];
  } else {
    return null; // Ignorar combinaciones día-hora sin hora válida
  }
}).filter(fila => fila != null); // Filtrar los valores nulos

Logger.log(filas);

// Ordenar por día y hora de forma funcional
var diasOrden = ["LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES"];
filas.sort(function(a, b) {
  var diaA = diasOrden.indexOf(a[0]);
  var diaB = diasOrden.indexOf(b[0]);
  if (diaA != diaB) return diaA - diaB;
  return a[1].localeCompare(b[1]); // Comparar las horas
});

return filas; 
}


//FUNCIÓN GRÁFICO AYUD-LAB-CLAS POR HORARIO

function inicializarTablaConteo(bloquesHorarios) {
return bloquesHorarios.reduce((tabla, bloque) => {
  tabla[bloque] = { "CLAS": 0, "AYUD": 0, "LAB": 0 };
  return tabla;
}, {});
}

// Procesar los datos para contar actividades en los bloques horarios
function procesarDatos(datos, tablaConteo, bloquesHorarios, actividades) {
datos.slice(1).forEach(function(fila) {
  var tipoActividad = fila[11].trim().toUpperCase();
  var horarioLunes = fila[5];

  if (tipoActividad === "LABT") {
    tipoActividad = "LAB";  
  }
  
  if (actividades.indexOf(tipoActividad) === -1 || !horarioLunes) {
    return;
  }
  
  var horas = horarioLunes.replace(/\s+/g, '').split("-");
  if (horas.length !== 2) return;

  var horaInicio = horas[0];
  var horaFin = horas[1];

  sumarBloquesCorrespondientes(horaInicio, horaFin, tipoActividad, tablaConteo, bloquesHorarios);
});
}

function sumarBloquesCorrespondientes(horaInicio, horaFin, tipoActividad, tablaConteo, bloquesHorarios) {
bloquesHorarios.forEach(function(bloque) {
  var [bloqueInicio, bloqueFin] = bloque.split(" - ");

  
  if ((horaInicio >= bloqueInicio && horaInicio < bloqueFin) || 
      (horaFin > bloqueInicio && horaFin <= bloqueFin) ||
      (horaInicio <= bloqueInicio && horaFin >= bloqueFin)) {
    tablaConteo[bloque][tipoActividad]++;
  }
});
}

//FUNCIÓN REPORTE EDIFICIO

function todosEdificios(lista){
var salas = lista.map(item => item.sala).filter(sala => sala != "");
return salas.map(palabra => palabra[0]).filter((letra, indice, array) => array.indexOf(letra) == indice);
}

const agregarDias = (datos) => {
const diasSemana = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes'];
  return datos.map(item => {
      const horas = item.dias.filter(Boolean); // Filtrar solo las horas no vacías
      const diaIndex = horas.length > 0 ? item.dias.indexOf(horas[0]) : -1; // Obtener el índice del día

      // Crear un nuevo objeto con las modificaciones
      return {
          sala: item.sala,
          hora: horas,
          edificio: item.edificio,
          dia: diaIndex !== -1 ? diasSemana[diaIndex] : null
      };
  });
};

function transformarHoras(input, horarios) {
if (!input.hora || input.hora.length === 0) {
  return []; // Retorna un array vacío si no hay horas
}

const [inicio, fin] = input.hora[0].split('-').map(h => h.trim());

const horaFiltrada = horarios.filter(h => {
  const [hInicio, hFin] = h.split(' - ');
  return hInicio >= inicio && hFin <= fin;
});

// Convertir a lista de listas
const resultado = horaFiltrada.map(h => [h]);
return resultado;
}



function claseSemestre(pan_con_queso, semestre, indice_especialidad, indice_nombre) {
  return pan_con_queso
      .filter(clase => clase[indice_especialidad] == semestre) // Filtra por semestre
      .map(clase => clase[indice_nombre]); // Mapea a los nombres
}







