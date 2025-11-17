import random
from problem_representation.bag_state import BagState
from problem_representation.item import Item
from problem_representation.bag import Bag
from simulated_annealing.config import Config
from simulated_annealing.simulated_annealing import simulated_annealing


#generate a random initial solution
def fill_bag_randomly(bag:Bag, availableItems:list[Item]):
  shuffled_items = list(availableItems)
  random.shuffle(shuffled_items)
  for item in shuffled_items:    
    if bag.get_weight() + item.weight <= bag.capacity:
      bag.add_item(item)


def runSA(user_config, message_queue, terminate_event):
    print("Searching process started")
    config = Config(
        max_iteration=int(user_config['max_iteration']),
        initial_temperature=int(user_config['initial_temperature']),
        cooling_factor=float(user_config['cooling_factor']),
        is_log_cooling=bool(user_config['is_log_cooling'])
    )
    allItems = []
    for item in user_config['items']:
        allItems.append(Item(item['label'],int(item['weight']),int(item['value'])))
    bag = Bag(capacity=int(user_config['capacity']))
    fill_bag_randomly(bag, allItems)
    bagState = BagState(bag, allItems)
    best=simulated_annealing(bagState,queue=message_queue,terminate_event=terminate_event,config=config)
    print(best)