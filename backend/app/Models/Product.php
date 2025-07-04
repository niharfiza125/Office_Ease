<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Category;
use App\Models\Supplier;
use App\Models\Purchase;

class Product extends Model
{
    protected $fillable = ['name', 'sku', 'quantity', 'price', 'category_id', 'supplier_id'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }

    public function purchases()
    {
        return $this->hasMany(Purchase::class);
    }
}
