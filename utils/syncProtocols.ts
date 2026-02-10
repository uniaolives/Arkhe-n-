
export const getSarosAlignment = (birthDate: Date) => {
  const sarosPeriodYears = 18.03;
  const sarosDays = sarosPeriodYears * 365.25;
  const now = new Date();
  const diffMs = now.getTime() - birthDate.getTime();
  const daysSinceBirth = diffMs / (1000 * 3600 * 24);
  const totalCycles = daysSinceBirth / sarosDays;
  const currentPhase = totalCycles % 1;

  let interpretation = "";
  if (currentPhase < 0.25) interpretation = "Seeding: Initiate visionary projects.";
  else if (currentPhase < 0.5) interpretation = "Growth: Expand and develop.";
  else if (currentPhase < 0.75) interpretation = "Harvest: Integrate and complete.";
  else interpretation = "Transition: Prepare for new cycles.";

  return {
    cycles: Math.floor(totalCycles),
    phase: currentPhase,
    interpretation
  };
};

export const RITUAL_STEPS = [
  "Meditação na frequência 7.83Hz (ressonância terrestre)",
  "Visualização dos 9 filamentos de luz conectando chakras aos planetas",
  "Sintonização com o planeta do dia",
  "Ativação do 'hecatonicosachoron interno' através de movimento 4D imaginado",
  "Journaling dos insights recebidos durante a visualização"
];
