<?php

// app/Http/Controllers/SaleController.php
namespace App\Http\Controllers;

use App\Models\Sale;
use App\Models\Product;
use Illuminate\Http\Request;

class SaleController extends Controller
{
    public function index()
    {
        return Sale::with(['product', 'customer'])->get();
    }

   public function store(Request $request)
{
   $validated = $request->validate([
    'product_id' => 'required|exists:products,id',
    'customer_id' => 'required|exists:customers,id',
    'quantity' => 'required|integer|min:1',
    'date' => 'required|date', // ✅ Add this
]);


    $product = Product::findOrFail($validated['product_id']);

    if ($product->quantity < $validated['quantity']) {
        return response()->json(['error' => 'Not enough stock.'], 400);
    }

    $validated['total_price'] = $product->price * $validated['quantity'];

    $sale = Sale::create($validated);

    // ❗️ Reduce inventory
    $product->quantity -= $validated['quantity'];
    $product->save();

    return response()->json($sale, 201);
}

}

