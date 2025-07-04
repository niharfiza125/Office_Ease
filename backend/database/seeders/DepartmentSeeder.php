<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Department; // ✅ Make sure this line is added

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $departments = ['IT', 'HR', 'Finance', 'Marketing', 'Operations'];
    
        foreach ($departments as $name) {
            \App\Models\Department::create(['name' => $name]);
        }
    }
    
}
