interface DataList {
  workoutHours: number,
  bonus: number,
  tariff: number,
  experience: number,
  professionalSkill: number,
  hardship: number,
  indexationIncome: number,
  overHours: number,
  nightHours: number
  oneTimeBonus: number,
}

interface Paycheck {
  wage: {
    dirty: string,
    clear: string,
  },
  list: {
    baseSalary: string,
    bonus: string,
    experience: string,
    professionalSkill: string,
    hardship: string,
    indexationIncome: string,
    overHours: string,
    nightHours: string
    oneTimeBonus: string,
  },
  deduction: {
    surtax: string,
    pensionTax: string,
    union: string,
  }

}
const monthHours = [167, 160, 175, 151, 167, 176, 160, 184, 168, 176, 167, 160];
const tariffRate = [0, 1.86, 2.16, 2.51, 2.59, 2.71, 2.77, 2.98, 4.07];
const workExperience = [0, 0, 0.08, 0.12, 0.15];
const hardshipАllowance = [0, 0.1, 0.14];

const form: HTMLFormElement | null = document.querySelector('.form');

form?.addEventListener('submit', function (e: Event) {
  e.preventDefault();
  const bonus: HTMLInputElement = form.bonus;
  const workoutHours: HTMLInputElement = form.workoutHours;
  const nightHours: HTMLInputElement = form.nightHours;
  const oneTimeBonus: HTMLInputElement = form.oneTimeBonus;
  const tariff: HTMLSelectElement = form.tariff;
  const experience: HTMLSelectElement = form.experience;
  const hardship: HTMLSelectElement = form.hardship;

  const dataList: DataList = {
    workoutHours: Number(workoutHours.value),
    bonus: Number(bonus.value) / 100,
    tariff: tariffRate[tariff.selectedIndex],
    experience: workExperience[experience.selectedIndex],
    professionalSkill: getProfessionalSkill(tariff.selectedIndex),
    hardship: hardshipАllowance[hardship.selectedIndex],
    indexationIncome: 147.60,
    overHours: getOverHours(Number(workoutHours.value)),
    nightHours: getNightHours(tariffRate[tariff.selectedIndex], Number(nightHours.value)),
    oneTimeBonus: Number(oneTimeBonus.value),
  };


  const baseSalary = dataList.workoutHours * dataList.tariff;
  const dirtySalary = baseSalary + (baseSalary * dataList.bonus) + (baseSalary * dataList.experience) + (baseSalary * dataList.professionalSkill) + (dataList.workoutHours * 1.076 * dataList.hardship) + dataList.indexationIncome + (dataList.overHours * dataList.tariff) + dataList.nightHours + dataList.oneTimeBonus;
  const clearSalary = dirtySalary - (dirtySalary * 0.15);

  const paycheck: Paycheck = {
    wage: {
      dirty: dirtySalary.toFixed(2),
      clear: clearSalary.toFixed(2)
    },
    list: {
      baseSalary: baseSalary.toFixed(2),
      bonus: (baseSalary * dataList.bonus).toFixed(2),
      experience: (baseSalary * dataList.experience).toFixed(2),
      professionalSkill: (baseSalary * dataList.professionalSkill).toFixed(2),
      hardship: ((dataList.workoutHours * 1.076) * dataList.hardship).toFixed(2),
      indexationIncome: dataList.indexationIncome.toFixed(2),
      overHours: (dataList.overHours * dataList.tariff).toFixed(2),
      nightHours: dataList.nightHours.toFixed(2),
      oneTimeBonus: dataList.oneTimeBonus.toFixed(2),
    },
    deduction: {
      pensionTax: (dirtySalary * 0.13).toFixed(2),
      surtax: (dirtySalary * 0.01).toFixed(2),
      union: (dirtySalary * 0.01).toFixed(2)
    }
  }


})


function getNightHours(tariff: number, nightHours: number): number {
  return tariff && nightHours ? (tariff * nightHours) * 0.4 : 0;
}

function getProfessionalSkill(index: number): number {
  if (index === 2) return 0.15;
  if (3 <= index && index <= 5) return 0.18;
  if (6 <= index && index <= 7) return 0.21;
  if (index > 7) return 0.23;
  return 0;
}

function getOverHours(workOutHour: number) {
  const month = new Date().getMonth();
  return monthHours[month] < workOutHour ? (workOutHour - monthHours[month]) * 2 : 0;

}
