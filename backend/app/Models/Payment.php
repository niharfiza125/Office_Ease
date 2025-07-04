<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Invoice;

class Payment extends Model
{
    protected $fillable = ['invoice_id', 'amount', 'paid_on'];

    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }
}

