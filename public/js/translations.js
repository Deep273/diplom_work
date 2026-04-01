// ---------------------- Переводы ----------------------
window.translations = {
    ru: {
        'nav.home': 'Главная',
        'nav.devices': 'Устройства',
        'nav.checks': 'Проверки',
        'nav.settings': 'Настройки',
        'nav.connections': 'Связь',

        'devices.subtitle': "Общий дашборд по оборудованию",
        'devices.add': "Добавить устройство",
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
    },

    en: {
        'nav.home': 'Home',
        'nav.devices': 'Devices',
        'nav.checks': 'Checks',
        'nav.settings': 'Settings',
        'nav.connections': 'Connections',

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

        'table.login': 'Login',
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
