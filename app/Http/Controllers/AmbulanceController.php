<?php

namespace App\Http\Controllers;

use App\Http\Requests\AmbulanceRequest;
use App\Models\Ambulance;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class AmbulanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('ambulance/Ambulance.Page', ['ambulances' => Ambulance::orderBy('id', 'desc')->get()]);
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
    public function store(AmbulanceRequest $request)
    {
        DB::transaction(function () use ($request) {
            Ambulance::create($this->columnData($request));
            return Redirect::back()->with(['message' => "Ambulance Created Successfully"]);
        });
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
    public function update(AmbulanceRequest $request, Ambulance $ambulance)
    {
        DB::transaction(function () use ($request, $ambulance) {
            $ambulance->update($this->columnData($request));
            return Redirect::back()->with(['message' => "Ambulance Updated Successfully"]);
        });
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ambulance $ambulance)
    {
        $ambulance->delete();
        return Redirect::back()->with(['message' => "Ambulance Deleted Successfully"]);
    }
    public function columnData(Request $request)
    {
        $data = ([

            'driver_name' => $request->driver_name,
            'driver_license' => $request->driver_license,
            'driver_phone' => $request->driver_phone,
            'vehicle_model' => $request->vehicle_model,
            'vehicle_year_made' => $request->vehicle_year_made,
            'vehicle_type' => $request->vehicle_type,
            'note' => $request->note,

        ]);
        return $data;
    }
}
