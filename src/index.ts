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
    "Оклад": string,
    "Премия": string,
    "Надбавка за стаж": string,
    "Профмастерство": string,
    "Вредность": string,
    "Индексация доходов": string,
    "Сверхурочные": string,
    "Ночные часы": string
    "Разовая премия": string,
  },
  deduction: {
    "Подоходный налог": string,
    "Пенсионный": string,
    "Профсоюз": string,
  }

}
const monthHours = [167, 160, 175, 151, 167, 176, 160, 184, 168, 176, 167, 160];
const tariffRate = [0, 1.86, 2.16, 2.51, 2.59, 2.71, 2.77, 2.98, 4.07];
const workExperience = [0, 0, 0.08, 0.12, 0.15];
const hardshipАllowance = [0, 0.1, 0.14];

const startButton = document.querySelector<HTMLButtonElement>('.start');
const backButton = document.querySelector<HTMLButtonElement>('.back');

const firstScreen = document.querySelector<HTMLDivElement>('.first-screen');
const middleScreen = document.querySelector<HTMLDivElement>('.middle-screen');
const lastScreen = document.querySelector<HTMLDivElement>('.last-screen');

const output = document.querySelector<HTMLDivElement>('.output');

startButton?.addEventListener('click', function (e) {
  e.preventDefault();
  firstScreen?.classList.remove('visible');
  middleScreen?.classList.add('visible');

})


const form = document.querySelector<HTMLFormElement>('.form');

form?.addEventListener('submit', function (e: Event) {
  e.preventDefault();

  middleScreen?.classList.remove('visible');
  lastScreen?.classList.add('visible')

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
      "Оклад": baseSalary.toFixed(2),
      "Премия": (baseSalary * dataList.bonus).toFixed(2),
      "Надбавка за стаж": (baseSalary * dataList.experience).toFixed(2),
      "Профмастерство": (baseSalary * dataList.professionalSkill).toFixed(2),
      "Вредность": ((dataList.workoutHours * 1.076) * dataList.hardship).toFixed(2),
      "Индексация доходов": dataList.indexationIncome.toFixed(2),
      "Сверхурочные": (dataList.overHours * dataList.tariff).toFixed(2),
      "Ночные часы": dataList.nightHours.toFixed(2),
      "Разовая премия": dataList.oneTimeBonus.toFixed(2),
    },
    deduction: {
      "Подоходный налог": (dirtySalary * 0.13).toFixed(2),
      "Пенсионный": (dirtySalary * 0.01).toFixed(2),
      "Профсоюз": (dirtySalary * 0.01).toFixed(2)
    }
  };


  createOfMarkup(paycheck);

});


function getNightHours(tariff: number, nightHours: number): number {
  return tariff && nightHours ? (tariff * nightHours) * 0.4 : 0;
}

function getProfessionalSkill(index: number): number {
  if (index === 2) return 0.15;
  if (3 <= index && index <= 5) return 0.18;
  if (6 <= index && index <= 7) return 0.21;
  if (index > 7) return 0.23;
  return 0;
};

function getOverHours(workOutHour: number) {
  const month = new Date().getMonth();
  return monthHours[month] < workOutHour ? (workOutHour - monthHours[month]) * 2 : 0;

};



backButton?.addEventListener('click', function (e) {
  e.preventDefault();
  lastScreen?.classList.remove('visible');
  firstScreen?.classList.add('visible');

  if (output) {
    for (let i = 0; i < output.children.length; i++) {
      if (output && !['BUTTON', 'H2', "IMG"].includes(output.children[i].nodeName)) {
        output?.children[i].remove();
      }

    }
  }

});


function createOfMarkup<T extends Paycheck>(arg: T): void {
  const titleClearWage = document.createElement('div');
  titleClearWage.textContent = `Зарплата за месяц составит ${arg.wage.clear} byn`.toUpperCase();
  titleClearWage.classList.add('show-wage--clear');
  output?.prepend(titleClearWage);
  const titleDirtyWage = document.createElement('div');
  titleDirtyWage.textContent = `Всего начислено ${arg.wage.dirty} byn`.toUpperCase();
  titleDirtyWage.classList.add('show-wage--dirty');
  output?.prepend(titleDirtyWage);

  const tittle: HTMLTitleElement[] = Array.from(document.querySelectorAll('.title'));

  const list = Object.entries(arg.list);
  const deduction = Object.entries(arg.deduction);

  const ulList = document.createElement('ul');

  for (let i = 0; i < list.length; i++) {
    const li = document.createElement('li');
    li.classList.add('wage-item');
    const h3 = document.createElement('h3');
    const span = document.createElement('span');

    h3.textContent = list[i][0];
    span.textContent = `${list[i][1]} byn`.toUpperCase();

    li.prepend(h3);
    li.append(span);
    ulList.append(li);
  }

  tittle[0]?.after(ulList);

  const ulDeduction = document.createElement('ul');
  for (let i = 0; i < deduction.length; i++) {
    const li = document.createElement('li');
    li.classList.add('wage-item');
    const h3 = document.createElement('h3');
    const span = document.createElement('span');

    h3.textContent = deduction[i][0];
    span.textContent = `${deduction[i][1]} byn`.toUpperCase();

    li.prepend(h3);
    li.append(span);
    ulDeduction.append(li);

  }

  tittle[1]?.after(ulDeduction);
}





