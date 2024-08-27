
import csv
import matplotlib.pyplot as plt

def generar_reporte_victorias_derrotas(record):
    with open('reporte_victorias_derrotas.csv', mode='w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(['Robot', 'Victorias', 'Derrotas', 'Empates'])
        for robot_name, stats in record.items():
            writer.writerow([robot_name, stats['Won'], stats['Lost'], stats['Draw']])

def generar_grafico_ataques(robots):
    for robot in robots:
        ataques = robot.get_ataques_usados()
        if ataques:
            ataques_nombres = list(ataques.keys())
            ataques_cantidad = list(ataques.values())

            plt.figure(figsize=(10, 6))
            plt.bar(ataques_nombres, ataques_cantidad, color='blue')
            plt.xlabel('Ataques')
            plt.ylabel('Cantidad de veces usado')
            plt.title(f'Cantidad de ataques usados por {robot.get_name()}')
            plt.xticks(rotation=45)
            plt.tight_layout()

            plt.savefig(f'grafico_ataques_{robot.get_name()}.png')
            plt.close()
        else:
            print(f"No hay ataques usados registrados para el robot {robot.get_name()}.")
