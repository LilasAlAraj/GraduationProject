<?php

namespace App\Models;

use Elastic\Elasticsearch\ClientBuilder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Decision extends Model
{
    use HasFactory;

    private static $index = 'cases_index';

    public static function indexAll()
    {
        $client = ClientBuilder::create()
            ->setHosts(['localhost:9200'])
            ->setBasicAuthentication('Lilas', '123456789')
            ->build();
        $decisions = Decision::all();
        foreach ($decisions as $decision) {

            $params = [
                'index' => Decision::$index,
                'id' => $decision->id,
                'body' => [

                    'description' => $decision->description,
                    'id' => $decision->id,
                    // أضف المزيد من الحقول اللازمة
                ],
            ];

            $client->index($params);
        }
    }
    public function index()
    {
        $client = ClientBuilder::create()
            ->setHosts(['localhost:9200'])
            ->setBasicAuthentication('Lilas', '123456789')
            ->build();
        $case_id = $this->case->id;
        $params = [
            'index' => Decision::$index,
            'id' => $case_id,
        ];
        $response = $client->get($params);
        $currentDocument = $response['_source'];
        $decisionIndexToEdit = $this->id; // تحديد مؤشر القرار المراد إضافته

        $currentDocument['decisions'][$decisionIndexToEdit] = $this->description;
// تحديث الوثيقة في الفهرس بالمحتوى المحدث
        $params = [
            'index' => 'cases_index',
            'id' => $case_id,
            'body' => [
                'doc' => $currentDocument,
            ],
        ];

        $response = $client->update($params);
    }

    public function updateIndex()
    {
        $client = ClientBuilder::create()
            ->setHosts(['localhost:9200'])
            ->setBasicAuthentication('Lilas', '123456789')
            ->build();
        $case_id = $this->case->id;
        $params = [
            'index' => Decision::$index,
            'id' => $case_id,
        ];
        $response = $client->get($params);
        $currentDocument = $response['_source'];
        // تعديل القرار المراد
        $decisionIndexToEdit = $this->id; // تحديد مؤشر القرار المراد تعديله

        $currentDocument['decisions'][$decisionIndexToEdit] = $this->description;

// تحديث الوثيقة في الفهرس بالمحتوى المحدث
        $params = [
            'index' => 'cases_index',
            'id' => $case_id,
            'body' => [
                'doc' => $currentDocument,
            ],
        ];

        $response = $client->update($params);
    }

    public function deleteIndex()
    {
        $client = ClientBuilder::create()
            ->setHosts(['localhost:9200'])
            ->setBasicAuthentication('Lilas', '123456789')
            ->build();
        $case_id = $this->case->id;
        $params = [
            'index' => Decision::$index,
            'id' => $case_id,
        ];
        $response = $client->get($params);
        $currentDocument = $response['_source'];
        $decisionIndexToDelete = $this->id; // تحديد مؤشر القرار المراد حذفه
// حذف وثيقة محددة من الفهرس

        unset($currentDocument['decisions'][$decisionIndexToDelete]);

        // تحديث الوثيقة في الفهرس بالمحتوى المحدث
        $params = [
            'index' => 'cases_index',
            'body' => [
                'query' => [
                    'match' => [
                        '_id' => $case_id,
                    ],
                ],
                'script' => [
                    'source' => 'ctx._source = params.doc',
                    'lang' => 'painless',
                    'params' => [
                        'doc' => $currentDocument,
                    ],
                ],
            ],
        ];

        $response = $client->updateByQuery($params);
        return  $response;


    }

    protected $fillable = [
        'number',
        'date',
        'description',
        'case_id',
    ];

    function case () {
        return $this->belongsTo(Cases::class, 'case_id');
    }
}
