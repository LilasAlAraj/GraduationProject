<?php

namespace App\Models;

use Elastic\Elasticsearch\ClientBuilder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Cases extends Model
{
    use HasFactory;
    use SoftDeletes;

    private static $index = 'cases_index';
    public static function destroyIndex()
    {
        $client = ClientBuilder::create()
            ->setHosts(['localhost:9200'])
            ->setBasicAuthentication('Lilas', '123456789')
            ->build();
        $params = [
            'index' => Cases::$index, // اسم الفهرس الذي ترغب في حذفه
        ];

        $response = $client->indices()->delete($params);
        return $response;

    }
    public static function createIndex()
    {
        $client = ClientBuilder::create()
            ->setHosts(['localhost:9200'])
            ->setBasicAuthentication('Lilas', '123456789')
            ->build();

        $params = [
            'index' => Cases::$index,
            'body' => [
                'settings' => [
                    'analysis' => [
                        'analyzer' => [
                            'my_analyzer' => [
                                'type' => 'custom',
                                'tokenizer' => 'standard',
                                'filter' => ['lowercase', 'arabic_normalization', 'arabic_stop', 'arabic_stemmer'],
                            ],
                        ],
                        'filter' => [
                            'arabic_normalization' => [
                                'type' => 'arabic_normalization',
                            ],
                            'arabic_stop' => [
                                'type' => 'stop',
                                'stopwords' => '_arabic_',
                            ],
                            'arabic_stemmer' => [
                                'type' => 'stemmer',
                                'language' => 'arabic',
                            ],

                        ],
                    ],
                ],
                'mappings' => [
                    'properties' => [
                        'facts' => [
                            'type' => 'text',
                            'analyzer' => 'my_analyzer', // استخدام التحليل المناسب هنا
                        ],
                        'claim' => [
                            'type' => 'text',
                            'analyzer' => 'my_analyzer', // استخدام التحليل المناسب هنا
                        ],
                        'title' => [
                            'type' => 'text',
                            'analyzer' => 'my_analyzer', // استخدام التحليل المناسب هنا
                        ],
                        'decisions' => [
                            'type' => 'nested',
                            'properties' => [
                                'id' => [
                                    'type' => 'text', // تعديل النوع إلى keyword
                                    'analyzer' => 'my_analyzer', // استخدام التحليل المناسب هنا

                                ],
                                'description' => [
                                    'type' => 'text',
                                    'analyzer' => 'my_analyzer', // استخدام التحليل المناسب هنا
                                ],

                            ],
                        ],

                    ],
                ],
            ],
        ];

        $response = $client->indices()->create($params);
    }
    public static function indexAll()
    {
        $client = ClientBuilder::create()
            ->setHosts(['localhost:9200'])
            ->setBasicAuthentication('Lilas', '123456789')
            ->build();
        $cases = Cases::all();
        foreach ($cases as $case) {

            $params = [
                'index' => Cases::$index,
                'id' => $case->id,
                'body' => [
                    'id' => $case->id,
                    'title' => $case->title,
                    'claim' => $case->claim,
                    'facts' => $case->facts,
                    // 'decisions.id' => $case->decisions->pluck('id'),
                    'decisions' => $case->decisions->pluck('description','id'),
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

        $params = [
            'index' => Cases::$index,
            'id' => $this->id,
            'body' => [
                'claim' => $this->claim,
                'facts' => $this->facts,
                'title' => $this->title,
                'id' => $this->id,
                'decisions' => $this->decisions->pluck('description'),

                // أضف المزيد من الحقول اللازمة
            ],
        ];

        $client->index($params);
    }

    public function updateIndex()
    {
        $client = ClientBuilder::create()
            ->setHosts(['localhost:9200'])
            ->setBasicAuthentication('Lilas', '123456789')
            ->build();

        $params = [
            'index' => Cases::$index,
            'id' => $this->id,
            'body' => [
                'doc' => [
                    'claim' => $this->claim,
                    'facts' => $this->facts,

                ],
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
        // حذف وثيقة محددة من الفهرس
        $params = [
            'index' => Cases::$index,
            'id' => $this->id,
        ];

        return $client->delete($params);
    }
//      }
//      public static function search($query)
// {
//     $client = ClientBuilder::create()
//         ->setHosts(['localhost:9200'])
//         ->setBasicAuthentication('Lilas', '123456789')
//         ->build();

//     $params = [
//         'index' => Cases::$index,
//         'body' => [
//             'suggest' => [
//                 'text' => $query,
//                 'simple_phrase' => [
//                     'phrase' => [
//                         'field' => 'title',
//                         'size' => 5, // عدد الاقتراحات المراد استرجاعها
//                         'gram_size' => 3, // حجم الجرام (عدد الكلمات) في كل اقتراح
//                         'direct_generator' => [
//                             [
//                                 'field' => 'title',
//                                 'suggest_mode' => 'always',
//                             ],
//                             [
//                                 'field' => 'facts',
//                                 'suggest_mode' => 'always',
//                             ],
//                             [
//                                 'field' => 'claim',
//                                 'suggest_mode' => 'always',
//                             ],
//                             [
//                                 'field' => 'decisions.description',
//                                 'suggest_mode' => 'always',
//                             ],
//                         ],
//                     ],
//                 ],
//             ],
//             'query' => [
//                 'bool' => [
//                     'should' => [
//                         ['match' => ['title' => [
//                             'query' => $query,
//                             'boost' => 10.0,
//                         ]]],
//                         ['match' => ['facts' => $query]],
//                         ['match' => ['claim' => $query]],
//                         ['nested' => [
//                             'path' => 'decisions',
//                             'query' => [
//                                 'match' => ['decisions.description' => $query]
//                             ]
//                         ]]
//                     ]
//                 ]
//             ],
//             'sort' => [
//                 ['_score' => 'desc']
//             ],
//             'highlight' => [
//                 'pre_tags' => ['<span style="background-color:green;">'],
//                 'post_tags' => ['</span>'],
//                 'fields' => [
//                     'title' => new \stdClass(),
//                     'facts' => new \stdClass(),
//                     'claim' => new \stdClass(),
//                     'decisions.description' => new \stdClass(),
//                 ]
//             ]
//         ]
//     ];

//     $response = $client->search($params);
//     $hits = $response['hits']['hits'];
//     $results = [];

//     foreach ($hits as $hit) {
//         $source = $hit['_source'];
//         $score = $hit['_score'];
//         $highlight = $hit['highlight'];

//         $evaluation = $score;

//         $results[] = [
//             'result' => $source,
//             'evaluation' => $evaluation,
//             'highlight' => $highlight,
//         ];
//     }

//     usort($results, function ($a, $b) {
//         return $b['evaluation'] <=> $a['evaluation'];
//     });

//     // استرجاع الاقتراحات
//     $suggestions = $response['suggest']['simple_phrase'][0]['options'];
//     $suggestedTerms = [];
//     foreach ($suggestions as $suggestion) {
//         $suggestedTerms[] = $suggestion['text'];
//     }

//     return [
//         'results' => $results,
//         'suggestions' => $suggestedTerms,
//     ];
public static function search($query)
{
    $client = ClientBuilder::create()
        ->setHosts(['localhost:9200'])
        ->setBasicAuthentication('Lilas', '123456789')
        ->build();

    $params = [
        'index' => Cases::$index,
        'body' => [
            'suggest' => [
                'text' => $query,

                'custom_suggest' => [
                    'phrase' => [
                        'field' => 'title',
                        'size' => 5,
                        'real_word_error_likelihood' => 0.95,
                        'max_errors' => 0.5,
                        'gram_size' => 3,
                        'direct_generator' => [
                            [
                                'field' => 'title',
                                'suggest_mode' => 'always',
                            ],
                            [
                                'field' => 'facts',
                                'suggest_mode' => 'always',
                            ],
                            [
                                'field' => 'claim',
                                'suggest_mode' => 'always',
                            ],
                            [
                                'field' => 'decisions.description',
                                'suggest_mode' => 'always',
                            ],
                        ],
                    ],
                ],
            ],
            'query' => [
                'bool' => [
                    'should' => [
                        ['match' => ['title' => [
                            'query' => $query,
                            'boost' => 10.0,
                        ]]],
                        ['match' => ['facts' => $query]],
                        ['match' => ['claim' => $query]],
                        ['nested' => [
                            'path' => 'decisions',
                            'query' => [
                                'match' => ['decisions.description' => $query]
                            ]
                        ]]
                    ]
                ]
            ],
            'sort' => [
                ['_score' => 'desc']
            ],
            'highlight' => [
                'pre_tags' => ['<span style="background-color:green;">'],
                'post_tags' => ['</span>'],
                'fields' => [
                    'title' => new \stdClass(),
                    'facts' => new \stdClass(),
                    'claim' => new \stdClass(),
                    'decisions.description' => new \stdClass(),
                ]
            ]
        ]
    ];

    $response = $client->search($params);
    $hits = $response['hits']['hits'];
    $results = [];

    foreach ($hits as $hit) {
        $source = $hit['_source'];
        $score = $hit['_score'];
        $highlight = $hit['highlight'];

        $evaluation = $score;

        $results[] = [
            'result' => $source,
            'evaluation' => $evaluation,
            'highlight' => $highlight,
        ];
    }

    usort($results, function ($a, $b) {
        return $b['evaluation'] <=> $a['evaluation'];
    });

    $suggestions = $response['suggest']['custom_suggest'][0]['options'];
    $suggestedTerms = [];
    foreach ($suggestions as $suggestion) {
        $suggestedTerms[] = $suggestion['text'];
    }

    return [
        'results' => $results,
        'suggestions' => $suggestedTerms,
    ];
}


    // public static function search($query)
    // {
    //     $client = ClientBuilder::create()
    //         ->setHosts(['localhost:9200'])
    //         ->setBasicAuthentication('Lilas', '123456789')
    //         ->build();

    //     $params = [
    //         'index' => Cases::$index,
    //         'body' => [
    //             'query' => [
    //                 'bool' => [
    //                     'should' => [
    //                         ['match' => ['title' => [
    //                             'query' => $query,
    //                             'boost' => 10.0,
    //                         ]]],
    //                         ['match' => ['facts' => $query]],
    //                         ['match' => ['claim' => $query]],
    //                         ['nested' => [
    //                             'path' => 'decisions',
    //                             'query' => [
    //                                 'match' => ['decisions.description' => $query]
    //                             ]
    //                         ]]
    //                     ]
    //                 ]
    //             ],
    //             'sort' => [
    //                 ['_score' => 'desc']
    //             ]
    //         ]
    //     ];

    //     $response = $client->search($params);
    //     $hits = $response['hits']['hits'];
    //     $results = [];

    //     foreach ($hits as $hit) {
    //         $source = $hit['_source'];
    //         $score = $hit['_score'];

    //         // قم بتقييم النتيجة بناءً على الدرجة التوافق (score)
    //         $evaluation = $score;

    //         // أضف النتيجة والتقييم إلى القائمة النهائية
    //         $results[] = [
    //             'result' => $source,
    //             'evaluation' => $evaluation,
    //         ];
    //     }

    //     // قم بترتيب النتائج بناءً على التقييم (بحسب الدرجة التوافق)
    //     usort($results, function ($a, $b) {
    //         return $b['evaluation'] <=> $a['evaluation']; // ترتيب تنازلي للتقييم
    //     });

    //     return $results;
    // }


    protected $fillable = [
        'title',
        'court_id',
        'case_room',
        'Status',
        'Value_Status',
        'facts',
        'claim',

    ];
    public function attachments(): HasMany
    {
        return $this->hasMany(Case_attachment::class, 'case_id');
    }
    public function tasks()
    {

        return $this->belongsToMany(tasks::class, 'case_of_task');
    }
    public function sessions(): HasMany
    {
        return $this->hasMany(Sessions::class, 'case_id');
    }
    public function decisions()
    {
        return $this->hasMany(Decision::class, 'case_id');
    }public function clients_case()
    {
        return $this->hasMany(Client_of_Cases::class, 'case_id');
    }public function lawyers_case()
    {
        return $this->hasMany(Lawyer_of_Cases::class, 'case_id');
    }
    public function enemy_lawyers()
    {
        return $this->belongsToMany(Enemy_Lawyers::class, 'enemy_lawyer_of_cases', 'case_id', 'enemy_lawyer_id');
    }
    public function enemy_clients(): BelongsToMany
    {
        return $this->belongsToMany(Enemy_Clients::class, 'enemy_client_of_cases', 'case_id', 'enemy_client_id');
    }

    public function lawyers()
    {
        return $this->belongsToMany(User::class, 'lawyer_of_case', 'case_id', 'user_id');
    }

    public function clients()
    {
        return $this->belongsToMany(User::class, 'client_of_case', 'case_id', 'user_id');
    }
    public function baseNumbers(): HasMany
    {
        return $this->hasMany(BaseNumber::class, 'case_id');
    }

    public function court()
    {
        return $this->belongsTo(Courts::class, 'court_id');
    }
}
