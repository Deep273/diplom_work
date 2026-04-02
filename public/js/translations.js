// ---------------------- Переводы ----------------------
window.translations = {
    ru: {
        'nav.home': 'Главная',
        'nav.devices': 'Устройства',
        'nav.checks': 'Проверки',
        'nav.settings': 'Настройки',
        'nav.connections': 'Связь',

        'dashboard.title': "Дашборд",
        'dashboard.subtitle': "Обновлено: сейчас",
        'dashboard.devices': "Подключенные / отключенные",
        'dashboard.count': "Количество устройств",
        'devices.subtitle': "Общий дашборд по оборудованию",
        'devices.add': "Добавить устройство",
        'dashboard.description.errors': "Критические и предупреждения",
        'dashboard.description.count': "Всего устройств в системе",
        'dashboard.description.status': "Текущий статус устройств",
        "dashboard.devices.title": "Подключенные / отключенные устройства",
        "dashboard.devices.activity": "Активность устройств (за 24ч)",

        "status.all": "Все статусы",
        "status.online": "Онлайн",
        "status.offline": "Офлайн",
        "status.warn": "Предупреждение",
        "table.export": "Экспорт таблицы",
        "devices.search": "Поиск по имени или домену",
        "devices.table.name": "Наименование",
        "devices.table.ip": "IP / Домен",
        "devices.table.status": "Статус",
        "devices.table.ping": "Последний ping",
        "devices.table.location": "Локация",
        "devices.table.id": "ID",
        'devices.edit': "Редактировать",
        'devices.archive': "Архивировать",
        'devices.detail': "Подробнее",
        "devices.workstation": "Рабочее устройство",
        "devices.network": "Сетевое устройство",
        'devices.ip': 'IP адрес',
        'devices.domain': 'Доменное имя',
        'devices.model': 'Модель',
        "devices.location": 'Дата-центр 1',
        'devices.save': "Сохранить изменения",
        'devices.detail.location': 'Локация',

        'checks.title': "Проверки",
        'checks.subtitle': 'Запуск скриптов для тестирования оборудования',
        'checks.search': 'Поиск проверок',
        'checks.status.all': 'Все статусы',
        'checks.status.success': 'Успешно',
        'checks.status.warning': 'Предупреждение',
        'checks.status.error': 'Ошибка',
        'checks.add': 'Новая проверка',
        'checks.stats.title': 'Статистика проверок (24ч)',
        'checks.stats.errors': 'Ошибки',
        'checks.stats.warnings': 'Предупреждения',
        'checks.available': 'Доступные проверки',
        'checks.table.name': 'Проверка',
        'checks.table.description': 'Описание',
        'checks.table.target': 'Цель',
        'checks.table.lastRun': 'Последний запуск',
        'checks.table.result': 'Результат',
        'checks.modal.title.setting': 'Настройки проверки',
        'checks.modal.name': 'Название проверки',
        'checks.modal.description': 'Описание',
        'checks.modal.target': 'Цель проверки',
        'checks.modal.device': 'Выберите устройство',
        'checks.modal.group': 'Выберите группу',
        'checks.modal.add': 'Добавить',
        'checks.edit': 'Настроить',
        'checks.run': 'Запустить',
        'checks.modal.title.create': 'Добавить проверку',
        'checks.modal.selectDevice': 'Выберите устройство',


        'checks.modal.namePlaceholder': 'Название проверки',
        'checks.modal.descriptionPlaceholder': 'Краткое описание проверки',

        'checks.target.single': 'Одно устройство',
        'checks.target.group': 'Группа устройств',
        'checks.target.servers': 'Серверы',
        'groupDevices.workstations': 'Рабочие станции',
        'groupDevices.network': 'Сетевые устройства',
        'groupDevices.servers': 'Серверы',

        'connections.title': 'Связи устройств',
        'connections.subtitle': 'Схема подключений и зависимостей',
        'connections.searchPlaceholder': 'Поиск устройств',
        'connections.allTypes': 'Все типы связей',
        'connections.type.subordinate': 'Подчинённое',
        'connections.type.dependency': 'Зависимость',
        'connections.type.gateway': 'Шлюз',
        'connections.add': 'Добавить связь',
        'connections.table.title':"Список связей",
        'connections.countLabel': "Связей",
        'connections.modal.title': 'Добавить связь',
        'connections.devicesLabel':"Устройств",
        'connections.table.source': 'Источник',
        'connections.type': 'Тип связи',
        'connections.table.target': 'Цель',
        'connections.table.actions': 'Действия',
        'connections.modal.sourceLabel': 'Исходное устройство',
        'connections.modal.targetLabel': 'Целевое устройство',
        'connections.create': 'Создать связь',
        "devices.server": "Сервер",
        'devices.edit.title': "Редактировать устройство",

        'settings.title': 'Настройки',
        'settings.subtitle': 'Учётные записи и авторизация',
        'settings.auth': 'Учетки и авторизация',

        'account.title': 'Настройки учетной записи',
        'name': 'Имя',
        'account.email': 'Email',

        'password.change': 'Смена пароля',
        'password.current': 'Текущий пароль',
        'password.new': 'Новый пароль',
        'password.confirm': 'Подтвердите пароль',

        'btn.save': 'Сохранить',
        'btn.changePassword': 'Сменить пароль',
        'btn.logout': 'Выход',

        'language': 'Язык интерфейса',

        'session.timeout': 'Таймаут сессии (мин)',
        'accounts': 'Учетные записи',

        'modal.add': 'Добавить учетную запись',
        'modal.cancel': 'Отмена',
        'modal.create': 'Создать',
        'modal.password': 'Пароль',
        'modal.delete': 'Удалить',
        'table.login': 'Логин',
        "modal.connection": 'Управление связями',

        message: {
            createUser: "Пользователь создан",
            sessionExpired: "Сессия истекла",
            emailInUse: "Этот email уже используется",
            invalidEmail: "Некорректный email",
            weakPassword: "Слишком слабый пароль",
            invalidPassword: "Неверный текущий пароль",
            default: "Ошибка",
            required: "Заполните все поля",
            passwordLength: "Пароль должен быть минимум 6 символов",
            editPassword: "Пароль успешно изменён",
            passwordsWatch: "Пароли не совпадают",
            invalidAuth:"Вы не авторизованы",
            save: "Сохранено",
            confirmPassword: "Нужно подтвердить пароль",
            loginAccount: "Перезайдите в аккаунт для изменения email",
            invalidExportTable: "Нет таблицы для экспорта!",
            invalidExportGroup: "Нет активной группы для экспорта!",
            invalidUpdateDevice: "Ошибка при обновлении устройства!",
            updateDevice: "Устройство успешно обновлено!",
            invalidCreateDevice: "Ошибка при добавлении устройства!",
            createDevice: "Устройство успешно добавлено!",
            invalidArchiveDevice: "Ошибка при архивировании устройства!",
            archiveDevice: "Устройство архивировано!",
            invalidNameOrIP: "Введите хотя бы имя и IP устройства!",
            wantArchiveDevice: "Вы уверены, что хотите архивировать устройство?",
            enterNameCheck: "Введите название проверки",
            selectedDevices: "Выберите устройства",
            connectionExist: "Такая связь уже существует",
        }
    },

    en: {
        'nav.home': 'Home',
        'nav.devices': 'Devices',
        'nav.checks': 'Checks',
        'nav.settings': 'Settings',
        'nav.connections': 'Connections',

        'dashboard.title': "Dashboard",
        'dashboard.subtitle': "Updated: Now",
        'dashboard.devices': "Connected / Disconnected",
        'dashboard.count': "Count devices",
        'dashboard.description.errors': "Critical and warnings",
        'dashboard.description.count': "Total devices in the system",
        'dashboard.description.status': "Current device status",
        "dashboard.devices.title": "Connected / disconnected devices",
        "dashboard.devices.activity": "Device activity (in 24 hours)",

        "devices.subtitle": "General equipment dashboard",
        'devices.add': "Add device",
        "status.all": "All statuses",
        "status.online": "Online",
        "status.offline": "Offline",
        "status.warn": "Warning",
        "table.export": "Export table",
        "devices.search": "Search by name or domain",
        "devices.table.name": "Name",
        "devices.table.ip": "IP / Domain",
        "devices.table.status": "Status",
        "devices.table.ping": "Last ping",
        "devices.table.location": "Location",
        "devices.table.id": "ID",
        'devices.edit': "Edit",
        'devices.archive': 'Archive',
        'devices.detail': 'Details',
        "devices.count": 'devices',
        "devices.workstation": "Workstation",
        "devices.network": "Network device",
        "devices.server": "Server",
        'devices.ip': 'IP Address',
        'devices.domain': 'Domain Name',
        'devices.model': 'Model',
        "devices.location": 'Data center 1',
        'devices.save': "Save changes",
        'devices.edit.title': "Edit device",


        'checks.title': "Checks",
        'checks.subtitle': 'Run scripts to test equipment',
        'checks.search': 'Search checks',

        'checks.status.all': 'All statuses',
        'checks.status.success': 'Success',
        'checks.status.warning': 'Warning',
        'checks.status.error': 'Error',

        'checks.add': 'New check',

        'checks.stats.title': 'Checks statistics (24h)',
        'checks.stats.errors': 'Errors',
        'checks.stats.warnings': 'Warnings',

        'checks.available': 'Available checks',

        'checks.table.name': 'Check',
        'checks.table.description': 'Description',
        'checks.table.target': 'Target',
        'checks.table.lastRun': 'Last run',
        'checks.table.result': 'Result',
        'checks.edit': 'Edit',
        'checks.run': 'Run',

        'checks.modal.title.setting': 'Check settings',
        'checks.modal.name': 'Check name',
        'checks.modal.description': 'Description',
        'checks.modal.target': 'Check target',
        'checks.modal.device': 'Select device',
        'checks.modal.group': 'Select group',
        'checks.modal.add': 'Add',
        'checks.modal.title.create': 'Add check',
        'checks.modal.selectDevice': 'Select device',
        'checks.modal.namePlaceholder': 'Check name',
        'checks.modal.descriptionPlaceholder': 'Short description',
        'checks.target.single': 'Single device',
        'checks.target.group': 'Device group',
        'checks.target.servers': 'Servers',
        'groupDevices.workstations': 'Workstations',
        'groupDevices.network': 'Network devices',
        'groupDevices.servers': 'Servers',

        'connections.title': 'Device connections',
        'connections.subtitle': 'Connection and dependency diagram',
        'connections.searchPlaceholder': 'Search devices',
        'connections.allTypes': 'All connection types',
        'connections.type.subordinate': 'Subordinate',
        'connections.type.dependency': 'Dependency',
        'connections.type.gateway': 'Gateway',
        'connections.add': 'Add connection',
        'connections.table.title':"Connections list",
        'connections.countLabel': "Connections",
        'connections.devicesLabel':"Devices",
        'connections.table.source': 'Source',
        'connections.type': 'Connection type',
        'connections.table.target': 'Target',
        'connections.table.actions': 'Actions',
        'connections.modal.sourceLabel': 'Source device',
        'connections.modal.targetLabel': 'Target device',
        'connections.create': 'Create connection',

        'settings.title': 'Settings',
        'settings.subtitle': 'Accounts and authentication',
        'settings.auth': 'Accounts and authorization',

        'account.title': 'Account settings',
        'name': 'Name',
        'account.email': 'Email',

        'password.change': 'Change password',
        'password.current': 'Current password',
        'password.new': 'New password',
        'password.confirm': 'Confirm password',

        'btn.save': 'Save',
        'btn.changePassword': 'Change password',
        'btn.logout': 'Logout',

        'language': 'Interface language',

        'session.timeout': 'Session timeout (min)',
        'accounts': 'Accounts',

        'modal.add': 'Add account',
        'modal.cancel': 'Cancel',
        'modal.create': 'Create',
        'modal.password': 'Password',
        'modal.delete': 'Delete',
        "modal.connection": 'Management connections',

        'table.login': 'Login',

        message: {
            createUser: "The user has been created",
            sessionExpired: "The session has expired",
            invalidPassword: "Invalid current password",
            emailInUse: "This email is already in use",
            invalidEmail: "Invalid email",
            weakPassword: "Password is too weak",
            default: "Error",
            required: "Fill in all fields",
            passwordLength: "Password must be at least 6 characters",
            editPassword: "Password successfully changed",
            passwordsWatch: "Passwords don't match",
            invalidAuth: "You are not logged in",
            save: "Save",
            confirmPassword: "You need to confirm your password",
            loginAccount: "Log in to your account to change your email",
            invalidExportTable: "There is no table to export!",
            invalidExportGroup: "There is no active export group!",
            invalidUpdateDevice: "Error updating the device!",
            updateDevice: "The device has been successfully updated!",
            invalidCreateDevice: "The device has been added successfully!",
            createDevice: "Error when adding a device!",
            invalidArchiveDevice: "Error when archiving the device!",
            archiveDevice: "The device is archived!",
            invalidNameOrIP: "At least enter the device's name and IP address!",
            wantArchiveDevice: "Are you sure you want to archive the device?",
            enterNameCheck: "Enter the name of the check",
            selectedDevices: "Select devices",
            connectionExist: "Such a connection already exists",
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const lang = localStorage.getItem('language') || 'ru';
    applyTranslations(lang);
});

function applyTranslations(lang) {
    // TEXT
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translation = window.translations?.[lang]?.[key];

        if (translation) {
            el.textContent = translation;
        }
    });

    // PLACEHOLDER
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        const translation = window.translations?.[lang]?.[key];

        if (translation) {
            el.placeholder = translation;
        }
    });
}

function translateAlert(key, params = {}) {
    const lang = localStorage.getItem('language') || 'ru';

    const keys = key.split('.');
    let text = window.translations?.[lang];

    for (let k of keys) {
        text = text?.[k];
    }

    if (!text) return key;

    Object.keys(params).forEach(p => {
        text = text.replace(`{${p}}`, params[p]);
    });

    return text;
}

