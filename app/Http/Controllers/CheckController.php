<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Kreait\Firebase\Factory;

class CheckController extends Controller
{
    public function saveToFirebase(Request $request)
    {
        $request->validate([
            'checkType' => 'required|string',
            'result' => 'required|string',
        ]);

        try {
            $factory = (new Factory)
                ->withServiceAccount(env('FIREBASE_CREDENTIALS'))
                ->withDatabaseUri('https://diplommm-5d205-default-rtdb.europe-west1.firebasedatabase.app');

            $database = $factory->createDatabase();

            $database->getReference('checks')->push([
                'check' => $request->input('checkType'),
                'result' => $request->input('result'),
                'time' => now()->toDateTimeString()
            ]);

            return response()->json(['status' => 'success']);
        } catch (\Throwable $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
