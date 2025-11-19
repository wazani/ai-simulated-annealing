import math
from problem_representation.bag import Bag
from problem_representation.item import Item
from simulated_annealing.state import State
import random


class BagState(State):
    allItems: list[Item] = []

    def __init__(self, bag: Bag):
        super().__init__()
        self.bag: Bag = bag

    @classmethod
    def set_all_items(cls, all_items: list[Item]):
        cls.allItems = all_items
        random.shuffle(cls.allItems)

    def get_successor(self, is_objective: bool = False):
        if is_objective:
            return self.objective_successor()
        else:
            return self.random_successor()

    def random_successor(self) -> "BagState":
        remaining_capacity = self.bag.capacity - self.bag.get_weight()
        possible_items = [
            ("in", item)
            for item in BagState.allItems
            if item.weight <= remaining_capacity and item not in self.bag.items
        ]
        existing_items = [("out", item) for item in self.bag.items]
        available_items = possible_items + existing_items
        random.shuffle(available_items)
        selectedItem = random.choice(available_items)

        new_bag: Bag = Bag.copy(self.bag)
        if selectedItem[0] == "in":
            new_bag.add_item(selectedItem[1])
        else:
            new_bag.remove_item(selectedItem[1])

        return BagState(new_bag)

    def objective_successor(self) -> "BagState":
        remaining_capacity = self.bag.capacity - self.bag.get_weight()
        probability_to_add = remaining_capacity / self.bag.capacity
        new_bag: Bag = Bag.copy(self.bag)

        selected_sample = None
        if random.random() <= probability_to_add:
            sample: list[Item] = self.get_samples_of_items(BagState.allItems)
            while len(sample) > 0:
                selected_sample = max(sample, key=lambda item: item.sigma)
                if (
                    selected_sample.weight > remaining_capacity
                    or selected_sample in self.bag.items
                ):
                    sample.remove(selected_sample)
                    selected_sample = None
                else:
                    new_bag.add_item(selected_sample)
                    break

        if selected_sample == None and len(self.bag.items) > 0:
            sample: list[Item] = self.get_samples_of_items(self.bag.items)
            selected_sample = min(sample, key=lambda item: item.sigma)
            new_bag.remove_item(selected_sample)

        return BagState(new_bag)

    def get_samples_of_items(self, items: list[Item]):
        if len(items) > 1000:
            return random.sample(items, 1000)
        else:
            return random.sample(items, math.ceil(len(items) / 4))

    def __sub__(self, other: "BagState") -> int:
        return self.bag.get_value() - other.bag.get_value()

    def __repr__(self) -> str:
        return repr(self.bag)
