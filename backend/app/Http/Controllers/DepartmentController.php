<?php

namespace App\Http\Controllers;

use App\Models\Department;
use Illuminate\Http\Request;

class DepartmentController extends Controller
{
    /**
     * Display a listing of all departments.
     */
    public function index()
    {
        return Department::all();
    }

    /**
     * Store a newly created department in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        return Department::create($validated);
    }

    /**
     * Display the specified department.
     */
    public function show($id)
    {
        return Department::findOrFail($id);
    }

    /**
     * Update the specified department in storage.
     */
    public function update(Request $request, $id)
    {
        $department = Department::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $department->update($validated);

        return $department;
    }

    /**
     * Remove the specified department from storage.
     */
    public function destroy($id)
    {
        $department = Department::findOrFail($id);
        $department->delete();

        return response()->json(['message' => 'Department deleted successfully.']);
    }
}
