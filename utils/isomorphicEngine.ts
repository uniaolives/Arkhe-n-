
import { DrugPrediction, MolecularInteractionType } from '../types';

export class IsomorphicEngine {
  private proteinDB: Record<string, string> = {
    'EGFR': 'Epidermal Growth Factor Receptor (Cancer)',
    'HTR2A': '5-HT2A Serotonin Receptor (Neuropsychiatric)',
    'ACE2': 'Angiotensin Converting Enzyme 2 (COVID-19)',
    'GABRA1': 'GABA-A Receptor (Anxiety)',
    'DRD2': 'Dopamine D2 Receptor (Schizophrenia)',
    'SLC6A4': 'Serotonin Transporter (Depression)',
    'BACE1': 'Beta-secretase 1 (Alzheimer)',
    'SIGMAR1': 'Sigma-1 Receptor (Neuroprotection)',
    'OPRM1': 'Mu-Opioid Receptor (Pain/Reward)'
  };

  public async predictTarget(protein: string, molecule: string): Promise<DrugPrediction> {
    // Simulated IsoDDE Quantum Accuracy Predictions
    const affinity = 6 + Math.random() * 6; // pKd 6.0 to 12.0
    const confidence = 0.94 + Math.random() * 0.05;
    const solubility = -5 + Math.random() * 10; // LogS
    const permeability = 0 + Math.random() * 6; // LogP
    const hepatoxicity = Math.random() * 0.15;
    const cardiotoxicity = Math.random() * 0.1;
    const safety = 1.0 - Math.max(hepatoxicity, cardiotoxicity);

    const druggability = (affinity / 12) * 0.4 + confidence * 0.2 + safety * 0.2 + ((solubility + 5) / 10) * 0.1 + (permeability / 6) * 0.1;

    const interactionTypes = [
      MolecularInteractionType.HYDROGEN_BOND,
      MolecularInteractionType.VAN_DER_WAALS,
      MolecularInteractionType.HYDROPHOBIC
    ];
    if (Math.random() > 0.4) interactionTypes.push(MolecularInteractionType.PI_STACKING);
    if (Math.random() > 0.7) interactionTypes.push(MolecularInteractionType.ELECTROSTATIC);
    if (Math.random() > 0.9) interactionTypes.push(MolecularInteractionType.COVALENT);

    return {
      id: `mol-${Math.random().toString(36).slice(2, 8)}`,
      target: protein,
      molecule: molecule.length > 20 ? molecule.slice(0, 20) + "..." : molecule,
      affinity,
      confidence,
      druggability,
      kinetics: {
        residenceTime: 10 + Math.pow(10, Math.random() * 2.5), 
        kon: 1e5 + Math.random() * 5e6,
        koff: 1e-4 + Math.random() * 1e-2
      },
      thermodynamics: {
        deltaG: -12 + Math.random() * 6, 
        deltaH: -20 + Math.random() * 15,
        deltaS: -0.02 + Math.random() * 0.08
      },
      admet: { solubility, permeability, safety, hepatoxicity, cardiotoxicity },
      arkhe: {
        C: Math.min(affinity / 11, 1),
        I: confidence * 0.9,
        E: Math.min(1, Math.abs(solubility) / 5),
        F: druggability
      },
      schmidtVertices: {
        affinity: Math.min(affinity / 12, 1),
        selectivity: confidence,
        pk: (solubility + 5) / 10 * 0.5 + (permeability / 6) * 0.5,
        safety: safety,
        synthesizability: 0.75 + Math.random() * 0.15,
        novelty: 0.5 + Math.random() * 0.4
      },
      verbalActivations: this.generateVerbalActivations(molecule, protein),
      interactionTypes
    };
  }

  public mapMentalState(state: string): string[] {
    const mapping: Record<string, string[]> = {
      'anxiety': ['GABRA1', 'HTR1A', 'SLC6A4'],
      'depression': ['SLC6A4', 'HTR2A', 'MAOA'],
      'focus': ['DRD1', 'CHRNA7', 'SLC6A3'],
      'creativity': ['DRD2', 'HTR2A', 'OPRM1'],
      'calm': ['GABRA2', 'HRH1', 'ADRA2A'],
      'energy': ['ADRB2', 'SLC6A2', 'COMT'],
      'joy': ['DRD3', 'OPRK1', 'CNR1'],
      'sleep': ['HRH1', 'ADRA1A', 'HTR2C'],
      'meditative': ['GABRA1', 'HTR1A'],
      'mystical': ['HTR2A', 'SIGMAR1'],
      'healing': ['OPRM1', 'CNR1'],
      'alzheimer': ['BACE1', 'APP', 'MAPT'],
      'cancer': ['EGFR', 'TP53', 'BRCA1']
    };
    
    const lower = state.toLowerCase();
    for (const key in mapping) {
      if (lower.includes(key)) return mapping[key];
    }
    return ['HTR2A', 'SIGMAR1', 'SLC6A4'];
  }

  private generateVerbalActivations(molecule: string, target: string): string[] {
    const isStim = target.includes('DRD') || target.includes('ADR');
    const isCalm = target.includes('GAB') || target.includes('HTR1');
    
    if (isStim) return [
      "My consciousness is a focused laser beam of intent.",
      "Informational flow accelerates through the synaptic gap.",
      "Dopaminergic vectors align with creative mastery."
    ];

    if (isCalm) return [
      "Deep peace permeates the liquid crystals of my cellular matrix.",
      "Neural oscillations synchronize with the planet's heartbeat.",
      "GABAergic resonance stabilizes the bio-photonic field."
    ];

    return [
      `My cells welcome this molecule with quantum precision.`,
      `The informational bridge between Word and Matter is complete.`,
      `Healing resonance stabilizes the protein-ligand complex.`
    ];
  }
}

export const globalIsoEngine = new IsomorphicEngine();
