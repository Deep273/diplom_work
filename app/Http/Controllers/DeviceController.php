<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Kreait\Firebase\Factory;

class DeviceController extends Controller
{
    public function save(Request $request)
    {
        // Проверяем авторизацию
        if (!session('admin_logged')) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $data = $request->only(['type', 'name', 'ip', 'domain', 'location']);

        // Добавим timestamp и статус по умолчанию
        $data['status'] = 'offline';
        $data['created_at'] = now()->toDateTimeString();

        // Инициализация Firebase
        $factory = (new Factory)
            ->withServiceAccount(storage_path('app/firebase/firebase_credentials.json'))
            ->withDatabaseUri('https://diplommm-5d205-default-rtdb.europe-west1.firebasedatabase.app/');

        $database = $factory->createDatabase();

        // Создаем уникальный ключ устройства
        $deviceKey = str_replace(' ', '_', $data['name']);

        // Сохраняем устройство
        $database->getReference('devices/' . $deviceKey)
            ->set($data);

        return response()->json(['success' => true, 'message' => 'Устройство добавлено']);
    }
}
