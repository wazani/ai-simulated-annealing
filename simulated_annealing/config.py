class Config:
    """
    This class represents the options or the configurations that the user of 
    simulated_annealing function can pass to tune the operation of the algorithm
    """
    
    def __init__(self, max_iteration:int=200, initial_temperature:int=1000, cooling_factor:float=0.9):        
        self.max_iteration: str = max_iteration
        self.initial_temperature: int = initial_temperature
        self.cooling_factor: int = cooling_factor
        
    def __repr__(self):
        return f"""Selected Configs(
          max iteration: {self.max_iteration},
          initial temperature: {self.initial_temperature},
          cooling factor: {self.cooling_factor}
        )"""