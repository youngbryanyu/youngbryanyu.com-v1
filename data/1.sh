#!/bin/bash

# Check if the correct number of arguments is provided
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <filename>"
    exit 1
fi

# Input file
input_file="$1"

# Check if the file exists
if [ ! -f "$input_file" ]; then
    echo "Error: File not found: $input_file"
    exit 1
fi

# Use sed to replace full month names with short month names
sed -i '' 's/January/Jan/g' "$input_file"
sed -i '' 's/February/Feb/g' "$input_file"
sed -i '' 's/March/Mar/g' "$input_file"
sed -i '' 's/April/Apr/g' "$input_file"
sed -i '' 's/May/May/g' "$input_file"
sed -i '' 's/June/Jun/g' "$input_file"
sed -i '' 's/July/Jul/g' "$input_file"
sed -i '' 's/August/Aug/g' "$input_file"
sed -i '' 's/September/Sep/g' "$input_file"
sed -i '' 's/October/Oct/g' "$input_file"
sed -i '' 's/November/Nov/g' "$input_file"
sed -i '' 's/December/Dec/g' "$input_file"

echo "Replacement completed successfully."
