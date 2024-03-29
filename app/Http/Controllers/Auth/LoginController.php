<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(LoginRequest $request)
    {

        $user = User::where('email', $request->email)->first();

        if ($user && Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Authorized',
                'user' => $user->get(),
                'token' => $user->createToken("{$user->name}-{$user->email}-{" . now() . "}")->plainTextToken
            ]);
        }

        return response()->json([
            'message' => 'The email and password combinations are incorrect.'
        ], 401);
    }
}
