#!/bin/bash

SOURCE_DIR="$HOME/Downloads/markdownloader"
INBOX_DIR="$HOME/vault/Bininbox"
ASSETS_DIR="$HOME/vault/Bininbox/assets"
WAIT_TIME=5  # Wait time in seconds

# Ensure destination directories exist
mkdir -p "$INBOX_DIR" "$ASSETS_DIR"

check_file_complete() {
    local file="$1"
    local check_interval=2
    local max_checks=30
    local prev_size=0
    
    for ((i=0; i<max_checks; i++)); do
        if [ ! -f "$file" ]; then
            return 1  # File doesn't exist (might have been moved by another process)
        fi
        current_size=$(stat -c %s "$file")
        if [ "$current_size" == "$prev_size" ] && [ "$current_size" -gt 0 ]; then
            return 0  # File complete
        fi
        prev_size=$current_size
        sleep $check_interval
    done
    return 1  # File incomplete
}

move_file() {
    local file="$1"
    local destination="$2"
    mv "$file" "$destination/"
    echo "Moved $(basename "$file") to $destination"
}

process_file() {
    local file="$1"
    local filepath="$SOURCE_DIR/$file"
    
    # Skip temporary and partial download files
    if [[ "$file" == .* ]] || [[ "$file" == ~* ]] || [[ "$file" == *.crdownload ]] || [[ "$file" == *.part ]]; then
        echo "Skipping temporary or partial file: $file"
        return
    fi
    
    # Wait for potential .part file to disappear
    while [ -f "$filepath.part" ]; do
        echo "Waiting for download to complete: $file"
        sleep $WAIT_TIME
    done
    
    # Additional wait time after .part file disappears
    sleep $WAIT_TIME
    
    if check_file_complete "$filepath"; then
        # Determine destination based on file extension
        if [[ "$file" == *.md ]]; then
            move_file "$filepath" "$INBOX_DIR"
        elif [[ "$file" =~ \.(png|jpg|jpeg|gif|bmp|svg|webp)$ ]]; then
            move_file "$filepath" "$ASSETS_DIR"
        else
            move_file "$filepath" "$ASSETS_DIR"  # Default to assets for other file types
        fi
    else
        echo "File $file is still being downloaded or is empty. Skipping."
    fi
}

inotifywait -m -e close_write,moved_to,create "$SOURCE_DIR" |
while read path action file; do
    process_file "$file" &
done

