from Liga import liga
import reportes

t = liga()
t.load_robots('robots01.json')
t.start()

reportes.generar_reporte_victorias_derrotas(t.record)
reportes.generar_grafico_ataques(t.robots)