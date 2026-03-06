<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Детализация устройства</title>
    <link rel="stylesheet" href="{{ asset('css/variables.css') }}">
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
</head>
<body>
<div class="layout">
    <aside class="sidebar">
        <div class="sidebar-logo">DM</div>
        <nav class="sidebar-nav">
            <a href="{{ route('dashboard') }}" class="nav-item">Главная</a>
            <a href="{{ route('devices') }}" class="nav-item">Устройства</a>
            <a href="{{ route('checks') }}" class="nav-item">Проверки</a>
            <a href="{{ route('settings') }}" class="nav-item">Настройки</a>
            <a href="{{ route('connections') }}" class="nav-item active">Связь</a>
        </nav>
        <div class="sidebar-footer">
            <span class="sidebar-user">admin</span>
        </div>
    </aside>

    <main class="main">
        <header class="main-header">
            <h1 class="page-title">Детализация устройства</h1>
            <div class="header-meta">Core Router 1</div>
        </header>

        <section class="page-content">
            <div class="grid-2">
                <div class="card">
                    <div class="card-title">Информация об устройстве</div>
                    <div class="form">
                        <div class="form-field">
                            <span class="form-label">ID устройства</span>
                            <span>dev-0001</span>
                        </div>
                        <div class="form-field">
                            <span class="form-label">Наименование</span>
                            <span>Core Router 1</span>
                        </div>
                        <div class="form-field">
                            <span class="form-label">Модель</span>
                            <span>Router XR500</span>
                        </div>
                        <div class="form-field">
                            <span class="form-label">IP адрес</span>
                            <span>10.0.0.1</span>
                        </div>
                        <div class="form-field">
                            <span class="form-label">Доменное имя</span>
                            <span>core1.example.com</span>
                        </div>
                        <div class="form-field">
                            <span class="form-label">Локация</span>
                            <span>Дата-центр 1</span>
                        </div>
                        <div class="form-field">
                            <span class="form-label">Версия ПО</span>
                            <span>1.2.3</span>
                        </div>
                        <div class="form-field">
                            <span class="form-label">Последний онлайн</span>
                            <span>23.01.2026 01:10</span>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-title">
                        Связанные устройства
                        <button class="btn btn-small btn-light">Добавить связь</button>
                    </div>
                    <div class="table-wrapper">
                        <table class="table">
                            <thead>
                            <tr>
                                <th>Устройство</th>
                                <th>Тип связи</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Switch 7</td>
                                <td>Подчинённое</td>
                            </tr>
                            <tr>
                                <td>Access Point 12</td>
                                <td>Подчинённое</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    </main>
</div>
</body>
</html>
