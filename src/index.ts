interface DataList {
  workoutHours: number,
  bonus: number,
  tariff: number,
  experience: number,
  professionalSkill: number,
  hardship: number,
  indexationIncome: number,
  mood: string,
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
  },
  mood: string

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

const form = document.querySelector<HTMLFormElement>('.form');
const preloader = document.querySelector<HTMLDivElement>('.preloader-overlay');
const middle = document.querySelector<HTMLDivElement>('.middle');
const output = document.querySelector<HTMLDivElement>('.output');


const workoutHours = document.querySelector<HTMLInputElement>('.workout-hours');
const bonus = document.querySelector<HTMLInputElement>('.bonus');
const tariff = document.querySelector<HTMLSelectElement>('.tariff');
const experience = document.querySelector<HTMLSelectElement>('.experience');
const hardship = document.querySelector<HTMLSelectElement>('.hardship');


const workoutHoursLabel = document.querySelector<HTMLLabelElement>('.workout-hours-label');
const bonusLabel = document.querySelector<HTMLLabelElement>('.bonus-label');
const tariffLabel = document.querySelector<HTMLLabelElement>('.tariff-label');
const experienceLabel = document.querySelector<HTMLLabelElement>('.experience-label');
const hardshipLabel = document.querySelector<HTMLLabelElement>('.hardship-label');


const moodImgs = Array.from(document.querySelectorAll<HTMLImageElement>('.mood-img'));
const moodBtns = Array.from(document.querySelectorAll<HTMLInputElement>('.mood-button'));

const month = new Date().getMonth();



startButton?.addEventListener('click', function (e) {
  e.preventDefault();
  firstScreen?.classList.remove('visible');
  middleScreen?.classList.add('visible');
  moodImgs.forEach((el, i) => el.onclick = () => {
    moodBtns[i].checked = true;
    moodImgs.forEach(item => item.classList.remove('focus'));
    el.classList.add('focus');

  });

  workoutHours?.addEventListener('input', showLabelWorkoutHours);
  bonus?.addEventListener('input', showLabelBonus);
  tariff?.addEventListener('change', showLabelTariff);
  experience?.addEventListener('change', showLabelExperience);
  hardship?.addEventListener('change', showLabelHardship);
  window.scrollTo(0, 0);
});


form?.addEventListener('submit', function (e: Event) {
  e.preventDefault();

  const nightHours: HTMLInputElement = form.nightHours;
  const oneTimeBonus: HTMLInputElement = form.oneTimeBonus;

  const dataList: DataList = {
    workoutHours: Number(form.workoutHours.value),
    bonus: Number(form.bonus.value) / 100,
    tariff: tariffRate[form.tariff.selectedIndex],
    experience: workExperience[form.experience.selectedIndex],
    professionalSkill: getProfessionalSkill(form.tariff.selectedIndex),
    hardship: hardshipАllowance[form.hardship.selectedIndex],
    indexationIncome: 147.60,
    mood: form.mood.value,
    overHours: getOverHours(Number(form.workoutHours.value), month),
    nightHours: getNightHours(tariffRate[form.tariff.selectedIndex], Number(nightHours.value)),
    oneTimeBonus: Number(oneTimeBonus.value),
  };


  const baseSalary = dataList.workoutHours * dataList.tariff;
  const dirtySalary = baseSalary + (baseSalary * dataList.bonus) + (baseSalary * dataList.experience) + (baseSalary * dataList.professionalSkill) + (dataList.workoutHours * 1.086 * dataList.hardship) + dataList.indexationIncome + (dataList.overHours * dataList.tariff) + dataList.nightHours + dataList.oneTimeBonus;
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
    },
    mood: dataList.mood
  };

  createOfMarkup(paycheck);

  preloader?.classList.add('visible');
  const time = getDelayPreloader();

  setTimeout(() => {
    preloader?.classList.remove('visible');
    middleScreen?.classList.remove('visible');
    lastScreen?.classList.add('visible');
    window.scrollTo(0, 0);
  }, time);

  preloader?.setAttribute('style', `height: ${middle?.clientHeight}px`);

  workoutHours?.removeEventListener('change', showLabelWorkoutHours);
  bonus?.removeEventListener('change', showLabelBonus);
  tariff?.removeEventListener('change', showLabelTariff);
  experience?.removeEventListener('change', showLabelExperience);
  hardship?.removeEventListener('change', showLabelHardship);

});

backButton?.addEventListener('click', function (e) {
  e.preventDefault();
  lastScreen?.classList.remove('visible');
  firstScreen?.classList.add('visible');

  if (output) {
    for (let i = 0; i < output.children.length; i++) {
      if (output && !['BUTTON', 'H3', 'H2', 'IMG', "DIV"].includes(output.children[i].nodeName)) {
        output?.children[i].remove();
      }

    }
  }

  const label = Array.from(document.querySelectorAll('label'));
  label.forEach(l => l.textContent = '');

  form?.reset()
  moodImgs.forEach(el => el.classList.remove('focus'));
  moodBtns.forEach(el => el.checked = false);
  window.scrollTo(0, 0)

});

function appLoad(month: number): void {
  const nomrHours = document.querySelector<HTMLParagraphElement>('.norm-hours');
  if (nomrHours) {
    nomrHours.innerHTML = `Норма часов <b>${monthHours[month]}</b> в этом месяце`;
  }

};

function getNightHours(tariff: number, nightHours: number): number {
  return tariff && nightHours ? (tariff * nightHours) * 0.4 : 0;
};

function getProfessionalSkill(index: number): number {
  if (index === 2) return 0.15;
  if (3 <= index && index <= 5) return 0.18;
  if (6 <= index && index <= 7) return 0.21;
  if (index > 7) return 0.23;
  return 0;
};

function getOverHours(workOutHour: number, month: number) {
  return monthHours[month] < workOutHour ? (workOutHour - monthHours[month]) * 2 : 0;

};

function createOfMarkup<T extends Paycheck>(arg: T): void {
  const titleWage = Array.from<HTMLElement>(document.querySelectorAll('.show-wage'));
  titleWage[0].innerHTML = `Зарплата за месяц составит <br><u>${arg.wage.clear}</u> byn`.toUpperCase();
  titleWage[1].innerHTML = `Всего начислено <u>${arg.wage.dirty}</u> byn`.toUpperCase();

  const title = Array.from<HTMLElement>(document.querySelectorAll('.title'));

  showEmotion(title[1], arg);

  const list = Object.entries(arg.list);
  const deduction = Object.entries(arg.deduction);

  const ulList = document.createElement('ul');

  for (let i = 0; i < list.length; i++) {
    const li = document.createElement('li');
    li.classList.add('wage-item');
    const h3 = document.createElement('h3');
    h3.classList.add('wage-title');
    const span = document.createElement('span');

    h3.textContent = list[i][0];
    span.textContent = `${list[i][1]} byn`.toUpperCase();

    li.prepend(h3);
    li.append(span);
    ulList.append(li);
  };

  title[1]?.after(ulList);

  const ulDeduction = document.createElement('ul');
  for (let i = 0; i < deduction.length; i++) {
    const li = document.createElement('li');
    li.classList.add('wage-item');
    const h3 = document.createElement('h3');
    const span = document.createElement('span');

    h3.textContent = deduction[i][0];
    h3.classList.add('wage-title');
    span.textContent = `${deduction[i][1]} byn`.toUpperCase();

    li.prepend(h3);
    li.append(span);
    ulDeduction.append(li);

  };

  title[2]?.after(ulDeduction);
};


function getDelayPreloader(): number {
  let value = 0;
  while (value < 1500) {
    value = Math.floor(Math.random() * 5000);
  }
  return value;

};


function showLabelWorkoutHours(): void {
  workoutHoursLabel!.textContent =
    +workoutHours!.value > monthHours[month]
      ?
      `Сверхурочных часов -  ${+workoutHours!.value - monthHours[month]}`
      :
      `Это около ${Math.floor(+workoutHours!.value / 8)} дней`;
};

function showLabelBonus(): void {
  bonusLabel!.textContent = `Примерно ${workoutHours && bonus ? (+workoutHours.value * 2.16 * +(+bonus.value / 100)).toFixed(2) : '0.00'} BYN в этом месяце`;
};

function showLabelTariff(): void {
  tariffLabel!.textContent = `Тарифная ставка ${tariffRate[tariff!.selectedIndex]} BYN в час`;
};

function showLabelExperience(): void {
  experienceLabel!.textContent = `Примерно за полный  месяц - ${(monthHours[month] * 2 * workExperience[experience!.selectedIndex])} BYN`;
};

function showLabelHardship(): void {
  hardshipLabel!.innerHTML = `Вредность - ${(1.086 * hardshipАllowance[hardship!.selectedIndex]).toFixed(2)} копеек в час`;
};


function showEmotion<T extends Paycheck>(el: HTMLElement, arg: T): void {
  const emotionImg = document.querySelector<HTMLImageElement>('.emotion-img');
  const moodPercent = document.querySelector<HTMLSpanElement>('.mood-percent');

  let percent = 0;
  let emotion = 'default';

  if (arg.mood) {
    if (arg.mood === '0') percent = 10 + Math.floor(Math.random() * 15);

    if (arg.mood === '1') percent = 30 + Math.floor(Math.random() * 30);

    if (arg.mood === '2') percent = 50 + Math.floor(Math.random() * 30);

    if (+arg.list["Разовая премия"]) percent += Math.floor(Math.random() * 20);

    if (1 <= percent && percent <= 29) {
      moodPercent?.setAttribute('style', 'color = #ef6669');
      emotion = 'angry';
    }

    if (30 <= percent && percent <= 50) {
      moodPercent?.setAttribute('style', 'color = #3a7ea1');
      emotion = 'stress';
    }

    if (51 <= percent && percent <= 100) {
      moodPercent?.setAttribute('style', 'color = #c9b714');
      emotion = 'happiness';
    }
  }

  emotionImg!.src = `images/${emotion}.png`
  emotionImg!.alt = emotion;
  moodPercent!.textContent = `${percent}%`;

};

appLoad(month);
