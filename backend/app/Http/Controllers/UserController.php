<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function index(): JsonResponse
    {
        $users = User::query()->select(['id', 'name', 'email', 'role', 'avatar', 'created_at'])->get();
        return response()->json($users);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'avatar' => 'nullable|image|max:2048',
        ]);

        $avatarPath = null;
        if ($request->hasFile('avatar')) {
            $avatarPath = $request->file('avatar')->store('avatars', 'public');
        }

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'avatar' => $avatarPath,
            'role' => 'admin',
        ]);

        return response()->json([
            'message' => 'Akun berhasil ditambahkan.',
            'user' => $user
        ], 201);
    }

    public function update(Request $request, User $user): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:6',
            'avatar' => 'nullable|image|max:2048',
        ]);

        $user->name = $validated['name'];
        $user->email = $validated['email'];

        if (!empty($validated['password'])) {
            $user->password = Hash::make($validated['password']);
        }

        if ($request->hasFile('avatar')) {
            if ($user->avatar) {
                Storage::disk('public')->delete($user->avatar);
            }
            $user->avatar = $request->file('avatar')->store('avatars', 'public');
        }

        $user->save();

        return response()->json([
            'message' => 'Akun berhasil diperbarui.',
            'user' => $user
        ]);
    }

    public function destroy(User $user): JsonResponse
    {
        // Admin utama (ID 1) tidak boleh dihapus
        if ($user->id === 1) {
            return response()->json([
                'message' => 'Admin utama tidak boleh dihapus.'
            ], 403);
        }

        // Tidak boleh menghapus diri sendiri jika sedang login
        if (request()->user()->id === $user->id) {
            return response()->json([
                'message' => 'Anda tidak bisa menghapus akun Anda sendiri.'
            ], 403);
        }

        if ($user->avatar) {
            Storage::disk('public')->delete($user->avatar);
        }

        $user->delete();

        return response()->json([
            'message' => 'Akun berhasil dihapus.'
        ]);
    }
}
