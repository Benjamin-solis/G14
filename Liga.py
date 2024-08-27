import robots
import attack
import json
import reportes 

class liga:
    def __init__(self):
        self.robots = []
        self.record = {}

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
                self.record[ra['name']] = {'Won' : 0, 'Lost' : 0, 'Draw': 0}

    def start(self):
        for i in range(len(self.robots)):
            robot_1 = self.robots[i]
            for j in range(i+1, len(self.robots)):
                robot_2 = self.robots[j]
                self.fight(robot_1, robot_2)

    def fight(self, r1, r2):
        print(f"Empieza la pelea entre {r1.get_name()} y {r2.get_name()}")
        r_current = r1
        while r1.get_energy() >0 and r2.get_energy() > 0:
            ataque = r_current.random_attack()

            print(f"Energía de {r1.get_name()} = {round(r1.get_energy(),2)}")
            print(f"Energía de {r2.get_name()} = {round(r2.get_energy(),2)}\n")

            print(f"{r_current.get_name()} usa {ataque.get_name()}")

            if r_current == r1:
                r2.reduce_energy(ataque.get_damage())
                r_current = r2
            else: 
                r1.reduce_energy(ataque.get_damage())
                r_current = r1
        
        if r1.get_energy() == 0 and r2.get_energy() == 0:
            print(f"Hubo un empate entre {r1.get_name()} y {r2.get_name()}\n")
            self.record[r1.get_name()]['Draw'] += 1
            self.record[r2.get_name()]['Draw'] += 1
            r1.restart_stats()
            r2.restart_stats()
            r_current.restart_stats()
        elif r1.get_energy() > 0 and r2.get_energy() == 0:
            print(f'{r1.get_name()} gana la batalla\n')
            self.record[r1.get_name()]['Won'] += 1
            self.record[r2.get_name()]['Lost'] += 1
            r1.restart_stats()
            r2.restart_stats()
            r_current.restart_stats()
        else: 
            print(f'{r2.get_name()} gana la batalla\n')
            self.record[r2.get_name()]['Won'] += 1
            self.record[r1.get_name()]['Lost'] += 1
            r1.restart_stats()
            r2.restart_stats()
            r_current.restart_stats()
    
                         


               
                

                    



                
