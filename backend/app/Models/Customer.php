<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    // ✅ Allow mass assignment for these fields
    protected $fillable = ['name', 'email', 'phone', 'address'];
}
