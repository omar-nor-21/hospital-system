<?php

namespace App\Http\Controllers\finance;

use App\Http\Controllers\Controller;
use App\Http\Requests\finance\IncomeRequest;
use App\Models\Income;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class incomesController extends Controller
{
    public function index()
    {
        return Inertia::render('finance/income/Income.Page', ['incomes' => Income::orderBy('id', 'desc')->get()]);
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
    public function store(IncomeRequest $request)
    {
        DB::transaction(function () use ($request) {
            Income::create($this->columnData($request));
            return Redirect::back()->with(['message' => "Income Created Successfully"]);
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
    public function update(IncomeRequest $request, Income $income)
    {
        DB::transaction(function () use ($request, $income) {
            $income->update($this->columnData($request));
            return Redirect::back()->with(['message' => "Income Updated Successfully"]);
        });
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Income $income)
    {
        $income->delete();
        return Redirect::back()->with(['message' => "Income Deleted Successfully"]);
    }
    public function columnData(Request $request)
    {
        $data = ([

            'income_head' => $request->income_head,
            'name' => $request->name,
            'invoice_number' => $request->invoice_number,
            'amount' => $request->amount,
            'date' => $request->date,
            'description' => $request->description,

        ]);
        return $data;
    }
}
