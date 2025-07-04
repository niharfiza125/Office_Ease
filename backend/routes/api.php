<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\PurchaseController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\LeaveController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\ReportController;
Route::apiResource('employees', EmployeeController::class);
Route::apiResource('categories', CategoryController::class);
Route::apiResource('products', ProductController::class);
Route::apiResource('suppliers', SupplierController::class);
Route::apiResource('purchases', PurchaseController::class);
Route::apiResource('attendances', AttendanceController::class);
Route::apiResource('leaves', LeaveController::class); // ✅ Add this line
Route::apiResource('customers', CustomerController::class); // ✅ Customer API Routes
Route::apiResource('invoices', InvoiceController::class);
Route::apiResource('sales', SaleController::class);
Route::apiResource('payments', PaymentController::class);
Route::apiResource('expenses', ExpenseController::class);
Route::get('/reports/summary', [ReportController::class, 'summary']);
Route::apiResource('departments', DepartmentController::class);
Route::get('/reports/summary', [ReportController::class, 'summary']);
Route::get('/reports/departments', [ReportController::class, 'departmentStats']); // ✅ Add this line
Route::post('/admin/login', [AdminAuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/admin/logout', [AdminAuthController::class, 'logout']);
// ✅ Test Route (Optional)
Route::get('/test', function () {
    return response()->json(['message' => 'API is working!']);
});
