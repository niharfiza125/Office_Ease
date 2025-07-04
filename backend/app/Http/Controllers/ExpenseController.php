<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Expense;

class ExpenseController extends Controller
{
    // GET: List all expenses
    public function index()
    {
        return Expense::all();
    }

    // POST: Create a new expense
    public function store(Request $request)
    {
        $validated = $request->validate([
            'amount'      => 'required|numeric|min:0',
            'description' => 'required|string|max:255',
            'date'        => 'required|date',
            'category'    => 'nullable|string|max:100',
        ]);

        return Expense::create($validated);
    }

    // GET: Show a specific expense by ID
    public function show($id)
    {
        return Expense::findOrFail($id);
    }

    // PUT/PATCH: Update a specific expense
    public function update(Request $request, $id)
    {
        $expense = Expense::findOrFail($id);

        $validated = $request->validate([
            'amount'      => 'sometimes|numeric|min:0',
            'description' => 'sometimes|string|max:255',
            'date'        => 'sometimes|date',
            'category'    => 'nullable|string|max:100',
        ]);

        $expense->update($validated);
        return $expense;
    }

    // DELETE: Delete a specific expense
    public function destroy($id)
    {
        $expense = Expense::findOrFail($id);
        $expense->delete();

        return response()->json(['message' => 'Expense deleted successfully.']);
    }
}

