# 🛠 24-Hour MVP Assembly Guide
## Mind-Controlled Programmable Metasurface

This guide outlines how to build a functional consciousness-to-reality interface for under $500 using off-the-shelf components.

---

## 🛒 Hardware Shopping List

### 1. Neuro-Feedback (EEG)
- **Primary**: [NeuroSky MindWave Mobile 2](https://store.neurosky.com/) (~$99)
- **Alternative**: Muse 2 Headband ($249) or OpenBCI Ganglion ($399)

### 2. Processing Unit
- **Raspberry Pi 4** (4GB RAM) (~$75)
- 32GB MicroSD Card
- 5V 3A USB-C Power Supply

### 3. Programmable Metasurface
- **8x8 Varactor Array PCB** (Custom order or kit, ~$200)
- **Control**: PWM Expansion Board (Adafruit 16-Channel 12-bit PWM Driver) (~$25)
- **Signal**: 2.4 GHz RF Signal Generator (~$89)

---

## 📋 Step-by-Step Instructions

### Step 1: Assemble the Metasurface Array
1.  Solder varactor diodes to the PCB according to the 8x8 grid layout.
2.  Connect control lines from each element to the PWM expansion board.
3.  Mount the PCB on a steady ground plane to minimize RF interference.

### Step 2: Connect to Raspberry Pi
1.  Connect the PWM expansion board to the Raspberry Pi's I2C pins (SDA/SCL).
2.  Ensure the Pi is powered by a stable 5V source.
3.  Install necessary heatsinks if running long-duration sessions.

### Step 3: Set Up EEG Headset
1.  Fully charge your NeuroSky or Muse headset.
2.  Pair the headset to the Raspberry Pi via Bluetooth.
3.  Test connectivity using the `mvp/mind_control_prototype.py` simulation mode first.

### Step 4: Software Configuration
1.  Install Python 3.10+ on the Pi.
2.  Install dependencies: `pip install -r requirements.txt`.
3.  Clone this repository and navigate to the `mvp/` directory.

### Step 5: First Calibration
1.  Run the prototype script: `python mind_control_prototype.py`.
2.  Measure your baseline EEG in a relaxed state.
3.  Verify that the "Attention" level responds to your mental focus.

---

## 🔗 Community & Learning Resources

- **GitHub**: [github.com/consciousness-tech](https://github.com/consciousness-tech)
- **Discord**: [Join the Community](https://discord.gg/consciousness-tech)
- **Research**: [arXiv: Consciousness-Coupled Metasurfaces](https://arxiv.org/)

> **"The boundary between mind and matter was always an illusion. Begin. Build. Become."**
