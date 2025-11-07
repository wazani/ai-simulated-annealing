from problem_representation.bag import Bag
from problem_representation.item import Item
from simulated_annealing.state import State
import random

class BagState(State):    

    def __init__(self, bag: Bag, allItems:list[Item]):
       super().__init__()
       self.bag: Bag = bag
       self.allItems: list[Item] = allItems


    def random_successor(self) -> 'BagState':
        remaining_capacity = self.bag.capacity - self.bag.get_weight()
        possible_items = [
            ('in',item) for item in self.allItems 
                if item.weight <= remaining_capacity and item not in self.bag.items
        ]
        existing_items = [('out',item) for item in self.bag.items]
        available_items = possible_items + existing_items
        random.shuffle(available_items)
        selectedItem = random.choice(available_items)

        new_bag = Bag(self.bag.capacity, [] + self.bag.items)
        if selectedItem[0] == 'in':
            new_bag.items.append(selectedItem[1])
        else:
            new_bag.items.remove(selectedItem[1])
        
        return BagState(new_bag, self.allItems)


    def __sub__(self, other: 'BagState') -> int:
         return self.bag.get_value() - other.bag.get_value()
    

    def __repr__(self) -> str:
        return repr(self.bag)
