<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Customer;

class Invoice extends Model
{
    protected $fillable = ['customer_id', 'amount', 'status', 'due_date'];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
}
