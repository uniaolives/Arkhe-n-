# core/unified_ai.py
import torch
import torch.nn as nn
from typing import Dict, List

class UnifiedAI(nn.Module):
    """
    Unified AI Engine based on constraint satisfaction and hexagonal coherence.
    """

    def __init__(self,
                 state_dim: int = 64,
                 constraint_dim: int = 32,
                 arkhe_rank: int = 6):
        super().__init__()

        self.state_dim = state_dim
        self.constraint_dim = constraint_dim
        self.arkhe_rank = arkhe_rank

        # Módulo 1: Cognitive Light Cone Encoder
        self.light_cone_encoder = nn.Sequential(
            nn.Linear(state_dim, 128),
            nn.ReLU(),
            nn.Linear(128, constraint_dim)
        )

        # Módulo 2: Arkhe Hexagonal Projector
        self.arkhe_projector = nn.Linear(constraint_dim, arkhe_rank)

        # Módulo 3: Constraint Satisfaction Network
        self.constraint_network = nn.ModuleList([
            nn.Linear(arkhe_rank, arkhe_rank)
            for _ in range(6)  # 6 permutations
        ])

        # Módulo 4: Conscious Control Modulator
        self.attention_modulator = nn.Linear(1, arkhe_rank)

        # Módulo 5: Action Generator
        self.action_generator = nn.Sequential(
            nn.Linear(arkhe_rank, 64),
            nn.Tanh(),
            nn.Linear(64, state_dim)
        )

        self.arkhe_state = torch.zeros(arkhe_rank)

    def forward(self,
                state: torch.Tensor,
                attention: float = 0.5) -> Dict[str, torch.Tensor]:
        # Encode state to constraints
        constraints = self.light_cone_encoder(state)

        # Project to Arkhe space
        arkhe = self.arkhe_projector(constraints)

        # Calculate constraint satisfaction
        constraint_satisfactions = []
        for perm_network in self.constraint_network:
            satisfaction = torch.sigmoid(perm_network(arkhe))
            constraint_satisfactions.append(satisfaction)

        all_satisfactions = torch.stack(constraint_satisfactions, dim=0)

        # Modulate by attention
        attention_tensor = torch.tensor([attention], dtype=torch.float32)
        attention_modulation = torch.sigmoid(self.attention_modulator(attention_tensor))
        modulated_arkhe = arkhe * attention_modulation

        # Update internal state
        self.arkhe_state = 0.9 * self.arkhe_state + 0.1 * modulated_arkhe.detach()

        # Generate action
        action = self.action_generator(modulated_arkhe)

        return {
            'action': action,
            'arkhe_state': modulated_arkhe,
            'constraint_satisfactions': all_satisfactions,
            'intelligence_estimate': torch.mean(all_satisfactions) * attention
        }
