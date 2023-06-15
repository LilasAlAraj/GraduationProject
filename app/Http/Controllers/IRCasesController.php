<?php

namespace App\Http\Controllers;

use App\Models\Cases;
use Illuminate\Http\Request;

class IRCasesController extends Controller
{

    public function index()
    {

        // $this->destroyIndex();
        // $this->createIndex();
        // $this->indexAll();
        return view('cases.retreive_cases');
    }

    public function createIndex()
    {
        Cases::createIndex();
    }

    public function destroyIndex()
    {
        Cases::destroyIndex();

    }

    public function indexAll()
    {
        Cases::indexAll();

    }

    public function search(Request $requset)
    {

        $i = 0;
        $casesArray = ['results' => [],'suggestions' =>[]];
        $query = $requset->toSearch;

        $cases = Cases::search($query);

        $from_year = $requset->from_year;

        $to_year = $requset->to_year;

        if (is_null($from_year) && is_null($to_year)) {

            return response()->json(['cases' => $cases]);
        } else if (!is_null($from_year) && !is_null($to_year)) {
            $temp_cases = Cases::whereHas('baseNumbers', function ($query) use ($from_year, $to_year) {
                $query->whereBetween('date', [$from_year, $to_year]);

            })->get();

        } else if (is_null($from_year) && !is_null($to_year)) {
            $temp_cases = Cases::whereHas('baseNumbers', function ($query) use ($to_year) {
                $query->where('date', '<', $to_year);

            })->get();

        } else if (!is_null($from_year) && is_null($to_year)) {
            $temp_cases = Cases::whereHas('baseNumbers', function ($query) use ($from_year) {
                $query->where('date', '>=', $from_year);

            })->get();

        }

        foreach ($temp_cases as $tCase) {
            foreach ($cases['results'] as $case) {

                if ($tCase->id == $case['result']['id']) {
                    $casesArray['results'][$i++] = $case;
                }
            }
        }
        $casesArray['suggestions']=$cases['suggestions'] ;
        return response()->json(['cases' => $casesArray]);

    }

}
