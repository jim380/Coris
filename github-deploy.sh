#!/usr/bin/env sh
repo=explorer-test
account=aakatev

# ng build --prod --build-optimizer --output-path distr --base-href /$repo/
cd distr && git init
git remote add origin git@github.com:$account/$repo.git
git add .
git commit -m"Deployed to GitHub pages using bash"
git push origin master -f

# cd -