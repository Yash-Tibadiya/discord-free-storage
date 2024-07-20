from flask import Flask, render_template

app = Flask(__name__)

# Example files_info list
files_info = [
    # Add your file_info dictionaries here with a 'size' key in bytes
]

# Calculate total size
total_size = sum(file['size'] for file in files_info)

# Format total size in B, KB, MB, GB, TB
def format_size(size):
    if size < 1024:
        return f"{size} B"
    elif size < 1024 ** 2:
        return f"{size / 1024:.2f} KB"
    elif size < 1024 ** 3:
        return f"{size / 1024 ** 2:.2f} MB"
    elif size < 1024 ** 4:
        return f"{size / 1024 ** 3:.2f} GB"
    else:
        return f"{size / 1024 ** 4:.2f} TB"

formatted_total_size = format_size(total_size)

@app.route('/')
def index():
    return render_template('index.html', files_info=files_info, formatted_total_size=formatted_total_size)

if __name__ == '__main__':
    app.run(debug=True)
