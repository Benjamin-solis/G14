

class liga:
    def __init__(self):
        self.robots = []

    def load_robots(self, filename):
        with open(filename, 'r') as t:
            data = json.file(t)
            for ra in data['robots']:
                attack = {}
                name = ra['name']
                energy = ra['energy']
                for att in data['attacks']:
                    atts = {}
                    atts['type'] = att['type']
                    atts['objetive'] = att['objetive']
                    atts['damage'] = att['damage']
                    atts['precision'] = att['precision']
                    atts['recharge'] = att['recharge']
                    attack[att['name']] = atts

                
                

                    



                
