<?php

namespace App\Http\Controllers;

use App\Http\Resources\DoctorResource;
use App\Http\Resources\UserResource;
use App\Http\Resources\UserResourceCollection;
use App\Models\Appointment;
use App\Models\Doctor;
use App\Models\User;

class TestController extends Controller
{
    public function __invoke()
    {

        $user = Appointment::with('doctors')->paginate(10);
        return new UserResourceCollection($user);

        // return UserResource::collection($user);

        // $user = User::first();
        // return new UserResourceCollection($user);


    }
}
