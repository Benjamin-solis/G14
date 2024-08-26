import robots
import attack
import json

class liga:
    def __init__(self):
        self.robots = []

    def load_robots(self, filename):
        with open(filename, 'r') as t:
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

    def start(self):
        for i in range(len(self.robots)):
            robot_1 = self.robots[i]
            for j in range(i+1, len(self.robots)):
                robot_2 = self.robots[j]
                self.pelea(robot_1, robot_2)

    def pelea(self, r1, r2):
        print(f"Empieza la pelea entre {r1.get_name()} y {r2.get_name()}")
        actualm = r1
        while r1.get_energy() > 0 and r2.get_energy() > 0:
            mov = actualm.random_move()



                
                    
a = liga()
a.load_robots('c:/Users/altad2/Desktop/paradigmas/Tarea1_Paradigmas/robots01.json')
a.start()

               
                

                    



                
