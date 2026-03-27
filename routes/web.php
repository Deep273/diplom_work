<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CheckController;
use App\Http\Controllers\DeviceController;

Route::post('/devices/save', [DeviceController::class, 'save'])->name('devices.save');
Route::post('/checks/run', [CheckController::class, 'saveToFirebase'])->name('checks.run');
Route::get('/', function () {
    return redirect('/checks');
});

Route::get('/login', function () {
    return view('login');
})->name('login');

Route::get('/checks', function () {
    return view('checks');
})->name('checks');

Route::get('/dashboard', function () {
    return view('dashboard');
})->name('dashboard');

Route::get('/devices', function () {
    return view('devices');
})->name('devices');

Route::get('/settings', function () {
    return view('settings');
})->name('settings');

Route::get('/connections', function () {
    return view('connections');
})->name('connections');

