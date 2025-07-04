<?php

return [

    'paths' => ['api/*'],

    'allowed_methods' => ['*'],

    // ✅ Allow React frontend on localhost:3000
    'allowed_origins' => ['http://localhost:3000'],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => false,

];
