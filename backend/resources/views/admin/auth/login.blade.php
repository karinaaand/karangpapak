<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Login Admin Karangpapak</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="flex min-h-screen items-center justify-center bg-[linear-gradient(135deg,#0f3d33,#1a5f4f,#d4a34f)] px-4">
    <div class="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-2xl">
        <p class="text-xs uppercase tracking-[0.35em] text-emerald-700">Dashboard Admin</p>
        <h1 class="mt-3 text-3xl font-semibold text-slate-900">Masuk ke Karangpapak</h1>
        <p class="mt-2 text-sm text-slate-500">Gunakan akun admin untuk mengelola konten website desa.</p>

        @if ($errors->any())
            <div class="mt-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {{ $errors->first() }}
            </div>
        @endif

        @if (session('status'))
            <div class="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                {{ session('status') }}
            </div>
        @endif

        <form method="POST" action="{{ route('admin.login.store') }}" class="mt-8 space-y-5">
            @csrf
            <div>
                <label class="mb-2 block text-sm font-medium text-slate-700">Email</label>
                <input type="email" name="email" value="{{ old('email') }}" class="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none ring-0 focus:border-emerald-500" required>
            </div>
            <div>
                <label class="mb-2 block text-sm font-medium text-slate-700">Password</label>
                <input type="password" name="password" class="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none ring-0 focus:border-emerald-500" required>
            </div>
            <label class="flex items-center gap-3 text-sm text-slate-600">
                <input type="checkbox" name="remember" class="rounded border-slate-300">
                Ingat saya
            </label>
            <button type="submit" class="w-full rounded-2xl bg-emerald-700 px-4 py-3 font-medium text-white transition hover:bg-emerald-800">Login</button>
        </form>
        <div class="mt-6 rounded-2xl bg-stone-100 px-4 py-3 text-sm text-slate-600">
            Akun demo: <strong>admin@karangpapak.test</strong> / <strong>password</strong>
        </div>
    </div>
</body>
</html>