import random

class Robots:
    def __init__(self, name, energy):
        self.name = name
        self.energy = energy
        self.original_energy = energy
        self.attacks = []
        
    def get_name(self):
        return self.name
    
    def get_energy(self):
        return self.energy
    
    def add_attack(self, attack):
        self.attacks.append(attack)
    
    def random_attack(self):
        return random.choice(self.attacks)
    
    def restart_stats(self):
        self.energy = self.original_energy

    def reduce_energy(self, amount):
        self.energy -= amount
        if self.energy < 0:
            self.energy = 0

