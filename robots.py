import random

# robots.py
class Robots:
    def __init__(self, name, energy):
        self.name = name
        self.energy = energy
        self.original_energy = energy
        self.attacks = []
        self.ataques_usados = {}  # Diccionario para contar ataques

    def get_name(self):
        return self.name

    def get_energy(self):
        return self.energy

    def add_attack(self, attack):
        self.attacks.append(attack)
        self.ataques_usados[attack.get_name()] = 0  # Inicializa el conteo del ataque

    def random_attack(self):
        attack = random.choice(self.attacks)
        attack.incrementar_conteo()  # Incrementa el conteo del ataque en el objeto ataque
        self.ataques_usados[attack.get_name()] += 1  # Actualiza el conteo en el robot
        return attack

    def restart_stats(self):
        self.energy = self.original_energy

    def reduce_energy(self, amount):
        self.energy -= amount
        if self.energy < 0:
            self.energy = 0

    def get_ataques_usados(self):
        return self.ataques_usados
