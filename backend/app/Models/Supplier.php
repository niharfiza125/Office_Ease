<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Product;

class Supplier extends Model
{
    protected $fillable = ['name', 'email', 'phone'];

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
