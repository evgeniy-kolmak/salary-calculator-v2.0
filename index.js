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
    };
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
});
