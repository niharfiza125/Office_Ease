<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Employee;

class Leave extends Model
{
    // Allow mass assignment
    protected $fillable = ['employee_id', 'type', 'start_date', 'end_date', 'status'];

    // Relationship: Each leave belongs to one employee
    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }
}
