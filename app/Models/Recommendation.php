<?php

namespace App\Models;

use Elastic\Elasticsearch\ClientBuilder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recommendation extends Model
{
    use HasFactory;
    private static $index = 'recomendation_index';
    public static function destroyIndex()
    {
        $client = ClientBuilder::create()
            ->setHosts(['localhost:9200'])
            ->setBasicAuthentication('Lilas', '123456789')
            ->build();
        $params = [
            'index' => Recommendation::$index, // اسم الفهرس الذي ترغب في حذفه
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
            'index' => Recommendation::$index,
            'body' => [
                'settings' => [
                    'analysis' => [
                        'analyzer' => [
                            'my_analyzer' => [
                                'type' => 'custom',
                                'tokenizer' => 'standard',
                                'filter' => ['lowercase', 'arabic_normalization', 'arabic_stop', 'arabic_stemmer'
                                ,'arabic_stopwords', // تعريف "ستوب ووردز" المستخدم للفهرسة العربية
                            ],
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
                            ], 'arabic_stopwords' => [
                                'type' => 'stop',
                                'stopwords' => [
                                    'ب', 'من', 'إلى', 'عن', 'في', 'على', 'مع', 'أن', 'هذا', 'هذه',
                                    // قائمة تحتوي على أحرف الجر والكلمات التي ترغب في تعيينها كـ "ستوب ووردز"
                                ],
                                'ignore_case' => true,
                            ],

                        ],
                    ],
                ],
                'mappings' => [
                    'properties' => [

                        'title' => [
                            'type' => 'text',
                            'analyzer' => 'my_analyzer', // استخدام التحليل المناسب هنا
                        ],

                        'content' => [
                            'type' => 'text',
                            'analyzer' => 'my_analyzer', // استخدام التحليل المناسب هنا
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
        $recommendations = Recommendation::all();
        foreach ($recommendations as $recommendation) {

            $params = [
                'index' => Recommendation::$index,
                'id' => $recommendation->id,
                'body' => [
                    'title' => $recommendation->title,
                    'content' => $recommendation->content,
                    'id' => $recommendation->id,
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
            'index' => Recommendation::$index,
            'id' => $this->id,
            'body' => [

                'content' => $this->content,
                'title' => $this->title,
                'id' => $this->id,
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
            'index' => Recommendation::$index,
            'id' => $this->id,
            'body' => [
                'doc' => [
                    'content' => $this->content,
                    'title' => $this->title,

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
            'index' => Recommendation::$index,
            'id' => $this->id,
        ];

        return $client->delete($params);
    }
    public static function search($query)
    {
        $client = ClientBuilder::create()
            ->setHosts(['localhost:9200'])
            ->setBasicAuthentication('Lilas', '123456789')
            ->build();
        $params = [
            'index' => Recommendation::$index,
            'body' => [
                'query' => [
                    'multi_match' => [
                        'query' => $query,
                        'fields' => ['title', 'content'],
                    ],
                ],
            ],
        ];
        $response = $client->search($params);

        $hits = $response['hits']['hits'];

        $results = [];

        // foreach ($hits as $hit) {
        //     $result = $hit['_source'];
        //     $result['type'] = $hit['_type'];
        //     $result['score'] = $hit['_score'];
        //     $results[] = $result;
        // }

        foreach ($hits as $hit) {
            $results[] = $hit['_source'];
        }

        return $results;
    }

    protected $fillable = [
        'title', 'content',
    ];
}
