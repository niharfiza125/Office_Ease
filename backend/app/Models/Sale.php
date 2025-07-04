<?php

// app/Models/Sale.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Product;
use App\Models\Customer;

class Sale extends Model
{
    protected $fillable = ['product_id', 'customer_id', 'quantity', 'total_price', 'date'];

    public function product() {
        return $this->belongsTo(Product::class);
    }

    public function customer() {
        return $this->belongsTo(Customer::class);
    }
}

