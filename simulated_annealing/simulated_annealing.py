import math
from multiprocessing import Queue
import random
from threading import Event
from simulated_annealing.config import Config
from simulated_annealing.state import State

def geometric_cooling(current_temp, cooling_factor):
    return cooling_factor * current_temp

def logarithmic_cooling(initial_temp, cooling_factor, iteration):
    return initial_temp/(1 + (cooling_factor * math.log(1+iteration)))

def calc_current_temp(is_log_cooling, initial_temp, current_temp, cooling_factor, iteration):
        if is_log_cooling:
            current_temp = logarithmic_cooling(initial_temp,cooling_factor,iteration)
        else: 
            current_temp = geometric_cooling(current_temp,cooling_factor)
        return current_temp

# This version of simulated_annealing algorithm is implemented according to 
# the pseudo code mentioned in "Search And Planing" lectures notes and slides
def simulated_annealing(initial_state:State, queue: Queue, terminate_event: Event, config: Config = Config()):
    current_temp = config.initial_temperature
    best_state = current_state = initial_state
    i=0
    while i < config.max_iteration and current_temp > 0 and not terminate_event.is_set():
        current_temp = calc_current_temp(
            config.is_log_cooling,
            config.initial_temperature,
            current_temp,
            config.cooling_factor,
            i
        )
        next_state = current_state.random_successor()
        delta = next_state - current_state
        if delta > 0:
            current_state = next_state
            if current_state - best_state > 0:
                best_state = current_state
        elif current_temp > 0 and math.exp(delta / current_temp) > random.random():
            current_state = next_state
        queue.put((i,1, best_state, current_state,current_temp))
        i+=1
    queue.put((i,-1, best_state, current_state,current_temp))
    return best_state
