class liga:
    def __init__(self):
        self.robots = []

    def load_robots(self, filename):
        with open(filename, 'r') as t:
            data = json.file(t)
            r_attacks = {}
            for ra in data['robots']:
                #r_attacks[ra['name']] =
                # CONTINUAR 
