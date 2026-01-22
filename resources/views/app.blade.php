<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="csrf-token" content="{{ csrf_token() }}">

  <meta name="description" content="Prochesta IT - Empowering your digital journey with expert IT training and solutions.">
  <meta name="keywords" content="Prochesta IT, IT Training, Web Development, Graphics Design, Digital Marketing, Bangladesh">
  <meta name="author" content="Prochesta IT">

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="{{ url()->current() }}">
  <meta property="og:title" content="Prochesta IT - Leading IT Training Institute">
  <meta property="og:description" content="Empowering your digital journey with expert IT training and solutions. Join Prochesta IT today.">
  <meta property="og:image" content="{{ asset('assets/logo/Logo-prochesta-IT-dark-1.png') }}">

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="{{ url()->current() }}">
  <meta property="twitter:title" content="Prochesta IT - Leading IT Training Institute">
  <meta property="twitter:description" content="Empowering your digital journey with expert IT training and solutions. Join Prochesta IT today.">
  <meta property="twitter:image" content="{{ asset('assets/logo/Logo-prochesta-IT-dark-1.png') }}">

  <title inertia>Prochesta IT</title>
  <link rel="icon" type="image/png" href="/assets/logo/Logo-prochesta-IT-light-1.png">

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.bunny.net">
  <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;500;600;700&family=Tiro+Bangla:ital@0;1&display=swap" rel="stylesheet">

  <!-- Scripts -->
  @routes
  @viteReactRefresh
  @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
  @inertiaHead
</head>

<body class="font-sans antialiased">
  <!-- Server-side Preloader -->
  <style>
    #global-loader {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #ffffff;
      z-index: 9999;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: opacity 0.5s ease;
    }
    .loader-content {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .loader-logo {
      height: 80px;
      width: auto;
      margin-bottom: 24px;
      animation: pulse-logo 2s infinite ease-in-out;
    }
    .loader-progress-bar {
      width: 240px;
      height: 4px;
      background-color: #f3f4f6;
      border-radius: 4px;
      overflow: hidden;
      position: relative;
    }
    .loader-progress {
      width: 40%;
      height: 100%;
      background: linear-gradient(90deg, #6366f1, #9333ea);
      position: absolute;
      left: -40%;
      animation: progress-bar 1.5s infinite ease-in-out;
      border-radius: 4px;
    }
    @keyframes pulse-logo {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(0.95); opacity: 0.8; }
    }
    @keyframes progress-bar {
      0% { left: -50%; width: 50%; }
      50% { width: 30%; }
      100% { left: 100%; width: 50%; }
    }
  </style>
  <div id="global-loader">
    <div class="loader-content">
      <img src="/assets/logo/Logo-prochesta-IT-dark-1.png" alt="Prochesta IT" class="loader-logo" />
      <div class="loader-progress-bar">
        <div class="loader-progress"></div>
      </div>
    </div>
  </div>

  @inertia
</body>

</html>
