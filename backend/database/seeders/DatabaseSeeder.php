<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    protected static ?string $password;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        $this->call(CmsPageSeeder::class);

        $admin = \App\Models\Admin::create([
            'name' => 'Gower Smart',
            'email' => 'gowersmart@yopmail.com',
            'password' => static::$password ??= Hash::make('Admin@123$%'),
            'remember_token' => Str::random(10),
        ]);
    }
}
