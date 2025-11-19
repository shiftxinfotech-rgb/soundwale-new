<?php

namespace Database\Seeders;

use App\Models\CmsPages;
use Illuminate\Database\Seeder;

class CmsPageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $list = [
            [
                'title' => 'Privacy Policy',
                'description' => 'Privacy Policy description',
            ],
            [
                'title' => 'Terms & Conditions',
                'description' => 'Terms & Conditions description',
            ],
            [
                'title' => 'About Us',
                'description' => 'About Us description',
            ],
        ];

        foreach ($list as $value) {
            CmsPages::create([
                'title' => $value['title'],
                'description' => $value['description'],
            ]);
        }
    }
}
