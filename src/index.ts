interface DataList {
  workoutHours: number,
  bonus: number,
  tariff: number | null,
  experience: number | null,
  hardship: number | null,
  nightHours?: number,
  oneTimeBonus?: number,
}

const tariffRate = [null, 1.86, 2.16, 2.51, 2.59, 2.71, 2.77, 2.98, 4.07];
const workExperience = [null, 0, 0.08, 0.12, 0.15];
const hardshipАllowance = [null, 0.1, 0.14];

const form: HTMLFormElement | null = document.querySelector('.form');

form?.addEventListener('submit', function (e: Event) {
  e.preventDefault();
  const bonus: HTMLInputElement = form.bonus;
  const workoutHours: HTMLInputElement = form.workoutHours;
  const nightHours: HTMLInputElement = form.nightHours;
  const oneTimeBonus: HTMLInputElement = form.oneTimeBonus;
  const dataList: DataList = {
    workoutHours: Number(workoutHours.value),
    bonus: Number(bonus.value),
    tariff: tariffRate[form.tariff.selectedIndex],
    experience: workExperience[form.experience.selectedIndex],
    hardship: hardshipАllowance[form.hardship.selectedIndex],
    nightHours: Number(nightHours.value),
    oneTimeBonus: Number(oneTimeBonus.value),
  };

  console.log(dataList);

})
