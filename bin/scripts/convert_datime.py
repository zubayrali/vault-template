import os
import re
from datetime import datetime

def convert_custom_timestamp_to_datetime(timestamp):
    # Format: YYYYMMDDHHMMSSmmm (Year, Month, Day, Hour, Minute, Second, Millisecond)
    return datetime.strptime(timestamp, '%Y%m%d%H%M%S%f').strftime('%Y-%m-%d %H:%M:%S')

def process_markdown_files(directory):
    for root, dirs, files in os.walk(directory):
        for filename in files:
            if filename.endswith(".md"):
                filepath = os.path.join(root, filename)
                print(f"Processing file: {filepath}")

                with open(filepath, 'r', encoding='utf-8') as file:
                    content = file.readlines()

                if content and content[0].strip() == '---':
                    try:
                        end_yaml_index = content[1:].index('---\n') + 1
                    except ValueError:
                        print(f"YAML frontmatter not properly formatted in {filename}")
                        continue

                    yaml_content = content[1:end_yaml_index]

                    update_required = False
                    for i, line in enumerate(yaml_content):
                        if line.startswith('created:'):
                            property_name = line.split(':')[0].strip()
                            value = line.split(':', 1)[1].strip()
                            if re.match(r'^\d{17}$', value): # Adjusted regex for the new timestamp format
                                new_datetime = convert_custom_timestamp_to_datetime(value)
                                yaml_content[i] = f'{property_name}: {new_datetime}\n'
                                update_required = True

                    if update_required:
                        content[1:end_yaml_index] = yaml_content
                        with open(filepath, 'w', encoding='utf-8') as file:
                            file.writelines(content)
                        print(f"Updated timestamps in {filename}")

directory = r'C:\Users\fxnitro\Documents\GitHub\quartz\content'
process_markdown_files(directory)
