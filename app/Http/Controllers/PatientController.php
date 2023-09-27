<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class PatientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('patient/Patient.Page', ['patients' => Patient::orderBy('id', 'desc')->with('appointments')->get()]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'patient_phone' => 'required',
            'address' => 'required',
        ]);

        $patient = Patient::create([
            'name' => $request->name,
            'guardian' => $request->guardian,
            'gender' => $request->sex,
            'dob' => $request->dob,
            'blood_group' => $request->blood_group,
            'marital_status' => $request->marital_status,
            'patient_phone' => $request->patient_phone,
            'guardian_phone' => $request->guardian_phone,
            'address' => $request->address,
        ]);
        return Redirect::back()->with('message', "Patient Created Successfully");
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Patient $patient)
    {
        $patient->update([
            'name' => $request->name,
            'guardian' => $request->guardian,
            'gender' => $request->sex,
            'dob' => $request->dob,
            'blood_group' => $request->blood_group,
            'marital_status' => $request->marital_status,
            'patient_phone' => $request->patient_phone,
            'guardian_phone' => $request->guardian_phone,
            'address' => $request->address,
        ]);
        return Redirect::back()->with('message', "Patient Updated Successfully");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Patient $patient)
    {
        $patient->delete();
        return Redirect::back()->with('message', "Patient Deleted Successfully");
    }
}
