git filter-branch --env-filter '
if [ "$GIT_AUTHOR_NAME" = "adamwett" ]
then
    export GIT_AUTHOR_NAME="alwettre"
    export GIT_AUTHOR_EMAIL="alwettre@ncsu.edu"
    export GIT_COMMITTER_NAME="alwettre"
    export GIT_COMMITTER_EMAIL="alwettre@ncsu.edu"
fi
' --tag-name-filter cat -- --all