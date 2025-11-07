

import math
import random
from simulated_annealing.state import State

def geometric_cooling(current_temp):
    return 0.9 * current_temp

def simulated_annealing(initial_state:State, iter_max:int, initial_temp:int):
    current_temp = initial_temp
    best = current_state = initial_state
    i=0
    while i<iter_max:
        current_temp = geometric_cooling(current_temp)
        next_state = current_state.random_successor()
        delta=next_state-current_state
        if delta > 0:
            current_state=next_state
            if current_state-best > 0: best = current_state
        elif math.exp(-delta/current_temp) > random.random():
            current_state=next_state
        i+=1
    return best
