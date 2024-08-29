import robots
import attack
import json
import random

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
        
        if (self.results[ganadores[0]+" vs "+ganadores[1]] == ganadores[0]) or (self.results[ganadores[1]+" vs "+ganadores[0]] == ganadores[0]):
            return (max_victorias, ganadores[0])
        else:
            return (max_victorias, ganadores[1])
        



        


        

    def fight(self, r1, r2):
        print(f"Empieza la pelea entre {r1.get_name()} y {r2.get_name()}")
        r_current = r1

        r1.restart_stats()
        r2.restart_stats()

        while r1.get_energy() > 0 and r2.get_energy() > 0:

            list_temp = []

            for t, valor in self.cooldown.items():
                valor -= 1
                if valor <= 0:
                    list_temp.append(t)
                else:
                    self.cooldown[t] = valor
            
            for i in list_temp:
                del self.cooldown[i]
            print(self.cooldown)

            ataque = r_current.random_attack()

            while ataque.get_name() in self.cooldown:
                print(f"El ataque {ataque.get_name()} no está disponible por {self.cooldown[ataque.get_name()]} turnos")
                ataque = r_current.random_attack()
                if ataque not in self.cooldown:
                    break


            print(f"Energía de {r1.get_name()} = {round(r1.get_energy(), 2)}")
            print(f"Energía de {r2.get_name()} = {round(r2.get_energy(), 2)}\n")

            
            if random.random() < (ataque.precision)/100:
                print(f"{r_current.get_name()} usa {ataque.get_name()}")
                print(f"Ha causado {ataque.get_damage()} de daño\n")

                if ataque.get_recharge != 0:
                    self.cooldown[ataque.get_name()] = 2*(ataque.get_recharge())+1

                if r_current == r1:
                    r2.reduce_energy(ataque.get_damage())
                    r_current = r2
                else:
                    r1.reduce_energy(ataque.get_damage())
                    r_current = r1
            else:
                print(f"¡Oh no, el ataque de {r_current.get_name()} ha fallado!")

                if r_current == r1:
                    r_current = r2
                else:
                    r_current == r1


    
        if r1.get_energy() == 0 and r2.get_energy() == 0:
            print(f"Hubo un empate entre {r1.get_name()} y {r2.get_name()}\n")
            self.record[r1.get_name()]['Draw'] += 1
            self.record[r2.get_name()]['Draw'] += 1
            
        elif r1.get_energy() > 0:
            print(f'{r1.get_name()} gana la batalla\n')
            self.record[r1.get_name()]['Won'] += 1
            self.record[r2.get_name()]['Lost'] += 1
            self.results[r1.get_name()+" vs "+r2.get_name()] = r1.get_name()
            r1.restart_stats()
            r2.restart_stats()
            r_current.restart_stats()
        else: 
            print(f'{r2.get_name()} gana la batalla\n')
            self.record[r2.get_name()]['Won'] += 1
            self.record[r1.get_name()]['Lost'] += 1
            self.results[r1.get_name()+" vs "+r2.get_name()] = r2.get_name()
            r1.restart_stats()
            r2.restart_stats()
            r_current.restart_stats()
        
    
                         

        
        r1.restart_stats()
        r2.restart_stats()




               
                

                    



                
