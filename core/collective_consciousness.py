# core/collective_consciousness.py
import numpy as np
from typing import Dict, List
from .neuro_metasurface_controller import ProgrammableMetasurface

class CollectiveConsciousnessController:
    """
    Multiple users jointly control metasurface through shared attention.
    """

    def __init__(self, n_users: int = 3):
        self.n_users = n_users
        self.users = []
        self.collective_attention_history = np.zeros(100)

    def add_user(self, user_id: str):
        """Add a new user to the collective."""
        self.users.append({
            'id': user_id,
            'attention': 50.0,
            'coherence': 1.0
        })

    def calculate_collective_attention(self) -> Dict:
        """
        Compute collective attention metrics.
        """
        if not self.users:
            return {'collective_attention': 50.0, 'coherence': 0.0}

        attentions = [u['attention'] for u in self.users]
        mean_attention = np.mean(attentions)

        # Simulated coherence
        coherence = 0.85

        return {
            'collective_attention': float(mean_attention),
            'coherence': coherence,
            'user_count': len(self.users)
        }

    def control_metasurface_collectively(self, metasurface: ProgrammableMetasurface):
        """
        Control metasurface based on collective consciousness state.
        """
        state = self.calculate_collective_attention()

        if state['coherence'] > 0.7:
            metasurface.generate_vortex_beam(
                topological_charge=int(state['collective_attention'] / 20),
                radius=state['coherence'] * 2
            )

        return state
