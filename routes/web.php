<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [\App\Http\Controllers\Public\HomeController::class, 'index'])->name('home');
Route::get('/events/{slug}', [\App\Http\Controllers\Public\EventController::class, 'show'])->name('events.show');
Route::get('/teams', [\App\Http\Controllers\Public\TeamController::class, 'index'])->name('teams.index');
Route::get('/courses', [\App\Http\Controllers\Public\CourseController::class, 'index'])->name('courses.index');
Route::get('/courses/{slug}', [\App\Http\Controllers\Public\CourseController::class, 'show'])->name('courses.show');
Route::get('/teams/{id}', [\App\Http\Controllers\Public\TeamController::class, 'show'])->name('teams.show');
Route::get('/events/{slug}/register', [\App\Http\Controllers\Public\EventRegistrationController::class, 'create'])->name('events.register');
Route::post('/events/{slug}/register', [\App\Http\Controllers\Public\EventRegistrationController::class, 'store'])->name('events.register.store');
Route::get('/events/{slug}/quiz/{quiz}', [\App\Http\Controllers\Public\QuizTakerController::class, 'show'])->name('events.quiz.show');
Route::post('/events/{slug}/quiz/{quiz}/submit', [\App\Http\Controllers\Public\QuizTakerController::class, 'store'])->name('events.quiz.submit');

Route::get('/services', [\App\Http\Controllers\Public\ServiceController::class, 'index'])->name('services.index');
Route::get('/about-us', [\App\Http\Controllers\Public\PageController::class, 'about'])->name('about');
Route::get('/our-goals', [\App\Http\Controllers\Public\PageController::class, 'goals'])->name('goals');

// Public Quiz Routes (New Module)
Route::prefix('q')->name('quiz.public.')->group(function () {
    Route::get('/{quiz}', [\App\Http\Controllers\Public\QuizController::class, 'show'])->name('show');
    Route::post('/{quiz}/join', [\App\Http\Controllers\Public\QuizController::class, 'join'])->name('join');
    Route::get('/{quiz}/attempt', [\App\Http\Controllers\Public\QuizController::class, 'attempt'])->name('attempt');
    Route::post('/{quiz}/submit', [\App\Http\Controllers\Public\QuizController::class, 'submit'])->name('submit');
    Route::get('/{quiz}/result', [\App\Http\Controllers\Public\QuizController::class, 'result'])->name('result');
});

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
    Route::resource('courses', \App\Http\Controllers\Admin\CourseController::class);
    // Quizzes - both nested and standalone
    Route::resource('events.quizzes', \App\Http\Controllers\Admin\QuizController::class);
    Route::get('/quizzes', [\App\Http\Controllers\Admin\QuizController::class, 'all'])->name('quizzes.index');
    Route::resource('quizzes.questions', \App\Http\Controllers\Admin\QuestionController::class)->except(['show']);
    Route::post('quizzes/{quiz}/questions/reorder', [\App\Http\Controllers\Admin\QuestionController::class, 'reorder'])->name('quizzes.questions.reorder');
    Route::post('quizzes/{quiz}/questions/generate', [\App\Http\Controllers\Admin\QuestionController::class, 'generate'])->name('quizzes.questions.generate');
    Route::get('/quizzes/{quiz}/results', [\App\Http\Controllers\Admin\QuizController::class, 'results'])->name('quizzes.results');
    
    // Registrations - both nested and standalone
    Route::resource('events.registrations', \App\Http\Controllers\Admin\RegistrationController::class)->only(['index']);
    Route::get('/registrations', [\App\Http\Controllers\Admin\RegistrationController::class, 'all'])->name('registrations.index');
    Route::resource('registrations', \App\Http\Controllers\Admin\RegistrationController::class)->only(['show', 'update']);
    Route::resource('events.notifications', \App\Http\Controllers\Admin\NotificationController::class)->only(['index', 'create', 'store']);

    // Services
    Route::resource('services', \App\Http\Controllers\Admin\ServiceController::class);
});

Route::get('/system/reset', function () {
    \Illuminate\Support\Facades\Artisan::call('optimize:clear');
    // \Illuminate\Support\Facades\Artisan::call('migrate');
    // \Illuminate\Support\Facades\Artisan::call('db:seed');
    \Illuminate\Support\Facades\Artisan::call('storage:link');

    return 'System optimization cleared, migration run, and database seeded successfully.';
});

Route::get('/sitemap.xml', [\App\Http\Controllers\SitemapController::class, 'index']);

