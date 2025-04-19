import { ICandidateSimple, ISkill, IVacancy } from 'src/interfaces';

export const calculateSkillScore = (
  candidateSkills: ISkill[],
  vacancy: IVacancy,
): number => {
  const { requiredSkills, optionalSkills } = vacancy;

  const minSkillValue = 100 / requiredSkills.length;

  let skillScore = 0;

  requiredSkills.forEach((reqSkill) => {
    if (
      candidateSkills.some(
        (skill) =>
          skill.description.toLocaleLowerCase() ===
          reqSkill.description.toLocaleLowerCase(),
      )
    ) {
      skillScore += minSkillValue;
    }
  });

  optionalSkills.forEach((optSkill) => {
    if (
      candidateSkills.some(
        (skill) =>
          skill.description.toLocaleLowerCase() ===
          optSkill.description.toLocaleLowerCase(),
      )
    ) {
      skillScore += minSkillValue / 2;
    }
  });

  return skillScore;
};

export const convertExperienceToMonths = (experience: string): number[] => {
  const experienceMap: { [key: string]: number[] } = {
    'Menos de 6 meses': [0, 6],
    '6-12 meses': [6, 12],
    '12-24 meses': [12, 24],
    '+24 meses': [24, Infinity],
  };
  return experienceMap[experience] || [0, 0];
};

export const calculateExperienceScore = (
  candidateExperience: string,
  vacancyMinMonths: number,
): number => {
  const [candidateMin, candidateMax] =
    convertExperienceToMonths(candidateExperience);

  if (candidateMax >= vacancyMinMonths) {
    if (candidateMin >= vacancyMinMonths) {
      return 100;
    }

    return Math.min((candidateMax / vacancyMinMonths) * 100, 100);
  }

  return 0;
};
export const calculateSalaryScore = (
  candidateMinSalary: string | undefined,
  candidateMaxSalary: string | undefined,
  vacancyMinSalary: string,
  vacancyMaxSalary: string | undefined,
): number => {
  if (!candidateMinSalary) return 0;

  const candidateMin = parseFloat(candidateMinSalary);
  const candidateMax = candidateMaxSalary
    ? parseFloat(candidateMaxSalary)
    : undefined;
  const vacancyMin = parseFloat(vacancyMinSalary);
  const vacancyMax = vacancyMaxSalary
    ? parseFloat(vacancyMaxSalary)
    : undefined;

  if (
    candidateMin <= vacancyMin &&
    (!candidateMax || candidateMax <= (vacancyMax || Infinity))
  ) {
    return 100;
  }

  return 0;
};
export const calculateCandidateScore = (
  candidate: ICandidateSimple,
  vacancy?: IVacancy,
): number => {
  if (!candidate || !vacancy) return 0;

  const skillScore = calculateSkillScore(candidate.skills, vacancy);

  const experienceScore = calculateExperienceScore(
    candidate.experienceTime.description,
    Number(vacancy.experienceTime),
  );

  const salaryScore = calculateSalaryScore(
    candidate.minSalary,
    candidate.maxSalary,
    vacancy.minSalary,
    vacancy.maxSalary,
  );

  const weights =
    (!!candidate.minSalary || !!candidate.maxSalary) &&
    (!!vacancy.minSalary || !!vacancy.maxSalary)
      ? { skills: 0.5, experience: 0.3, salary: 0.2 }
      : { skills: 0.65, experience: 0.35, salary: 0 };

  const finalScore =
    skillScore * weights.skills +
    experienceScore * weights.experience +
    salaryScore * weights.salary;

  return Math.round(finalScore);
};
