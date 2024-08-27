class Attack:
    def __init__(self, name, type_attack, objetive, damage, precision, recharge):

        self.name= name 
        self.type_attack= type_attack
        self.objetive= objetive
        self.damage= damage
        self.precision= precision
        self.recharge= recharge
        self.conteo= 0

    def get_name(self):
        return self.name

    def get_type_attack(self):
        return self.type_attack
    
    def get_objetive(self):
        return self.objetive
    
    def get_damage(self):
        return self.damage
    
    def get_precision(self):
        return self.precision
    
    def get_recharge(self):
        return self.recharge
    
    def incrementar_conteo(self):
        self.conteo +=1

    def get_conteo(self): 
        return self.conteo
    

    

    