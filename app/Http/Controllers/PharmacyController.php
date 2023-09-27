<?php

namespace App\Http\Controllers;

use App\Models\Medicine;
use App\Models\Patient;
use App\Models\Pharmacy;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class PharmacyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('pharmacy/Pharmacy.Page', ['pharmacies' => Pharmacy::orderBy('id', 'desc')->with('patients', 'medicines')->get(), 'patients' => Patient::all(), 'medicines' => Medicine::all()]);
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
        $pharmacy = Pharmacy::create([
            'patient_id' => $request->patient_id,
            'medicine_id' => $request->medicine_id,
            'quantity' => $request->quantity,
            'price' => $request->price,
        ]);
        return Redirect::back()->with(['message' => "Pharmacy created"]);
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
    public function update(Request $request, Pharmacy $pharmacy)
    {
        $pharmacy->update([
            'patient_id' => $request->patient_id,
            'medicine_id' => $request->medicine_id,
            'quantity' => $request->quantity,
            'price' => $request->price,
        ]);
        return Redirect::back()->with(['message' => "Pharmacy updated"]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pharmacy $pharmacy)
    {
        $pharmacy->delete();
        return Redirect::back()->with(['message' => "Pharmacy deleted"]);
    }
}
