<?php

namespace App\Http\Controllers;

use App\Models\Purchase;
use App\Models\Product; // ✅ Move it here
use Illuminate\Http\Request;

class PurchaseController extends Controller
{
    public function index()
    {
        return Purchase::with(['product', 'supplier'])->get();
    }

 

public function store(Request $request)
{
    \Log::info('Purchase request:', $request->all()); // 👈 Add this to see what data arrives

    $validated = $request->validate([
        'product_id' => 'required|exists:products,id',
        'supplier_id' => 'required|exists:suppliers,id',
        'quantity' => 'required|integer|min:1',
    ]);


    $product = Product::findOrFail($validated['product_id']);
    $validated['total_cost'] = $product->price * $validated['quantity'];

    // ✅ Increase product quantity here
    $product->quantity += $validated['quantity'];
    $product->save();

    $purchase = Purchase::create($validated);

    return response()->json($purchase, 201);
}


    public function show($id)
    {
        return Purchase::with(['product', 'supplier'])->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $purchase = Purchase::findOrFail($id);

        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'supplier_id' => 'required|exists:suppliers,id',
            'quantity' => 'required|integer|min:1',
            'total_cost' => 'required|numeric|min:0',
        ]);

        $purchase->update($validated);

        return response()->json($purchase);
    }

    public function destroy($id)
    {
        $purchase = Purchase::findOrFail($id);
        $purchase->delete();

        return response()->json(['message' => 'Purchase deleted']);
    }
}
