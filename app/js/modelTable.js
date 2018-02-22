/**
 * Created by mrAmiD
 */


//   https://developer.mozilla.org/ru/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript
//   Объекты, создаваемые пользователем
var tableRow = function (name, price, additionPrice, sitePrice, priceParam, comment, premia, tablesInner, hours, specialist) {
    //Значения по умолчанию
    this.name = typeof name !== 'undefined' ? name : 'Разработка Сайт визитка на MODx';//наименование услуги
    this.price = typeof price !== 'undefined' ? price : 0;//стоимость услуги, вычисляется при помощи функциии
    this.additionPrice = typeof additionPrice !== 'undefined' ? additionPrice : '';//фиксированная добавочная стоимость, например +100 рублей
    this.priceSiteKey = typeof priceSiteKey !== 'undefined' ? priceSiteKey : '';//ключ для услуги, цена которой уже вычеслена, например: siteCalc.landing.price .. используется в блоке Информационные Продукты по Разработке
    this.sitePrice = typeof sitePrice !== 'undefined' ? sitePrice : '';//для начала необходимо вычислить цену сайта
    this.priceParam = typeof priceParam !== 'undefined'
        ? priceParam : {//параметры для вычесления цены на услуги
        specialistArr:[//специалисты, задействованные в этой услуге
            //specialist object array
        ]
    };

    this.comment = typeof comment !== 'undefined' ? comment : '';//параметры для вычесления цены на услуги

    this.premia = typeof premia !== 'undefined'
        ? premia : {//премия для продажника
        percent: 20, //Премия в процентах,
        premiaFixed: 0, //Фиксированная премия
        additional: 0 //Добавочная премия
    };
    //for sites tables start
    this.tablesInner = typeof tablesInner !== 'undefined'
        ? tablesInner : {//таблицы из которых высчитывается общая стоимость сайта
        designTable1: {//Объекты дизайна, прототип
            //tableProto
        },
        designTable2: {//Объекты дизайна, дизайн
            //tableProto
        },
        programTable: {//Объекты программирования
            //tableProto
        },
        additionalTable: {//Объекты Доп.Работ
            //tableProto
        },
        layoutKoef: 1,//коэфициент для верстки, используется для вычисления количества часов адаптивной верстки всего проекта
        dailyHours: 4//количество часов, выделяемое ежедневно на проект
    };

    this.hours = typeof hours !== 'undefined' ? hours : 0;//Количество затраченного времени специалиста
    this.specialist = typeof specialist !== 'undefined' ? specialist : '';//Количество затраченного времени специалиста


    //for sites tables end
};

tableRow.prototype.mainSet = function(name, comment, price, premiaPerc) {
    this.name = typeof name !== 'undefined' ? name : 'Разработка Сайт визитка на MODx';//наименование услуги
    this.comment = typeof comment !== 'undefined' ? comment : '';//параметры для вычесления цены на услуги
    this.price = typeof price !== 'undefined' ? price : 0;//стоимость услуги, вычисляется при помощи функциии
    this.premia.percent = typeof premiaPerc !== 'undefined' ? premiaPerc : 20;//стоимость услуги, вычисляется при помощи функциии
    return this;
};
tableRow.prototype.siteSet = function(name, hours, priceParam) {
    this.name = typeof name !== 'undefined' ? name : '';//наименование услуги
    this.hours = typeof hours !== 'undefined' ? hours : '';//Количество затраченного времени специалиста
    this.priceParam = typeof priceParam !== 'undefined'
        ? priceParam : {//параметры для вычесления цены на услуги
        specialistArr:[//специалисты, задействованные в этой услуге
            
        ]
    };
    
    return this;
};

var specialist = function (hours, specialist, koef) {
    //Значения по умолчанию
    this.hours = typeof hours !== 'undefined' ? hours : 0;//кол-во затраченных часов специалиста
    this.specialist = typeof specialist !== 'undefined' ? specialist : 'accounter';//специалист, выполняющий работу, это ключ для выборки из specialistPrice
    this.koef = typeof koef !== 'undefined' ? koef : 1;//коэфициент, на который умножаются часы, по умолчанию 1
};


var tableProto = function (headersArr, rowValArr){
    this.headersArr = typeof headersArr !== 'undefined'
        ? headersArr : [//шапка таблицы
                            'Информационные Продукты по Разработке',
                            'Стоимость',
                            'Комментарий',
                            'Премия'
                        ];
    this.rowValArr = typeof rowValArr !== 'undefined' ? rowValArr : [];//массив строк, один объект - одна строка, состоит из объектов tableRow
    this.itogo = 0;//итоговая стоимость, для таблиц с сайтами
    this.itogoHours = 0;//итоговая стоимость, для таблиц с сайтами
};

