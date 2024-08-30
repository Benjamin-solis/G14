import robots
import attack
import json
import random
import math

class liga:
    def __init__(self):
        self.robots = []
        self.record = {}
        self.cooldown = {}
        self.results = {}

    def load_robots(self, filename):
        with open(filename, 'r', encoding='utf-8') as t:
            data = json.load(t)
            for ra in data['robots']:
                robot = robots.Robots(ra['name'], ra['energy'])
                for x in ra['attacks']:
                    ataque = attack.Attack(x['name'],
                                    x['type'],
                                    x['objective'],
                                    x['damage'],
                                    x['precision'],
                                    x['recharge'])
                    robot.add_attack(ataque)
                self.robots.append(robot)
                self.record[ra['name']] = {'Won': 0, 'Lost': 0, 'Draw': 0}

    def start(self):
        for i in range(len(self.robots)):
            robot_1 = self.robots[i]
            for j in range(i + 1, len(self.robots)):
                robot_2 = self.robots[j]
                self.fight(robot_1, robot_2)

    def ganador(self):
        max_victorias = -1
        ganadores = []
        for robot, victory in self.record.items():
            if victory['Won'] > max_victorias:
                max_victorias = victory['Won']
                ganadores = [robot]
            elif victory['Won'] == max_victorias:
                ganadores.append(robot)

        if len(ganadores) == 1:
            return (max_victorias, ganadores[0])
        
        if (self.results.get(ganadores[0] + " vs " + ganadores[1]) == ganadores[0]) or (self.results.get(ganadores[1] + " vs " + ganadores[0]) == ganadores[0]):
            return (max_victorias, ganadores[0])
        else:
            return (max_victorias, ganadores[1])

        



        


        

    def fight(self, r1, r2):
        print(f"Empieza la pelea entre {r1.get_name()} y {r2.get_name()}\n")
        r_current = r1

        r1.restart_stats()
        r2.restart_stats()

        while r1.get_energy() > 0 and r2.get_energy() > 0:

            list_temp = []

            r=0

            for t, valor in self.cooldown.items():
                valor -= 1
                if valor <= 0:
                    list_temp.append(t)
                else:
                    self.cooldown[t] = valor
            
            for i in list_temp:
                del self.cooldown[i]

            ataque = r_current.random_attack()

            print(f"Energía de {r1.get_name()} = {round(r1.get_energy(), 2)}")
            print(f"Energía de {r2.get_name()} = {round(r2.get_energy(), 2)}\n")

            while ((r < 10) and (r_current.get_name()+ataque.get_name() in self.cooldown)):
                r += 1
                print(f"El ataque {ataque.get_name()} de {r_current.get_name()} no está disponible por {int((self.cooldown[r_current.get_name()+ataque.get_name()])/2 + 1)} turnos\n")
                ataque = r_current.random_attack()
                if r_current.get_name()+ataque.get_name() not in self.cooldown:
                    break
            if r == 10:
                print(f"A {r_current.get_name()} no le quedan ataques disponibles, pierde tu turno")
                if r_current == r1:
                        r2.reduce_energy(ataque.get_damage())
                        r_current = r2
                else:
                    r1.reduce_energy(ataque.get_damage())
                    r_current = r1
            else:
                if random.random() < (ataque.precision)/100:
                    print(f"{r_current.get_name()} usa {ataque.get_name()}")
                    print(f"Ha causado {ataque.get_damage()} de daño\n")

                    if ataque.get_recharge() > 0:
                        self.cooldown[r_current.get_name()+ataque.get_name()] = 2*(ataque.get_recharge())+1

                    if r_current == r1:
                        r2.reduce_energy(ataque.get_damage())
                        r_current = r2
                    else:
                        r1.reduce_energy(ataque.get_damage())
                        r_current = r1
                else:
                    print(f"¡Oh no, el ataque de {r_current.get_name()} ha fallado\n")

                    if r_current == r1:
                        r_current = r2
                    else:
                        r_current = r1


    
        if r1.get_energy() == 0 and r2.get_energy() == 0:
            print(f"Hubo un empate entre {r1.get_name()} y {r2.get_name()}\n")
            self.record[r1.get_name()]['Draw'] += 1
            self.record[r2.get_name()]['Draw'] += 1
            self.cooldown = {}
            
        elif r1.get_energy() > 0:
            print(f'{r1.get_name()} gana la batalla\n')
            self.record[r1.get_name()]['Won'] += 1
            self.record[r2.get_name()]['Lost'] += 1
            self.results[r1.get_name()+" vs "+r2.get_name()] = r1.get_name()
            r1.restart_stats()
            r2.restart_stats()
            r_current.restart_stats()
            self.cooldown = {}
        else: 
            print(f'{r2.get_name()} gana la batalla\n')
            self.record[r2.get_name()]['Won'] += 1
            self.record[r1.get_name()]['Lost'] += 1
            self.results[r1.get_name()+" vs "+r2.get_name()] = r2.get_name()
            r1.restart_stats()
            r2.restart_stats()
            r_current.restart_stats()
            self.cooldown = {}
        
    
                         

        
        r1.restart_stats()
        r2.restart_stats()




               
                

                    



                
