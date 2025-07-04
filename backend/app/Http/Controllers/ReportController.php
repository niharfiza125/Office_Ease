<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Department;
use App\Models\Employee;
use App\Models\Attendance;
use App\Models\Leave;

class ReportController extends Controller
{
    public function summary()
    {
        return response()->json([
            'total_employees'     => Employee::count(),
            'total_customers'     => \App\Models\Customer::count(),
            'total_products'      => \App\Models\Product::count(),
            'total_suppliers'     => \App\Models\Supplier::count(),
            'total_sales'         => \App\Models\Sale::sum('total_price'),
            'monthly_sales'       => \App\Models\Sale::whereMonth('date', now()->month)->sum('total_price'),
            'total_purchases'     => \App\Models\Purchase::sum('total_cost'),
            'total_expenses'      => \App\Models\Expense::sum('amount'),
            'low_stock_count'     => \App\Models\Product::where('quantity', '<', 10)->count(),
            'pending_leaves'      => \App\Models\Leave::where('status', 'pending')->count(),
        ]);
    }

    public function departmentStats()
    {
        $departments = Department::with('employees')->get();

        $data = $departments->map(function ($dept) {
            $employeeIds = $dept->employees->pluck('id');

            return [
                'id' => $dept->id,
                'name' => $dept->name,
                'employee_count' => $dept->employees->count(),
                'leave_count'    => Leave::whereIn('employee_id', $employeeIds)->count(),
                'attendance_count' => Attendance::whereIn('employee_id', $employeeIds)->count(),
            ];
        });

        return response()->json($data);
    }
}