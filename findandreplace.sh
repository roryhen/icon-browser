#!/bin/bash
# find_and_replace.sh

echo "Find and replace, what directory to start in?"
read -r directory
echo "Find and replace in $directory directory!"
echo "File pattern to look for? (eg '*.txt')"
read -r filepattern
echo "Existing string?"
read -r existing
echo "Replacement string?"
read -r replacement
echo "Replacing all occurences of $existing with $replacement in files matching $filepattern"

find "$directory" -type f -name "$filepattern" -print0 | xargs -0 sed -i '' -e "s/$existing/$replacement/g"

