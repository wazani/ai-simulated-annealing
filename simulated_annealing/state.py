from abc import ABC, abstractmethod
from typing import Any, Tuple
from simulated_annealing.config import Config


class State(ABC):
    """
    An Abstract Class defining the interface for a state.
    it contains the requirements for a state to be interactable with the simulated annealing algorithm
    """

    @abstractmethod
    def get_successor(self, is_objective: bool = False) -> "State":
        """
        generate a random/objective neighbor state.
        """
        pass

    @abstractmethod
    def __sub__(self, other: "State") -> Tuple[Any, Any]:
        """
        Override the minus operator so it return the difference two states values.
        so we can perform an operation like current_state - next_state and get the evaluation value
        on which state is better
        """
        pass
