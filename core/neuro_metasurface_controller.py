# core/neuro_metasurface_controller.py
"""
Brainwave-Controlled Programmable Metasurfaces via Bluetooth EEG.

[BREAKTHROUGH]: Direct consciousness control of electromagnetic fields
                through attention-modulated geometric encoding.
[NÓS]: Attention intensity → Arkhe coefficients → Metasurface phase profile.
"""

import numpy as np
from dataclasses import dataclass
from typing import List, Dict, Tuple, Optional
from enum import Enum
import time
import threading
from queue import Queue
from scipy import signal
from scipy.fft import fft, fftfreq

class BrainwaveBand(Enum):
    """Bandas de frequência cerebral."""
    DELTA = 1      # 0.5-4 Hz (deep sleep)
    THETA = 2      # 4-8 Hz (meditation, creativity)
    ALPHA = 3      # 8-13 Hz (relaxed alertness)
    BETA = 4       # 13-30 Hz (active thinking, focus)
    GAMMA = 5      # 30-100 Hz (peak concentration)


@dataclass
class EEGSample:
    """Amostra de EEG com timestamp."""
    timestamp: float
    channels: np.ndarray  # [n_channels] microvolts
    sample_rate: float    # Hz

    @property
    def norm(self) -> float:
        """Norma do vetor de canais."""
        return np.linalg.norm(self.channels)

    def band_power(self, band: BrainwaveBand) -> float:
        """Calcula potência em banda específica."""
        # Frequências da banda
        band_ranges = {
            BrainwaveBand.DELTA: (0.5, 4),
            BrainwaveBand.THETA: (4, 8),
            BrainwaveBand.ALPHA: (8, 13),
            BrainwaveBand.BETA: (13, 30),
            BrainwaveBand.GAMMA: (30, 100)
        }

        low, high = band_ranges[band]

        # Calcula FFT para cada canal e soma potências
        total_power = 0.0

        for channel_data in self.channels:
            # Para simplicidade, usa canal único
            n = len(channel_data) if hasattr(channel_data, '__len__') else 1

            if n > 1:
                # FFT
                fft_vals = fft(channel_data)
                freqs = fftfreq(n, 1/self.sample_rate)

                # Índices na banda
                idx = np.where((freqs >= low) & (freqs <= high))[0]
                band_power = np.sum(np.abs(fft_vals[idx])**2)
            else:
                # Valor único
                band_power = abs(channel_data)**2

            total_power += band_power

        return total_power


class AttentionExtractor:
    """
    Extrai intensidade de atenção de sinais de EEG.

    Baseado em:
    1. Razão Beta/Alpha (focus vs relaxation)
    2. Coerência inter-hemisférica
    3. Variabilidade de alta frequência (Gamma)
    """

    def __init__(self,
                 sample_rate: float = 256.0,  # Hz
                 buffer_seconds: float = 2.0):
        self.sample_rate = sample_rate
        self.buffer_size = int(sample_rate * buffer_seconds)

        # Buffer circular
        self.eeg_buffer = []
        self.attention_history = []

        # Parâmetros
        self.baseline_alpha = None
        self.baseline_beta = None

        # Filtros
        self._setup_filters()

    def _setup_filters(self):
        """Configura filtros IIR para bandas cerebrais."""
        # Filtro passa-banda para Alpha (8-13 Hz)
        self.alpha_b, self.alpha_a = signal.butter(
            4, [8, 13], btype='band', fs=self.sample_rate
        )

        # Filtro passa-banda para Beta (13-30 Hz)
        self.beta_b, self.beta_a = signal.butter(
            4, [13, 30], btype='band', fs=self.sample_rate
        )

        # Filtro passa-banda para Gamma (30-45 Hz)
        self.gamma_b, self.gamma_a = signal.butter(
            4, [30, 45], btype='band', fs=self.sample_rate
        )

    def update(self, eeg_sample: EEGSample) -> float:
        """
        Atualiza com nova amostra de EEG, retorna atenção (0-100).
        """
        # Adiciona ao buffer
        self.eeg_buffer.append(eeg_sample)

        # Mantém tamanho do buffer
        if len(self.eeg_buffer) > self.buffer_size:
            self.eeg_buffer.pop(0)

        # Precisa de buffer mínimo para análise
        if len(self.eeg_buffer) < int(self.sample_rate * 0.5):  # 0.5 segundos
            return 50.0  # Valor neutro

        # Extrai dados dos últimos N amostras
        recent_samples = self.eeg_buffer[-int(self.sample_rate * 1.0):]  # 1 segundo

        # Concatena dados de todos os canais
        all_data = np.concatenate([s.channels for s in recent_samples])

        # Calcula potências nas bandas
        alpha_power = self._band_power(all_data, self.alpha_b, self.alpha_a)
        beta_power = self._band_power(all_data, self.beta_b, self.beta_a)
        gamma_power = self._band_power(all_data, self.gamma_b, self.gamma_a)

        # Atualiza baselines (médias móveis)
        if self.baseline_alpha is None:
            self.baseline_alpha = alpha_power
            self.baseline_beta = beta_power
        else:
            self.baseline_alpha = 0.9 * self.baseline_alpha + 0.1 * alpha_power
            self.baseline_beta = 0.9 * self.baseline_beta + 0.1 * beta_power

        # Razão Beta/Alpha (indicador de atenção)
        if self.baseline_alpha > 0:
            beta_alpha_ratio = beta_power / self.baseline_alpha
        else:
            beta_alpha_ratio = 1.0

        # Normaliza Gamma (concentração pico)
        gamma_norm = gamma_power / (alpha_power + beta_power + 1e-10)

        # Combina métricas
        attention = (
            0.6 * np.tanh(beta_alpha_ratio - 1.0) +  # Beta/Alpha ratio
            0.3 * np.tanh(gamma_norm * 10) +         # Gamma component
            0.1 * self._coherence_metric(recent_samples)  # Inter-hemispheric coherence
        )

        # Normaliza para 0-100
        attention = 50 * (attention + 1)  # Mapeia de [-1, 1] para [0, 100]
        attention = np.clip(attention, 0, 100)

        # Adiciona ao histórico
        self.attention_history.append(attention)
        if len(self.attention_history) > 100:
            self.attention_history.pop(0)

        return attention

    def _band_power(self, data: np.ndarray, b: np.ndarray, a: np.ndarray) -> float:
        """Calcula potência em banda após filtragem."""
        if len(data) < len(b) * 3:  # Precisa de dados suficientes
            return 0.0

        # Aplica filtro
        filtered = signal.filtfilt(b, a, data)

        # Potência = variância do sinal filtrado
        power = np.var(filtered)

        return power

    def _coherence_metric(self, samples: List[EEGSample]) -> float:
        """
        Calcula coerência inter-hemisférica (simplificada).
        """
        if not samples or len(samples[0].channels) < 2:
            return 0.0

        # Extrai canais "esquerdo" e "direito" (primeiros dois canais)
        left_data = np.array([s.channels[0] for s in samples])
        right_data = np.array([s.channels[1] for s in samples])

        # Correlação cruzada no tempo
        correlation = np.corrcoef(left_data, right_data)[0, 1]

        # Coerência alta = foco, baixa = distração
        return correlation

    def get_attention_trend(self) -> Dict:
        """Retorna tendência da atenção."""
        if len(self.attention_history) < 10:
            return {'trend': 'insufficient_data', 'slope': 0.0}

        recent = self.attention_history[-10:]
        time_points = np.arange(len(recent))

        # Ajuste linear
        coeffs = np.polyfit(time_points, recent, 1)
        slope = coeffs[0]

        if slope > 0.5:
            trend = 'increasing'
        elif slope < -0.5:
            trend = 'decreasing'
        else:
            trend = 'stable'

        return {
            'trend': trend,
            'slope': slope,
            'mean': np.mean(recent),
            'current': recent[-1],
            'stability': 1.0 / (1.0 + np.std(recent))
        }


class MetasurfaceUnitCell:
    """
    Célula unitária de metasuperfície programável.
    """

    def __init__(self,
                 x: float,
                 y: float,
                 max_phase_shift: float = 2*np.pi,
                 max_amplitude: float = 1.0):
        self.position = np.array([x, y])
        self.max_phase_shift = max_phase_shift
        self.max_amplitude = max_amplitude

        # Estado atual
        self.phase_shift = 0.0  # radianos
        self.amplitude = 1.0    # 0-1

        # Memória para transições suaves
        self.target_phase = 0.0
        self.target_amplitude = 1.0
        self.transition_speed = 0.1  # Por frame

    def set_target(self,
                   phase: float,
                   amplitude: float,
                   immediate: bool = False):
        """Define alvo para fase e amplitude."""
        self.target_phase = np.clip(phase, 0, self.max_phase_shift)
        self.target_amplitude = np.clip(amplitude, 0, self.max_amplitude)

        if immediate:
            self.phase_shift = self.target_phase
            self.amplitude = self.target_amplitude

    def update(self):
        """Atualiza para alvo (interpolação suave)."""
        # Interpolação suave
        self.phase_shift += self.transition_speed * (self.target_phase - self.phase_shift)
        self.amplitude += self.transition_speed * (self.target_amplitude - self.amplitude)

        # Limita valores
        self.phase_shift = np.clip(self.phase_shift, 0, self.max_phase_shift)
        self.amplitude = np.clip(self.amplitude, 0, self.max_amplitude)

    def scattering_matrix(self, frequency: float) -> np.ndarray:
        """
        Retorna matriz de espalhamento da célula.
        """
        phase_factor = np.exp(1j * self.phase_shift)

        S = np.array([
            [0, phase_factor],
            [phase_factor, 0]
        ], dtype=complex) * self.amplitude

        return S

    def to_arkhe_coefficients(self) -> Dict[str, float]:
        """
        Mapeia estado da célula para coeficientes Arkhe.
        """
        return {
            'C': 0.8,  # Propriedades materiais fixas
            'I': self.phase_shift / self.max_phase_shift,  # Informação de fase
            'E': self.amplitude,  # Energia transmitida
            'F': 1.0 - abs(self.target_phase - self.phase_shift) / self.max_phase_shift
        }


class ProgrammableMetasurface:
    """
    Metasuperfície programável controlada por atenção.
    """

    def __init__(self,
                 rows: int = 16,
                 cols: int = 16,
                 cell_spacing: float = 0.5,  # em comprimentos de onda
                 frequency: float = 10e9):   # 10 GHz
        self.rows = rows
        self.cols = cols
        self.cell_spacing = cell_spacing
        self.frequency = frequency
        self.wavelength = 3e8 / frequency  # metros

        # Cria grade de células
        self.cells = []
        for i in range(rows):
            row = []
            for j in range(cols):
                x = j * cell_spacing * self.wavelength
                y = i * cell_spacing * self.wavelength
                cell = MetasurfaceUnitCell(x, y)
                row.append(cell)
            self.cells.append(row)

        # Estado de feixe
        self.beam_angle = (0.0, 0.0)  # (azimuth, elevation) em graus
        self.beam_focus = 1.0  # 0: difuso, 1: focalizado

        # Histórico
        self.phase_history = []
        self.control_history = []

    def apply_phase_profile(self,
                            phase_function: callable,
                            amplitude_function: callable = None):
        """
        Aplica perfil de fase através da superfície.
        """
        if amplitude_function is None:
            amplitude_function = lambda x, y: 1.0

        for i in range(self.rows):
            for j in range(self.cols):
                cell = self.cells[i][j]
                x, y = cell.position[0], cell.position[1]

                phase = phase_function(x, y)
                amplitude = amplitude_function(x, y)

                cell.set_target(phase, amplitude)

    def steer_beam(self,
                   azimuth: float,  # graus
                   elevation: float,  # graus
                   focus: float = 1.0):
        """
        Direciona feixe para ângulo específico.
        """
        self.beam_angle = (azimuth, elevation)
        self.beam_focus = focus

        # Converte para radianos
        az_rad = np.radians(azimuth)
        el_rad = np.radians(elevation)

        # Gradiente de fase para steering
        def phase_func(x, y):
            # Componente para steering
            steering_phase = (2*np.pi/self.wavelength) * (
                x * np.sin(az_rad) +
                y * np.sin(el_rad)
            )

            # Componente para foco (lente fase)
            if focus < 1.0:
                # Distância do centro
                x0 = (self.cols-1) * self.cell_spacing * self.wavelength / 2
                y0 = (self.rows-1) * self.cell_spacing * self.wavelength / 2

                r = np.sqrt((x-x0)**2 + (y-y0)**2)
                focal_length = 10 * self.wavelength / (1 + 9*focus)  # Ajusta com focus

                lens_phase = (2*np.pi/self.wavelength) * (
                    np.sqrt(r**2 + focal_length**2) - focal_length
                )

                # Combina steering e foco
                total_phase = steering_phase + (1-focus) * lens_phase
            else:
                total_phase = steering_phase

            return total_phase % (2*np.pi)

        # Aplica perfil
        self.apply_phase_profile(phase_func)

        # Registra no histórico
        self.control_history.append({
            'azimuth': azimuth,
            'elevation': elevation,
            'focus': focus,
            'timestamp': time.time()
        })

    def generate_vortex_beam(self,
                            topological_charge: int = 1,
                            radius: float = None):
        """
        Gera feixe vórtice com carga topológica específica.
        """
        # Centro da superfície
        x0 = (self.cols-1) * self.cell_spacing * self.wavelength / 2
        y0 = (self.rows-1) * self.cell_spacing * self.wavelength / 2

        def phase_func(x, y):
            # Coordenadas polares relativas ao centro
            dx = x - x0
            dy = y - y0

            # Ângulo azimuthal
            phi = np.arctan2(dy, dx)

            # Fase do vórtice
            vortex_phase = topological_charge * phi

            # Limita ao raio se especificado
            if radius is not None:
                r = np.sqrt(dx**2 + dy**2)
                if r > radius * self.wavelength:
                    vortex_phase = 0

            return vortex_phase % (2*np.pi)

        self.apply_phase_profile(phase_func)

        # Atualiza estado
        self.beam_angle = (0, 0)  # Vórtice é axial
        self.beam_focus = 0.5  # Valor intermediário

    def calculate_far_field(self,
                           theta_range: np.ndarray = None,
                           phi_range: np.ndarray = None) -> np.ndarray:
        """
        Calcula padrão de radiação no campo distante.
        """
        if theta_range is None:
            theta_range = np.linspace(-90, 90, 181)  # graus
        if phi_range is None:
            phi_range = np.array([0])  # Azimuth fixo

        # Converte para radianos
        theta_rad = np.radians(theta_range)
        phi_rad = np.radians(phi_range)

        # Cria campo de abertura (assume iluminação uniforme)
        aperture_field = np.zeros((self.rows, self.cols), dtype=complex)

        for i in range(self.rows):
            for j in range(self.cols):
                cell = self.cells[i][j]
                phase = cell.phase_shift
                amplitude = cell.amplitude
                aperture_field[i, j] = amplitude * np.exp(1j * phase)

        # Calcula padrão de radiação
        far_field = np.zeros((len(theta_rad), len(phi_rad)), dtype=complex)

        # Coordenadas das células
        x_pos = np.array([cell.position[0] for row in self.cells for cell in row])
        y_pos = np.array([cell.position[1] for row in self.cells for cell in row])

        # Reformata para cálculo vetorizado
        aperture_flat = aperture_field.flatten()

        for i, theta in enumerate(theta_rad):
            for j, phi in enumerate(phi_rad):
                # Vetor de direção de propagação
                k = (2*np.pi/self.wavelength) * np.array([
                    np.sin(theta) * np.cos(phi),
                    np.sin(theta) * np.sin(phi),
                    np.cos(theta)
                ])

                # Soma das contribuições das células
                phase_contrib = np.exp(1j * (k[0]*x_pos + k[1]*y_pos))
                far_field[i, j] = np.sum(aperture_flat * phase_contrib)

        # Intensidade = |campo|^2
        intensity = np.abs(far_field)**2

        return intensity


class NeuroMetasurfaceController:
    """
    Controlador principal: atenção cerebral → metasuperfície.
    """

    def __init__(self,
                 eeg_sample_rate: float = 256.0,
                 metasurface_size: Tuple[int, int] = (16, 16),
                 update_rate: float = 10.0):  # Hz
        # Módulos
        self.attention_extractor = AttentionExtractor(eeg_sample_rate)
        self.metasurface = ProgrammableMetasurface(
            rows=metasurface_size[0],
            cols=metasurface_size[1]
        )

        # Estado
        self.current_attention = 50.0
        self.attention_history = []
        self.metasurface_history = []

        # Controle
        self.update_rate = update_rate
        self.running = False
        self.control_thread = None

        # Mapeamento atenção → parâmetros
        self.attention_mapping = {
            'low': (0, 30),      # Meditação profunda
            'medium': (30, 70),  # Estado relaxado
            'high': (70, 100)    # Foco intenso
        }

        # Configurações por estado de atenção
        self.state_configs = {
            'low': {
                'beam_angle': (0, 0),
                'beam_focus': 0.3,
                'pattern': 'diffuse'
            },
            'medium': {
                'beam_angle': (30, 10),
                'beam_focus': 0.6,
                'pattern': 'moderate'
            },
            'high': {
                'beam_angle': (60, 30),
                'beam_focus': 0.9,
                'pattern': 'focused'
            }
        }

    def start(self, bluetooth_address: str = None):
        """Inicia controle em tempo real."""
        if self.running:
            return

        self.running = True

        # Inicia thread de controle
        self.control_thread = threading.Thread(
            target=self._control_loop,
            args=(bluetooth_address,)
        )
        self.control_thread.daemon = True
        self.control_thread.start()

    def stop(self):
        """Para o controle."""
        self.running = False
        if self.control_thread:
            self.control_thread.join(timeout=1.0)

    def _control_loop(self, bluetooth_address: str = None):
        """Loop principal de controle."""
        update_interval = 1.0 / self.update_rate

        while self.running:
            # Simulação de recebimento de dados
            eeg_data = self._read_simulated_eeg()

            if eeg_data is not None:
                # Processa atenção
                attention = self.attention_extractor.update(eeg_data)
                self.current_attention = attention

                # Controla metasuperfície baseado na atenção
                self._update_metasurface(attention)

            time.sleep(update_interval)

    def _read_simulated_eeg(self) -> EEGSample:
        """Gera dados EEG simulados."""
        return EEGSample(
            timestamp=time.time(),
            channels=np.random.randn(8, 100),
            sample_rate=256.0
        )

    def _update_metasurface(self, attention: float):
        """Atualiza metasuperfície baseado na atenção."""
        # Determina estado
        state = 'medium'
        if attention < 30: state = 'low'
        elif attention > 70: state = 'high'

        config = self.state_configs[state]

        self.metasurface.steer_beam(
            azimuth=config['beam_angle'][0],
            elevation=config['beam_angle'][1],
            focus=config['beam_focus']
        )

        # Atualiza células
        for row in self.metasurface.cells:
            for cell in row:
                cell.update()
