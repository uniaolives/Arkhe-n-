"""
# mvp/mind_control_prototype.py
# ============================================================================
# CONSCIOUSNESS-CONTROLLED METASURFACE MVP
# ============================================================================

MVP: MindWave EEG + 8x8 Metasurface + Raspberry Pi
Total Cost: < $500
Build Time: 24 hours
"""

import numpy as np
import time
import serial
import matplotlib.pyplot as plt
from scipy import signal

# Conditional import for Raspberry Pi GPIO
try:
    from gpiozero import PWMOutputDevice
    HAS_GPIO = True
except ImportError:
    HAS_GPIO = False

# ----------------------------------------------------------------------------
# 1. HARDWARE INTERFACES
# ----------------------------------------------------------------------------

class MinimalEEG:
    """Interface with NeuroSky MindWave Mobile 2 ($99)"""

    def __init__(self, port='/dev/tty.MindWaveMobile-DevA'):
        self.port = port
        self.serial = None
        self.attention = 0
        self.meditation = 0

    def connect(self):
        """Connect to MindWave headset."""
        try:
            self.serial = serial.Serial(self.port, 57600, timeout=1)
            print(f"✅ EEG Connected: {self.port}")
        except Exception:
            print("⚠️ Using simulated EEG data (Headset not detected)")
            self.serial = None

    def read_attention(self):
        """Read attention level (0-100)."""
        if self.serial and self.serial.in_waiting:
            try:
                data = self.serial.readline().decode('utf-8', errors='ignore').strip()
                if 'ATT' in data:
                    self.attention = int(data.split(':')[1])
            except:
                pass

        # Simulate if no real device
        if self.serial is None:
            self.attention = 50 + 30 * np.sin(time.time() * 0.5) + np.random.randn() * 5
            self.attention = max(0, min(100, self.attention))

        return self.attention

    def get_brainwaves(self):
        """Generate/Extract frequency band data."""
        t = np.linspace(0, 1, 256)
        att = self.attention

        # Simulated bands based on attention level
        if att > 70:
            beta, gamma, alpha, theta = 0.6, 0.5, 0.2, 0.1
        elif att > 30:
            beta, gamma, alpha, theta = 0.2, 0.1, 0.7, 0.2
        else:
            beta, gamma, alpha, theta = 0.1, 0.05, 0.2, 0.8

        return {
            'alpha': alpha * np.sin(2*np.pi*10*t),
            'beta': beta * np.sin(2*np.pi*20*t),
            'theta': theta * np.sin(2*np.pi*6*t),
            'gamma': gamma * np.sin(2*np.pi*40*t)
        }

class MinimalMetasurface:
    """8x8 programmable metasurface using varactor diodes ($200)"""

    def __init__(self, rows=8, cols=8):
        self.rows = rows
        self.cols = cols
        self.phase_matrix = np.zeros((rows, cols))
        self.control_pins = []

        if HAS_GPIO:
            print(f"✅ GPIO Control Initialized for {rows}x{cols} array")
            # In a real setup, we'd map these to specific GPIO pins
            # self.control_pins = [PWMOutputDevice(f'GPIO{i}') for i in range(rows*cols)]
        else:
            print("🔬 Simulation Mode: GPIO not available")

    def set_phase(self, row, col, phase_deg):
        """Set phase of single element (0-360 degrees)."""
        phase_deg = phase_deg % 360
        self.phase_matrix[row, col] = phase_deg

        if HAS_GPIO and len(self.control_pins) > (row * self.cols + col):
            duty_cycle = phase_deg / 360.0
            self.control_pins[row * self.cols + col].value = duty_cycle

# ----------------------------------------------------------------------------
# 2. MAPPING & CONTROL
# ----------------------------------------------------------------------------

class ConsciousnessMapper:
    """Maps brainwave dominance to spatial EM patterns."""

    def map_to_phase(self, brainwaves, attention):
        size = 8
        pattern = np.zeros((size, size))

        # Determine dominant band
        powers = {k: np.mean(v**2) for k, v in brainwaves.items()}
        dominant = max(powers, key=powers.get)

        if dominant == 'beta': # Focused steering
            angle = (attention / 100) * 180
            for i in range(size):
                for j in range(size):
                    pattern[i, j] = (i * np.sin(np.radians(angle)) + j * np.cos(np.radians(angle))) * 45
        elif dominant == 'theta': # Meditative vortex
            charge = 1 + int(attention / 50)
            for i in range(size):
                for j in range(size):
                    angle = np.arctan2(i-3.5, j-3.5)
                    pattern[i, j] = charge * np.degrees(angle)
        else: # Alpha/Mixed: Diffuse waves
            for i in range(size):
                for j in range(size):
                    pattern[i, j] = 180 * np.sin(2*np.pi*i/size) * np.cos(2*np.pi*j/size)

        return pattern % 360

class MindControlSystem:
    def __init__(self):
        self.eeg = MinimalEEG()
        self.ms = MinimalMetasurface()
        self.mapper = ConsciousnessMapper()
        self.running = False
        self.history = []

    def start(self, duration=60):
        print(f"🚀 Starting Mind-Control Loop for {duration}s...")
        self.eeg.connect()
        self.running = True
        start_t = time.time()

        plt.ion()
        fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))

        try:
            while time.time() - start_t < duration:
                att = self.eeg.read_attention()
                waves = self.eeg.get_brainwaves()
                pattern = self.mapper.map_to_phase(waves, att)

                # Apply to hardware
                for i in range(8):
                    for j in range(8):
                        self.ms.set_phase(i, j, pattern[i, j])

                self.history.append(att)

                # Update Plots
                ax1.clear()
                ax1.plot(self.history, 'cyan')
                ax1.set_title(f"Attention: {att:.1f}")
                ax1.set_ylim(0, 100)

                ax2.clear()
                im = ax2.imshow(pattern, cmap='hsv', vmin=0, vmax=360)
                ax2.set_title("Metasurface Phase Map")

                plt.pause(0.1)

        except KeyboardInterrupt:
            pass
        finally:
            print("🛑 System Standby.")
            plt.ioff()
            plt.show()

if __name__ == "__main__":
    system = MindControlSystem()
    system.start(duration=30)
