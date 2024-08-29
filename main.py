from Liga import liga
import reportes

t = liga()
t.load_robots('robots01.json')
t.start()

if input("¿Desea un reporte de las victorias y derrotas de la Liga? SI/NO: ").upper() == "SI":
    reportes.generar_reporte_victorias_derrotas(t.record)

if input("¿Desea un gráfico sobre las estadísticas de los ataques de cada robot? SI/NO: ").upper() == "SI":
    reportes.generar_grafico_ataques(t.robots)

victorias, ganador = t.ganador()
print(f"El ganador de la gran Liga de Robots es {ganador} con {victorias} victorias!")
