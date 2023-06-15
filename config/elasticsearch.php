 <?php

 return array(
    'config' => [
        'hosts'=>['localhost:9200'],
        'retries'=>1,
    ],
    'default_index' =>'cases_name',
);
// return [
//     'indices' => [
//         'cases_index' => [
//             'name' => 'cases',
//             'settings' => [
//                 'number_of_shards' => 1,
//                 'number_of_replicas' => 1,
//             ],
//             'mappings' => [
//                 'properties' => [
//                     'facts' => [
//                         'type' => 'text',
//                     ],
//                     'claim' => [
//                         'type' => 'text',
//                     ],
//                 ],
//             ],
//         ],
//     ],
// ];
