<?php

use App\Http\Controllers\AmbulanceController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\DoctorController;
use App\Http\Controllers\finance\incomesController;
use App\Http\Controllers\MedicineController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\PharmacyController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');




Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('/doctor', DoctorController::class, ['names' => 'doctor']);
    Route::resource('/patient', PatientController::class, ['names' => 'patient']);
    Route::resource('/appointment', AppointmentController::class, ['names' => 'appointment']);
    Route::resource('/medicine', MedicineController::class, ['names' => 'medicine']);
    Route::resource('/pharmacy', PharmacyController::class, ['names' => 'pharmacy']);
    Route::resource('/ambulance', AmbulanceController::class, ['names' => 'ambulance']);
    Route::resource('/income', incomesController::class, ['names' => 'income']);
});

require __DIR__ . '/auth.php';
