<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use Illuminate\Http\Request;

class AttendanceController extends Controller
{
    public function index()
    {
        return Attendance::with('employee')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'employee_id' => 'required|exists:employees,id',
            'date' => 'required|date',
            'status' => 'required|in:Present,Absent,Leave',
        ]);

        return Attendance::create($validated);
    }

    public function show(Attendance $attendance)
    {
        return $attendance->load('employee');
    }

    public function update(Request $request, Attendance $attendance)
    {
        $validated = $request->validate([
            'employee_id' => 'required|exists:employees,id',
            'date' => 'required|date',
            'status' => 'required|in:Present,Absent,Leave',
        ]);

        $attendance->update($validated);
        return $attendance;
    }

    public function destroy(Attendance $attendance)
    {
        $attendance->delete();
        return response()->json(['message' => 'Attendance record deleted']);
    }
}
