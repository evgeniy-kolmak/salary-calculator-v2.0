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
var form = document.querySelector('.form');
var preloader = document.querySelector('.preloader-overlay');
var output = document.querySelector('.output');
var workoutHours = document.querySelector('.workout-hours');
var bonus = document.querySelector('.bonus');
var tariff = document.querySelector('.tariff');
var experience = document.querySelector('.experience');
var hardship = document.querySelector('.hardship');
var workoutHoursLabel = document.querySelector('.workout-hours-label');
var bonusLabel = document.querySelector('.bonus-label');
var tariffLabel = document.querySelector('.tariff-label');
var experienceLabel = document.querySelector('.experience-label');
var hardshipLabel = document.querySelector('.hardship-label');
var moodImgs = Array.from(document.querySelectorAll('.mood-img'));
var moodBtns = Array.from(document.querySelectorAll('.mood-button'));
var month = new Date().getMonth();
startButton === null || startButton === void 0 ? void 0 : startButton.addEventListener('click', function (e) {
    e.preventDefault();
    firstScreen === null || firstScreen === void 0 ? void 0 : firstScreen.classList.remove('visible');
    middleScreen === null || middleScreen === void 0 ? void 0 : middleScreen.classList.add('visible');
    moodImgs.forEach(function (el, i) { return el.onclick = function () {
        moodBtns[i].checked = true;
        moodImgs.forEach(function (item) { return item.classList.remove('focus'); });
        el.classList.add('focus');
    }; });
    workoutHours === null || workoutHours === void 0 ? void 0 : workoutHours.addEventListener('input', showLabelWorkoutHours);
    bonus === null || bonus === void 0 ? void 0 : bonus.addEventListener('input', showLabelBonus);
    tariff === null || tariff === void 0 ? void 0 : tariff.addEventListener('change', showLabelTariff);
    experience === null || experience === void 0 ? void 0 : experience.addEventListener('change', showLabelExperience);
    hardship === null || hardship === void 0 ? void 0 : hardship.addEventListener('change', showLabelHardship);
});
form === null || form === void 0 ? void 0 : form.addEventListener('submit', function (e) {
    e.preventDefault();
    var nightHours = form.nightHours;
    var oneTimeBonus = form.oneTimeBonus;
    var dataList = {
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
    var baseSalary = dataList.workoutHours * dataList.tariff;
    var dirtySalary = baseSalary + (baseSalary * dataList.bonus) + (baseSalary * dataList.experience) + (baseSalary * dataList.professionalSkill) + (dataList.workoutHours * 1.086 * dataList.hardship) + dataList.indexationIncome + (dataList.overHours * dataList.tariff) + dataList.nightHours + dataList.oneTimeBonus;
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
        },
        mood: dataList.mood
    };
    createOfMarkup(paycheck);
    preloader === null || preloader === void 0 ? void 0 : preloader.classList.add('visible');
    var time = getDelayPreloader();
    setTimeout(function () {
        preloader === null || preloader === void 0 ? void 0 : preloader.classList.remove('visible');
        middleScreen === null || middleScreen === void 0 ? void 0 : middleScreen.classList.remove('visible');
        lastScreen === null || lastScreen === void 0 ? void 0 : lastScreen.classList.add('visible');
    }, time);
    workoutHours === null || workoutHours === void 0 ? void 0 : workoutHours.removeEventListener('change', showLabelWorkoutHours);
    bonus === null || bonus === void 0 ? void 0 : bonus.removeEventListener('change', showLabelBonus);
    tariff === null || tariff === void 0 ? void 0 : tariff.removeEventListener('change', showLabelTariff);
    experience === null || experience === void 0 ? void 0 : experience.removeEventListener('change', showLabelExperience);
    hardship === null || hardship === void 0 ? void 0 : hardship.removeEventListener('change', showLabelHardship);
});
backButton === null || backButton === void 0 ? void 0 : backButton.addEventListener('click', function (e) {
    e.preventDefault();
    lastScreen === null || lastScreen === void 0 ? void 0 : lastScreen.classList.remove('visible');
    firstScreen === null || firstScreen === void 0 ? void 0 : firstScreen.classList.add('visible');
    if (output) {
        for (var i = 0; i < output.children.length; i++) {
            if (output && !['BUTTON', 'H3', 'H2', 'IMG', "DIV"].includes(output.children[i].nodeName)) {
                output === null || output === void 0 ? void 0 : output.children[i].remove();
            }
        }
    }
    var label = Array.from(document.querySelectorAll('label'));
    label.forEach(function (l) { return l.textContent = ''; });
    form === null || form === void 0 ? void 0 : form.reset();
    moodImgs.forEach(function (el) { return el.classList.remove('focus'); });
    moodBtns.forEach(function (el) { return el.checked = false; });
});
function appLoad(month) {
    var nomrHours = document.querySelector('.norm-hours');
    if (nomrHours) {
        nomrHours.innerHTML = "\u041D\u043E\u0440\u043C\u0430 \u0447\u0430\u0441\u043E\u0432 <b>".concat(monthHours[month], "</b> \u0432 \u044D\u0442\u043E\u043C \u043C\u0435\u0441\u044F\u0446\u0435");
    }
}
function getNightHours(tariff, nightHours) {
    return tariff && nightHours ? (tariff * nightHours) * 0.4 : 0;
}
;
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
function getOverHours(workOutHour, month) {
    return monthHours[month] < workOutHour ? (workOutHour - monthHours[month]) * 2 : 0;
}
;
function createOfMarkup(arg) {
    var _a, _b;
    var titleWage = Array.from(document.querySelectorAll('.show-wage'));
    titleWage[0].innerHTML = "\u0417\u0430\u0440\u043F\u043B\u0430\u0442\u0430 \u0437\u0430 \u043C\u0435\u0441\u044F\u0446 \u0441\u043E\u0441\u0442\u0430\u0432\u0438\u0442 <br><u>".concat(arg.wage.clear, "</u> byn").toUpperCase();
    titleWage[1].innerHTML = "\u0412\u0441\u0435\u0433\u043E \u043D\u0430\u0447\u0438\u0441\u043B\u0435\u043D\u043E <u>".concat(arg.wage.dirty, "</u> byn").toUpperCase();
    var title = Array.from(document.querySelectorAll('.title'));
    showEmotion(title[1], arg);
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
    ;
    (_a = title[1]) === null || _a === void 0 ? void 0 : _a.after(ulList);
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
    ;
    (_b = title[2]) === null || _b === void 0 ? void 0 : _b.after(ulDeduction);
}
;
function getDelayPreloader() {
    var value = 0;
    while (value < 1500) {
        value = Math.floor(Math.random() * 5000);
    }
    return value;
}
;
function showLabelWorkoutHours() {
    workoutHoursLabel.textContent =
        +workoutHours.value > monthHours[month]
            ?
                "\u0421\u0432\u0435\u0440\u0445\u0443\u0440\u043E\u0447\u043D\u044B\u0445 \u0447\u0430\u0441\u043E\u0432 -  ".concat(+workoutHours.value - monthHours[month])
            :
                "\u042D\u0442\u043E \u043E\u043A\u043E\u043B\u043E ".concat(Math.floor(+workoutHours.value / 8), " \u0434\u043D\u0435\u0439");
}
;
function showLabelBonus() {
    bonusLabel.textContent = "\u041F\u0440\u0438\u043C\u0435\u0440\u043D\u043E ".concat(workoutHours && bonus ? (+workoutHours.value * 2.16 * +(+bonus.value / 100)).toFixed(2) : '0.00', " BYN \u0432 \u044D\u0442\u043E\u043C \u043C\u0435\u0441\u044F\u0446\u0435");
}
;
function showLabelTariff() {
    tariffLabel.textContent = "\u0422\u0430\u0440\u0438\u0444\u043D\u0430\u044F \u0441\u0442\u0430\u0432\u043A\u0430 ".concat(tariffRate[tariff.selectedIndex], " BYN \u0432 \u0447\u0430\u0441");
}
;
function showLabelExperience() {
    experienceLabel.textContent = "\u041F\u0440\u0438\u043C\u0435\u0440\u043D\u043E \u0437\u0430 \u043F\u043E\u043B\u043D\u044B\u0439  \u043C\u0435\u0441\u044F\u0446 - ".concat((monthHours[month] * 2 * workExperience[experience.selectedIndex]), " BYN");
}
;
function showLabelHardship() {
    hardshipLabel.innerHTML = "\u0412\u0440\u0435\u0434\u043D\u043E\u0441\u0442\u044C - ".concat((1.086 * hardshipАllowance[hardship.selectedIndex]).toFixed(2), " \u043A\u043E\u043F\u0435\u0435\u043A \u0432 \u0447\u0430\u0441");
}
;
function showEmotion(el, arg) {
    var emotionImg = document.querySelector('.emotion-img');
    var moodPercent = document.querySelector('.mood-percent');
    var percent = 0;
    var emotion = 'default';
    if (arg.mood) {
        if (arg.mood === '0')
            percent = 10 + Math.floor(Math.random() * 15);
        if (arg.mood === '1')
            percent = 30 + Math.floor(Math.random() * 30);
        if (arg.mood === '2')
            percent = 50 + Math.floor(Math.random() * 30);
        if (+arg.list["Разовая премия"])
            percent += Math.floor(Math.random() * 20);
        if (1 <= percent && percent <= 29) {
            moodPercent === null || moodPercent === void 0 ? void 0 : moodPercent.setAttribute('style', 'color = #ef6669');
            emotion = 'angry';
        }
        if (30 <= percent && percent <= 50) {
            moodPercent === null || moodPercent === void 0 ? void 0 : moodPercent.setAttribute('style', 'color = #3a7ea1');
            emotion = 'stress';
        }
        if (51 <= percent && percent <= 100) {
            moodPercent === null || moodPercent === void 0 ? void 0 : moodPercent.setAttribute('style', 'color = #c9b714');
            emotion = 'happiness';
        }
    }
    emotionImg.src = "images/".concat(emotion, ".png");
    emotionImg.alt = emotion;
    moodPercent.textContent = "".concat(percent, "%");
}
;
appLoad(month);
