<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Employee; // Optional but helpful

class Department extends Model
{
    protected $fillable = ['name'];

    public function employees()
    {
        return $this->hasMany(Employee::class);
    }
}
