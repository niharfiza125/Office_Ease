<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Invoice;

class InvoiceController extends Controller
{
    // GET: List all invoices with customer info
    public function index()
    {
        return Invoice::with('customer')->get();
    }

    // POST: Store a new invoice
    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_id'   => 'required|exists:customers,id',
            'total_amount'  => 'required|numeric',
            'status'        => 'required|in:paid,unpaid,pending',
        ]);

        return Invoice::create($validated);
    }

    // GET: Show a single invoice
    public function show($id)
    {
        return Invoice::with('customer')->findOrFail($id);
    }

    // PUT/PATCH: Update an invoice
    public function update(Request $request, $id)
    {
        $invoice = Invoice::findOrFail($id);

        $validated = $request->validate([
            'customer_id'   => 'sometimes|exists:customers,id',
            'total_amount'  => 'sometimes|numeric',
            'status'        => 'sometimes|in:paid,unpaid,pending',
        ]);

        $invoice->update($validated);
        return $invoice;
    }

    // DELETE: Delete an invoice
    public function destroy($id)
    {
        $invoice = Invoice::findOrFail($id);
        $invoice->delete();

        return response()->json(['message' => 'Invoice deleted successfully.']);
    }
}
