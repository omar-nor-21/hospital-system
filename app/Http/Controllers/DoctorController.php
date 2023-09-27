<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class DoctorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('doctor/Doctor.Page', ['doctors' => Doctor::orderBy('id', 'desc')->get()]);
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
            'phone' => 'required',
            'sex' => 'required',
            'blood_group' => 'required',
            'marital_status' => 'required',
            'dob' => 'required',
            'doj' => 'required',
            'fee' => 'required',
        ]);


        DB::transaction(function () use ($request) {
            Doctor::create($this->columData($request));
            return Redirect::back()->with(['message' => "Doctor Created Successfully"]);
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
    public function update(Request $request, Doctor $doctor)
    {
        DB::transaction(function () use ($request, $doctor) {
            $doctor->update($this->columData($request));
            return Redirect::back()->with(['message' => "Doctor Updated Successfully"]);
        });
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Doctor $doctor)
    {
        $doctor->delete();
        return Redirect::back()->with(['message' => "Doctor Deleted Successfully"]);
    }

    public function columData(Request $request)
    {
        //$photo = time() . '.' . $request->file->extension();
        //$request->file->move(public_path('uploads'), $photo);

        $data = ([
            'name' => $request->name,
            'phone' => $request->phone,
            'sex' => $request->sex,
            'blood_group' => $request->blood_group,
            'marital_status' => $request->marital_status,
            'dob' => $request->dob,
            'doj' => $request->doj,
            'phone' => $request->phone,
            'emergency_contact' => $request->emergency_contact,
            'email' => $request->email,
            'qualification' => $request->qualification,
            'work_experience' => $request->work_experience,
            'specialization' => $request->specialization,
            'fee' => $request->fee,
            'photo' => "",
        ]);
        return $data;
    }
}
