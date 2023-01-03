"use strict";
var monthHours = [167, 160, 175, 151, 167, 176, 160, 184, 168, 176, 167, 160];
var tariffRate = [0, 1.86, 2.16, 2.51, 2.59, 2.71, 2.77, 2.98, 4.07];
var workExperience = [0, 0, 0.08, 0.12, 0.15];
var hardshipАllowance = [0, 0.1, 0.14];
var startButton = document.querySelector('.start');
var backButton = document.querySelector('.back');
var firstScreen = document.querySelector('.first-screen');
var middleScreen = document.querySelector('.middle-screen');
var lastScreen = document.querySelector('.last-screen');
var output = document.querySelector('.output');
startButton === null || startButton === void 0 ? void 0 : startButton.addEventListener('click', function (e) {
    e.preventDefault();
    firstScreen === null || firstScreen === void 0 ? void 0 : firstScreen.classList.remove('visible');
    middleScreen === null || middleScreen === void 0 ? void 0 : middleScreen.classList.add('visible');
});
var form = document.querySelector('.form');
form === null || form === void 0 ? void 0 : form.addEventListener('submit', function (e) {
    e.preventDefault();
    middleScreen === null || middleScreen === void 0 ? void 0 : middleScreen.classList.remove('visible');
    lastScreen === null || lastScreen === void 0 ? void 0 : lastScreen.classList.add('visible');
    var bonus = form.bonus;
    var workoutHours = form.workoutHours;
    var nightHours = form.nightHours;
    var oneTimeBonus = form.oneTimeBonus;
    var tariff = form.tariff;
    var experience = form.experience;
    var hardship = form.hardship;
    var dataList = {
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
    var baseSalary = dataList.workoutHours * dataList.tariff;
    var dirtySalary = baseSalary + (baseSalary * dataList.bonus) + (baseSalary * dataList.experience) + (baseSalary * dataList.professionalSkill) + (dataList.workoutHours * 1.076 * dataList.hardship) + dataList.indexationIncome + (dataList.overHours * dataList.tariff) + dataList.nightHours + dataList.oneTimeBonus;
    var clearSalary = dirtySalary - (dirtySalary * 0.15);
    var paycheck = {
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
function getNightHours(tariff, nightHours) {
    return tariff && nightHours ? (tariff * nightHours) * 0.4 : 0;
}
function getProfessionalSkill(index) {
    if (index === 2)
        return 0.15;
    if (3 <= index && index <= 5)
        return 0.18;
    if (6 <= index && index <= 7)
        return 0.21;
    if (index > 7)
        return 0.23;
    return 0;
}
;
function getOverHours(workOutHour) {
    var month = new Date().getMonth();
    return monthHours[month] < workOutHour ? (workOutHour - monthHours[month]) * 2 : 0;
}
;
backButton === null || backButton === void 0 ? void 0 : backButton.addEventListener('click', function (e) {
    e.preventDefault();
    lastScreen === null || lastScreen === void 0 ? void 0 : lastScreen.classList.remove('visible');
    firstScreen === null || firstScreen === void 0 ? void 0 : firstScreen.classList.add('visible');
    if (output) {
        for (var i = 0; i < output.children.length; i++) {
            if (output && !['BUTTON', 'H2', "IMG"].includes(output.children[i].nodeName)) {
                output === null || output === void 0 ? void 0 : output.children[i].remove();
            }
        }
    }
});
function createOfMarkup(arg) {
    var _a, _b;
    var titleClearWage = document.createElement('div');
    titleClearWage.textContent = "\u0417\u0430\u0440\u043F\u043B\u0430\u0442\u0430 \u0437\u0430 \u043C\u0435\u0441\u044F\u0446 \u0441\u043E\u0441\u0442\u0430\u0432\u0438\u0442 ".concat(arg.wage.clear, " byn").toUpperCase();
    titleClearWage.classList.add('show-wage--clear');
    output === null || output === void 0 ? void 0 : output.prepend(titleClearWage);
    var titleDirtyWage = document.createElement('div');
    titleDirtyWage.textContent = "\u0412\u0441\u0435\u0433\u043E \u043D\u0430\u0447\u0438\u0441\u043B\u0435\u043D\u043E ".concat(arg.wage.dirty, " byn").toUpperCase();
    titleDirtyWage.classList.add('show-wage--dirty');
    output === null || output === void 0 ? void 0 : output.prepend(titleDirtyWage);
    var tittle = Array.from(document.querySelectorAll('.title'));
    var list = Object.entries(arg.list);
    var deduction = Object.entries(arg.deduction);
    var ulList = document.createElement('ul');
    for (var i = 0; i < list.length; i++) {
        var li = document.createElement('li');
        li.classList.add('wage-item');
        var h3 = document.createElement('h3');
        var span = document.createElement('span');
        h3.textContent = list[i][0];
        span.textContent = "".concat(list[i][1], " byn").toUpperCase();
        li.prepend(h3);
        li.append(span);
        ulList.append(li);
    }
    (_a = tittle[0]) === null || _a === void 0 ? void 0 : _a.after(ulList);
    var ulDeduction = document.createElement('ul');
    for (var i = 0; i < deduction.length; i++) {
        var li = document.createElement('li');
        li.classList.add('wage-item');
        var h3 = document.createElement('h3');
        var span = document.createElement('span');
        h3.textContent = deduction[i][0];
        span.textContent = "".concat(deduction[i][1], " byn").toUpperCase();
        li.prepend(h3);
        li.append(span);
        ulDeduction.append(li);
    }
    (_b = tittle[1]) === null || _b === void 0 ? void 0 : _b.after(ulDeduction);
}
