#!/usr/bin/env sh

yarn build
yarn generate

cd ../app

php artisan vendor:publish --tag=hris-saas::ui

cd ../ui
