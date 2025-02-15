git filter-repo --force --commit-callback '
    if commit.author_name == b"adamwett":
        commit.author_name = b"alwettre"
        commit.author_email = b"alwettre@ncsu.edu"
        commit.committer_name = b"alwettre"
        commit.committer_email = b"alwettre@ncsu.edu"
' 