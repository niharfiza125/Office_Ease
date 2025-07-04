<?php

namespace App\Http\Controllers;

use App\Models\Leave;
use Illuminate\Http\Request;

class LeaveController extends Controller
{
    // Display all leave records
    public function index()
    {
        return Leave::with('employee')->get();
    }

    // Store a new leave entry
    public function store(Request $request)
{
    try {
        \Log::info('Leave request received:', $request->all());

        $validated = $request->validate([
            'employee_id' => 'required|exists:employees,id',
            'type'        => 'required|string|max:50',
            'start_date'  => 'required|date',
            'end_date'    => 'required|date|after_or_equal:start_date',
            'status'      => 'required|string|in:pending,approved,rejected',
        ]);

        $leave = Leave::create($validated);
        return response()->json($leave, 201);

    } catch (\Throwable $e) {
        \Log::error('Leave creation failed: ' . $e->getMessage());
        return response()->json(['error' => 'Server error: ' . $e->getMessage()], 500);
    }
}

    // Show a specific leave entry
    public function show(Leave $leave)
    {
        return $leave->load('employee');
    }

    // Update an existing leave entry
    public function update(Request $request, Leave $leave)
    {
        $validated = $request->validate([
            'employee_id' => 'sometimes|exists:employees,id',
            'type'        => 'sometimes|string|max:50',
            'start_date'  => 'sometimes|date',
            'end_date'    => 'sometimes|date|after_or_equal:start_date',
            'status'      => 'sometimes|string|in:pending,approved,rejected',
        ]);

        $leave->update($validated);
        return response()->json($leave);
    }

    // Delete a leave entry
    public function destroy(Leave $leave)
    {
        $leave->delete();
        return response()->json(['message' => 'Leave deleted successfully.']);
    }
}

