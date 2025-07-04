<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Product;
use App\Models\Supplier;

class Purchase extends Model
{
    protected $fillable = ['product_id', 'supplier_id', 'quantity', 'total_cost'];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }
}
