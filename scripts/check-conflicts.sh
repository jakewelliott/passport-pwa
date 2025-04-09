#!/bin/bash

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# Function to normalize whitespace
normalize() {
    # Remove all whitespace and newlines, and sort the content
    tr -d ' \t\n\r' | sort
}

# Function to check if two versions are the same after whitespace normalization
check_conflict() {
    local file=$1
    
    # Get the conflict sections
    local conflict_sections=$(awk '/<<<<<<< HEAD/{p=NR}; /=======/{m=NR}; />>>>>>>/{print p ":" m ":" NR; p=""; m=""}' "$file")
    
    if [ -z "$conflict_sections" ]; then
        return
    fi
    
    echo "Found conflicts in $file:"
    echo "----------------------------------------"
    
    while IFS=: read -r start middle end; do
        # Extract both versions
        local version1=$(sed -n "$((start+1)),$((middle-1))p" "$file")
        local version2=$(sed -n "$((middle+1)),$((end-1))p" "$file")
        
        # Compare normalized versions
        if [ "$(echo "$version1" | normalize)" = "$(echo "$version2" | normalize)" ]; then
            echo -e "${GREEN}✓ Whitespace-only conflict at lines $start-$end${NC}"
            echo "Version 1 (HEAD):"
            echo "$version1" | sed 's/^/  /'
            echo "Version 2:"
            echo "$version2" | sed 's/^/  /'
        else
            echo -e "${RED}✗ Content conflict at lines $start-$end${NC}"
            echo "Version 1 (HEAD):"
            echo "$version1" | sed 's/^/  /'
            echo "Version 2:"
            echo "$version2" | sed 's/^/  /'
        fi
        echo "----------------------------------------"
    done <<< "$conflict_sections"
}

# Find all files with conflicts
echo "Checking all files with conflicts..."
echo "====================================="

# Get all files with conflicts
for file in $(git ls-files -u | cut -f2 | sort -u); do
    if [ -f "$file" ]; then
        check_conflict "$file"
    fi
done

# Check for delete/modify conflicts
echo "Checking for delete/modify conflicts..."
echo "====================================="
git diff --name-status --diff-filter=UD | while read status file; do
    if [ "$status" = "U" ]; then
        if [ -f "$file" ]; then
            echo -e "${RED}⚠️  $file: Modified in one branch but deleted in another${NC}"
        fi
    fi
done 