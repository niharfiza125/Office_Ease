<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Payment;

class PaymentController extends Controller
{
    // GET: List all payments with invoice details
    public function index()
    {
        return Payment::with('invoice')->get();
    }

    // POST: Store a new payment
    public function store(Request $request)
    {
        $validated = $request->validate([
            'invoice_id' => 'required|exists:invoices,id',
            'amount'     => 'required|numeric|min:1',
            'method'     => 'required|string|max:50',
            'date'       => 'required|date',
        ]);

        return Payment::create($validated);
    }

    // GET: Show a specific payment
    public function show($id)
    {
        return Payment::with('invoice')->findOrFail($id);
    }

    // PUT/PATCH: Update a payment
    public function update(Request $request, $id)
    {
        $payment = Payment::findOrFail($id);

        $validated = $request->validate([
            'invoice_id' => 'sometimes|exists:invoices,id',
            'amount'     => 'sometimes|numeric|min:1',
            'method'     => 'sometimes|string|max:50',
            'date'       => 'sometimes|date',
        ]);

        $payment->update($validated);
        return $payment;
    }

    // DELETE: Delete a payment
    public function destroy($id)
    {
        $payment = Payment::findOrFail($id);
        $payment->delete();

        return response()->json(['message' => 'Payment deleted successfully.']);
    }
}
