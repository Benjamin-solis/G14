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
                print(robot.get_name())
                
                    
a = liga()
a.load_robots('c:/Users/altad2/Desktop/paradigmas/Tarea1_Paradigmas/robots01.json')
               
                

                    



                
