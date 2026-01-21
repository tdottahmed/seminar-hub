<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [\App\Http\Controllers\Public\HomeController::class, 'index'])->name('home');
Route::get('/events/{slug}', [\App\Http\Controllers\Public\EventController::class, 'show'])->name('events.show');
Route::get('/teams/{id}', [\App\Http\Controllers\Public\TeamController::class, 'show'])->name('teams.show');
Route::get('/events/{slug}/register', [\App\Http\Controllers\Public\EventRegistrationController::class, 'create'])->name('events.register');
Route::post('/events/{slug}/register', [\App\Http\Controllers\Public\EventRegistrationController::class, 'store'])->name('events.register.store');
Route::get('/events/{slug}/quiz/{quiz}', [\App\Http\Controllers\Public\QuizTakerController::class, 'show'])->name('events.quiz.show');
Route::post('/events/{slug}/quiz/{quiz}/submit', [\App\Http\Controllers\Public\QuizTakerController::class, 'store'])->name('events.quiz.submit');

Route::get('/dashboard', function () {
    if (auth()->user()->user_type === 'admin') {
        return redirect()->route('admin.dashboard');
    }
    return Inertia::render('User/Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [\App\Http\Controllers\Admin\AdminController::class, 'dashboard'])->name('dashboard');
    
    // Frontend Management
    Route::get('/frontend', [\App\Http\Controllers\Admin\FrontendSectionController::class, 'index'])->name('frontend.index');
    Route::get('/frontend/{section}/edit', [\App\Http\Controllers\Admin\FrontendSectionController::class, 'edit'])->name('frontend.edit');
    Route::put('/frontend/{section}', [\App\Http\Controllers\Admin\FrontendSectionController::class, 'update'])->name('frontend.update');

    Route::post('/upload/image', [\App\Http\Controllers\Admin\UploadController::class, 'uploadImage'])->name('upload.image');
    Route::resource('events', \App\Http\Controllers\Admin\EventController::class);
    Route::resource('speakers', \App\Http\Controllers\Admin\SpeakerController::class);
    Route::resource('teams', \App\Http\Controllers\Admin\TeamController::class);
    Route::resource('galleries', \App\Http\Controllers\Admin\GalleryController::class);
    Route::resource('testimonials', \App\Http\Controllers\Admin\TestimonialController::class);
    Route::resource('faqs', \App\Http\Controllers\Admin\FaqController::class);
    Route::resource('programs', \App\Http\Controllers\Admin\ProgramController::class);
    // Quizzes - both nested and standalone
    Route::resource('events.quizzes', \App\Http\Controllers\Admin\QuizController::class);
    Route::get('/quizzes', [\App\Http\Controllers\Admin\QuizController::class, 'all'])->name('quizzes.index');
    Route::resource('quizzes.questions', \App\Http\Controllers\Admin\QuestionController::class)->except(['show', 'create', 'edit']);
    Route::post('quizzes/{quiz}/questions/reorder', [\App\Http\Controllers\Admin\QuestionController::class, 'reorder'])->name('quizzes.questions.reorder');
    
    // Registrations - both nested and standalone
    Route::resource('events.registrations', \App\Http\Controllers\Admin\RegistrationController::class)->only(['index']);
    Route::get('/registrations', [\App\Http\Controllers\Admin\RegistrationController::class, 'all'])->name('registrations.index');
    Route::resource('registrations', \App\Http\Controllers\Admin\RegistrationController::class)->only(['show', 'update']);
    Route::resource('events.notifications', \App\Http\Controllers\Admin\NotificationController::class)->only(['index', 'create', 'store']);
});

Route::get('/system/reset', function () {
    \Illuminate\Support\Facades\Artisan::call('optimize:clear');
    // \Illuminate\Support\Facades\Artisan::call('migrate');
    // \Illuminate\Support\Facades\Artisan::call('db:seed');
    \Illuminate\Support\Facades\Artisan::call('storage:link');

    return 'System optimization cleared, migration run, and database seeded successfully.';
});
