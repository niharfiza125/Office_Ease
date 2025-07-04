<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    // GET all customers
    public function index()
    {
        return Customer::all();
    }

    // POST a new customer
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'    => 'required|string|max:255',
            'email'   => 'required|email|unique:customers,email',
            'phone'   => 'nullable|string|max:20',
            'address' => 'nullable|string'
        ]);

        return Customer::create($validated);
    }

    // GET a single customer by ID
    public function show($id)
    {
        return Customer::findOrFail($id);
    }

    // PUT/PATCH update a customer
    public function update(Request $request, $id)
    {
        $customer = Customer::findOrFail($id);

        $validated = $request->validate([
            'name'    => 'sometimes|string|max:255',
            'email'   => 'sometimes|email|unique:customers,email,' . $customer->id,
            'phone'   => 'nullable|string|max:20',
            'address' => 'nullable|string'
        ]);

        $customer->update($validated);
        return $customer;
    }

    // DELETE a customer
    public function destroy($id)
    {
        $customer = Customer::findOrFail($id);
        $customer->delete();

        return response()->json(['message' => 'Customer deleted successfully.']);
    }
}
