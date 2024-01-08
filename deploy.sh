#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git checkout -b master
git add -A
git commit -m 'deploy'

# if you are deploying to https://bftsai.github.io
# git push -f git@github.com:bftsai/bftsai.github.io.git main

# if you are deploying to https://bftsai.github.io/vue3-live-class-week2-homework
# git push -f git@github.com:bftsai/vue3-live-class-week2-homework.git master:gh-pages

cd -