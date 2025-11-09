

import math
import random
from simulated_annealing.config import Config
from simulated_annealing.state import State

def geometric_cooling(current_temp, cooling_factor):
    return cooling_factor * current_temp

def simulated_annealing(initial_state:State, config: Config = Config()):
    #print(config)
    current_temp = config.initial_temperature
    best_state = current_state = initial_state
    i=0
    while i<config.max_iteration or current_temp>10:
        current_temp = geometric_cooling(current_temp,config.cooling_factor)
        next_state = current_state.random_successor()
        delta = next_state - current_state
        if delta > 0:
            current_state = next_state
            if current_state - best_state > 0: 
                #print("****************************************************",current_state - best_state)
                best_state = current_state
        elif math.exp(delta / current_temp) > random.random():
            current_state = next_state
        i+=1
    return best_state
