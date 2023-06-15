<?php

namespace App\Http\Controllers;

use App\Models\Recommendation;
use Illuminate\Http\Request;

class IRRecomendationController extends Controller
{

    public  function index()
    {
        Recommendation::createIndex();

        // $this->destroyIndex();
     $this->createIndex();
        // $this->indexAll();
        // return view('Recomendation.retreive_Recomendation');
    }

    public static function createIndex()
    {

        Recommendation::createIndex();

    }

    public function destroyIndex()
    {

        Recommendation::destroyIndex();
    }

    public function indexAll()
    {


        Recommendation::indexAll();
    }

    public function search(Request $requset)
    {

        $query = $requset->toSearch;

        $recommendations = Recommendation::search($query);

        return response()->json(['recommendations' => $recommendations]);
    }



}
