<?php

namespace App\Http\Controllers;

use App\Models\Medicine;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class MedicineController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('medicine/Medicine.Page',['medicines' => Medicine::orderBy('id','desc')->get()]);
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
            'name' => "required",
            'sale' => "required",
            "quantity" => "required"
        ]);

        $medicine = Medicine::create([
            'name' => $request->name,
            'category' => $request->category,
            'company' => $request->company,
            'composition' => $request->composition,
            'group' => $request->group,
            'sale' => $request->sale,
            'tax' => $request->tax,
            'quantity' => $request->quantity,
            'expire_date' => $request->expire_date,
        ]);
        return Redirect::back()->with('success' ,'Created New Medicine');
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
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
