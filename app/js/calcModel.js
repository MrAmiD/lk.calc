/**
 * Created by mrAmiD
 */



$(function() {
    var infoProdCalc;
    infoProdCalc = new Vue({
        components: {
            Multiselect: window.VueMultiselect.default,
        },
        el: '#infoProd',
        data: {
            specialistPrice: {
                designer: new specialist(0, 'designer', 1, 1250),
                developer: new specialist(0, 'developer', 1, 1250),
                seo: new specialist(0, 'seo', 1, 1250),
                accounter: new specialist(0, 'accounter', 1, 1250),
                seoDiz: new specialist(0, 'seoDiz', 1, 500),//Подключение к системе Д.И.З. для seo
                allDiz: new specialist(0, 'allDiz', 1, 900),//Подключение к системе Д.И.З. для всех
                default: new specialist(0, 'accounter', 1, 1250),//Значение по умолчанию
            },
            infoProdTableArr: {
                table1: {//Один информационный продукт(таблица)
                    headersArr: [
                        'Информационные Продукты от IT-Эксперта',
                        'Стоимость',
                        'Комментарий',
                        'Премия'
                    ],
                    rowValArr: [//массив строк, один объект - одна строка
                        {
                            name: 'Консультационные услуги',//наименование услуги
                            price: 0,//стоимость услуги, вычисляется при помощи функциии
                            additionPrice: 0,//фиксированная добавочная стоимость, например +100 рублей
                            priceSiteKey: '',//ключ для услуги, цена которой уже вычеслена, например: siteCalc.landing.price .. используется в блоке Информационные Продукты по Разработке
                            sitePrice: false, //для начала необходимо вычислить цену сайта
                            priceParam: {//параметры для вычесления цены на услуги (для)
                                specialistArr: [//специалисты, задействованные в этой услуге
                                    {
                                        hours: 2,//кол-во затраченных часов специалиста
                                        specialist: 'accounter',//специалист, выполняющий работу, это ключ для выборки из specialistPrice
                                        koef: 1//коэфициент, на который умножаются часы, по умолчанию 1
                                    }
                                ]
                            },
                            comment: 'За 1 час консультирования клиента',
                            premia: {
                                percent: 20, //Премия в процентах,
                                premiaFixed: 0, //Фиксированная премия
                                additional: 0 //Добавочная премия
                            }
                        },
                        {
                            name: 'Прототипирование сайта',//наименование услуги
                            price: 0,//стоимость услуги, вычисляется при помощи функциии
                            additionPrice: 0,//фиксированная добавочная стоимость, например +100 рублей
                            priceSiteKey: '',//ключ для услуги, цена которой уже вычеслена, например: siteCalc.landing.price .. используется в блоке Информационные Продукты по Разработке
                            sitePrice: false, //для начала необходимо вычислить цену сайта
                            priceParam: {//параметры для вычесления цены на услуги (для)
                                specialistArr: [//специалисты, задействованные в этой услуге
                                    {
                                        hours: 4,//кол-во затраченных часов специалиста
                                        specialist: 'accounter'//специалист, выполняющий работу, это ключ для выборки из specialistPrice
                                    }
                                ]
                            },
                            comment: 'От 4-х часов на комплект страниц для сайта визитки',
                            premia: {
                                percent: 20, //Премия в процентах,
                                premiaFixed: 0, //Фиксированная премия
                                additional: 0 //Добавочная премия
                            }
                        },
                        {
                            name: 'Разработка технического задания',//наименование услуги
                            price: 0,//стоимость услуги, вычисляется при помощи функциии
                            additionPrice: 0,//фиксированная добавочная стоимость, например +100 рублей
                            priceSiteKey: '',//ключ для услуги, цена которой уже вычеслена, например: siteCalc.landing.price .. используется в блоке Информационные Продукты по Разработке
                            sitePrice: false, //для начала необходимо вычислить цену сайта
                            priceParam: {//параметры для вычесления цены на услуги (для)
                                specialistArr: [//специалисты, задействованные в этой услуге
                                    {
                                        hours: 20,//кол-во затраченных часов специалиста
                                        specialist: 'accounter'//специалист, выполняющий работу, это ключ для выборки из specialistPrice
                                    }
                                ]
                            },
                            comment: 'На разработку хорошего ТЗ берем не менее 20 часов',
                            premia: {
                                percent: 20, //Премия в процентах,
                                premiaFixed: 0, //Фиксированная премия
                                additional: 0 //Добавочная премия
                            }
                        },
                        {
                            name: 'Регистрация доменных имен',//наименование услуги
                            price: 0,//стоимость услуги, вычисляется при помощи функциии
                            additionPrice: 0,//фиксированная добавочная стоимость, например +100 рублей
                            priceSiteKey: '',//ключ для услуги, цена которой уже вычеслена, например: siteCalc.landing.price .. используется в блоке Информационные Продукты по Разработке
                            sitePrice: false, //для начала необходимо вычислить цену сайта
                            priceParam: {//параметры для вычесления цены на услуги (для)
                                specialistArr: [//специалисты, задействованные в этой услуге
                                    {
                                        hours: 2,//кол-во затраченных часов специалиста
                                        specialist: 'developer'//специалист, выполняющий работу, это ключ для выборки из specialistPrice
                                    }
                                ]
                            },
                            comment: 'До 10 доменов за эту цену, стоимость домена как на Reg.ru',
                            premia: {
                                percent: 20, //Премия в процентах,
                                premiaFixed: 0, //Фиксированная премия
                                additional: 0 //Добавочная премия
                            }
                        },
                        {
                            name: 'Настройка корпоративной почты на Yandex',//наименование услуги
                            price: 0,//стоимость услуги, вычисляется при помощи функциии
                            additionPrice: 0,//фиксированная добавочная стоимость, например +100 рублей
                            priceSiteKey: '',//ключ для услуги, цена которой уже вычеслена, например: siteCalc.landing.price .. используется в блоке Информационные Продукты по Разработке
                            sitePrice: false, //для начала необходимо вычислить цену сайта
                            priceParam: {//параметры для вычесления цены на услуги (для)
                                specialistArr: [//специалисты, задействованные в этой услуге
                                    {
                                        hours: 2,//кол-во затраченных часов специалиста
                                        specialist: 'developer'//специалист, выполняющий работу, это ключ для выборки из specialistPrice
                                    }
                                ]
                            },
                            comment: 'Работа с 1 доменом и настройка до 5 ящиков',
                            premia: {
                                percent: 20, //Премия в процентах,
                                premiaFixed: 0, //Фиксированная премия
                                additional: 0 //Добавочная премия
                            }
                        },
                        {
                            name: 'Установка SSL сертификата',//наименование услуги
                            price: 0,//стоимость услуги, вычисляется при помощи функциии
                            additionPrice: 0,//фиксированная добавочная стоимость, например +100 рублей
                            priceSiteKey: '',//ключ для услуги, цена которой уже вычеслена, например: siteCalc.landing.price .. используется в блоке Информационные Продукты по Разработке
                            sitePrice: false, //для начала необходимо вычислить цену сайта
                            priceParam: {//параметры для вычесления цены на услуги (для)
                                specialistArr: [//специалисты, задействованные в этой услуге
                                    {
                                        hours: 2,//кол-во затраченных часов специалиста
                                        specialist: 'developer'//специалист, выполняющий работу, это ключ для выборки из specialistPrice
                                    }
                                ]
                            },
                            comment: 'Самостоятельно - только в связке хостинга TimeWeb и системмы MODx',
                            premia: {
                                percent: 20, //Премия в процентах,
                                premiaFixed: 0, //Фиксированная премия
                                additional: 0 //Добавочная премия
                            }
                        },
                        {
                            name: 'Подключение к системе Д.И.З.',//наименование услуги
                            price: 0,//стоимость услуги, вычисляется при помощи функциии
                            additionPrice: 0,//фиксированная добавочная стоимость, например +100 рублей
                            priceSiteKey: '',//ключ для услуги, цена которой уже вычеслена, например: siteCalc.landing.price .. используется в блоке Информационные Продукты по Разработке
                            sitePrice: false, //для начала необходимо вычислить цену сайта
                            priceParam: {//параметры для вычесления цены на услуги (для)
                                specialistArr: [//специалисты, задействованные в этой услуге
                                    {
                                        hours: 12,//кол-во затраченных часов специалиста
                                        specialist: 'seoDiz'//специалист, выполняющий работу, это ключ для выборки из specialistPrice
                                    }
                                ]
                            },
                            comment: 'Годовая оплата, услуга только для SEO проектов',
                            premia: {
                                percent: 20, //Премия в процентах,
                                premiaFixed: 0, //Фиксированная премия
                                additional: 0 //Добавочная премия
                            }
                        },
                        {
                            name: 'Подключение к системе Д.И.З.',//наименование услуги
                            price: 0,//стоимость услуги, вычисляется при помощи функциии
                            additionPrice: 0,//фиксированная добавочная стоимость, например +100 рублей
                            priceSiteKey: '',//ключ для услуги, цена которой уже вычеслена, например: siteCalc.landing.price .. используется в блоке Информационные Продукты по Разработке
                            sitePrice: false, //для начала необходимо вычислить цену сайта
                            priceParam: {//параметры для вычесления цены на услуги (для)
                                specialistArr: [//специалисты, задействованные в этой услуге
                                    {
                                        hours: 12,//кол-во затраченных часов специалиста
                                        specialist: 'allDiz'//специалист, выполняющий работу, это ключ для выборки из specialistPrice
                                    }
                                ]
                            },
                            comment: 'Годовая оплата, услуга для всех',
                            premia: {
                                percent: 20, //Премия в процентах,
                                premiaFixed: 0, //Фиксированная премия
                                additional: 0 //Добавочная премия
                            }
                        },
                    ]
                },
                table2: {//Один информационный продукт(таблица)
                    headersArr: [
                        'Информационные Продукты по Разработке',
                        'Стоимость',
                        'Комментарий',
                        'Премия'
                    ],
                    rowValArr: [//массив строк, один объект - одна строка
                        {
                            name: 'Разработка Сайт визитка на MODx',//наименование услуги
                            price: 0,//стоимость услуги, вычисляется при помощи функциии
                            additionPrice: 0,//фиксированная добавочная стоимость, например +100 рублей
                            priceSiteKey: '',//ключ для услуги, цена которой уже вычеслена, например: siteCalc.landing.price .. используется в блоке Информационные Продукты по Разработке
                            sitePrice: true, //для начала необходимо вычислить цену сайта
                            priceParam: {//параметры для вычесления цены на услуги (для)
                                specialistArr: [//специалисты, задействованные в этой услуге
                                    {
                                        hours: 0,//кол-во затраченных часов специалиста
                                        specialist: 'accounter',//специалист, выполняющий работу, это ключ для выборки из specialistPrice
                                        koef: 1//коэфициент, на который умножаются часы, по умолчанию 1
                                    }
                                ]
                            },
                            comment: 'По смете (пример, ask-perm.ru)',
                            premia: {
                                percent: 10, //Премия в процентах,
                                premiaFixed: 0, //Фиксированная премия
                                additional: 0 //Добавочная премия
                            },
                            tablesInner: {
                                //add rowValArr
                                designTable1: new tableProto(['Объекты дизайна', 'Часы', 'Стоимость'],
                                    [new tableRow().siteSet('Прототипирование', 2, {
                                        specialistArr: [
                                            new specialist(2, 'accounter', 1)
                                        ]
                                    })
                                    ]),
                                designTable2: new tableProto(['Объекты дизайна', 'Часы', 'Стоимость'],
                                    [new tableRow().siteSet('Главная страница', 6, {
                                        specialistArr: [
                                            new specialist(6, 'designer', 1)
                                        ]
                                    }),
                                        new tableRow().siteSet('Страница вывода ресурсов', 1, {
                                            specialistArr: [
                                                new specialist(1, 'designer', 1)
                                            ]
                                        }),
                                        new tableRow().siteSet('Типовая страница', 1, {
                                            specialistArr: [
                                                new specialist(1, 'designer', 1)
                                            ]
                                        }),
                                    ]),
                                programTable: new tableProto(['Объекты программирования', 'Часы', 'Стоимость'],
                                    [new tableRow().siteSet('Адаптивная верстка всего проекта', 0)]),
                                additionalTable: new tableProto(['Объекты Доп.Работ', 'Часы', 'Стоимость'],
                                    [new tableRow().siteSet('Экваринг', 4, {
                                        specialistArr: [
                                            new specialist(4, 'developer', 1)
                                        ]
                                    })
                                    ]),
                                layoutKoef: 2.6,//коэфициент для верстки, используется для вычисления количества часов адаптивной верстки всего проекта
                                dailyHours: 4,//количество часов, выделяемое ежедневно на проект
                                itogoProject: {
                                    itogoHours: 0,//Суммарное время за весь проект
                                    itogoDays: 0,//Сумарное количество дней
                                    itogoPrice: 0//Суммарная стоимость проекта
                                }
                            }
                        },
                        {
                            name: 'Прототипирование сайта',//наименование услуги
                            price: 0,//стоимость услуги, вычисляется при помощи функциии
                            additionPrice: 0,//фиксированная добавочная стоимость, например +100 рублей
                            priceSiteKey: '',//ключ для услуги, цена которой уже вычеслена, например: siteCalc.landing.price .. используется в блоке Информационные Продукты по Разработке
                            sitePrice: false, //для начала необходимо вычислить цену сайта
                            priceParam: {//параметры для вычесления цены на услуги (для)
                                specialistArr: [//специалисты, задействованные в этой услуге
                                    {
                                        hours: 4,//кол-во затраченных часов специалиста
                                        specialist: 'accounter'//специалист, выполняющий работу, это ключ для выборки из specialistPrice
                                    }
                                ]
                            },
                            comment: 'От 4-х часов на комплект страниц для сайта визитки',
                            premia: {
                                percent: 20, //Премия в процентах,
                                premiaFixed: 0, //Фиксированная премия
                                additional: 0 //Добавочная премия
                            }
                        },
                        {
                            name: 'Разработка технического задания',//наименование услуги
                            price: 0,//стоимость услуги, вычисляется при помощи функциии
                            additionPrice: 0,//фиксированная добавочная стоимость, например +100 рублей
                            priceSiteKey: '',//ключ для услуги, цена которой уже вычеслена, например: siteCalc.landing.price .. используется в блоке Информационные Продукты по Разработке
                            sitePrice: false, //для начала необходимо вычислить цену сайта
                            priceParam: {//параметры для вычесления цены на услуги (для)
                                specialistArr: [//специалисты, задействованные в этой услуге
                                    {
                                        hours: 20,//кол-во затраченных часов специалиста
                                        specialist: 'accounter'//специалист, выполняющий работу, это ключ для выборки из specialistPrice
                                    }
                                ]
                            },
                            comment: 'На разработку хорошего ТЗ берем не менее 20 часов',
                            premia: {
                                percent: 20, //Премия в процентах,
                                premiaFixed: 0, //Фиксированная премия
                                additional: 0 //Добавочная премия
                            }
                        },
                        {
                            name: 'Регистрация доменных имен',//наименование услуги
                            price: 0,//стоимость услуги, вычисляется при помощи функциии
                            additionPrice: 0,//фиксированная добавочная стоимость, например +100 рублей
                            priceSiteKey: '',//ключ для услуги, цена которой уже вычеслена, например: siteCalc.landing.price .. используется в блоке Информационные Продукты по Разработке
                            sitePrice: false, //для начала необходимо вычислить цену сайта
                            priceParam: {//параметры для вычесления цены на услуги (для)
                                specialistArr: [//специалисты, задействованные в этой услуге
                                    {
                                        hours: 2,//кол-во затраченных часов специалиста
                                        specialist: 'developer'//специалист, выполняющий работу, это ключ для выборки из specialistPrice
                                    }
                                ]
                            },
                            comment: 'До 10 доменов за эту цену, стоимость домена как на Reg.ru',
                            premia: {
                                percent: 20, //Премия в процентах,
                                premiaFixed: 0, //Фиксированная премия
                                additional: 0 //Добавочная премия
                            }
                        },
                        {
                            name: 'Настройка корпоративной почты на Yandex',//наименование услуги
                            price: 0,//стоимость услуги, вычисляется при помощи функциии
                            additionPrice: 0,//фиксированная добавочная стоимость, например +100 рублей
                            priceSiteKey: '',//ключ для услуги, цена которой уже вычеслена, например: siteCalc.landing.price .. используется в блоке Информационные Продукты по Разработке
                            sitePrice: false, //для начала необходимо вычислить цену сайта
                            priceParam: {//параметры для вычесления цены на услуги (для)
                                specialistArr: [//специалисты, задействованные в этой услуге
                                    {
                                        hours: 2,//кол-во затраченных часов специалиста
                                        specialist: 'developer'//специалист, выполняющий работу, это ключ для выборки из specialistPrice
                                    }
                                ]
                            },
                            comment: 'Работа с 1 доменом и настройка до 5 ящиков',
                            premia: {
                                percent: 20, //Премия в процентах,
                                premiaFixed: 0, //Фиксированная премия
                                additional: 0 //Добавочная премия
                            }
                        },
                        {
                            name: 'Установка SSL сертификата',//наименование услуги
                            price: 0,//стоимость услуги, вычисляется при помощи функциии
                            additionPrice: 0,//фиксированная добавочная стоимость, например +100 рублей
                            priceSiteKey: '',//ключ для услуги, цена которой уже вычеслена, например: siteCalc.landing.price .. используется в блоке Информационные Продукты по Разработке
                            sitePrice: false, //для начала необходимо вычислить цену сайта
                            priceParam: {//параметры для вычесления цены на услуги (для)
                                specialistArr: [//специалисты, задействованные в этой услуге
                                    {
                                        hours: 2,//кол-во затраченных часов специалиста
                                        specialist: 'developer'//специалист, выполняющий работу, это ключ для выборки из specialistPrice
                                    }
                                ]
                            },
                            comment: 'Самостоятельно - только в связке хостинга TimeWeb и системмы MODx',
                            premia: {
                                percent: 20, //Премия в процентах,
                                premiaFixed: 0, //Фиксированная премия
                                additional: 0 //Добавочная премия
                            }
                        },
                        {
                            name: 'Подключение к системе Д.И.З.',//наименование услуги
                            price: 0,//стоимость услуги, вычисляется при помощи функциии
                            additionPrice: 0,//фиксированная добавочная стоимость, например +100 рублей
                            priceSiteKey: '',//ключ для услуги, цена которой уже вычеслена, например: siteCalc.landing.price .. используется в блоке Информационные Продукты по Разработке
                            sitePrice: false, //для начала необходимо вычислить цену сайта
                            priceParam: {//параметры для вычесления цены на услуги (для)
                                specialistArr: [//специалисты, задействованные в этой услуге
                                    {
                                        hours: 12,//кол-во затраченных часов специалиста
                                        specialist: 'seoDiz'//специалист, выполняющий работу, это ключ для выборки из specialistPrice
                                    }
                                ]
                            },
                            comment: 'Годовая оплата, услуга только для SEO проектов',
                            premia: {
                                percent: 20, //Премия в процентах,
                                premiaFixed: 0, //Фиксированная премия
                                additional: 0 //Добавочная премия
                            }
                        },
                        {
                            name: 'Подключение к системе Д.И.З.',//наименование услуги
                            price: 0,//стоимость услуги, вычисляется при помощи функциии
                            additionPrice: 0,//фиксированная добавочная стоимость, например +100 рублей
                            priceSiteKey: '',//ключ для услуги, цена которой уже вычеслена, например: siteCalc.landing.price .. используется в блоке Информационные Продукты по Разработке
                            sitePrice: false, //для начала необходимо вычислить цену сайта
                            priceParam: {//параметры для вычесления цены на услуги (для)
                                specialistArr: [//специалисты, задействованные в этой услуге
                                    {
                                        hours: 12,//кол-во затраченных часов специалиста
                                        specialist: 'allDiz'//специалист, выполняющий работу, это ключ для выборки из specialistPrice
                                    }
                                ]
                            },
                            comment: 'Годовая оплата, услуга для всех',
                            premia: {
                                percent: 20, //Премия в процентах,
                                premiaFixed: 0, //Фиксированная премия
                                additional: 0 //Добавочная премия
                            }
                        },
                    ]
                },
            },
            formTriggers: {//всё что выбрано в форме
                productSelect: '',// продукт для продажи
            },

        },
        methods: {
            calcTableSInner: function (tableInner, trTable, tableName) {//для вычисления цены тыблиц: Объекты дизайна(Прототип), Объекты дизайна(Дизайн)
                var arrTr = tableInner.rowValArr, varthis = this;
                arrTr.forEach(function (itemTr, i, arrTr) { // высчитываем цену для каждой строки
                    if (tableName == 'programTable') {//таблица Объекты программирования
                        itemTr.itogoHours = trTable.tablesInner.layoutKoef * trTable.tablesInner.designTable2.itogoHours;//Вычисляем количество часов, "ыремя на дизайн" * коэфициент
                        itemTr.itogo = trTable.tablesInner.layoutKoef * trTable.tablesInner.designTable2.itogoHours * varthis.specialistPrice['developer'].price;

                        tableInner.itogo = trTable.tablesInner.layoutKoef * trTable.tablesInner.designTable2.itogoHours * varthis.specialistPrice['developer'].price;
                        tableInner.itogoHours = trTable.tablesInner.layoutKoef * trTable.tablesInner.designTable2.itogoHours;

                    } else {
                        var arrSpec = itemTr.priceParam.specialistArr;//Все специалисты, работающие над проектом
                        arrSpec.forEach(function (itemSpec, i, arrSpec) {
                            itemTr.price += varthis.specialistPrice[itemSpec.specialist].price * itemSpec.hours;
                            trTable.price += varthis.specialistPrice[itemSpec.specialist].price * itemSpec.hours;
                            tableInner.itogoHours += itemSpec.hours;
                        });
                        tableInner.itogo += trTable.price;
                    }
                });
                return trTable;
            },
            calcItogo: function (singleTable) {//Вычисление итоговых значений для внутренних таблиц
                $.map(singleTable.rowValArr, function (trTable, i) {
                    if(trTable.sitePrice){//Значит есть внутренние таблицы  ии нам стоит посчитать итоговуб стоимость

                        trTable.tablesInner.itogoProject.itogoHours = 0;
                        trTable.tablesInner.itogoProject.itogoPrice = 0;

                        $.map(trTable.tablesInner, function (innerTable, i) {
                            if( typeof innerTable === "object" && innerTable.itogoDays === undefined){//если это object, значит это таблица... 2е условие для исключения объекта итого
                                console.log('tableObject', innerTable);

                                trTable.tablesInner.itogoProject.itogoHours += innerTable.itogoHours;
                                trTable.tablesInner.itogoProject.itogoPrice += innerTable.itogo;

                            }
                         });
                        trTable.tablesInner.itogoProject.itogoDays = trTable.tablesInner.itogoProject.itogoHours / trTable.tablesInner.dailyHours;
                    }

                });

                //singleTable.tablesInner.itogoProject.itogoDays;

                //singleTable.tablesInner.itogoProject.itogoPrice;
            },
            calcPrice: function () {
                /*
                 * При вычислении учесть следующие особенности:
                 * 1) В rowValArr у объекта есть параметр priceSiteKey и fixedPrice.
                 * Начинать вычисление цены если fixedPrice === false and priceSiteKey === '' or priceSiteKey === undefined
                 * Если fixedPrice === true, то цена фиксирована и price не пересчитывается
                 * priceSiteKey === '' priceSiteKey !== undefined -> ерём цену по селектору, который указан в priceSiteKey
                 * */
                console.log('calcPrice run');
                var varthis = this;

                $.map(varthis.infoProdTableArr, function (singleTable, i) {
                    console.log('singleTable.headersArr', singleTable.headersArr);
                    $.map(singleTable.rowValArr, function (trTable, i) {
                        //console.log('trTable', trTable.price);
                        if (trTable.sitePrice === false && trTable.priceSiteKey === '') {
                            var arr = trTable.priceParam.specialistArr;
                            arr.forEach(function (item, i, arr) { // если над проектом работают несколько специалистов
                                // console.log('specialist', item.specialist);
                                trTable.price += varthis.specialistPrice[item.specialist].price * item.hours;
                            });
                            trTable.price += trTable.additionPrice;//добавочная стоимость
                            //Доделать, с использованием priceSiteKey, проверить на таблице с сайтамми
                        }

                        if (trTable.sitePrice === true) {
                            /*Расчет внутренних страниц*/
                            varthis.calcTableSInner(trTable.tablesInner.designTable1, trTable);//Объекты дизайна - Прототипирование
                            varthis.calcTableSInner(trTable.tablesInner.designTable2, trTable);//Объекты дизайна - Дизайнер
                            varthis.calcTableSInner(trTable.tablesInner.programTable, trTable, 'programTable');//Объекты программирования
                            varthis.calcTableSInner(trTable.tablesInner.additionalTable, trTable);//Объекты дизайна - Дизайнер


                            //Расчет Объект работ


                            //Расчёт итоговых показателей за проект


                            // var arrTr = tableInner.rowValArr;
                            // arrTr.forEach(function(itemTr, i, arrTr) { // высчитываем цену для каждой строки
                            //     var arrSpec = itemTr.priceParam.specialistArr;//Все специалисты, работающие над проектом
                            //     arrSpec.forEach(function(itemSpec, i, arrSpec) {
                            //         itemTr.price += varthis.specialistPrice[itemSpec.specialist].price * itemSpec.hours;
                            //         trTable.price += varthis.specialistPrice[itemSpec.specialist].price * itemSpec.hours;
                            //         tableInner.itogoHours += itemSpec.hours;
                            //     });
                            // });
                            // tableInner.itogo += trTable.price;
                            /*Объекты дизайна  - Дизайн*/


                        }
                    });

                    varthis.calcItogo(singleTable);



                });


            },
        },
        watch: {},
        mounted: function () {
            var varthis = this;
            //this.infoProdTableArr.table1.rowValArr[0].price = 123123;
            varthis.calcPrice();

        }
    });



});

