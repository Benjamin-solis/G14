import random

class Robots:
    def __init__(self, name, energy):
        self.name = name
        self.energy = energy
        self.attacks = []
        
    def get_name(self):
        return self.name
    
    def get_energy(self):
        return self.energy
    
    def add_attack(self, attack):
        self.attacks.append(attack)
    
    def random_move(self):
        return random.choice(self.attacks)
    
robot = Robots("timmy", 100)
print(robot.get_name())
print(robot.get_energy())