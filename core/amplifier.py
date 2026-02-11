# core/amplifier.py
import numpy as np
from typing import Dict

class ConsciousnessAmplifier:
    """
    Amplifies specific aspects of consciousness for stronger reality effects.
    """

    def __init__(self, amplification_factors: Dict[str, float] = None):
        self.amplification_factors = amplification_factors or {
            'focus': 1.5,
            'creativity': 2.0,
            'compassion': 3.0,
            'insight': 2.5,
            'will': 1.8
        }

    def amplify_consciousness(self,
                            eeg_data: np.ndarray,
                            target_aspect: str,
                            amplification_level: float = 1.0) -> Dict:
        """Amplify specific aspect of consciousness."""
        aspect_strength = 0.7 # Simulated extraction
        factor = self.amplification_factors.get(target_aspect, 1.0)

        return {
            'aspect': target_aspect,
            'original_strength': aspect_strength,
            'amplified_strength': aspect_strength * factor * amplification_level,
            'geometric_pattern': np.random.rand(16, 16),
            'projection_potential': 0.88,
            'safety_level': 0.95
        }

    def is_active(self):
        return True
